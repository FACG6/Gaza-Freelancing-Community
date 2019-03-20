const firstStepDiv = document.getElementsByClassName('section1');
const secondStepDiv = document.getElementsByClassName('section1');
const thirdStepDiv = document.getElementsByClassName('section2');
const firstName = document.getElement('firstName');
const lastName = document.getElementById('lastName');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const firstNext = document.getElementById('next1');
const secondNext = document.getElementById('next2');
const fisrstBack = document.getElementById('back1');
const secondBack = document.getElementById('back2');
const field = documet.getElementById('field');
const specialization = document.getElementById('specialization');
const freeLanceURL = document.getElementById('freeLanceURL');
const photoURL = document.getElementById('photoURL');
const password = document.getElementById('password');
const confirmedPassword = document.getElementById('confirmedPassword');
const signUp = document.getElementById('signUp');
const { validate, ToggleDisplay } = require('./modules/signupFunctions');

const signupData = {};
firstNext.addEventListener('click', () => {
    firstStepfields = {
        firstName: firstName.value,
        lastName: lastName.value,
        mobile: mobile.value,
        email: email.value,
    };
    const firstStepValidationRegex = ['/[a-z]{3,10}/g', '/[a-z]{3,10}/g', '/^(\+\d{1,3}[- ]?)?\d{9}$/', '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'];

    validate(firstStepfields, firstStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            ToggleDisplay(firstStepDiv, secondStepDiv);
            signupData = Object.assign(signupData,firstStepfields);
        }
    });
});
