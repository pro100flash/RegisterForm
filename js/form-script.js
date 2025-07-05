document.addEventListener("DOMContentLoaded", function () {
  // Находим все формы на странице
  const forms = document.querySelectorAll("form.registration-form");

  forms.forEach((form) => {
    const phoneInput = form.querySelector("input[type='tel']");
    const firstNameInput = form.querySelector("input[name='firstName']");
    const lastNameInput = form.querySelector("input[name='lastName']");
    const emailInput = form.querySelector("input[name='email']");

    // Инициализируем intl-tel-input
    const iti = window.intlTelInput(phoneInput, {
      initialCountry: "ua",
      preferredCountries: ["ru", "ua", "pl", "us"],
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js",
    });

    // Функция валидации поля (Имя/Фамилия)
    function validateName(input, fieldName) {
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
      if (!input.value) {
        input.setCustomValidity(`${fieldName} обязательно`);
      } else if (input.value.length < 2) {
        input.setCustomValidity(`${fieldName} должно быть не короче 2 символов`);
      } else if (!nameRegex.test(input.value)) {
        input.setCustomValidity(`${fieldName} должно содержать только буквы`);
      } else {
        input.setCustomValidity(""); // Очищаем ошибку
      }
    }

    // Валидация при вводе (для показа тултипов в реальном времени)
    firstNameInput.addEventListener("input", () => validateName(firstNameInput, "Имя"));
    lastNameInput.addEventListener("input", () => validateName(lastNameInput, "Фамилия"));

    // Валидация email при вводе
    emailInput.addEventListener("input", () => {
      if (!emailInput.value) {
        emailInput.setCustomValidity("Email обязателен");
      } else if (!emailInput.checkValidity()) {
        emailInput.setCustomValidity("Введите корректный email");
      } else {
        emailInput.setCustomValidity("");
      }
    });

    // Валидация телефона при вводе
    phoneInput.addEventListener("input", () => {
      if (!iti.isValidNumber()) {
        phoneInput.setCustomValidity("Введите корректный номер телефона");
      } else {
        phoneInput.setCustomValidity("");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Отменяем стандартную отправку

      // Явная валидация всех полей
      validateName(firstNameInput, "Имя");
      validateName(lastNameInput, "Фамилия");

      if (!emailInput.value) {
        emailInput.setCustomValidity("Email обязателен");
      } else if (!emailInput.checkValidity()) {
        emailInput.setCustomValidity("Введите корректный email");
      } else {
        emailInput.setCustomValidity("");
      }

      if (!iti.isValidNumber()) {
        phoneInput.setCustomValidity("Введите корректный номер телефона");
      } else {
        phoneInput.setCustomValidity("");
      }

      // Проверка валидности формы
      if (!form.checkValidity()) {
        form.reportValidity(); // Показываем браузерные тултипы
        return;
      }

      // Получаем форматированный номер телефона
      const phoneNumber = iti.getNumber();

      // Собираем данные формы
      const data = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: phoneNumber,
      };

      // Получаем URL Google Sheets из атрибута формы
      const sheetUrl = form.dataset.sheetUrl;

      if (sheetUrl) {
        // Отправляем данные в Google Sheets
        fetch(sheetUrl, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.text())
          .then(() => {
            alert("Данные успешно отправлены в Google Sheets!");
            form.reset();
            iti.setNumber(""); // Сбрасываем поле телефона
            // Очищаем сообщения об ошибках
            firstNameInput.setCustomValidity("");
            lastNameInput.setCustomValidity("");
            emailInput.setCustomValidity("");
            phoneInput.setCustomValidity("");
          })
          .catch((err) => {
            console.error(err);
            alert("Ошибка при отправке данных");
          });
      } else {
        // Если URL не указан, показываем данные в консоли
        console.log("Данные формы:", data);
        alert("Форма валидна, но URL Google Sheets не указан!");
        form.reset();
        iti.setNumber("");
        // Очищаем сообщения об ошибках
        firstNameInput.setCustomValidity("");
        lastNameInput.setCustomValidity("");
        emailInput.setCustomValidity("");
        phoneInput.setCustomValidity("");
      }
    });
  });
});