function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;

    // Сохраняем значения в Local Storage
    const formData = {
        name: name,
        email: email,
        phone: phone
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    const retrievedData = localStorage.getItem('formData');
    const parsedData = JSON.parse(retrievedData);
    alert('Значения формы с помощью Local Storage: \n' + JSON.stringify(parsedData));

    if (!name || !email || !phone) {
        alert('Пожалуйста, заполните все поля');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Введите правильный формат email');
        return false;
    }

    alert(`Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}`);

    // Сохраняем значения в cookie
    document.cookie = `name=${name}; path=/`;
console.log(`Cookie set: name=${name}`);
document.cookie = `email=${email}; path=/`;
console.log(`Cookie set: email=${email}`);
document.cookie = `phone=${phone}; path=/`;
console.log(`Cookie set: phone=${phone}`);


    // Чтение значений из cookie и вывод на экран
    const cookies = document.cookie.split(';');
    let cookieData = '';
    cookies.forEach(cookie => {
        cookieData += cookie.trim() + '\n';
    });
    alert('Значения формы с помощью cookie: \n' + cookieData);

    console.log('Cookie data: \n', cookieData);  // Логирование в консоль

    return true;
}

// Функция для проверки правильного формата email
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Проверка длины имени
function validateName(name) {
    return name.length >= 3;
}

// Проверка формата номера телефона
function validatePhoneNumber(phone) {
    const re = /^\d{13}$/;
    return re.test(phone);
}



