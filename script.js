const calendarGrid = document.getElementById("calendarGrid");
const currentMonthElement = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const toggleThemeButton = document.getElementById("toggleTheme");
const copticMonthsArabic = [
  "توت",       // Thout (September 11–October 10)
  "بابه",      // Paopi (October 11–November 9)
  "هاتور",     // Hathor (November 10–December 9)
  "كيهك",      // Koiak (December 10–January 8)
  "طوبه",      // Tobi (January 9–February 7)
  "أمشير",     // Meshir (February 8–March 9)
  "برمهات",    // Paremhat (March 10–April 8)
  "برموده",    // Parmouti (April 9–May 8)
  "بشنس",      // Pashons (May 9–June 7)
  "بؤونة",     // Paoni (June 8–July 7)
  "أبيب",      // Epip (July 8–August 6)
  "مسرى",      // Mesori (August 7–September 5)
  "نسئ"        // Pi Kogi Enavot (September 6–10) - The small month
];
const hijriMonthsArabic = [
  "محرم",        // Muharram
  "صفر",         // Safar
  "ربيع الأول",  // Rabi' al-Awwal
  "ربيع الآخر",  // Rabi' al-Thani
  "جمادى الأولى", // Jumada al-Awwal
  "جمادى الآخرة", // Jumada al-Thani
  "رجب",         // Rajab
  "شعبان",       // Sha'ban
  "رمضان",       // Ramadan
  "شوال",        // Shawwal
  "ذو القعدة",   // Dhu al-Qi'dah
  "ذو الحجة"     // Dhu al-Hijjah
];
const currentDate = new Date();

const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const arabicDays = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
function getHijriDate(day, month, year) {
  // Create a new Date object from the input Gregorian day, month, and year
  // Note: JavaScript months are 0-based (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat to format the date in the Hijri calendar
  const hijriDate = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  }).format(date)
  
  return hijriDate;
}
function getCopticDate(day, month, year) {
  // Create a new Date object from the input Gregorian day, month, and year
  // Note: JavaScript months are 0-based (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat to format the date in the Coptic calendar
  const copticDate = new Intl.DateTimeFormat("en-US-u-ca-coptic", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    // timeZone: "UTC",
  }).format(date)
  // Format the date and remove the era designation
    return copticDate;
}

const dateee = new Date();
let day = dateee.getDate();
let month = dateee.getMonth();
let year = dateee.getFullYear();
const hijriDate = getHijriDate(day, month, year);
// console.log(hijriMonthsArabic[7]);
// console.log();
// Example usage:
// const day = 15;
// const month = 10; // October
// const year = 2023;
// const copticDate = getCopticDate(day, month, year);
// console.log()
// console.log(copticDate); // Output: "3 Paopi 1740"
const copticDate = getCopticDate(day, month, year);
// const calendarGrid = document.getElementById("calendarGrid");
// const currentMonthElement = document.getElementById("currentMonth");
// const prevMonthButton = document.getElementById("prevMonth");
// const nextMonthButton = document.getElementById("nextMonth");
// const toggleThemeButton = document.getElementById("toggleTheme");

// const currentDate = new Date();

// const arabicMonths = [
//   "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
//   "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
// ];

// const arabicDays = [
//   "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
// ];

function generateCalendar(year, month) {
  calendarGrid.innerHTML = "";
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  currentMonthElement.textContent = `${arabicMonths[month]} ${year}`;

  // Add cells for each day of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");

    // Add Hijri and Coptic dates
    const hijriDate = getHijriDate(day, month + 1, year); // Months are 0-based in JS
    const copticDate = getCopticDate(day, month + 1, year);

    dayElement.innerHTML = `
      <div class="gregorian-date">
      <p>${day}</p>
      </div>
      <div class="hijri-date">
        <p>${hijriDate.split('/')[1]}</p>
        <span>${hijriMonthsArabic[hijriDate.split('/')[0] - 1]}</span>
      </div>
      <div class="coptic-date">
        <p>${copticDate.split('/')[1]}</p>
        <span>${copticMonthsArabic[copticDate.split('/')[0] - 1]}</span>
      </div>
      <div class="day-name">${arabicDays[new Date(year, month, day).getDay()]}</div>
    `;

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      dayElement.classList.add("current-day");
    }

    calendarGrid.appendChild(dayElement);
  }
}

function updateCalendar() {
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
  updateCalendar();
});

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
  updateCalendar();
});

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initial calendar generation
updateCalendar();

// Initial calendar generation
updateCalendar();
