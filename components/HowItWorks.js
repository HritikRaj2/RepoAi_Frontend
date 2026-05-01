import { Cpu, FileCheck, Link2 } from "lucide-react";

const steps = [
    {
        icon: Link2,
        step: "1",
        title: "Paste URL",
        description: "Enter any public GitHub repository URL to start the analysis.",
    },
    {
        icon: Cpu,
        step: "2",
        title: "AI Analysis",
        description:
            "Our AI engine scans the codebase for security risks, complexity, and commit quality.",
    },
    {
        icon: FileCheck,
        step: "3",
        title: "Get Report",
        description:
            "View a comprehensive health dashboard with actionable insights and recommendations.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gh-heading mb-3">
                    How It Works
                </h2>
                <p className="text-gh-muted max-w-md mx-auto">
                    Three simple steps to a healthier codebase
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {steps.map((s, idx) => (
                    <div
                        key={s.step}
                        className="group relative rounded-xl border border-gh-border bg-gh-card p-6 text-center transition-all duration-300 hover:border-gh-green/40 hover:shadow-lg hover:shadow-gh-green/5"
                    >
                        {/* Connector line (desktop) */}
                        {idx < steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gh-border" />
                        )}

                        {/* Step number circle */}
                        <div className="relative mx-auto mb-4 h-14 w-14 rounded-full bg-gh-green/10 border-2 border-gh-green/30 flex items-center justify-center transition-all group-hover:bg-gh-green/20 group-hover:border-gh-green/60">
                            <s.icon className="h-6 w-6 text-gh-green" />
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gh-green text-[10px] font-bold text-white flex items-center justify-center">
                                {s.step}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gh-heading mb-2">
                            {s.title}
                        </h3>
                        <p className="text-sm text-gh-muted leading-relaxed">
                            {s.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
