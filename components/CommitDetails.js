import { AlertTriangle, GitCommit, MessageSquare, TrendingUp } from "lucide-react";

export default function CommitDetails({ commitAnalysis }) {
    const stats = [
        {
            icon: GitCommit,
            label: "Total Commits",
            value: commitAnalysis.totalCommits,
            color: "text-gh-blue",
        },
        {
            icon: TrendingUp,
            label: "Avg Commit Size",
            value: commitAnalysis.avgCommitSize,
            color: "text-gh-text",
        },
        {
            icon: MessageSquare,
            label: "Good Messages",
            value: commitAnalysis.goodMessages,
            color: "text-gh-green",
        },
        {
            icon: AlertTriangle,
            label: "Bad Messages",
            value: commitAnalysis.badMessages,
            color: "text-gh-red",
        },
    ];

    const qualityColor =
        commitAnalysis.qualityScore >= 80
            ? "text-gh-green"
            : commitAnalysis.qualityScore >= 60
                ? "text-gh-yellow"
                : "text-gh-red";

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gh-border bg-gh-bg/50">
                <h3 className="text-sm font-medium text-gh-heading">
                    Commit Analysis
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gh-muted">Quality Score</span>
                    <span className={`text-lg font-bold ${qualityColor}`}>
                        {commitAnalysis.qualityScore}%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gh-border/50">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="p-5 text-center group hover:bg-gh-bg/30 transition-colors"
                    >
                        <stat.icon
                            className={`h-5 w-5 mx-auto mb-2 ${stat.color} transition-transform group-hover:scale-110`}
                        />
                        <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gh-muted mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quality bar */}
            <div className="px-6 py-4 border-t border-gh-border/50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gh-muted">Message Quality</span>
                    <span className={`text-xs font-medium ${qualityColor}`}>
                        {commitAnalysis.qualityScore}%
                    </span>
                </div>
                <div className="h-2 bg-gh-bg rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                            width: `${commitAnalysis.qualityScore}%`,
                            backgroundColor:
                                commitAnalysis.qualityScore >= 80
                                    ? "#238636"
                                    : commitAnalysis.qualityScore >= 60
                                        ? "#d29922"
                                        : "#f85149",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
