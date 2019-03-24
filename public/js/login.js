const email = document.getElementById('email');
const password = document.getElementById('password');
const btnLogin = document.getElementById('btn_login');
const msg = document.getElementById('msg');

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const emailV = email.value.trim();
  const passwordV = password.value;
  if (!emailV || !passwordV) {
    msg.textContent = 'please, enter your all fields';
  } else {
    const userInfo = {
      email: emailV,
      password: passwordV,
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
      .catch((error) => {
        msg.textContent = error;
      });
  }
});
