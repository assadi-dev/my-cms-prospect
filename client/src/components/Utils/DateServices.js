export const fullMonth = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const fullDay = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

/**
 *
 * @param {num} num
 * @returns Affiche le 0 aux chiffres inferieurs à 9
 */
export const fullNumber = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

//retourne date format DD-MM-YYYY
/**
 *
 * @param {*} dateInfo
 * @returns date format DD-MM-YYYY
 */
export const minDateMonth = (dateInfo) => {
  const date = new Date(dateInfo);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let years = date.getFullYear();

  let cleanDay = fullNumber(day);
  let cleanMonth = fullNumber(month);

  return `${cleanDay}-${cleanMonth}-${years}`;
};

/**
 *
 * @param {any} dateInfo
 * @returns la date au format YYYY-MM-DD
 */
export const minDateMonthReverse = (dateInfo) => {
  const date = new Date(dateInfo);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let years = date.getFullYear();

  let cleanDay = fullNumber(day);
  let cleanMonth = fullNumber(month);

  return `${years}-${cleanMonth}-${cleanDay}`;
};

/**
 *
 * @param {date} dateInfo
 * @returns l'heure format HH:MM
 */
export const minHours = (dateInfo) => {
  const date = new Date(dateInfo);
  let hour = date.getHours();
  let min = date.getMinutes();

  let cleanHour = fullNumber(hour);
  let cleanMin = fullNumber(min);

  return `${cleanHour}:${cleanMin}`;
};

/**
 *
 * @param {string} date
 * @return affiche la date au format min mercredi 22 juin 2021
 */

export const minTextDate = (dateinfo) => {
  let date = new Date(dateinfo);
  let day = date.getDay();
  let dateNum = date.getDate();
  let month = date.getMonth();
  let years = date.getFullYear();

  return `${fullDay[day]} ${fullNumber(dateNum)}  ${fullMonth[month]} ${years}`;
};
