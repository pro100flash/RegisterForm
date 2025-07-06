// config.js
// Конфигурация: URL Web App для Google Sheets
// Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxGtBuk1G5l8tsJ1yR5KmM6lGycLUwUD2xGMi2ai4n2EXhkF2IrzGF_4Gc1E8eBhkVpIw/exec";

// Проверка конфигурации
if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
  console.error(
    "URL не настроен. Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!"
  );
  alert("Ошибка: URL Google Sheets не настроен!");
  throw new Error("Конфигурация URL не завершена");
}
