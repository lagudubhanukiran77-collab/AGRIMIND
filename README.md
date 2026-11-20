# AGRI-MIND
### AI-Powered Multilingual Agricultural Intelligence & Decision Support System

> **Tagline:** *Know Your Field. Predict the Risk. Protect Your Harvest.*  
> **Domain:** Agriculture + Artificial Intelligence + Machine Learning  
> **Initial Geographic Focus:** Andhra Pradesh and Telangana, India  
> **Supported Crops:** Paddy (వరి / धान), Chilli (మిరప / मिर्च), Cotton (పత్తి / कपास)  
> **Multilingual Support:** English, Telugu (తెలుగు), Hindi (हिन्दी) + Extensible Indian Language Architecture

---

## 🌾 Project Overview

**AGRI-MIND** is an enterprise-grade agricultural SaaS and decision support system designed for smallholder and commercial farmers, agricultural extension officers, and Farmer Producer Organizations (FPOs). The platform combines computer vision leaf diagnostics, soil N-P-K nutrient matching, hyperlocal 7-day meteorological forecasts, machine-learning yield projections, and a natural language agronomic assistant operating natively in Indian regional languages.

---

## 🎨 Design Philosophy & Tokens

Built with a restrained, clean, high-contrast palette adhering strictly to modern agricultural SaaS principles (no distracting glow animations, no unnecessary gradients, pure white cards, accessible contrast):

- **Primary:** Deep Forest Green (`#14532D`)
- **Secondary / Accent:** Fresh Green (`#22C55E`)
- **Background:** Soft Off-white (`#F8FAF8`)
- **Cards:** Pure White (`#FFFFFF`)
- **Text:** Dark Charcoal (`#17211B`)
- **Muted text:** Slate Grey (`#718078`)
- **Warning:** Soft Amber (`#F59E0B`)
- **Danger:** Muted Red (`#EF4444`)
- **Typography:** Inter (English), Noto Sans Telugu (తెలుగు), Noto Sans Devanagari (हिन्दी)
- **Icons:** Lucide React

---

## 🚀 The Five Major Screens

### 1. Screen 1 – Landing Page (`/`)
- Hero section with real agricultural imagery and subtle data visualization overlays.
- 6 Interactive Feature Modules:
  1. AI Crop Disease Detection
  2. Smart Crop Recommendation
  3. Weather Intelligence
  4. Soil Health Analysis
  5. Crop Yield Prediction
  6. Multilingual AI Assistant
- 4-step *How It Works* interactive workflow.
- Supported Crops showcase for Paddy, Chilli, and Cotton with regional cultivation seasons.
- Rural Impact section highlighting computer vision accuracy and multilingual accessibility.
- Comprehensive footer with disclaimer, KVK contact, and privacy links.

### 2. Screen 2 – Farmer Dashboard (`/dashboard`)
- Fixed sidebar navigation and top bar with global search, notifications, language switcher, and profile menu.
- Dynamic greetings: *"Good Morning, Farmer!"*
- **Farm Profile Card:** Editable farmer details (Name, Village/District, Land Area in Acres, Current Crop, Growth Stage, Sowing Date).
- **Key Metric Stat Cards:** Active Crops, Crop Risk Level, Weather Status, and Projected Yield with comparison deltas.
- **Hyperlocal Weather Card:** Current temperature, humidity, rainfall probability, wind speed, UV index, and 7-day weather outlook with field advisories.
- **Crop Health Card:** Vigor score, SPAD canopy chlorophyll meter, vegetative tillering milestones, and last analysis timestamps.
- **Risk Breakdown Card:** Multivariate indicators for weather threat, fungal pathogen risk, and crop stress.
- **Recent Farm Activity Log & Quick Action Tiles.**
- *Transparent demonstration badges clearly distinguishing sample benchmarks from live telemetry.*

### 3. Screen 3 – AI Crop Disease Detection (`/disease-detection`)
- **Left Panel:** Large drag-and-drop file upload zone (supporting JPG, JPEG, PNG up to 10MB) with image preview, crop selection pills, and removal controls.
- **1-Click Test Samples:** Instant verification samples for Paddy Blast, Chilli Leaf Curl Virus, Cotton Bacterial Blight, Healthy Crop, and Inconclusive/Blurry images.
- **Right Panel (AI Analysis Result):**
  - Predicted disease condition with localized Telugu and Hindi translations.
  - Model confidence percentage and disease classification category.
  - Severity assessment meter (Level 0 to 4) and visual lesion analysis breakdown.
  - Observed symptoms, contributing weather conditions, step-by-step next actions, and prevention guidelines.
  - *Inconclusive image fallback state when confidence is below 75%.*
  - Mandatory agricultural disclaimer emphasizing preliminary AI guidance.
- **Diagnostic History:** Auditable scan history log with thumbnail previews and severity badges.

### 4. Screen 4 – Agricultural Intelligence Suite (Dedicated Clean Routes & Unified Hub)
Each intelligence module has its own dedicated route and distinct page header, while sharing a synchronized suite tab switcher:
1. **Smart Crop Recommendation (`/crop-recommendation`):** Form capturing District, Soil Type, Soil pH, Nitrogen (N), Phosphorus (P), Potassium (K), Season, and Water availability. Computes ranked suitability scores with agronomic reasons and limitations.
2. **Weather Intelligence (`/weather-intelligence`):** 7-day temperature & precipitation probability chart using Recharts, humidity gauges, and weather risk threat indicators.
3. **Soil Health Analysis (`/soil-health`):** Visual pH scale meter (acidic to alkaline), N-P-K distribution bar chart comparing test results against regional benchmarks, and ICAR/ANGRAU fertilizer prescriptions.
4. **Crop Yield Prediction (`/yield-prediction`):** Machine learning harvest estimate based on acreage, sowing window, and previous crop rotations with 95% confidence intervals and feature attribution factors.
5. **Agricultural Risk Assessment & Reports (`/reports`):** Multi-factor risk breakdown across weather, pathogen pressure, soil conditions, and crop stress.
*(All accessible also via the unified `/intelligence` route).*

### 5. Screen 5 – Multilingual AI Assistant (`/assistant`)
- Dedicated conversational interface with past consultation session sidebar and New Conversation trigger.
- Message bubbles with structured agronomic responses:
  - **Direct Answer**
  - **Agronomic Explanation**
  - **Relevant Precautions**
  - **Suggested Next Steps**
  - **Scientific Source Reference (ICAR, ANGRAU, PJTSAU)**
- Real-time language switching: Interface labels and answers update into native Telugu or Hindi immediately.
- 5 Pre-configured quick inquiries for farmers (yellowing leaves, crop suitability, water scheduling, etc.).
- Speech-to-text placeholder for future regional voice integration.

### 6. Dedicated Farm & Settings Management
- **My Farm (`/my-farm`):** Cadastral farm records, Plot A (Paddy 4.0 Ac) & Plot B (Chilli 2.5 Ac) breakdown, irrigation solar pump telemetry, and upcoming milestones.
- **Settings (`/settings`):** Mother-tongue language switcher, live FastAPI backend health tester (`http://127.0.0.1:8000`), alert notification checkboxes, and zone preferences.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18, Vite 6
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS v3 with custom tokens
- **Data Visualization:** Recharts (Area, Bar, & Gradient Charts)
- **Icons:** Lucide React
- **API Client:** Axios
- **Backend Ready:** Python FastAPI Integration Layer (`/health`, `/api/crop/recommend`, `/api/disease/predict`, etc.)

---

## 📦 Project Structure

```text
├── backend/
│   ├── main.py                     # FastAPI backend reference server
│   └── requirements.txt            # Python dependencies (fastapi, uvicorn)
├── src/
│   ├── assets/                     # Graphic resources and icons
│   ├── components/
│   │   ├── common/                 # Reusable UI components
│   │   │   ├── AlertBanner.jsx     # Banners for demo status & alerts
│   │   │   ├── Badge.jsx           # Status & severity badges
│   │   │   ├── Card.jsx            # Standardized white card wrapper
│   │   │   ├── Footer.jsx          # Landing page footer
│   │   │   ├── LanguageSelector.jsx# EN / TE / HI selector
│   │   │   ├── LoadingSkeleton.jsx # Skeleton loaders
│   │   │   ├── Navbar.jsx          # Public navigation bar
│   │   │   ├── NotificationPanel.jsx# Farm alerts flyout dropdown
│   │   │   ├── StatCard.jsx        # Metric KPI cards
│   │   │   └── UserProfileMenu.jsx # Profile popup & quick switch
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx # App shell (Sidebar + TopNav)
│   │   │   ├── Sidebar.jsx         # Fixed responsive sidebar
│   │   │   └── TopNav.jsx          # Top navigation & search bar
│   │   ├── dashboard/              # Screen 2 widgets
│   │   │   ├── CropHealthCard.jsx  # Vigor and NDVI status
│   │   │   ├── FarmInfoCard.jsx    # Farm & grower profile
│   │   │   ├── QuickActions.jsx    # Action shortcut cards
│   │   │   ├── RecentActivity.jsx  # Activity audit trail
│   │   │   ├── RiskOverviewCard.jsx# Tri-factor risk overview
│   │   │   └── WeatherWidget.jsx   # 7-day weather strip
│   │   ├── disease/                # Screen 3 components
│   │   │   ├── AnalysisHistory.jsx # Previous leaf scan log
│   │   │   ├── DiseaseResultCard.jsx# Vision AI inference report
│   │   │   └── ImageUploader.jsx   # Drag-and-drop & sample selector
│   │   ├── intelligence/           # Screen 4 analytical tabs
│   │   │   ├── CropRecommendationTab.jsx
│   │   │   ├── RiskAssessmentTab.jsx
│   │   │   ├── SoilHealthTab.jsx
│   │   │   ├── WeatherIntelligenceTab.jsx
│   │   │   └── YieldPredictionTab.jsx
│   │   └── assistant/              # Screen 5 AI assistant
│   │       ├── ChatInput.jsx       # Input field & voice button
│   │       ├── ChatMessage.jsx     # Structured advisory bubbles
│   │       ├── ChatSidebar.jsx     # Previous conversations list
│   │       └── QuickQuestions.jsx  # Suggested prompt pills
│   ├── context/
│   │   ├── AuthContext.jsx         # Authentication & backend telemetry state
│   │   └── FarmContext.jsx         # Farm alerts & scan records
│   ├── i18n/
│   │   ├── LanguageContext.jsx     # Translation provider & hooks
│   │   └── translations.js         # Multilingual dictionaries (EN, TE, HI)
│   ├── pages/
│   │   ├── AgriculturalIntelligence.jsx
│   │   ├── Assistant.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DiseaseDetection.jsx
│   │   ├── Landing.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   └── api.js                  # Axios client with fallback demo simulation
│   ├── App.jsx                     # Application routes
│   ├── index.css                   # Tailwind directives & typography
│   └── main.jsx                    # React entry point
├── .env.example                    # Environment configuration template
├── package.json                    # Project dependencies
├── tailwind.config.js              # Theme customization
└── vite.config.js                  # Vite configuration & chunk splitting
```

---

## ⚡ Installation & Execution Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (v24 LTS verified)
- **npm:** v9.0.0 or higher
- *(Optional for live backend)* **Python:** 3.9+ with `pip`

---

### Step 1: Install Frontend Dependencies
From the project root:
```bash
npm install
```

---

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:3000
```

> **Note:** The frontend operates with an automatic demonstration simulation engine. When the FastAPI backend is offline, all 5 screens, forms, disease uploads, crop recommendation calculations, and multilingual AI assistant queries work reliably out of the box with realistic agronomic benchmarks.

---

### Step 3: Production Build & Preview
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

### Step 4 (Optional): Start FastAPI Backend
To run the live Python FastAPI backend alongside the frontend:

1. Open a new terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
4. Verify backend health:
   ```text
   http://127.0.0.1:8000/health
   ```
The frontend top navigation pill will automatically update from `Demo Mode` to `FastAPI Live` once connected.

---

## 🌐 Centralized Multilingual Architecture

AGRI-MIND implements an extensible i18n structure in `src/i18n/translations.js` and `LanguageContext.jsx`. The application does not simply translate menu names visually—it localizes:
- Full page descriptions and headers.
- Scientific crop names and seasonal designations.
- Disease names and symptom descriptions (e.g. *వరి అగ్గి తెగులు* / *మిరప ఆకు ముడుత*).
- AI assistant prompts and structured scientific responses.
- Validation messages and legal disclaimers.

To add another language (such as Marathi, Tamil, or Kannada):
1. Add the language metadata to `SUPPORTED_LANGUAGES` in `src/i18n/translations.js`.
2. Provide the corresponding dictionary key in `translations`.
3. The interface will automatically render the new language option in all dropdowns and selectors.

---

## 🔒 Security & Data Integrity

- Sample data is clearly tagged with `SAMPLE` and transparent disclaimer banners.
- Machine learning yield projections are explicitly designated as statistical estimates.
- Disease classifications feature agronomic disclaimers cautioning against uncertified pesticide application without local extension officer consultation.
"# AGRIMIND" 
