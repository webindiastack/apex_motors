# 🚗 Apex Motors | Luxury & Performance Vehicle Marketplace

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-4F46E5?style=for-the-badge&logo=github)](https://webindiastack.github.io/apex_motors/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

An interactive, state-of-the-art web application for browsing certified luxury, performance, and electric vehicles. Built with modern web standards, sleek glassmorphism aesthetic, dynamic filtering, interactive modals, and automated CI/CD deployment via GitHub Actions.

---

## ✨ Features

- 🏎️ **Vehicle Showcase & Search**: Filter inventory by Make, Body Type, Fuel Type, Transmission, Max Price, and Max Mileage with real-time dynamic search.
- 📑 **Comprehensive Specs & Gallery**: Detailed vehicle view featuring high-res imagery, technical specifications, and key features.
- 🧮 **Trade-In & Test Drive Calculator**: Interactive forms for scheduling test drives and requesting trade-in estimates.
- 💖 **Favorites Drawer**: Save vehicles of interest with client-side persistence via `localStorage`.
- ⚙️ **Admin Dashboard**: Manage vehicle listings and review customer inquiries directly from an integrated administrative panel.
- 🚀 **Automated CI/CD**: Seamless GitHub Actions workflow for automatic builds and deployment to GitHub Pages.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS
- **Iconography**: [Lucide React](https://lucide.dev/)
- **CI/CD & Hosting**: GitHub Actions & GitHub Pages

---

## 🚀 Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/webindiastack/apex_motors.git
   cd apex_motors
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build & Deployment

### Local Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

### GitHub Pages Deployment

Deployment is **100% automated**. Pushing code to the `master` branch triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which automatically builds and publishes the latest version to GitHub Pages:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

Live Site URL: **[https://webindiastack.github.io/apex_motors/](https://webindiastack.github.io/apex_motors/)**

---

## 📄 License

This project is licensed under the MIT License - feel free to customize and expand for your own applications.
