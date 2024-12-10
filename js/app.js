const phoneInput = document.getElementById("phone");


phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, ""); 


  let prefix = "";
  if (value.startsWith("8")) {
    prefix = "8";
    value = value.slice(1); 
  } else if (value.startsWith("7")) {
    prefix = "+7";
    value = value.slice(1); 
  } else if (value.startsWith("7", 1)) {
    prefix = "+7";
    value = value.slice(2); 
  }


  value = value.slice(0, 10);


  let formattedValue = "";
  if (value.length > 0) formattedValue += `(${value.slice(0, 3)}`;
  if (value.length >= 4) formattedValue += `)${value.slice(3, 6)}`;
  if (value.length >= 7) formattedValue += `-${value.slice(6, 8)}`;
  if (value.length >= 9) formattedValue += `-${value.slice(8, 10)}`;


  phoneInput.value = prefix + formattedValue.trim();
});


document.getElementById("form").addEventListener("submit", (event) => {
  const phoneValue = phoneInput.value.replace(/\D/g, ""); 
  if (
    !(phoneValue.startsWith("7") || phoneValue.startsWith("8")) || 
    phoneValue.length !== 11 
  ) {
    alert("Введите корректный номер телефона в формате: 8(XXX)XXX-XX-XX или +7(XXX)XXX-XX-XX");
    event.preventDefault(); 
  }
});


const SERVER_URL = "https://bot-production-57ca.up.railway.app/send-message";

document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const submitButton = document.getElementById('submit-button');


  submitButton.value = "Отправка...";
  submitButton.disabled = true;
  submitButton.classList.add('hover');

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });

    if (response.ok) {
      submitButton.value = "Отправлено!";
      document.getElementById('name').value = "";
      document.getElementById('phone').value = "";
    } else {
      submitButton.value = "Ошибка!";
    }
  } catch (error) {
    submitButton.value = "Ошибка сети!";
  }


  setTimeout(() => {
    submitButton.value = "Отправить";
    submitButton.disabled = false;
    submitButton.classList.remove('hover');
  }, 10000);
});
