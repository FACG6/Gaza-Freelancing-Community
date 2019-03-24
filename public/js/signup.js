const firstStepDiv = getElement(null, 'user-info');
const secondStepDiv = getElement(null, 'contacts-info');
const thirdStepDiv = getElement(null, 'confirm-info');
const confirmedPassword = getElement('val', 'confirm-pass');

const userInfo = {};
secondStepDiv.style.display = 'none';
thirdStepDiv.style.display = 'none';
getElement(null, 'user-info-next-btn').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.firstSection = {
    firstName: getElement('val', 'firstname'),
    lastName: getElement('val', 'lastname'),
    mobile: getElement('val', 'mobile'),
    email: getElement('val', 'email'),
  };
  validate(userInfo.firstSection, validationRegex.firstStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(firstStepDiv, secondStepDiv);
    }
  });
});
getElement(null, 'to-confirm-info').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.secondSection = {
    field: getElement('val', 'category-fields'),
    specialization: getElement('val', 'specialization-fields'),
    freeLanceURL: getElement('val', 'user-url'),
    photoURL: getElement('val', 'user-photo'),
  };
  validate(userInfo.secondSection, validationRegex.secondStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(secondStepDiv, thirdStepDiv);
    }
  });
});
getElement(null, 'to-contacts-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(secondStepDiv, firstStepDiv);
});
getElement(null, 'signup-btn').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.thirdSection = {
    password: getElement('val', 'password'),
  };
  if (userInfo.thirdSection[password] === confirmedPassword) {
    validate(userInfo.thirdSection, validationRegex.thirdStepValidationRegex, (trueOrFalse) => {
      if (trueOrFalse) {
        fetch('/signup', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(userInfo),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then((res) => {
            if (res.ErrMsg) {
              Swal.fire({
                title: '<i>Oops</i>',
                html: `${res.ErrMsg}`,
                confirmButtonText: '<u>ok</u>',
              });
            } else {
              window.location.href = '/login';
            }
          })
          .catch(() => {
            Swal.fire({
              title: '<i>Oops</i>',
              html: 'Error, please try again',
              confirmButtonText: '<u>ok</u>',
            });
          });
      }
    });
  }
});
getElement(null, 'to-contacts-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(thirdStepDiv, secondStepDiv);
});
