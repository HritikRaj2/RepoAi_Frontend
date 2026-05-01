import "./globals.css";

export const metadata = {
    title: "SmartRepo Analyzer – AI-Powered GitHub Repository Health Dashboard",
    description:
        "Analyze any GitHub repository for security risks, code complexity, commit quality, and get AI-powered insights with SmartRepo Analyzer.",
    keywords: [
        "GitHub",
        "repository analysis",
        "code health",
        "security",
        "AI",
        "SmartRepo",
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans">{children}</body>
        </html>
    );
}
