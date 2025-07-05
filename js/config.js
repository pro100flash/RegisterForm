// Конфигурация: URL Web App для Google Sheets
// Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwpYvRv4SkWUFA6Ppw4dNPd5cuVVfHmAFUXT_W5CZqFv_mleTvu2l6Nw5-ECQE3ZPC9DA/exec";

// Проверка конфигурации
if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
  console.error("URL не настроен. Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!");
  alert("Ошибка: URL Google Sheets не настроен!");
  throw new Error("Конфигурация URL не завершена");
}
