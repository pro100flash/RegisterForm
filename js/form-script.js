document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#regForm");

  const phoneInput = form.querySelector("input[type='tel']");
  const firstNameInput = form.querySelector("input[name='firstName']");
  const lastNameInput = form.querySelector("input[name='lastName']");
  const emailInput = form.querySelector("input[name='email']");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "ua",
    preferredCountries: ["ru", "ua", "pl", "us"],
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js",
  });

  // ✅ Валидация
  function validateName(input, fieldName) {
    const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ\-ʼ’]+$/;
    if (!input.value) input.setCustomValidity(`${fieldName} обязательно`);
    else if (input.value.length < 2)
      input.setCustomValidity(`${fieldName} не короче 2 символов`);
    else if (!regex.test(input.value))
      input.setCustomValidity(`${fieldName} только буквы`);
    else input.setCustomValidity("");
  }

  function validateEmail() {
    if (!emailInput.value) emailInput.setCustomValidity("Email обязателен");
    else if (!emailInput.checkValidity())
      emailInput.setCustomValidity("Некорректный email");
    else emailInput.setCustomValidity("");
  }

  function validatePhone() {
    if (!iti.isValidNumber())
      phoneInput.setCustomValidity("Некорректный номер телефона");
    else phoneInput.setCustomValidity("");
  }

  // ✅ Проверка при вводе
  firstNameInput.addEventListener("input", () =>
    validateName(firstNameInput, "Имя")
  );
  lastNameInput.addEventListener("input", () =>
    validateName(lastNameInput, "Фамилия")
  );
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);

  // ✅ Отправка формы
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
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(data),
      });

      const responseText = await res.text();
      if (!res.ok) throw new Error(responseText);

      alert("✅ Данные отправлены! Спасибо за регистрацию.");
      form.reset();
      iti.setNumber("");
      [firstNameInput, lastNameInput, emailInput, phoneInput].forEach((i) =>
        i.setCustomValidity("")
      );
    } catch (err) {
      alert("❌ Не удалось отправить данные. Попробуйте позже.");
    }
  });
});
