"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
    HIGH: "#f85149",
    MEDIUM: "#d29922",
    LOW: "#238636",
};

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div className="bg-gh-card border border-gh-border rounded-lg px-3 py-2 shadow-xl">
            <p className="text-xs text-gh-heading font-medium">{d.name}</p>
            <p className="text-sm font-bold" style={{ color: d.payload.fill }}>
                {d.value} file{d.value !== 1 ? "s" : ""}
            </p>
        </div>
    );
}

function CustomLegend({ payload }) {
    return (
        <div className="flex justify-center gap-4 mt-2">
            {payload.map((entry) => (
                <div key={entry.value} className="flex items-center gap-1.5 text-xs text-gh-muted">
                    <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    {entry.value}
                </div>
            ))}
        </div>
    );
}

export default function RiskDistributionChart({ fileAnalysis }) {
    const data = [
        { name: "High Risk", value: fileAnalysis.highRiskFiles, fill: COLORS.HIGH },
        { name: "Medium Risk", value: fileAnalysis.mediumRiskFiles, fill: COLORS.MEDIUM },
        { name: "Low Risk", value: fileAnalysis.lowRiskFiles, fill: COLORS.LOW },
    ].filter((d) => d.value > 0);

    // If all are zero, show a placeholder
    if (data.length === 0) {
        data.push({ name: "No Files", value: 1, fill: "#30363d" });
    }

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card p-6 transition-all hover:border-gh-muted">
            <h3 className="text-sm font-medium text-gh-muted uppercase tracking-wider mb-4">
                Risk Distribution
            </h3>

            <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={0}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="#0d1117"
                            strokeWidth={2}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
