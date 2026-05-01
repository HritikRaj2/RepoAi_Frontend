"use client";

import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function getBarColor(score) {
    if (score >= 7) return "#f85149";
    if (score >= 4) return "#d29922";
    return "#238636";
}

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-gh-card border border-gh-border rounded-lg px-4 py-3 shadow-xl max-w-xs">
            <p className="text-xs text-gh-heading font-medium mb-1 truncate">
                {d.fullPath}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <span className="text-gh-muted">Risk Score</span>
                <span className="text-gh-heading font-medium">{d.riskScore}</span>
                <span className="text-gh-muted">Complexity</span>
                <span className="text-gh-heading font-medium">{d.complexityScore}</span>
                <span className="text-gh-muted">Security Smells</span>
                <span className="text-gh-heading font-medium">{d.securitySmells}</span>
                <span className="text-gh-muted">Lines of Code</span>
                <span className="text-gh-heading font-medium">{d.linesOfCode}</span>
            </div>
        </div>
    );
}

export default function FileRiskChart({ files }) {
    // Take top 10 riskiest files
    const sortedFiles = [...files]
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 10);

    const data = sortedFiles.map((f) => ({
        name: f.filePath.split("/").pop(),
        fullPath: f.filePath,
        riskScore: f.riskScore,
        complexityScore: f.complexityScore,
        securitySmells: f.securitySmells,
        linesOfCode: f.linesOfCode,
    }));

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card p-6 transition-all hover:border-gh-muted">
            <h3 className="text-sm font-medium text-gh-muted uppercase tracking-wider mb-4">
                Top {data.length} Riskiest Files
            </h3>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            type="number"
                            domain={[0, 10]}
                            tick={{ fill: "#8b949e", fontSize: 11 }}
                            axisLine={{ stroke: "#30363d" }}
                            tickLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={130}
                            tick={{ fill: "#c9d1d9", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(48, 54, 61, 0.3)" }} />
                        <Bar dataKey="riskScore" radius={[0, 4, 4, 0]} barSize={16}>
                            {data.map((entry, index) => (
                                <Cell key={index} fill={getBarColor(entry.riskScore)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
