const firstStepDiv = document.getElementsByClassName(null, 'section1');
const secondStepDiv = document.getElement(null, 'section1');
const thirdStepDiv = getElement(null, 'section3');
const confirmedPassword = getElement('val', 'confirmPass');
const { validate, ToggleDisplay, getElement } = require('./helpers/signupFunctions');
const signupData = {};

getElement(null, 'next1').addEventListener('click', () => {
    const firstStepfields = {
        firstName: getElement('val', 'userfirstname'),
        lastName: getElement('val', 'userlirstname'),
        mobile: getElement('val', 'mobile'),
        email: getElement('val', 'email'),
    };
    const firstStepValidationRegex = [/[a-z]{3,10}/g, /[a-z]{3,10}/g, /^(\+\d{1,3}[- ]?)?\d{9}$/, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/];
    validate(firstStepfields, firstStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            ToggleDisplay(firstStepDiv, secondStepDiv);
            signupData = Object.assign(signupData, firstStepfields);
        }
    });
});
getElement(null, 'next2').addEventListener('click', () => {
    const secondStepfields = {
        field: getElement('val', 'categoryFields'),
        specialization: getElement('val', 'specializationFields'),
        freeLanceURL: getElement('val', 'userUrl'),
        photoURL: getElement('val', 'userPhoto'),
    };
    const secondStepValidationRegex = [/^[a-zA-Z\s\D+]/g, /^[a-zA-Z\s\D+]/g, /http(s)?:\/\/([\w]+\.)?[A-z0-9_-]+\.com\/[A-z0-9_-]+/, /^https?:\/\/([\w]||[-_.])+\.[a-z]{2,4}(\/||[\w-_])*\.(png|jpe?g||gif)$/];
    validate(secondStepfields, secondStepValidationRegex, (trueOrFalse) => {
        if (trueOrFalse) {
            ToggleDisplay(secondStepDiv, thirdStepDiv);
            signupData = Object.assign(signupData, secondStepfields);
        }
    });
});
getElement(null, 'back1').addEventListener('click', () => {
    ToggleDisplay(secondStepDiv, firstStepDiv);
});
getElement(null, 'signUpBtn').addEventListener('click', () => {
    const thirdStepfields = {
        password: getElement('val', 'userPassword')
    };
    const thirdStepValidationRegex = [/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/g];
    if (password === confirmedPassword) {
        validate(thirdStepfields, thirdStepValidationRegex, (trueOrFalse) => {
            if (trueOrFalse) {
                signupData = Object.assign(signupData, thirdStepfields);
                fetch('/signup', {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: JSON.stringify(signupData),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => res.json())
                    .then((res) => {
                        if (res.error) {
                            swal(text: `${res.error}`, type: "warning");
                        } else {
                            window.location.href = '/login';
                        }
                    })
                    .catch(() => {
                        swal(text: 'Error, please try again..', type: "warning");
                    });
            }
        });
    }
});
getElement(null, 'back2').addEventListener(('click') => {
    fisrstBack.addEventListener('click', () => {
        ToggleDisplay(thirdStepDiv, secondStepDiv);
    });
});