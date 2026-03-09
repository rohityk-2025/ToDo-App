import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sheetCall } from "../utils/sheetApi";
import { genId } from "../utils";
import { DEMO_TASKS } from "../constants";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos,       setTodos]       = useLocalStorage("todos-v2", DEMO_TASKS);
  const [quadrantMap, setQuadrantMap] = useLocalStorage("quadrant-v2", {});
  const [syncStatus,  setSyncStatus]  = useState("idle");

  // ── sync helper ──────────────────────────────────────────
  const sync = useCallback(async (body) => {
    setSyncStatus("syncing");
    const res = await sheetCall(body);
    setSyncStatus(res.offline ? "offline" : res.error ? "error" : "ok");
    setTimeout(() => setSyncStatus(s => s === "ok" ? "idle" : s), 3000);
    return res;
  }, []);

  // ── load from sheet on mount ─────────────────────────────
  useEffect(() => {
    (async () => {
      const res = await sheetCall({ action: "getAllTasks" });
      if (res.offline) { setSyncStatus("offline"); return; }
      if (res.success && res.tasks?.length) {
        setTodos(res.tasks.map(t => ({ ...t, done: t.status === "Completed" })));
        const qm = {};
        res.tasks.forEach(t => { if (t.quadrant) qm[t.id] = t.quadrant; });
        setQuadrantMap(qm);
        setSyncStatus("ok");
        setTimeout(() => setSyncStatus("idle"), 3000);
      } else {
        setSyncStatus(res.error ? "error" : "idle");
      }
    })();
  }, []);

  // ── CRUD ─────────────────────────────────────────────────
  async function addTodo({ text, category, tags, timeEstimate }) {
    const task = {
      id: genId(), text, category, tags,
      timeEstimate, done: false, status: "Active",
      createdDate: new Date().toISOString(), quadrant: null,
    };
    setTodos(p => [task, ...p]);
    await sync({ action: "addTask", task });
  }

  async function toggleTodo(id) {
    let updated;
    setTodos(p => p.map(t => {
      if (t.id !== id) return t;
      updated = {
        ...t,
        done: !t.done,
        status: !t.done ? "Completed" : "Active",
        completedDate: !t.done ? new Date().toISOString() : null,
      };
      return updated;
    }));
    if (updated) {
      await sync({ action: "updateStatus", id, status: updated.status, completedDate: updated.completedDate || "" });
    }
  }

  async function deleteTodo(id) {
    setTodos(p => p.filter(t => t.id !== id));
    setQuadrantMap(p => { const n = { ...p }; delete n[id]; return n; });
    await sync({ action: "deleteTask", id });
  }

  function editTodo(id, text) {
    setTodos(p => p.map(t => t.id === id ? { ...t, text } : t));
  }

  async function dropIntoQuadrant(taskId, quadrantId) {
    setQuadrantMap(p => ({ ...p, [taskId]: quadrantId }));
    await sync({ action: "updateQuadrant", taskId, quadrant: quadrantId });
  }

  function removeFromMatrix(taskId) {
    setQuadrantMap(p => { const n = { ...p }; delete n[taskId]; return n; });
  }

  async function clearCompleted() {
    const done = todos.filter(t => t.done);
    done.forEach(t => deleteTodo(t.id));
  }

  return (
    <TodoContext.Provider value={{
      todos, quadrantMap, syncStatus,
      addTodo, toggleTodo, deleteTodo, editTodo,
      dropIntoQuadrant, removeFromMatrix, clearCompleted,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
