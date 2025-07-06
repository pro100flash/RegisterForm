document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#regForm");
  const firstNameInput = form.querySelector("input[name='firstName']");
  const lastNameInput = form.querySelector("input[name='lastName']");
  const emailInput = form.querySelector("input[name='email']");
  const phoneInput = form.querySelector("input[type='tel']");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "ua",
    preferredCountries: ["ru", "ua", "pl", "us"],
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js",
  });

  // Валидация
  const validateName = (input, label) => {
    const val = input.value.trim();
    const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ\-ʼ’]+$/;
    if (!val) return input.setCustomValidity(`${label} обязательно`);
    if (val.length < 2)
      return input.setCustomValidity(`${label} минимум 2 символа`);
    if (!regex.test(val))
      return input.setCustomValidity(`${label} только буквы`);
    input.setCustomValidity("");
  };

  const validateEmail = () => {
    if (!emailInput.value) emailInput.setCustomValidity("Email обязателен");
    else if (!emailInput.checkValidity())
      emailInput.setCustomValidity("Некорректный email");
    else emailInput.setCustomValidity("");
  };

  const validatePhone = () => {
    if (!iti.isValidNumber())
      phoneInput.setCustomValidity("Некорректный номер");
    else phoneInput.setCustomValidity("");
  };

  // Слушатели ввода
  firstNameInput.addEventListener("input", () =>
    validateName(firstNameInput, "Имя")
  );
  lastNameInput.addEventListener("input", () =>
    validateName(lastNameInput, "Фамилия")
  );
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);

  // Отправка формы
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    validateName(firstNameInput, "Имя");
    validateName(lastNameInput, "Фамилия");
    validateEmail();
    validatePhone();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: iti.getNumber(),
    };

    try {
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      const text = await res.text();

      if (text.trim() === "Success") {
        alert("✅ Регистрация успешно завершена!");
      } else {
        alert("⚠️ Сервер вернул: " + text);
      }
    } catch (err) {
      console.warn("Предупреждение (CORS или сбой):", err);
    } finally {
      // Чистим поля в любом случае
      firstNameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      iti.setNumber("");
      [firstNameInput, lastNameInput, emailInput, phoneInput].forEach((i) =>
        i.setCustomValidity("")
      );
    }
  });
});
