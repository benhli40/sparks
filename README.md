# ⚡ Sparks – Micro Idea Collector

**Sparks** is a lightweight Progressive Web App (PWA) for capturing flashes of inspiration in 10 words or less. Designed for creatives on the move, it emphasizes simplicity, speed, and consistency.

---

## ✨ Features

- 📝 Add micro-ideas ("sparks") with 10-word limit
- 🔥 Auto-tagging with #🔥, #💡, and #💭
- 🧠 Daily spark limit (5 per day) to reduce overload
- 🔄 Streak tracker to build consistent creative habits
- 🎨 Theme switching (Light, Dark, Calm)
- 📅 Archive view organized by date
- 🧠 AI-style inspiration prompts based on your current spark
- 📱 Offline support (PWA-enabled and installable on mobile/desktop)
- 💾 LocalStorage-based persistence (no account needed)

---

## 🛠 Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- PWA with `manifest.json` and `service-worker.js`
- LocalStorage for data and meta tracking

---

## 🚀 Setup & Deployment

To run locally:

```bash
git clone https://github.com/your-username/sparks.git
cd sparks
open index.html

To deploy as a GitHub Page:

    Push your project to a GitHub repository

    Go to Settings > Pages

    Choose main branch and / (root) as source

    Access your PWA at https://your-username.github.io/sparks

📦 Folder Structure

sparks/
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   └── style.css
├── js/
│   ├── sparks.js
│   └── storage.js
├── assets/
│   └── icon-192.png
│   └── icon-512.png

🧩 Inspiration Tags

    #🔥 → Bold, intense, or disruptive

    #💡 → Ideas, inventions, improvements

    #💭 → Soft reflections or poetic musings

Use these hashtags in your spark to auto-assign visual tags!
📲 PWA Details

    Installable on Android, iOS, Desktop

    Offline usage supported

    App-like UI with manifest and service worker

👤 Author

Benjamin Liles
Built with focus, flow, and a little help from Echo (my assistant AI).
