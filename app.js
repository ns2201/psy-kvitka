const contactUrl = "https://t.me/nastia_savanzha";

const pains = [
  "Тіло і психіка виснажені, ніби сил вистачає лише на «протриматись»",
  "Тривога, яка з'являється без очевидної причини",
  "Втрата контакту із собою",
  "Стосунки, з яких важко вийти, навіть коли боляче",
  "Еміграція, втрата, розлучення",
  "Важко сказати «ні» і відстояти кордони",
  "Постійне порівняння себе з іншими",
  "Пошук внутрішньої опори й самоцінності"
];

const changes = [
  "Почнете чути себе й довіряти своїм відчуттям",
  "Відчуєте внутрішню опору замість постійної тривоги",
  "Навчитеся будувати здорові кордони без провини",
  "Вийдете зі старих сценаріїв у стосунках",
  "Відновите самоцінність",
  "Відчуєте більше свободи, спокою та радості"
];

const picker = [
  ["Я виснажена / тривожна", "Може підійти індивідуальна терапія: приватний темп, кризові стани, тривога, самоцінність, складні життєві зміни.", "Доброго дня, хочу записатися на індивідуальну сесію."],
  ["Складно у стосунках", "Може підійти індивідуальна або сімейна/парна терапія — залежно від того, чи хочете ви працювати одна чи разом із партнером/родиною.", "Доброго дня, хочу зрозуміти, який формат мені підійде."],
  ["Хочу в групу або коло", "Терапевтична група дає регулярний шлях змін. Жіноче коло — живий контакт, практики й щирі розмови на окрему тему.", "Доброго дня, цікавить груповий формат — підкажіть, будь ласка, деталі й вартість."],
  ["Цікавить страхова", "Частина вартості терапії може компенсуватися страховими Чехії. Наталія допоможе розібратися з умовами вашої програми.", "Доброго дня, хочу дізнатися про компенсацію терапії страховою."]
];

const services = [
  ["individual", "Індивідуальна терапія", "онлайн і наживо", "50 €", "./public/kvitka/individual.jpg", "Особистий простір, де вся увага зосереджена на вас. Працюємо з вашим запитом у комфортному темпі: кризами, тривогою, самоцінністю, стосунками, втратою себе чи складними життєвими змінами.", "Доброго дня, хочу записатися на індивідуальну сесію."],
  ["group", "Терапевтична група", "онлайн і наживо", "дати й ціна у Telegram", "./public/kvitka/group.jpg", "Шлях змін у невеликій групі жінок. Регулярні зустрічі, підтримка між сесіями та можливість побачити свій досвід у безпечному просторі поруч з іншими.", "Доброго дня, цікавить терапевтична група — підкажіть, будь ласка, деталі й вартість."],
  ["circle", "Жіноче коло", "лише наживо", "дати й ціна у Telegram", "./public/kvitka/circle.jpg", "Чотири години живого контакту, практик і щирих розмов. Кожна зустріч присвячена окремій темі: самоцінності, внутрішній дитині, жіночності, кордонам, довірі до себе чи стосункам.", "Доброго дня, цікавить жіноче коло — підкажіть, будь ласка, деталі й вартість."],
  ["game", "Трансформаційна гра", "онлайн і наживо", "дати й ціна у Telegram", "./public/kvitka/game.jpg", "М'який і водночас глибокий формат самопізнання. Через символи, образи та метафори ви по-новому бачите свою ситуацію, знаходите внутрішні ресурси й відкриваєте нові рішення.", "Доброго дня, цікавить трансформаційна гра — підкажіть, будь ласка, деталі й вартість."],
  ["couples", "Сімейна та парна терапія", "онлайн і наживо", "75 €", "./public/kvitka/couples.jpg", "Простір, у якому кожен може бути почутим. Допомагаю парам і родинам краще розуміти одне одного, знаходити нові способи взаємодії, проживати конфлікти й відновлювати довіру та близькість.", "Доброго дня, хочу записатися на сімейну/парну терапію."]
];

const faqs = [
  ["Чи потрібно готуватися до першої зустрічі?", "Ні. Достатньо прийти такою, якою ви є зараз."],
  ["Скільки триває терапія?", "Залежить від вашого запиту та цілей. На першій консультації разом визначимо формат роботи, який буде найкращим саме для вас."],
  ["Що таке гештальт-терапія?", "Допомагає краще зрозуміти себе, свої почуття, потреби та способи взаємодії зі світом. Працюємо не лише з думками, а й з емоціями, тілом і вашим реальним досвідом."],
  ["Чи буде незручно серед незнайомих людей у групі чи колі?", "Це природне хвилювання. Часто саме група стає місцем, де жінка вперше відчуває: «я не одна»."],
  ["А що, якщо мені стане важче?", "Ми йдемо в темпі, який ви можете витримати. Якщо стане занадто важко, ми можемо зупинитися й подбати про вашу стійкість."],
  ["Чи покриває страхова вартість терапії?", "Так, частково. Напишіть мені — допоможу розібратися з умовами саме вашої страхової."],
  ["З чим ви не працюєте?", "Не працюю з алкогольною та наркотичною залежністю."]
];

const certs = [
  "cert-trauma.jpg",
  "cert-eating.jpg",
  "cert-migis.jpg",
  "cert-resilience.jpg",
  "cert-psychotherapy.jpg",
  "cert-migis-2.jpg"
];

const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav button")];

function link(message) {
  return `${contactUrl}?text=${encodeURIComponent(message)}`;
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  const back = window.Telegram?.WebApp?.BackButton;
  if (back) {
    id === "home" ? back.hide() : back.show();
  }
}

function renderBasics() {
  document.querySelector("#pain-list").innerHTML = pains.map((text) => `<button data-screen="picker">${text}</button>`).join("");
  document.querySelector("#change-list").innerHTML = changes.map((text) => `<article>✣ ${text}</article>`).join("");
  document.querySelector("#cert-list").innerHTML = certs.map((name) => `<img src="./public/kvitka/${name}" alt="" />`).join("");
}

function renderPicker(active = 0) {
  document.querySelector("#picker-list").innerHTML = picker.map((item, index) => `<button class="${index === active ? "active" : ""}" data-picker="${index}">${item[0]}</button>`).join("");
  document.querySelector("#picker-result").innerHTML = `<h3>${picker[active][0]}</h3><p>${picker[active][1]}</p><a href="${link(picker[active][2])}" target="_blank" rel="noreferrer">Написати Наталії</a>`;
}

function renderServices() {
  document.querySelector("#service-list").innerHTML = services.map((item) => `
    <button data-service="${item[0]}">
      <img src="${item[4]}" alt="" />
      <span>${item[2]}</span>
      <strong>${item[1]}</strong>
      <b>${item[3]}</b>
    </button>
  `).join("");
}

function renderService(id) {
  const item = services.find((service) => service[0] === id);
  document.querySelector("#service-detail-content").innerHTML = `
    <img src="${item[4]}" alt="" />
    <span>${item[2]}</span>
    <h2>${item[1]}</h2>
    <p>${item[5]}</p>
    <b>${item[3]}</b>
    <a href="${link(item[6])}" target="_blank" rel="noreferrer">${item[3].includes("€") ? "Записатися" : "Дізнатися деталі й вартість"}</a>
  `;
  showScreen("service-detail");
}

function renderFaq() {
  document.querySelector("#faq-list").innerHTML = faqs.map((item, index) => `
    <article>
      <button data-faq="${index}"><span>${item[0]}</span><b>+</b></button>
      <p>${item[1]}</p>
    </article>
  `).join("");
}

document.addEventListener("click", (event) => {
  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) showScreen(screenButton.dataset.screen);

  const contact = event.target.closest("[data-contact]");
  if (contact) {
    contact.href = link(contact.dataset.contact);
    contact.target = "_blank";
    contact.rel = "noreferrer";
  }

  const pickerButton = event.target.closest("[data-picker]");
  if (pickerButton) renderPicker(Number(pickerButton.dataset.picker));

  const serviceButton = event.target.closest("[data-service]");
  if (serviceButton) renderService(serviceButton.dataset.service);

  const faqButton = event.target.closest("[data-faq]");
  if (faqButton) faqButton.closest("article").classList.toggle("open");
});

window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
window.Telegram?.WebApp?.BackButton?.onClick(() => showScreen("home"));

renderBasics();
renderPicker();
renderServices();
renderFaq();
