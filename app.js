const contactUrl = "https://t.me/nastia_savanzha";
const instagramUrl = "https://www.instagram.com/nastia_savanzha/";
const communityUrl = "https://t.me/+Ab_sesYNrnM2NmFi";
const testPaymentUrl = "/api/wayforpay-test";

const pains = [
  "Тривога, напруга, виснаження, відчуття що сил вистачає лише триматися",
  "Складно у стосунках: багато болю, конфліктів, мовчання або дистанції",
  "Еміграція, адаптація в Чехії, втрата звичних опор і себе в новій реальності",
  "Самоцінність, кордони, сором, провина, постійне порівняння себе з іншими",
  "Потреба в жіночому колі, групі, живому контакті й підтримці",
  "Запит є, але його ще важко сформулювати словами"
];

const changes = [
  "Більше внутрішньої опори й ясності у власних рішеннях",
  "Менше автоматичного терпіння там, де давно болить",
  "Здатність говорити про потреби без провини й самознецінення",
  "Новий досвід контакту: з собою, тілом, почуттями й іншими людьми",
  "Відчуття, що з вами все не «не так», а вам просто потрібен простір і підтримка"
];

const picker = [
  ["Мені тривожно або я виснажена", "individual", "Почніть з індивідуальної терапії. Це найбільш бережний формат, де можна розібратися з тим, що зараз болить, без поспіху й без необхідності пояснювати себе групі."],
  ["Болить тема стосунків", "couples", "Якщо ви хочете працювати сама - підійде індивідуальна терапія. Якщо запит спільний із партнером або родиною - парна чи сімейна терапія."],
  ["Хочу коло або групу", "circle", "Жіноче коло підійде для живого контакту й окремої теми. Терапевтична група - для регулярнішої роботи, підтримки й глибшого процесу."],
  ["Не знаю, що мені потрібно", "individual", "Це нормальна точка входу. Можна залишити заявку без ідеально сформульованого запиту - Наталія допоможе знайти перший крок."]
];

const services = [
  {
    id: "individual",
    title: "Індивідуальна терапія",
    meta: "онлайн і наживо",
    price: "50 EUR",
    duration: "50 хвилин, перша зустріч - 60 хвилин",
    image: "./public/kvitka/individual.jpg",
    intro: "Особистий простір, де вся увага зосереджена на вас, вашому темпі й тому, що зараз потребує підтримки.",
    forWhom: ["тривога, виснаження, кризи", "еміграція й адаптація", "самоцінність, кордони, провина", "стосунки, розриви, залежність від контакту"],
    process: "На першій зустрічі ми прояснюємо запит, домовляємося про формат і темп. Далі працюємо з почуттями, тілесними реакціями, повторюваними сценаріями й тим, як ви будуєте контакт із собою та людьми.",
    result: "Більше ясності, опори, чесності із собою й здатності обирати не з виживання, а з контакту з собою.",
    message: "Доброго дня, хочу записатися на індивідуальну сесію."
  },
  {
    id: "couples",
    title: "Сімейна та парна терапія",
    meta: "онлайн і наживо",
    price: "75 EUR",
    duration: "80 хвилин, перша зустріч - 90 хвилин",
    image: "./public/kvitka/couples.jpg",
    intro: "Простір, де кожен може бути почутим, а конфлікт стає не кінцем контакту, а матеріалом для розуміння.",
    forWhom: ["часті конфлікти або мовчання", "втрата довіри й близькості", "різні потреби в парі", "родинні напруження й повторювані сценарії"],
    process: "Ми дивимося не лише на зміст сварок, а й на те, як саме пара або родина втрачає контакт. Важливо, щоб у роботі було місце для обох сторін.",
    result: "Більше зрозумілості, чеснішої комунікації, меж і можливості домовлятися без руйнування зв'язку.",
    message: "Доброго дня, хочу записатися на сімейну/парну терапію."
  },
  {
    id: "group",
    title: "Терапевтична група",
    meta: "онлайн і наживо",
    price: "дати й ціна в анонсах",
    duration: "регулярні зустрічі за програмою",
    image: "./public/kvitka/group.jpg",
    intro: "Група дає те, чого не дає індивідуальна робота: живе дзеркало, підтримку й досвід бути поруч з іншими без ролей.",
    forWhom: ["хочеться підтримки жінок", "є тема самоцінності або кордонів", "важко проявлятися", "ви часто почуваєтеся самі зі своїм досвідом"],
    process: "У групі є правила конфіденційності, темп і структура. Ми працюємо через розмову, вправи, контакт і помічання того, що відбувається між учасницями.",
    result: "Менше самотності, більше сміливості проявлятися й новий досвід безпечного контакту.",
    message: "Доброго дня, цікавить терапевтична група."
  },
  {
    id: "circle",
    title: "Жіноче коло",
    meta: "наживо",
    price: "анонси скоро",
    duration: "близько 4 годин",
    image: "./public/kvitka/circle.jpg",
    intro: "Живий простір для теми, яку хочеться не просто зрозуміти, а відчути, прожити й інтегрувати.",
    forWhom: ["потрібна пауза й теплий контакт", "цікаві теми самоцінності, жіночності, кордонів", "хочеться не лекції, а досвіду", "важливе м'яке коло без тиску"],
    process: "Кожне коло має окрему тему, практики, діалог, тілесність і час для інтеграції. Анонси майбутніх зустрічей з'являються тут і в Telegram.",
    result: "Відчуття підтримки, більше контакту з тілом і собою, маленькі чесні рішення після зустрічі.",
    message: "Доброго дня, цікавить жіноче коло."
  },
  {
    id: "game",
    title: "Трансформаційна гра",
    meta: "онлайн і наживо",
    price: "за домовленістю",
    duration: "індивідуально або в малій групі",
    image: "./public/kvitka/game.jpg",
    intro: "Метафоричний формат, який допомагає побачити ситуацію з іншого ракурсу, коли напряму відповідь не знаходиться.",
    forWhom: ["є питання, але немає ясності", "хочеться м'якого формату", "потрібно побачити ресурси й обмеження", "цікавий символічний спосіб роботи"],
    process: "Через символи, образи й запит ми досліджуємо вашу ситуацію, можливі рішення й внутрішні опори.",
    result: "Більше ясності, нові варіанти дій і відчуття, що ситуація не така безвихідна, як здавалось.",
    message: "Доброго дня, цікавить трансформаційна гра."
  }
];

const events = [
  {
    status: "Скоро",
    title: "Жіноче коло",
    topic: "Тема й дата уточнюються",
    place: "Прага / наживо",
    text: "Тут будуть майбутні анонси зустрічей: тема, дата, кількість місць, вартість і кнопка оплати."
  },
  {
    status: "Лист очікування",
    title: "Терапевтична група",
    topic: "Самоцінність і опора",
    place: "онлайн / наживо",
    text: "Можна залишити заявку, щоб першою отримати деталі старту групи."
  }
];

const faqs = [
  ["Чи потрібно готуватися до першої зустрічі?", "Ні. Достатньо прийти такою, якою ви є зараз. Якщо запит ще нечіткий, ми сформулюємо його разом."],
  ["Скільки триває терапія?", "Залежить від запиту. Для глибших змін часто потрібен курс зустрічей, але перший крок - зрозуміти, що саме вам потрібно."],
  ["Чи можна отримати компенсацію страхової?", "Так, частково, залежно від страхової програми в Чехії. Наталія допоможе зорієнтуватися з умовами."],
  ["Що, якщо після розмови стане важче?", "Ми йдемо в темпі, який ви можете витримати. У терапії важливо не ламати себе, а поступово повертати контакт і опору."],
  ["З чим Наталія не працює?", "Не працює з алкогольною та наркотичною залежністю. У кризових станах, де є загроза життю, потрібна негайна кризова допомога."]
];

const certs = ["cert-trauma.jpg", "cert-eating.jpg", "cert-migis.jpg", "cert-resilience.jpg", "cert-psychotherapy.jpg", "cert-migis-2.jpg"];

const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav button")];

function link(message) {
  return `${contactUrl}?text=${encodeURIComponent(message)}`;
}

function paymentHref() {
  return testPaymentUrl || link("Доброго дня, хочу протестувати оплату 1 грн через WayForPay.");
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  const back = window.Telegram?.WebApp?.BackButton;
  if (back) id === "home" ? back.hide() : back.show();
}

function renderBasics() {
  document.querySelector("#pain-list").innerHTML = pains.map((text) => `<button data-screen="picker">${text}</button>`).join("");
  document.querySelector("#change-list").innerHTML = changes.map((text) => `<article>${text}</article>`).join("");
  document.querySelector("#cert-list").innerHTML = certs.map((name) => `<img src="./public/kvitka/${name}" alt="" />`).join("");
}

function renderPicker(active = 0) {
  const item = picker[active];
  document.querySelector("#picker-list").innerHTML = picker.map((entry, index) => `<button class="${index === active ? "active" : ""}" data-picker="${index}">${entry[0]}</button>`).join("");
  document.querySelector("#picker-result").innerHTML = `
    <h3>${item[0]}</h3>
    <p>${item[2]}</p>
    <button data-service="${item[1]}">Детальніше про формат</button>
    <a href="${link("Доброго дня, хочу зрозуміти, який формат мені підійде.")}" target="_blank" rel="noreferrer">Залишити заявку</a>
  `;
}

function renderServices() {
  document.querySelector("#service-list").innerHTML = services.map((item) => `
    <button data-service="${item.id}">
      <img src="${item.image}" alt="" />
      <span>${item.meta}</span>
      <strong>${item.title}</strong>
      <b>${item.price}</b>
    </button>
  `).join("");
}

function renderService(id) {
  const item = services.find((service) => service.id === id) || services[0];
  document.querySelector("#service-detail-content").innerHTML = `
    <img src="${item.image}" alt="" />
    <span>${item.meta} · ${item.duration}</span>
    <h2>${item.title}</h2>
    <p>${item.intro}</p>
    <div class="info-block">
      <h3>Для кого</h3>
      ${item.forWhom.map((text) => `<p>${text}</p>`).join("")}
    </div>
    <div class="info-block">
      <h3>Як проходить</h3>
      <p>${item.process}</p>
    </div>
    <div class="info-block">
      <h3>Що може змінитися</h3>
      <p>${item.result}</p>
    </div>
    <b>${item.price}</b>
    <a href="${link(item.message)}" target="_blank" rel="noreferrer">Залишити заявку</a>
    <a class="secondary" href="${paymentHref()}" target="_blank" rel="noreferrer">${testPaymentUrl ? "Тестова оплата 1 грн" : "Тестова оплата 1 грн - після підключення WayForPay"}</a>
  `;
  showScreen("service-detail");
}

function renderEvents() {
  document.querySelector("#event-list").innerHTML = events.map((event) => `
    <article>
      <span>${event.status}</span>
      <h3>${event.title}</h3>
      <b>${event.topic}</b>
      <p>${event.place}</p>
      <p>${event.text}</p>
      <a href="${link(`Доброго дня, хочу в лист очікування: ${event.title}.`)}" target="_blank" rel="noreferrer">У лист очікування</a>
    </article>
  `).join("");
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
renderEvents();
renderFaq();
