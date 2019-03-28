const user = collectData(['firstname', 'lastname', 'birthday', 'mobile', 'userPhoto', 'email', 'userUrl']);


const saveBtn = document.getElementById('save-user-info');

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/settings', {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        msg.textContent = res.error;
      } else {
        window.location.href = '/';
      }
    })
    .catch((err) => {
      msg.textContent = 'error in request';
    });


//   if (!user) {
//     msg.textContent = 'please, enter your all fields';
//   } else {
//     fetch('/settings', {
//       method: 'PUT',
//       credentials: 'same-origin',
//       body: JSON.stringify(user),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(res => res.json())
//       .then((res) => {
//         if (res.error) {
//           msg.textContent = res.error;
//         } else {
//           window.location.href = '/';
//         }
//       })
//       .catch((err) => {
//         msg.textContent = 'error in request';
//       });
//   }
});
