const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('btn_login');
const errMsg = document.getElementById('msg');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (!emailValue || !passwordValue) {
    errMsg.textContent = 'please, enter your all fields';
  } else {
    const userInfo = {
      email: emailValue,
      password: passwordValue,
    };
    fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          errMsg.textContent = res.error;
        } else {
          window.location.href = '/';
        }
      })
      .catch(() => {
        errMsg.textContent = 'Internal Server Error';
      });
  }
});
