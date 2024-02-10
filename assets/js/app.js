// Темная тема
document.getElementById('themeToggle').addEventListener('click', function() {
  let body = document.body;
  let navbar = document.querySelector('.navbar');
  let header = document.querySelector('header');
  let navLinks = document.querySelectorAll('.nav-link');
  let navbarBrandIcon = document.querySelector('.navbar-brand i');
  let themeToggle = document.getElementById('themeToggle'); // Добавьте эту строку
  let cardBodies = document.querySelectorAll('.card-body');
  let imgTheme = document.querySelectorAll('.img-theme');
  let themeIcon = document.getElementById('themeIcon');
  body.classList.toggle('dark-theme');
  navbar.classList.toggle('dark-theme-navbar');
  header.classList.toggle('dark-theme-header');
  navLinks.forEach(navLink => navLink.classList.toggle('dark-theme-text'));
  navbarBrandIcon.classList.toggle('dark-theme-icon');
  themeToggle.classList.toggle('dark-theme-button'); // И эту строку
  imgTheme.forEach(img => img.classList.toggle('img-theme-dark'));
  cardBodies.forEach(cardBody => cardBody.classList.toggle('card-body-theme'));
  if (body.classList.contains('dark-theme')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
  }
});


// Цвет фона
document.getElementById('colorPicker').addEventListener('input', function() {
  document.body.style.backgroundColor = this.value;
});

// Vue.js
const app = Vue.createApp({
  data() {
    return {
      tin: '',
    };
  },
  computed: {
    result() {
      if (!/^\d{10}$/.test(this.tin)) {
        return { tin: "Некорректный ИНН" };
      }

      const birthDays = parseInt(this.tin.substring(0, 5));
      const birthDate = new Date(1899, 11, 31);
      birthDate.setDate(birthDate.getDate() + birthDays);
      // Гендер
      const gender = this.tin.substring(8, 9) % 2 == 0 ? "Женский" : "Мужской";
      // Полных лет
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      // Зодиак
      const zodiacSigns = ["🐐 Козерог", "⚱💧Водолей", "🐟 Рыбы", "🐏 Овен", "🐂 Телец", "👥 Близнецы", "🦞 Рак", "🦁 Лев", "👧 Дева", "⚖ Весы", "🦂 Скорпион", "🏹 Стрелец"];
      const zodiacSign = zodiacSigns[Math.floor(((birthDate.getMonth() + 1) * 100 + birthDate.getDate() - 120) / 100) % 12];
      // Восточный календарь
      const chineseZodiac = ["🐀 Крыса", "🐂 Бык", "🐅 Тигр", "🐇 Кролик", "🐉 Дракон", "🐍 Змея", "🐎 Лошадь", "🐑 Овца", "🐒 Обезьяна", "🐓 Петух", "🐕 Собака", "🐖 Свинья"];
      const chineseSign = chineseZodiac[(birthDate.getFullYear() - 4) % 12];

      return {
        tin: "ИНН корректен",
        birthDate: birthDate.toLocaleDateString(),
        gender: gender,
        age: age,
        zodiacSign: zodiacSign,
        chineseSign: chineseSign
      };
    },
    isTinValid() {
      return this.result.tin === "ИНН корректен";
    }
  }
});

app.mount('#app');