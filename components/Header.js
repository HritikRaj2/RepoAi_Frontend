"use client";

import { BarChart3, Github } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gh-border bg-gh-bg/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <BarChart3 className="h-7 w-7 text-gh-green transition-transform group-hover:scale-110" />
                            <div className="absolute -inset-1 bg-gh-green/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-lg font-bold text-gh-heading tracking-tight">
                            SmartRepo
                            <span className="text-gh-green ml-0.5">.</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-gh-muted hover:text-gh-heading transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
