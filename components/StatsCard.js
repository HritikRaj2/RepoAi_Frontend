export default function StatsCard({ icon: Icon, label, value, subtitle, color = "text-gh-green" }) {
    return (
        <div className="group relative rounded-xl border border-gh-border bg-gh-card p-5 transition-all duration-300 hover:border-gh-muted hover:shadow-lg hover:shadow-black/20">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gh-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-gh-muted uppercase tracking-wider">
                        {label}
                    </p>
                    <p className={`text-2xl font-bold ${color}`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gh-muted">{subtitle}</p>
                    )}
                </div>
                {Icon && (
                    <div className={`p-2.5 rounded-lg bg-gh-bg border border-gh-border ${color} transition-transform group-hover:scale-110`}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>
        </div>
    );
}
