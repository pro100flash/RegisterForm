// Конфигурация: URL Web App для Google Sheets
// Замени YOUR_WEB_APP_URL на реальный URL перед деплоем (например, https://script.google.com/macros/s/XYZ789/exec)
// Не коммить этот файл с реальным URL в публичный репозиторий!
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwzRRVhdQ7fO5dCNCi5H4gSdaxxFH5L1O13_0Z613Dp63fkFsj_Obsmgg9fxaon_Jhp2g/exec";

// Проверка конфигурации
if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
  console.error("URL не настроен. Замени YOUR_WEB_APP_URL на реальный URL перед деплоем!");
  alert("Ошибка: URL Google Sheets не настроен!");
  throw new Error("Конфигурация URL не завершена");
}

// Функция отправки данных в Google Sheets с отладкой
window.sendToGoogleSheet = async (data) => {
  try {
    // Проверка URL перед запросом
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
      return;
    }

    console.log("Отправка данных на URL:", GOOGLE_SHEET_URL); // Лог для отладки
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ошибка! Статус: ${response.status} - ${response.statusText}`);
    }

    const result = await response.text();
    console.log("Ответ от сервера:", result); // Лог ответа
    alert("Данные успешно отправлены в Google Sheets!");

    const form = document.querySelector(".registration-form"); // Улучшена селекция
    if (form) {
      form.reset();

      const phoneInput = form.querySelector("input[type='tel']");
      if (phoneInput) {
        const iti = window.intlTelInputGlobals.getInstance(phoneInput);
        iti?.setNumber(""); // Используем опциональную цепочку
      }

      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => input.setCustomValidity(""));
    }
  } catch (error) {
    console.error("Ошибка при отправке данных:", error.message);
    alert(`Ошибка при отправке данных: ${error.message}. Проверь консоль для деталей.`);
  }
};