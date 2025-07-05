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

// Функция отправки данных в Google Sheets
window.sendToGoogleSheet = async (data) => {
  try {
    if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL.includes("YOUR_WEB_APP_URL")) {
      return;
    }

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.text();
    alert("Данные успешно отправлены в Google Sheets!");

    const form = document.querySelector("form.registration-form");
    if (form) {
      form.reset();

      const phoneInput = form.querySelector("input[type='tel']");
      if (phoneInput) {
        const iti = window.intlTelInputGlobals.getInstance(phoneInput);
        if (iti) {
          iti.setNumber("");
        }
        const inputs = form.querySelectorAll("input");
        inputs.forEach((input) => input.setCustomValidity(""));
      }
    }
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    alert("Ошибка при отправке данных. Проверь консоль для деталей.");
  }
};