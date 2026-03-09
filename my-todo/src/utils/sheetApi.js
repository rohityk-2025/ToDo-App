import { SHEET_URL } from "../constants";

export async function sheetCall(body) {
  if (!SHEET_URL || SHEET_URL.includes("YOUR_SCRIPT_ID")) {
    return { offline: true };
  }
  try {
    const res = await fetch(SHEET_URL, {
      method:   "POST",
      redirect: "follow",
      headers:  { "Content-Type": "text/plain" },
      body:     JSON.stringify(body),
    });
    return await res.json();
  } catch {
    return { error: true };
  }
}
