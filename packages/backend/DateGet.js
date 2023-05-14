
// const zes = new Date();

// const ses = zes.getMilliseconds();

// const lel = zes + ses

// console.log(lel)

//var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

var passw= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
const myPass = 'Mi4$password';

if (myPass.match(passw)) {
    console.log('true')
} else {
    console.log('false')
}