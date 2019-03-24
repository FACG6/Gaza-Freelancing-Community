const validate = (field, regex, cb) => {
    const notAccepteable = [];
    const keys = Object.keys(field);
    for (let i = 0; i < keys.length; i++) {
      if (!regex[i].test(field[keys[i]])) {
        notAccepteable.push(keys[i]);
      }
    }
    if (notAccepteable.length > 0) {
      Swal.fire({
        title: '<i>Oops</i>',
        html: `make sure you fill the following fields ${notAccepteable.join(' , ')}`,
        confirmButtonText: '<u>ok</u>',
      });
      return cb(false);
    }
    return cb(true);
  };
  const ToggleDisplay = (prev, next) => {
    prev.style.display = 'none';
    next.style.display = 'block';
  };
  const getElement = (val, id) => {
    let item;
    if (val) {
      item = document.getElementById(id).value;
      return item;
    }
    item = document.getElementById(id);
    return item;
  };
  const validationRegex = {
    firstStepValidationRegex: [/[a-z]{3,10}/g, /[a-z]{3,10}/g, /^(?=(?:.{7}|.{10}|.{14})$)[0-9]*$/, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    secondStepValidationRegex: [/^[a-zA-Z\s\D+]/g, /^[a-zA-Z\s\D+]/g, /http(s)?:\/\/([\w]+\.)?[A-z0-9_-]+\.com\/[A-z0-9_-]+/, /^https?:\/\/([\w]||[-_.])+\.[a-z]{2,4}(\/||[\w-_])*\.(png|jpe?g||gif)$/],
    thirdStepValidationRegex: [/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/g],
  };
  module.exports = {validationRegex}
  