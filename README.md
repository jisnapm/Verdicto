# Verdicto – AI Legal Intelligence

Verdicto is a cutting-edge, AI-powered legal analysis platform specifically engineered for the Indian judicial landscape. By bridging the gap between complex legal statutes and everyday language, Verdicto provides instant, structured insights into criminal case descriptions.

## 🚀 Key Features

- **Advanced AI Reasoning**: Leverages **Google Gemini 1.5 & 2.0 Flash** models to perform deep semantic analysis of legal facts.
- **IPC & BNS Mapping**: Intelligent mapping of cases to both the **Indian Penal Code (IPC)** and the newly enacted **Bhartiya Nyaya Sanhita (BNS)**.
- **Predictive Legal Analytics**: Generates objective predictions for verdicts, punishment ranges, and identifies relevant judicial precedents.
- **Cloud-Native History**: Secure, per-user cloud storage and synchronization of case history via **Firebase Firestore**.
- **Cross-Platform Accessibility**: A seamless experience across **Web** and **Native Android** (via Capacitor).
- **Secure Authentication**: Enterprise-grade user identity management powered by **Firebase Auth**.

## 🛠️ Technical Architecture

Verdicto is built on a modern, serverless stack designed for high performance and scalability:

- **Frontend**: React 19, Tailwind CSS, TypeScript
- **Mobile Layer**: Capacitor.js (Native Android Bridge)
- **Intelligence**: Google Generative AI (LLM Integration)
- **Backend-as-a-Service**: Firebase (Auth, Firestore)

## ⚙️ System Methodology

The system employs a **Serverless 3-Layer Architecture**:

1.  **Presentation Layer**: A mobile-first React SPA optimized for low-latency interactions and high responsiveness.
2.  **Intelligence Layer**: A stateless orchestration layer that transforms natural language case inputs into structured JSON legal metadata using Large Language Models.
3.  **Data Layer**: A distributed cloud data layer that handles real-time synchronization and secure document isolation.

## 📦 Installation & Deployment

### 1. Web Environment
```bash
# Clone and install
git clone https://github.com/jisnapm/Verdicto.git
cd Verdicto
npm install

# Configuration
Create a .env.local file with VITE_GEMINI_API_KEY
Update services/firebase.ts with your Firebase credentials

# Start development server
npm run dev
```

### 2. Android Deployment
```bash
# Build web assets
npm run build

# Sync with Native Android project
npx cap sync

# Launch in Android Studio
npx cap open android
```

## ⚖️ Legal Disclaimer

Verdicto is an AI-powered intelligence tool intended for educational and research purposes only. The predictions and analyses provided by the AI do not constitute professional legal advice. Users should consult with a qualified legal professional for actual legal proceedings. Accuracy is subject to AI model limitations and data availability.

---
© 2025 Verdicto. Built with passion for the Indian Legal Community.
