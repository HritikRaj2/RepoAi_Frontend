const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

/**
 * Start analysis for a given GitHub repository URL.
 * POST /api/public/analyze
 */
export async function analyzeRepo(repoUrl) {
    const res = await fetch(`${API_URL}/api/public/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`Failed to start analysis: ${res.status} – ${errorText}`);
    }

    return res.json();
}

/**
 * Get analysis status / last result for a repo URL.
 * GET /api/public/result?repoUrl=...
 */
export async function getResult(repoUrl) {
    const res = await fetch(
        `${API_URL}/api/public/result?repoUrl=${encodeURIComponent(repoUrl)}`
    );

    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`Failed to get result: ${res.status} – ${errorText}`);
    }

    return res.json();
}

/**
 * Get the full detailed analysis report by ID.
 * GET /api/public/report/{id}
 */
export async function getReport(id) {
    const res = await fetch(`${API_URL}/api/public/report/${id}`);

    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`Failed to get report: ${res.status} – ${errorText}`);
    }

    return res.json();
}
