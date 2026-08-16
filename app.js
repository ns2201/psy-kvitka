const contactUrl = "https://t.me/nastia_savanzha";
const instagramUrl = "https://www.instagram.com/nastia_savanzha/";
const communityUrl = "https://t.me/+Ab_sesYNrnM2NmFi";

const certManifest = [
  "certificate_08_landscape.jpg",
  "certificate_18_landscape.jpg",
  "certificate_16_landscape.jpg",
  "certificate_13_landscape.jpg",
  "certificate_15_landscape.jpg",
  "certificate_12_landscape.jpg",
  "certificate_17_landscape.jpg",
  "certificate_04_landscape.jpg",
  "certificate_07_landscape.jpg",
  "certificate_11_landscape.jpg",
  "certificate_09_portrait.jpg",
  "certificate_10_portrait.jpg",
  "certificate_14_landscape.jpg",
  "certificate_02_landscape.jpg",
  "certificate_03_portrait.jpg",
  "certificate_20_landscape.jpg",
  "certificate_01_portrait.jpg",
  "certificate_05_landscape.jpg",
  "certificate_06_landscape.jpg"
];

const events = [
  {
    title: "Жіноче коло",
    status: "Дата уточнюється",
    text: "Найближче коло ще формується. Слідкуйте за анонсом у KVITKA space або напишіть, щоб потрапити в список очікування."
  },
  {
    title: "Терапевтична група",
    status: "Дата уточнюється",
    text: "Набір у нову групу ще не стартував. Напишіть, щоб дізнатися першою, коли відкриється запис."
  },
  {
    title: "Трансформаційна гра",
    status: "За запитом",
    text: "Проводиться індивідуально або в малій групі за домовленістю — напишіть, щоб підібрати зручну дату."
  }
];

const painTopics = [
  {
    title: "Тривога, виснаження, втрата сил",
    items: [
      "Тіло і психіка виснажені, ніби сил вистачає лише на «протриматись» (хронічна втома, психосоматика)",
      "Тривога, яка з'являється без очевидної причини, іноді — панічні атаки",
      "Відчуття «щось зі мною не так», втрата контакту із собою"
    ]
  },
  {
    title: "Стосунки, близькість і кордони",
    items: [
      "Стосунки, з яких важко вийти, навіть коли боляче (емоційна залежність, аб'юзивний досвід)",
      "Важко відстоювати особисті кордони, важко сказати «ні»",
      "Страх близькості"
    ]
  },
  {
    title: "Самооцінка та контакт із собою",
    items: [
      "Занижена самооцінка, постійне порівняння себе з іншими",
      "Пошук внутрішньої опори й самоцінності",
      "Складно відділитися від батьківських сценаріїв (сепарація)"
    ]
  },
  {
    title: "Еміграція, втрати та життєві зміни",
    items: [
      "Складні періоди: еміграція, втрата, розлучення",
      "Втрата звичних опор і себе в новій реальності"
    ]
  },
  {
    title: "Їжа та складні стосунки з тілом",
    items: [
      "Їжа стала способом впоратись, а потім приходить сором (розлади харчової поведінки)"
    ]
  }
];

const changes = [
  "Більше внутрішньої опори й ясності у власних рішеннях",
  "Менше автоматичного терпіння там, де давно болить",
  "Більше свободи бути собою у стосунках"
];

const picker = [
  ["Мені тривожно або я виснажена", "individual", "Почніть з індивідуальної терапії. Це найбільш бережний формат, де можна розібратися з тим, що зараз болить, без поспіху й без необхідності пояснювати себе групі."],
  ["Болить тема стосунків", "couples", "Якщо ви хочете працювати сама — підійде індивідуальна терапія. Якщо запит спільний із партнером або родиною — парна чи сімейна терапія."],
  ["Хочу коло або групу", "circle", "Жіноче коло підійде для живого контакту й окремої теми. Терапевтична група — для регулярнішої роботи, підтримки й глибшого процесу."],
  ["Не знаю, що мені потрібно", "individual", "Це нормальна точка входу. Можна написати без ідеально сформульованого запиту — Наталія допоможе знайти перший крок."]
];

const services = [
  {
    id: "individual",
    title: "Індивідуальна терапія",
    meta: "онлайн і наживо",
    price: "50 EUR",
    duration: "50 хвилин, перша зустріч — 60 хвилин",
    image: "./public/kvitka/individual.jpg",
    intro: "Особистий простір, де вся увага зосереджена на вас. Працюємо з вашим запитом у комфортному темпі: кризами, тривогою, самоцінністю, стосунками, втратою себе чи складними життєвими змінами.",
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
    duration: "80 хвилин, перша зустріч — 90 хвилин",
    image: "./public/kvitka/couples.jpg",
    intro: "Простір, у якому кожен може бути почутим. Допомагаю парам і родинам краще розуміти одне одного, знаходити нові способи взаємодії, проживати конфлікти й відновлювати довіру та близькість.",
    forWhom: ["часті конфлікти або мовчання", "втрата довіри й близькості", "різні потреби в парі", "родинні напруження й повторювані сценарії"],
    process: "Ми дивимося не лише на зміст сварок, а й на те, як саме пара або родина втрачає контакт. Важливо, щоб у роботі було місце для обох сторін.",
    result: "Більше зрозумілості, чеснішої комунікації, меж і можливості домовлятися без руйнування зв'язку.",
    message: "Доброго дня, хочу записатися на сімейну/парну терапію."
  },
  {
    id: "group",
    title: "Терапевтична група",
    meta: "онлайн і наживо",
    price: "анонси в KVITKA space",
    duration: "регулярні зустрічі за програмою",
    image: "./public/kvitka/group.jpg",
    intro: "Шлях змін у невеликій групі жінок. Регулярні зустрічі, підтримка між сесіями та можливість побачити свій досвід у безпечному просторі поруч з іншими.",
    forWhom: ["хочеться підтримки жінок", "є тема самоцінності або кордонів", "важко проявлятися", "ви часто почуваєтеся самі зі своїм досвідом"],
    process: "У групі є правила конфіденційності, темп і структура. Ми працюємо через розмову, вправи, контакт і помічання того, що відбувається між учасницями.",
    result: "Менше самотності, більше сміливості проявлятися й новий досвід безпечного контакту.",
    message: "Доброго дня, цікавить терапевтична група."
  },
  {
    id: "circle",
    title: "Жіноче коло",
    meta: "наживо",
    price: "анонси в KVITKA space",
    duration: "близько 4 годин",
    image: "./public/kvitka/circle.jpg",
    intro: "Чотири години живого контакту, практик і щирих розмов. Кожна зустріч присвячена окремій темі: самоцінності, внутрішній дитині, жіночності, кордонам, довірі до себе чи стосункам.",
    forWhom: ["потрібна пауза й теплий контакт", "цікаві теми самоцінності, жіночності, кордонів", "хочеться не лекції, а досвіду", "важливе м'яке коло без тиску"],
    process: "Кожне коло має окрему тему, практики, діалог, тілесність і час для інтеграції. Дати наступних зустрічей — у Telegram-спільноті й у переписці.",
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
    intro: "М'який і водночас глибокий формат самопізнання. Через символи, образи та метафори ви по-новому бачите свою ситуацію, знаходите внутрішні ресурси й відкриваєте нові рішення.",
    forWhom: ["є питання, але немає ясності", "хочеться м'якого формату", "потрібно побачити ресурси й обмеження", "цікавий символічний спосіб роботи"],
    process: "Через символи, образи й запит ми досліджуємо вашу ситуацію, можливі рішення й внутрішні опори.",
    result: "Більше ясності, нові варіанти дій і відчуття, що ситуація не така безвихідна, як здавалось.",
    message: "Доброго дня, цікавить трансформаційна гра."
  }
];

const faqText = [
  ["Чи потрібно готуватися до першої зустрічі?", "Ні. Достатньо прийти такою, якою ви є зараз."],
  ["Скільки триває терапія?", "Залежить від вашого запиту та цілей. На першій консультації разом визначимо формат роботи, який буде найкращим саме для вас."],
  ["Що таке гештальт-терапія?", "Допомагає краще зрозуміти себе, свої почуття, потреби та способи взаємодії зі світом. Працюємо не лише з думками, а й з емоціями, тілом і вашим реальним досвідом, щоб зміни ставали частиною життя, а не залишалися лише знанням."],
  ["Чи буде незручно серед незнайомих людей у групі чи колі?", "Це природне хвилювання. Більшість учасниць приходять із такими ж переживаннями. Я створюю безпечний простір із правилами конфіденційності, взаємної поваги та підтримки. Часто саме група стає місцем, де жінка вперше відчуває: «я не одна»."],
  ["А що, якщо мені стане важче після того, як я почну говорити про це?", "Це нормальне побоювання, і ви маєте право його мати. Ми йдемо в темпі, який ви можете витримати — не туди, куди ви не готові. Якщо на сесії стане занадто важко, ми завжди можемо зупинитися й подбати про вашу стійкість, перш ніж рухатись далі."],
  ["Чи покриває страхова вартість терапії?", "Так, частково. Напишіть мені — допоможу розібратися з умовами саме вашої страхової."],
  ["З чим ви не працюєте?", "Не працюю з алкогольною та наркотичною залежністю."]
];

const reviews = [
  ["Оксана", "Спасибо тебе за мою новую версию – за мою настоящую версию, которая всегда во мне была, только я боялась быть настоящей. Теперь я умею выставлять границы, умею говорить «нет», умею выбирать себя."],
  ["Марина", "Ситуації, які я не могла зрозуміти/вирішити роками вирішувались за одну сесію, залишаючи усвідомлення і відчуття, що життя змінюється на краще. Навчилась будувати здорові відносини з собою, з дітьми, з чоловіком і з оточуючими."],
  ["Эля", "Я потеряла личные границы, самооценка и самоценность упали. Но я попала к Наталье... Она смогла меня развернуть, помогла посмотреть по сторонам, вокруг себя. Выбирать себя, любить себя, ценить себя. Я реально ожила."],
  ["Вікторія", "З тобою я поступово вчуся обирати себе — не різко, не боляче, а з турботою й повагою. На сесіях завжди багато тепла, прийняття й водночас глибини. З'являється відчуття опори й віри в себе."],
  ["Анастасія", "Це той рідкий спеціаліст, рядом з яким чувствуешь себя в безопасности, принятой и услышанной по-настоящему. Каждая встреча — это пространство без осуждения, где можно быть собой."],
  ["Людмила", "За ці до 10 сесій я отримала багато цінних усвідомлень про себе, свої реакції та внутрішні причини того, що зі мною відбувається. Мені було дуже важливо відчувати безпечний, підтримуючий простір."],
  ["Клієнтка KVITKA space", "Я попала к тебе в очень сложный период моей жизни... Уже через два місяці нашої роботи я стала почувати себе набагато краще. А через рік — з'явились внутрішні опори, я стала впевненіша в собі."],
  ["Клієнтка KVITKA space", "Я дуже задоволена результатами терапії з Наталією! Я прийшла з запитом покращити якість свого життя, налагодити стосунки з близькими і знайти сили та енергію до життя. Зараз я почуваюсь набагато впевненіше."],
  ["Марія", "Я від твого листа відчула мурашки по тілу, виступають сльози... Дуже дякую! Ти врятувала мене, і точно врятуєш інших своєю любов'ю до роботи і клієнтів."],
  ["Клієнтка KVITKA space", "Спасибо тебе огромное, что ты у меня есть! Спасибо тебе огромное за твой труд, душу и сердце! Я безумно тебе благодарна за то, что ты заново по крупицам собираешь меня, я это ощущаю в каждом дне, в каждом моменте!"],
  ["Клієнтка KVITKA space", "Хотела написать тебе огромное спасибо за твою работу! Спасибо большое за твою вовлечённость и профессионализм. Я научилась прислушиваться к себе, искать опору внутри себя и находить равновесие в этой турбулентности."],
  ["Клієнтка KVITKA space", "Щиро дякую за проведену роботу та велике поле для роздумів. Сесії допомогли справитись з великою і «основною» частиною проблем, які до цього доволі заважали. Я звільнила неконструктивного внутрішнього критика."]
];

const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav button")];

function link(message) {
  return `${contactUrl}?text=${encodeURIComponent(message)}`;
}

function inRealTelegram() {
  const tg = window.Telegram?.WebApp;
  return Boolean(tg && tg.initData && tg.initData.length > 0);
}

function wireContactLinks() {
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const url = link(el.dataset.contact);
    el.href = url;
    el.target = "_blank";
    el.rel = "noreferrer";
    el.addEventListener("click", (event) => {
      if (inRealTelegram()) {
        event.preventDefault();
        window.Telegram.WebApp.openTelegramLink(url);
      }
    });
  });
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  const back = window.Telegram?.WebApp?.BackButton;
  if (back) id === "home" ? back.hide() : back.show();
}

function renderBasics() {
  document.querySelector("#pain-accordion").innerHTML = painTopics.map((topic, index) => `
    <div class="acc-item" data-acc="${index}">
      <button class="acc-head" data-acc-toggle="${index}">
        <span>${topic.title}</span>
        <b>+</b>
      </button>
      <div class="acc-body">
        <div class="acc-body-inner">${topic.items.map((item) => `<p>${item}</p>`).join("")}</div>
      </div>
    </div>
  `).join("");
  document.querySelector("#change-list").innerHTML = changes.map((text) => `<article>${text}</article>`).join("");
  document.querySelector("#cert-list").innerHTML = `<button class="wide secondary" id="cert-toggle">Переглянути документи й сертифікати</button>`;
  const previewReviews = reviews.slice(0, 3);
  document.querySelector("#home-review-preview").innerHTML = previewReviews.map(([name, text]) => `
    <article class="review-card">
      <p>«${text.length > 130 ? text.slice(0, 130).trim() + "…" : text}»</p>
      <span>${name}</span>
    </article>
  `).join("");
}

function showCerts() {
  document.querySelector("#cert-list").innerHTML = certManifest.map((name) => `<img src="./public/kvitka/certs/${name}" alt="Сертифікат" loading="lazy" />`).join("");
}

function renderPicker(active = 0) {
  const item = picker[active];
  document.querySelector("#picker-list").innerHTML = picker.map((entry, index) => `<button class="${index === active ? "active" : ""}" data-picker="${index}">${entry[0]}</button>`).join("");
  document.querySelector("#picker-result").innerHTML = `
    <h3>${item[0]}</h3>
    <p>${item[2]}</p>
    <button data-service="${item[1]}">Детальніше про формат</button>
    <a href="${link("Доброго дня, хочу зрозуміти, який формат мені підійде.")}" target="_blank" rel="noreferrer">Написати Наталії</a>
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
    ${item.id === "individual" ? `
    <div class="info-block">
      <h3>Страхова компенсація</h3>
      <p>Я — гештальт-терапевтка, психолог у здравотництві та членкиня Чеської асоціації психотерапії (ČAP). Працюю відповідно до професійних та етичних стандартів психотерапії в Чеській Республіці.</p>
      <p>Мої клієнти можуть скористатися частковою компенсацією вартості психотерапії від медичних страхових компаній Чехії в межах програм підтримки психічного здоров'я: VZP (111), ČPZP (205), OZP (207), ZP Škoda (209), ZPMV (211), RBP (213).</p>
      <p>Якщо ви застраховані в одній із цих компаній, ви можете отримати часткове відшкодування — приблизно 500 крон за сесію. Я допоможу вам розібратися з умовами програми та підкажу, як оформити компенсацію.</p>
    </div>` : ""}
    <b>${item.price}</b>
    <a href="${link(item.message)}" target="_blank" rel="noreferrer">Написати Наталії</a>
  `;
  showScreen("service-detail");
}

function renderReviews() {
  document.querySelector("#review-list").innerHTML = reviews.map(([name, text]) => `
    <article class="review-card">
      <p>«${text}»</p>
      <span>${name}</span>
    </article>
  `).join("");
}

function renderFaq() {
  document.querySelector("#faq-text").innerHTML = faqText.map(([q, a], index) => `
    <div class="acc-item" data-acc="faq-${index}">
      <button class="acc-head" data-acc-toggle="faq-${index}" data-acc-group="faq">
        <span>${q}</span>
        <b>+</b>
      </button>
      <div class="acc-body">
        <div class="acc-body-inner"><p>${a}</p></div>
      </div>
    </div>
  `).join("");
}

function renderEvents() {
  document.querySelector("#event-list").innerHTML = events.map((e) => `
    <article class="event-card">
      <span>${e.status}</span>
      <h3>${e.title}</h3>
      <p>${e.text}</p>
      <a href="${link(`Доброго дня, цікавить ${e.title.toLowerCase()} — підкажіть, будь ласка, коли найближча дата.`)}" target="_blank" rel="noreferrer">Дізнатися дату</a>
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

  if (event.target.closest("#cert-toggle")) showCerts();

  const accToggle = event.target.closest("[data-acc-toggle]");
  if (accToggle) {
    const item = accToggle.closest(".acc-item");
    const group = accToggle.dataset.accGroup;
    const isOpen = item.classList.contains("open");
    if (group) {
      item.closest(".accordion").querySelectorAll(`.acc-item`).forEach((el) => el.classList.remove("open"));
    }
    item.classList.toggle("open", !isOpen);
  }

  // Any link into Telegram (contactUrl or the community link) should go through
  // Telegram's own deep-link handoff when running inside the mini app, so the
  // pre-filled message text is preserved instead of being dropped.
  const telegramLink = event.target.closest(`a[href^="${contactUrl}"], a[href^="${communityUrl}"]`);
  if (telegramLink && inRealTelegram()) {
    event.preventDefault();
    window.Telegram.WebApp.openTelegramLink(telegramLink.href);
  }
});

window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();
window.Telegram?.WebApp?.BackButton?.onClick(() => showScreen("home"));

renderBasics();
renderPicker();
renderServices();
renderReviews();
renderFaq();
renderEvents();
wireContactLinks();
