"use client";

import AiSummary from "@/components/AiSummary";
import CommitDetails from "@/components/CommitDetails";
import CommitQualityChart from "@/components/CommitQualityChart";
import FileRiskChart from "@/components/FileRiskChart";
import FileRiskTable from "@/components/FileRiskTable";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HealthGauge from "@/components/HealthGauge";
import { DashboardSkeleton } from "@/components/LoadingSpinner";
import RiskBadge from "@/components/RiskBadge";
import RiskDistributionChart from "@/components/RiskDistributionChart";
import StatsCard from "@/components/StatsCard";
import { getReport } from "@/lib/api";
import {
    AlertCircle,
    ArrowLeft,
    FileCode2,
    GitCommitHorizontal,
    Heart,
    RefreshCw,
    ShieldAlert,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
    const { id } = useParams();
    const router = useRouter();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchReport() {
            try {
                setLoading(true);
                setError("");
                const data = await getReport(id);
                setReport(data);
            } catch (err) {
                setError(err.message || "Failed to load report.");
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchReport();
    }, [id]);

    // Extract repo name from URL
    function getRepoName(url) {
        try {
            const parts = url.replace(/\/+$/, "").split("/");
            return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
        } catch {
            return url;
        }
    }

    // Calculate total security smells
    function getTotalSecuritySmells(files) {
        return files.reduce((sum, f) => sum + (f.securitySmells || 0), 0);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Back button */}
                <button
                    id="back-btn"
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-1.5 text-sm text-gh-muted hover:text-gh-heading transition-colors mb-6 group"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </button>

                {/* Loading State */}
                {loading && <DashboardSkeleton />}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                        <div className="p-4 rounded-full bg-gh-red/10 mb-4">
                            <AlertCircle className="h-8 w-8 text-gh-red" />
                        </div>
                        <h3 className="text-xl font-semibold text-gh-heading mb-2">
                            Failed to Load Report
                        </h3>
                        <p className="text-gh-muted text-center mb-6 max-w-md">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 bg-gh-card border border-gh-border hover:border-gh-muted text-gh-heading rounded-lg px-4 py-2 text-sm transition-all"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Retry
                        </button>
                    </div>
                )}

                {/* Report Dashboard */}
                {report && !loading && (
                    <div className="space-y-8 animate-fade-in">
                        {/* ── Dashboard Header ──────── */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gh-heading flex items-center gap-3 flex-wrap">
                                    {getRepoName(report.overview.repoUrl)}
                                    <RiskBadge level={report.overview.riskLevel} size="lg" />
                                </h1>
                                <a
                                    href={report.overview.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gh-blue hover:underline mt-1 inline-block"
                                >
                                    {report.overview.repoUrl}
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-xs text-gh-muted">Health Score</p>
                                    <p
                                        className="text-3xl font-bold"
                                        style={{
                                            color:
                                                report.overview.healthScore >= 80
                                                    ? "#238636"
                                                    : report.overview.healthScore >= 60
                                                        ? "#d29922"
                                                        : "#f85149",
                                        }}
                                    >
                                        {report.overview.healthScore}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Stats Cards ──────────── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard
                                icon={Heart}
                                label="Health Score"
                                value={`${report.overview.healthScore}/100`}
                                subtitle={
                                    report.overview.healthScore >= 80
                                        ? "Excellent health"
                                        : report.overview.healthScore >= 60
                                            ? "Good health"
                                            : "Needs improvement"
                                }
                                color={
                                    report.overview.healthScore >= 80
                                        ? "text-gh-green"
                                        : report.overview.healthScore >= 60
                                            ? "text-gh-yellow"
                                            : "text-gh-red"
                                }
                            />
                            <StatsCard
                                icon={FileCode2}
                                label="Total Files"
                                value={report.fileAnalysis.totalFiles}
                                subtitle={`${report.fileAnalysis.highRiskFiles} high risk`}
                                color="text-gh-blue"
                            />
                            <StatsCard
                                icon={ShieldAlert}
                                label="Security Smells"
                                value={getTotalSecuritySmells(report.fileAnalysis.files)}
                                subtitle="Across all files"
                                color={
                                    getTotalSecuritySmells(report.fileAnalysis.files) > 0
                                        ? "text-gh-red"
                                        : "text-gh-green"
                                }
                            />
                            <StatsCard
                                icon={GitCommitHorizontal}
                                label="Commit Quality"
                                value={`${report.commitAnalysis.qualityScore}%`}
                                subtitle={`${report.commitAnalysis.totalCommits} total commits`}
                                color={
                                    report.commitAnalysis.qualityScore >= 80
                                        ? "text-gh-green"
                                        : report.commitAnalysis.qualityScore >= 60
                                            ? "text-gh-yellow"
                                            : "text-gh-red"
                                }
                            />
                        </div>

                        {/* ── Charts Grid ──────────── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <HealthGauge score={report.overview.healthScore} />
                            <RiskDistributionChart fileAnalysis={report.fileAnalysis} />
                            <CommitQualityChart commitAnalysis={report.commitAnalysis} />
                            <FileRiskChart files={report.fileAnalysis.files} />
                        </div>

                        {/* ── AI Summary ───────────── */}
                        <AiSummary markdown={report.overview.aiSummary} />

                        {/* ── File Risk Table ──────── */}
                        <FileRiskTable files={report.fileAnalysis.files} />

                        {/* ── Commit Details ────────── */}
                        <CommitDetails commitAnalysis={report.commitAnalysis} />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
