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
const Error = '';

firstNext.addEventListener('click', () => {
    const firstStepfields = {
        firstName: firstName.value,
        lastName: lastName.value,
        mobile: mobile.value,
        email: email.value,
    };
    const firstStepValidationRegex = [/[a-z]{3,10}/g, /[a-z]{3,10}/g, /^(\+\d{1,3}[- ]?)?\d{9}$/, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];
    validate(firstStepfields, firstStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            ToggleDisplay(firstStepDiv, secondStepDiv);
            signupData = Object.assign(signupData, firstStepfields);
        }
    });
});
secondNext.addEventListener('click', () => {
    const secondStepfields = {
        field: field.value,
        specialization: specialization.value,
        freeLanceURL: freeLanceURL.value,
        photoURL: photoURL.value,
    };
    const secondStepValidationRegex = [/^[a-zA-Z\s\D+]/g, /^[a-zA-Z\s\D+]/g, /http(s)?:\/\/([\w]+\.)?[A-z0-9_-]+\.com\/[A-z0-9_-]+/, /^https?:\/\/([\w]||[-_.])+\.[a-z]{2,4}(\/||[\w-_])*\.(png|jpe?g||gif)$/];
    validate(secondStepfields, secondStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            ToggleDisplay(secondStepDiv, thirdStepDiv);
            signupData = Object.assign(signupData, secondStepfields);
        }
    });
});
fisrstBack.addEventListener('click', () => {
    ToggleDisplay(secondStepDiv, firstStepDiv);
});
signUp.addEventListener('click', () => {
    const thirdStepfields = {
        password: password.value
    };
    const thirdStepValidationRegex = [/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/g];
    validate(secondStepfields, secondStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            signupData = Object.assign(signupData, secondStepfields);
            fetch('/signup', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(signupData),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.error) {
                        error.textContent = res.error;
                    } else {
                        window.location.href = '/login';
                    }
                })
                .catch(e => {
                    swal(text: 'Error, please try again..', type: "warning");
                });
        }
    });
});
secondBack.addEventListener(()=>{
    fisrstBack.addEventListener('click', () => {
        ToggleDisplay(thirdStepDiv,secondStepDiv);
    });
});