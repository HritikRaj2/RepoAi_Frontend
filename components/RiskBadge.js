const riskConfig = {
    LOW: {
        bg: "bg-gh-green/15",
        text: "text-gh-green",
        border: "border-gh-green/30",
        dot: "bg-gh-green",
    },
    MEDIUM: {
        bg: "bg-gh-yellow/15",
        text: "text-gh-yellow",
        border: "border-gh-yellow/30",
        dot: "bg-gh-yellow",
    },
    HIGH: {
        bg: "bg-gh-red/15",
        text: "text-gh-red",
        border: "border-gh-red/30",
        dot: "bg-gh-red",
    },
};

export default function RiskBadge({ level, size = "md" }) {
    const config = riskConfig[level] || riskConfig.LOW;

    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} transition-all hover:scale-105`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {level}
        </span>
    );
}
