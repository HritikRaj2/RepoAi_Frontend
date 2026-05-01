export function LoadingSpinner({ size = "md", text = "" }) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-2",
        lg: "h-12 w-12 border-3",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} border-gh-border border-t-gh-green rounded-full animate-spin`}
            />
            {text && (
                <p className="text-sm text-gh-muted animate-pulse">{text}</p>
            )}
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-gh-border bg-gh-card p-6 space-y-4">
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-8 w-1/2" />
            <div className="skeleton h-3 w-2/3" />
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="rounded-xl border border-gh-border bg-gh-card p-6">
            <div className="skeleton h-4 w-1/4 mb-6" />
            <div className="skeleton h-48 w-full" />
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header skeleton */}
            <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                    <div className="skeleton h-6 w-64" />
                    <div className="skeleton h-4 w-32" />
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Charts skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonChart key={i} />
                ))}
            </div>
        </div>
    );
}

export function AnalyzingState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative">
                <div className="h-20 w-20 border-4 border-gh-border border-t-gh-green rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 border-4 border-gh-border border-b-gh-blue rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gh-heading mt-8 mb-2">
                Analyzing Repository...
            </h3>
            <p className="text-gh-muted text-center max-w-md">
                Our AI is scanning the codebase for security issues, complexity patterns,
                and commit quality. This usually takes 30–90 seconds.
            </p>
            <div className="flex gap-1.5 mt-6">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-gh-green animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}
