export const callGemini = async (prompt) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s max

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Analysis failed");

    return data.result;
  } finally {
    clearTimeout(timeout);
  }
};