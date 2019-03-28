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
  e.preventDefault();
  const requirment = document.getElementsByClassName('requirment');
  const post = collectData(['postTitle', 'postDescription']);
  const specId = specializationsdroplst.options[specializationsdroplst.selectedIndex].value;
  console.log(post);
  console.log(specId);
  console.log(requirment);

  const require = requirment.map(index => requirment[index]);
  console.log(require);

  // console.log(requirment.value);

  // const proposalInfo = {
  //   post,
  //   specId,
  // };
  // console.log(proposalInfo);

  // fetch('/create-post', {
  //   method: 'POST',
  //   credentials: 'same-origin',
  //   body: JSON.stringify(proposalInfo),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
});
