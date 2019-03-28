const createPost = document.getElementById('createPost');
const specializationsdroplst = document.getElementById('specialize');
const moreRequirment = document.getElementById('addMoreRequirment');
const proposalForm = document.getElementById('form-container');

moreRequirment.addEventListener('click', (e) => {
  e.preventDefault();
  const newRequirment = document.createElement('input');
  newRequirment.className = 'requirment';
  proposalForm.appendChild(newRequirment);
});

createPost.addEventListener('click', (e) => {
  const post = collectData(['postTitle', 'postDescription']);
  const specId = specializationsdroplst.options[specializationsdroplst.selectedIndex].value;
  e.preventDefault();
  const requirments = document.querySelectorAll('.requirment');
  const require = Array.from(requirments);
  const a = [];
  require.forEach((element, index) => {
    a.push(element.value);
  });

  const proposal = {
    post,
    specId,
    allRequierments: a,
  };
  fetch('/create-post', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(proposal),
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
        Swal.fire({
          title: '<i>Done</i>',
          html: `${res.success}`,
          confirmButtonText: '<u>ok</u>',
        });
        window.location.href = '/';
      }
    }).catch(() => {
      Swal.fire({
        title: '<i>Oops</i>',
        html: 'somthing error',
        confirmButtonText: '<u>ok</u>',
      });
    });
});
