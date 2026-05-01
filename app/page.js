"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import { AnalyzingState } from "@/components/LoadingSpinner";
import { analyzeRepo, getResult } from "@/lib/api";
import {
    AlertCircle,
    ArrowRight,
    GitBranch,
    GitCommitHorizontal,
    Search,
    Shield,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const features = [
    {
        icon: Shield,
        title: "Security Analysis",
        description:
            "Detect security smells, vulnerable patterns, and potential attack surfaces in your codebase.",
        color: "text-gh-red",
        bg: "bg-gh-red/10",
        border: "border-gh-red/20",
    },
    {
        icon: GitBranch,
        title: "Complexity Metrics",
        description:
            "Measure code complexity scores per file and identify areas that need refactoring.",
        color: "text-gh-yellow",
        bg: "bg-gh-yellow/10",
        border: "border-gh-yellow/20",
    },
    {
        icon: GitCommitHorizontal,
        title: "Commit Quality",
        description:
            "Evaluate commit message quality, commit frequency, and development patterns.",
        color: "text-gh-blue",
        bg: "bg-gh-blue/10",
        border: "border-gh-blue/20",
    },
    {
        icon: Sparkles,
        title: "AI Insights",
        description:
            "Get an AI-generated summary with actionable recommendations to improve repository health.",
        color: "text-gh-green",
        bg: "bg-gh-green/10",
        border: "border-gh-green/20",
    },
];

export default function HomePage() {
    const router = useRouter();
    const [repoUrl, setRepoUrl] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState("");

    async function handleAnalyze(e) {
        e.preventDefault();
        setError("");

        const trimmed = repoUrl.trim();
        if (!trimmed) {
            setError("Please enter a GitHub repository URL.");
            return;
        }

        // Basic URL validation
        const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i;
        if (!githubPattern.test(trimmed)) {
            setError("Please enter a valid GitHub repository URL (e.g. https://github.com/owner/repo).");
            return;
        }

        setIsAnalyzing(true);
        try {
            // Start analysis
            const analyzeResult = await analyzeRepo(trimmed);

            // If cached result returned directly, redirect immediately
            if (analyzeResult && analyzeResult.status === "COMPLETE" && analyzeResult.analysisId) {
                router.push(`/report/${analyzeResult.analysisId}`);
                return;
            }

            // Poll for result every 3 seconds
            const poll = async () => {
                const maxAttempts = 120; // 6 minute timeout
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                    await new Promise((r) => setTimeout(r, 3000));
                    try {
                        const result = await getResult(trimmed);
                        // Backend returns status "COMPLETE" and "analysisId"
                        if (result && result.status === "COMPLETE" && result.analysisId) {
                            router.push(`/report/${result.analysisId}`);
                            return;
                        }
                    } catch {
                        // Ignore polling errors and retry
                    }
                }
                throw new Error("Analysis timed out. Please try again.");
            };

            await poll();
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
            setIsAnalyzing(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
                {isAnalyzing ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnalyzingState />
                    </div>
                ) : (
                    <>
                        {/* ── Hero Section ──────────── */}
                        <section className="relative overflow-hidden">
                            {/* Background glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gh-green/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-gh-green/10 border border-gh-green/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
                                    <Sparkles className="h-3.5 w-3.5 text-gh-green" />
                                    <span className="text-xs font-medium text-gh-green">
                                        AI-Powered Analysis
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gh-heading leading-tight mb-6 animate-slide-up">
                                    SmartRepo Analyzer
                                    <br />
                                    <span className="bg-gradient-to-r from-gh-green via-gh-blue to-gh-green bg-clip-text text-transparent">
                                        GitHub Repository Health
                                    </span>
                                </h1>

                                <p className="text-lg text-gh-muted max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                                    Analyze any GitHub repository for security risks, code
                                    complexity, commit quality, and get AI-powered insights — all
                                    in one beautiful dashboard.
                                </p>

                                {/* ── Input Form ──────────── */}
                                <form
                                    onSubmit={handleAnalyze}
                                    className="max-w-2xl mx-auto animate-slide-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gh-muted" />
                                            <input
                                                id="repo-url-input"
                                                type="text"
                                                value={repoUrl}
                                                onChange={(e) => {
                                                    setRepoUrl(e.target.value);
                                                    setError("");
                                                }}
                                                placeholder="https://github.com/owner/repo"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gh-card border border-gh-border rounded-xl text-gh-heading placeholder:text-gh-muted/60 focus:outline-none focus:ring-2 focus:ring-gh-green/50 focus:border-gh-green/50 transition-all text-sm"
                                            />
                                        </div>
                                        <button
                                            id="analyze-btn"
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 bg-gh-green hover:bg-gh-green/90 text-white font-semibold rounded-xl px-6 py-3.5 transition-all hover:shadow-lg hover:shadow-gh-green/20 active:scale-[0.98] text-sm"
                                        >
                                            Analyze Repository
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 mt-3 text-gh-red text-sm animate-slide-down">
                                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </section>

                        {/* ── How It Works ──────────── */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <HowItWorks />
                        </div>

                        {/* ── Features ──────────────── */}
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gh-heading mb-3">
                                    Comprehensive Analysis
                                </h2>
                                <p className="text-gh-muted max-w-md mx-auto">
                                    Everything you need to understand your repository health
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {features.map((f) => (
                                    <div
                                        key={f.title}
                                        className={`group rounded-xl border ${f.border} ${f.bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                                    >
                                        <div className={`inline-flex p-2.5 rounded-lg ${f.bg} mb-4`}>
                                            <f.icon className={`h-6 w-6 ${f.color}`} />
                                        </div>
                                        <h3 className="text-base font-semibold text-gh-heading mb-2">
                                            {f.title}
                                        </h3>
                                        <p className="text-sm text-gh-muted leading-relaxed">
                                            {f.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
