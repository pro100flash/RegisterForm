// form-script.js
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form.registration-form");

  forms.forEach((form) => {
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

    // Функції валідації
    function validateName(input, fieldName) {
      const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇґҐ\-ʼ’]+$/;
      if (!input.value) input.setCustomValidity(`${fieldName} обязательно`);
      else if (input.value.length < 2)
        input.setCustomValidity(
          `${fieldName} должно быть не короче 2 символов`
        );
      else if (!regex.test(input.value))
        input.setCustomValidity(`${fieldName} должно содержать только буквы`);
      else input.setCustomValidity("");
    }

    function validateEmail() {
      if (!emailInput.value) emailInput.setCustomValidity("Email обязателен");
      else if (!emailInput.checkValidity())
        emailInput.setCustomValidity("Введите корректный email");
      else emailInput.setCustomValidity("");
    }

    function validatePhone() {
      if (!iti.isValidNumber())
        phoneInput.setCustomValidity("Введите корректный номер телефона");
      else phoneInput.setCustomValidity("");
    }

    // Слухачі подій вводу
    firstNameInput.addEventListener("input", () =>
      validateName(firstNameInput, "Имя")
    );
    lastNameInput.addEventListener("input", () =>
      validateName(lastNameInput, "Фамилия")
    );
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);

    // Обробник сабміту
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Submit fired");

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
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const text = await res.text();
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        console.log("Ответ от Google Sheets:", text);
        alert("Данные успешно отправлены!");

        form.reset();
        iti.setNumber("");

        [firstNameInput, lastNameInput, emailInput, phoneInput].forEach((i) =>
          i.setCustomValidity("")
        );
      } catch (err) {
        console.error("Ошибка при отправке:", err);
        alert("Ошибка при отправке данных. Проверь консоль.");
      }
    });
  });
});
