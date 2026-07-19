# Stadium Pulse 🏟️

> Crowd-sourced stadium intelligence for FIFA World Cup 2026.  
> Fans as sensors. Gemini AI as the synthesizer.

**Live App:** [your-vercel-url]  
**Built for:** PromptWars Virtual Challenge 4 - Google for Developers × Hack2Skill  
**Built with:** Google Antigravity

---

## Chosen Vertical
Stadium Operations & Fan Experience - covering all 8 parameters:
Navigation, Crowd Management, Accessibility, Transportation, 
Sustainability, Multilingual Assistance, Operational Intelligence, 
Real-time Decision Support.

---

## The Problem
70,000 fans. One stadium. Gate C is 4 minutes from a crowd crush.  
Security has no idea. Staff are reacting to crises instead of 
preventing them.

Every existing AI stadium tool does the same thing: you ask a 
question, it answers. That's a search engine with extra steps.

---

## The Approach
**One mechanism. Eight problems solved.**

Fans tap to report real conditions (crowded gate, blocked ramp, 
shuttle delay, etc). Gemini 2.5 Flash reads every signal, 
classifies severity, and pushes the right alert to the right 
person in their language - automatically.


```bash
FAN REPORT
│
▼
┌─────────────────────────┐
│   Gemini 2.5 Flash      │
│   • Classify severity   │
│   • Generate fan alert  │
│   • Generate staff action│
│   • Detect category     │
└─────────────────────────┘
│
├──► Fan View (alert in their language)
├──► Staff Dashboard (ranked incident + action)
└──► AI Monitor (full pipeline log)
```

---

## How It Works

**Fan View** : Live SVG stadium heatmap showing zone congestion 
in real time. Fans tap one of 8 report types, select a zone, 
submit. Gemini fires immediately.

**AI Monitor** : Full transparency view showing every Gemini 
prompt sent and structured JSON response received. Judges and 
admins can see exactly what the AI is doing.

**Staff Dashboard** : Live ranked incident feed with 
AI-pre-generated suggested actions per incident. One tap to 
resolve.

**Simulation Loop** : Auto-generates realistic fan reports 
every 8-12 seconds so the platform feels live even without 
real users.

---

## Languages Supported
| Code | Language |
|------|----------|
| EN | English |
| HI | Hindi |
| ES | Spanish |
| AR | Arabic (RTL) |
| CG | Chhattisgarhi : छत्तीसगढ़ी |

Chhattisgarhi is spoken by 18 million people in central India.  
Stadium Pulse may be the first global hackathon tool to include it.

---

## Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **AI:** Gemini 3.1 Flash Lite (Google AI Studio)
- **Built with:** Google Antigravity
- **Deployment:** Vercel
- **Icons:** Lucide React

---

## Assumptions
- No real sensor infrastructure assumed , fan reports replace IoT
- Demo uses seeded data + simulation loop to represent live activity
- API key must be set in environment variables (never hardcoded)

---

## Setup

```bash
git clone https://github.com/Arachnodev-AYUSHMAN1617/stadium-pulse
cd stadium-pulse
npm install
```

Create `.env`:

```bash
VITE_GEMINI_API_KEY=your_key_here
```

```bash
npm run dev
```

---

## Security
- API key loaded from environment variables only
- Key never committed to repository (.gitignore enforced)
- No user data stored or transmitted beyond Gemini API calls

---

*Jai Johar!🌾 - Built by AYUSHMAN SHARMA, Chhattisgarh, India*