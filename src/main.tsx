import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode by default
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

createRoot(document.getElementById("root")!).render(<App />);
