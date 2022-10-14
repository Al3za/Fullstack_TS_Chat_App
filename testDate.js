const date = new Date();

require("dotenv").config();
console.log(process.env.SECRET_KEY);

//const day = date.getHours();

const day = date.getDate();

const year = date.getFullYear();

const hour = date.getHours();

const month = date.getMonth() + 1;

const minute = date.getMinutes();

const datum = `${year}-${month}-${day} `;

const hours = `${hour}:${minute}`;

//console.log(datum, hours, date);

const now = new Date();
const datumet = now.toLocaleDateString(); //string
const hoursss = now.toLocaleTimeString(); //string
//console.log(datumet, hoursss); //string
