
# Verdicto – AI Legal Intelligence

Verdicto is an AI-powered legal analysis platform designed specifically for the Indian judicial system. It allows users to input criminal case descriptions and receive structured legal opinions, including predicted IPC/BNS sections, potential verdicts, punishment ranges, and relevant precedents.

## 🚀 Features

- **AI-Powered Analysis**: Utilizes Google Gemini 1.5/2.0 series models to analyze case facts and map them to Indian law.
- **IPC & BNS Mapping**: Automatically identifies relevant sections of the Indian Penal Code and the new Bhartiya Nyaya Sanhita.
- **Cloud Synchronization**: Real-time synchronization of user profiles and case history using **Firebase Firestore**.
- **Secure Authentication**: User sign-up and login powered by **Firebase Auth**.
- **Cross-Platform**: Designed for the web and easily converted to a native Android app using **Capacitor**.
- **Modern UI**: A clean, material-inspired mobile interface built with **React** and **Tailwind CSS**.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router
- **AI Engine**: Google Gemini API (Generative AI SDK)
- **Backend**: Firebase Auth & Cloud Firestore
- **Mobile**: Capacitor (Native Android)
- **Language**: TypeScript

## ⚙️ Methodology & System Design

### Project Methodology
The development follows an **Agile Iterative Approach**:
1.  **Knowledge Acquisition**: Leverages Prompt Engineering to tap into Gemini's pre-trained knowledge of Indian law (IPC/BNS).
2.  **Hybrid Development**: Built using a Mobile-First Web approach for rapid prototyping and cross-platform flexibility.
3.  **Cloud Integration**: Integration of Firebase for persistent user identity and remote data storage.
4.  **Native Deployment**: Conversion of the web bundle into a native Android project via Capacitor.

### System Architecture
The system utilizes a **Serverless 3-Layer Architecture**:
- **Presentation Layer**: React-based UI components optimized for mobile viewports.
- **Intelligence Layer**: A stateless connection to Google Gemini API that processes natural language into structured JSON legal data.
- **Data Layer**: Firebase Auth for session management and Cloud Firestore for persistent storage of case history and user profiles.

## 📦 Installation & Setup

### Web Version
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/verdictoo.git
   cd verdictoo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Firebase Configuration**:
   Update `services/firebase.ts` with your Firebase project credentials.

5. **Run the App**:
   ```bash
   npm run dev
   ```

### Android Version
1. **Build the web project**:
   ```bash
   npm run build
   ```

2. **Sync with Android**:
   ```bash
   npx cap sync
   ```

3. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

4. **Run**: Use the green play button in Android Studio to launch the app on an emulator or physical device.

## ⚖️ Legal Disclaimer

Verdicto is an AI-powered intelligence tool intended for educational and research purposes only. The predictions and analyses provided by the AI do not constitute professional legal advice. Users should consult with a qualified legal professional for actual legal proceedings.

---
Built with ❤️ for the Indian Legal Community.
