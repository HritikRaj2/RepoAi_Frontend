"use client";

import {
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
} from "recharts";

export default function HealthGauge({ score }) {
    const data = [{ name: "Health", value: score, fill: getColor(score) }];

    function getColor(val) {
        if (val >= 80) return "#238636";
        if (val >= 60) return "#d29922";
        return "#f85149";
    }

    function getLabel(val) {
        if (val >= 80) return "Excellent";
        if (val >= 60) return "Good";
        if (val >= 40) return "Fair";
        return "Poor";
    }

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card p-6 transition-all hover:border-gh-muted">
            <h3 className="text-sm font-medium text-gh-muted uppercase tracking-wider mb-4">
                Health Score
            </h3>

            <div className="relative h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="90%"
                        barSize={14}
                        data={data}
                        startAngle={225}
                        endAngle={-45}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: "#21262d" }}
                            clockWise
                            dataKey="value"
                            cornerRadius={10}
                            angleAxisId={0}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        className="text-4xl font-bold"
                        style={{ color: getColor(score) }}
                    >
                        {score}
                    </span>
                    <span className="text-xs text-gh-muted mt-1">
                        {getLabel(score)}
                    </span>
                </div>
            </div>
        </div>
    );
}
