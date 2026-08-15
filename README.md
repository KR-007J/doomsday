# ACOUSTIC SHIELD — Covert Near-Ultrasonic Threat Detection Engine

[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Backend Agnostic](https://img.shields.io/badge/Backend-100%25%20Agnostic-10B981?style=for-the-badge)](https://github.com/KR-007J/doomsday)

A production-grade, hyper-interactive **Cybersecurity Operations Center (SOC) Dashboard** for detecting, analyzing, and logging **covert acoustic & near-ultrasonic communication channels** (16,000 Hz — 24,000 Hz).

---

## 💡 System Overview & Architecture

Covert acoustic malware can exfiltrate sensitive data across air-gapped systems utilizing high-frequency near-ultrasonic subcarrier frequencies (18kHz–24kHz) transmitted between isolated microphones and speakers.

**Acoustic Shield** provides an interactive operations platform to:
1. Sample 24-bit 96kHz PCM FFT spectral streams in real time.
2. Formally model detection progression via a 5-State Threat Machine.
3. Visualize live frequency spectra & 2D waterfall FFT spectrograms.
4. Simulate FSK acoustic subcarrier packet exfiltration in an interactive Attack Laboratory.
5. Log verified covert channels into an incident audit log.

---

## 🛠 Technology Stack

- **Core**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS (Custom Obsidian & Electric Purple Dark Theme)
- **State Machine & Global State**: Zustand + Typed State Reducer
- **Data Validation**: Zod runtime schema validation
- **3D Particle Field & GPU Dynamics**: Three.js + React Three Fiber + Drei
- **Real-Time Visualizations**: HTML Canvas `requestAnimationFrame` Waterfall Spectrogram + Recharts Spectrum Chart
- **Motion & Interactions**: Framer Motion spring physics + Lenis inertia scrolling + Magnetic cursor hooks
- **Performance Guardrail**: Dynamic FPS monitoring with automatic **Safe Demo Mode** CSS fallback

---

## 📡 Threat State Machine Architecture

Every detection follows an explicit 5-state progression sequence:

```
[ SAFE ] ──► [ SIGNAL DETECTED ] ──► [ ANALYZING ] ──► [ POTENTIAL COVERT COMM ] ──► [ THREAT LOGGED ]
```

| State | Status | Risk Level | Description |
| :--- | :--- | :--- | :--- |
| **`SAFE`** | System Safe | `LOW` | Ambient acoustic spectrum. No subcarrier anomaly. |
| **`SIGNAL_DETECTED`** | Signal Detected | `LOW` | Ultrasonic wave envelope anomaly (19.5k–21.2kHz). |
| **`ANALYZING`** | Spectrum Analysis | `MEDIUM` | Running 512-point FFT & constellation feature extraction. |
| **`POTENTIAL_COVERT_COMMUNICATION`** | Potential Covert Comm | `HIGH` | High-probability subcarrier FSK constellation identified. |
| **`THREAT_LOGGED`** | Incident Logged | `HIGH` | Covert channel registered in incident log. |

---

## 🔌 Backend-Agnostic Service Layer

The frontend is **100% backend-agnostic**. All network requests pass through a unified service interface (`src/services/threatService.ts`). Changing one environment variable toggles between synthetic mock generators and a live REST/WebSocket backend:

```env
# Set to 'true' for standalone mock demo (No backend required)
# Set to 'false' to connect to live Python FastAPI / Node backend
VITE_USE_MOCK_DATA=true

# Live Backend Base URL
VITE_API_BASE_URL=http://localhost:8000/api

# Live WebSocket Stream URL
VITE_WS_URL=ws://localhost:8000/ws

# Bypasses auth login screen
VITE_DEMO_BYPASS_AUTH=true
```

---

## 📋 REST API & WebSocket Contract

When connecting a real backend (Python/FastAPI/Flask/Node), implement these exact JSON endpoints:

### 1. `GET /api/system-status`
```json
{
  "online": true,
  "activeSensors": 8,
  "samplingRate": 96000,
  "currentNoiseFloor": -82.4,
  "totalThreatsToday": 14,
  "lastEventTime": "2026-08-15T18:50:00Z"
}
```

### 2. `GET /api/threats`
```json
[
  {
    "id": "TRT-2026-8801",
    "timestamp": "2026-08-15T18:40:00Z",
    "detected": true,
    "confidence": 0.94,
    "risk": "HIGH",
    "frequency": { "min": 19200, "max": 21400 },
    "peakFrequency": 20450,
    "amplitude": -34.2,
    "duration": 3.8,
    "pattern": "FSK-Ultrasonic (Sub-carrier 20.45kHz)",
    "payloadSummary": "Exfiltration Header [0x41 0x53 0x48 0x44]",
    "locationNode": "SOC-Node-Alpha (Mic Array 02)"
  }
]
```

### 3. `POST /api/analyze`
**Request Body**:
```json
{
  "payload": "ACOUSTIC_SECRET_TOKEN",
  "encodingType": "TEXT",
  "frequencyMin": 19500,
  "frequencyMax": 21500,
  "duration": 4.0,
  "powerLevel": 85
}
```

---

## 🚀 Quick Start Guide (Installation & Running)

### Prerequisites
- **Node.js** v18+ or v20+
- **NPM** v9+ or **PNPM** / **Yarn**

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/KR-007J/doomsday.git
cd doomsday

# Install NPM dependencies
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 🔗 How to Merge & Integrate with Backend Repo

If your team is working with a separate backend repository (e.g. `doomsday-backend`):

1. **Copy Frontend Directory into Main Monorepo** or keep as standalone frontend repo.
2. In `.env`, configure `VITE_USE_MOCK_DATA=false` and set `VITE_API_BASE_URL=http://<your-backend-ip>:8000/api`.
3. Launch backend server (e.g. `uvicorn main:app --reload --port 8000`).
4. Launch frontend dev server (`npm run dev`).
5. All endpoints will automatically route live data into the dashboard!

---

Project built for SIH 2026
