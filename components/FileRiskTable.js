"use client";

import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import RiskBadge from "./RiskBadge";

export default function FileRiskTable({ files }) {
    const [sortKey, setSortKey] = useState("riskScore");
    const [sortDir, setSortDir] = useState("desc");

    const sorted = useMemo(() => {
        return [...files].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (typeof aVal === "string") {
                return sortDir === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        });
    }, [files, sortKey, sortDir]);

    function handleSort(key) {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    }

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 text-gh-muted" />;
        return sortDir === "asc" ? (
            <ChevronUp className="h-3 w-3 text-gh-blue" />
        ) : (
            <ChevronDown className="h-3 w-3 text-gh-blue" />
        );
    };

    const columns = [
        { key: "filePath", label: "File Path" },
        { key: "riskLevel", label: "Risk" },
        { key: "riskScore", label: "Risk Score" },
        { key: "complexityScore", label: "Complexity" },
        { key: "securitySmells", label: "Security" },
        { key: "linesOfCode", label: "LOC" },
    ];

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gh-border bg-gh-bg/50">
                <h3 className="text-sm font-medium text-gh-heading">
                    File Analysis ({files.length} files)
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gh-border">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    className="px-4 py-3 text-left text-xs font-medium text-gh-muted uppercase tracking-wider cursor-pointer hover:text-gh-heading transition-colors select-none"
                                >
                                    <div className="flex items-center gap-1.5">
                                        {col.label}
                                        <SortIcon col={col.key} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((file, idx) => (
                            <tr
                                key={file.filePath}
                                className={`border-b border-gh-border/50 transition-colors hover:bg-gh-border/20 ${idx % 2 === 0 ? "bg-gh-card" : "bg-gh-bg/30"
                                    }`}
                            >
                                <td className="px-4 py-3 font-mono text-xs text-gh-blue max-w-xs truncate" title={file.filePath}>
                                    {file.filePath}
                                </td>
                                <td className="px-4 py-3">
                                    <RiskBadge level={file.riskLevel} size="sm" />
                                </td>
                                <td className="px-4 py-3 text-gh-heading font-medium">
                                    {file.riskScore}
                                </td>
                                <td className="px-4 py-3 text-gh-text">
                                    {file.complexityScore}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={file.securitySmells > 0 ? "text-gh-red font-medium" : "text-gh-text"}>
                                        {file.securitySmells}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gh-muted">
                                    {file.linesOfCode}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
