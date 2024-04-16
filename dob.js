const dobDate = new Date("2000-06-05");
const currentDate = new Date();

const timeSpent = currentDate - dobDate;
console.log(timeSpent);

const seconds = Math.floor(timeSpent / 1000);
console.log("seconds => ", seconds);

const secInMinutes = 60;
const minutes = Math.floor(seconds / secInMinutes);
console.log("minutes => ", minutes);

const secInHours = 60 * 60;
const hours = Math.floor(seconds / secInHours);
console.log("hours => ", hours);

const secInDays = 24 * 60 * 60;
const days = Math.floor(seconds / secInDays);
console.log("days => ", days);

const secInWeek = 7 * 24 * 60 * 60;
const weeks = Math.floor(seconds / secInWeek);
console.log("weeks => ", weeks);

const secInMonth = 30 * 24 * 60 * 60;
const months = Math.floor(seconds / secInMonth);
console.log("months => ", months);

const secInyear = 365 * 24 * 60 * 60;
const years = Math.floor(seconds / secInyear);
console.log("years", years);
