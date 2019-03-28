const firstStepDiv = getElement('user-info');
const secondStepDiv = getElement('contacts-info');
const thirdStepDiv = getElement('confirm-info');
const confirmedPassword = getElement('confirm-pass', 'val');
const fieldsdroplst = document.getElementById('category-fields');
const specializationsdroplst = document.getElementById('specialization-fields');

const userInfo = {};
secondStepDiv.style.display = 'none';
thirdStepDiv.style.display = 'none';

function OnSelectionChange() {
  const selectedGategory = fieldsdroplst.options[fieldsdroplst.selectedIndex];
  specializationsdroplst.textContent = '';
  const categoryId = selectedGategory.value;
  fetch('/specialize', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      categoryId,
    }),
  }).then(res => res.json())
    .then((res) => {
      const speclize = res.speclize.rows;
      for (let i = 0; i < speclize.length; i++) {
        const option = document.createElement('option');
        option.value = speclize[i].id;
        option.text = speclize[i].name;
        specializationsdroplst.appendChild(option);
      }
    });
}

getElement('user-info-next-btn').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.firstSection = {
    firstname: getElement('firstname', 'val'),
    lastname: getElement('lastname', 'val'),
    mobile_number: getElement('mobile', 'val'),
    email: getElement('email', 'val'),
  };
  validate(userInfo.firstSection, validationRegex.firstStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(firstStepDiv, secondStepDiv);
    }
  });
});
getElement('to-confirm-info').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.secondSection = {
    specalization_id: specializationsdroplst.options[specializationsdroplst.selectedIndex].value,
    freelancer_url: getElement('user-url', 'val'),
    photo_url: getElement('user-photo', 'val'),
  };
  validate(userInfo.secondSection, validationRegex.secondStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(secondStepDiv, thirdStepDiv);
    }
  });
});
getElement('to-user-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(secondStepDiv, firstStepDiv);
});
getElement('signup-btn').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.thirdSection = {
    password: getElement('password', 'val'),
  };
  if (userInfo.thirdSection.password === getElement('confirm-pass', 'val')) {
    validate(userInfo.thirdSection, validationRegex.thirdStepValidationRegex, (trueOrFalse) => {
      if (trueOrFalse) {
        fetch('/signup', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(userInfo),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then((res) => {
            if (res.Error) {
              Swal.fire({
                title: '<i>Oops</i>',
                html: `${res.Error}`,
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
  } else {
    Swal.fire({
      title: '<i>Oops</i>',
      html: 'Passwords don\'t match',
      confirmButtonText: '<u>ok</u>',
    });
  }
});
getElement('to-contacts-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(thirdStepDiv, secondStepDiv);
});
