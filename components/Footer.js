import { BarChart3 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-gh-border bg-gh-canvas mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gh-muted">
                        <BarChart3 className="h-4 w-4 text-gh-green" />
                        <span className="text-sm font-medium">SmartRepo Analyzer</span>
                    </div>
                    <p className="text-xs text-gh-muted">
                        AI-Powered Repository Health Analysis &middot; Built with Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
