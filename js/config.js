// Конфигурация: URL Web App для Google Sheets
// Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwzRRVhdQ7fO5dCNCi5H4gSdaxxFH5L1O13_0Z613Dp63fkFsj_Obsmgg9fxaon_Jhp2g/exec";

// Проверка конфигурации
if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
  console.error("URL не настроен. Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!");
  alert("Ошибка: URL Google Sheets не настроен!");
  throw new Error("Конфигурация URL не завершена");
}
