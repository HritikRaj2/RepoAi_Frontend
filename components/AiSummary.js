"use client";

import { BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiSummary({ markdown }) {
    if (!markdown) {
        return (
            <div className="rounded-xl border border-gh-border bg-gh-card p-8 text-center">
                <BookOpen className="h-8 w-8 text-gh-muted mx-auto mb-3" />
                <p className="text-gh-muted">No AI summary available.</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gh-border bg-gh-card overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gh-border bg-gh-bg/50">
                <BookOpen className="h-4 w-4 text-gh-blue" />
                <h3 className="text-sm font-medium text-gh-heading">
                    AI Analysis Summary
                </h3>
            </div>

            <div className="p-6 markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}
