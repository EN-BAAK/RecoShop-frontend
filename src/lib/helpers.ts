export const setSessionItem = (key: string, value: unknown): void => {
  if (typeof window === "undefined") return;
  try {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    sessionStorage.setItem(key, data);
  } catch { }
};

export const getSessionItem = <T = unknown>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

export const clearSessionItem = (key: string): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
};

export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];

  if (step === 0) throw new Error("Step cannot be 0");

  const increasing = start < end;

  for (
    let i = start;
    increasing ? i <= end : i >= end;
    i += increasing ? step : -step
  ) {
    result.push(i);
  }

  return result;
};