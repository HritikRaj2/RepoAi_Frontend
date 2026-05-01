<<<<<<< HEAD
# SmartRepo Analyzer – Frontend

**AI-Powered GitHub Repository Health Dashboard**

A modern, GitHub-inspired dark-mode dashboard built with Next.js 14 that analyzes any public GitHub repository for security risks, code complexity, commit quality, and provides AI-powered insights.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14+** | React framework with App Router |
| **Tailwind CSS** | Utility-first CSS with custom GitHub dark theme |
| **Recharts** | Charts and visualizations |
| **react-markdown** | Render AI-generated markdown summaries |
| **remark-gfm** | GitHub Flavored Markdown support |
| **lucide-react** | Icons |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** installed

### Installation

```bash
# Clone and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local
```

### Configuration

Edit `.env.local` to point to your backend API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
```

### Running

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles + Tailwind + markdown prose
│   ├── layout.js            # Root layout with Inter font
│   ├── page.js              # Home page (hero, input, features)
│   └── report/
│       └── [id]/
│           └── page.js      # Report dashboard page
├── components/
│   ├── Header.js            # Sticky navbar
│   ├── Footer.js            # Footer
│   ├── LoadingSpinner.js    # Spinner, skeletons, analyzing state
│   ├── RiskBadge.js         # Colored risk level badge
│   ├── StatsCard.js         # Stat card with icon
│   ├── HowItWorks.js        # 3-step explainer section
│   ├── HealthGauge.js       # Radial gauge chart (health score)
│   ├── RiskDistributionChart.js  # Pie chart (risk distribution)
│   ├── CommitQualityChart.js     # Donut chart (commit quality)
│   ├── FileRiskChart.js     # Bar chart (top 10 risky files)
│   ├── AiSummary.js         # Markdown renderer for AI summary
│   ├── FileRiskTable.js     # Sortable file analysis table
│   └── CommitDetails.js     # Commit analysis panel
├── lib/
│   └── api.js               # API service (fetch wrapper)
├── .env.local.example       # Environment variable template
├── tailwind.config.js       # Custom GitHub dark theme
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

---

## Backend API

The frontend connects to a backend at `NEXT_PUBLIC_API_URL`:

| Endpoint | Method | Description |
|---|---|---|
| `/api/public/analyze` | POST | Start analysis (`{ "repoUrl": "..." }`) |
| `/api/public/result?repoUrl=...` | GET | Poll for analysis result/status |
| `/api/public/report/{id}` | GET | Get full analysis report |

No authentication is required.

---

## License

MIT
=======
# SmartRepo Analyzer - Frontend

AI-Powered GitHub Repository Health Analysis Dashboard

## Setup
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
>>>>>>> 63a8e5cf10a3a90deda9b6c794d223f8c8a5de6c
