const requirements = document.getElementById('requirements');
const textArea = document.getElementById('text-area');
const skills = document.getElementById('skills');
const addMore = document.getElementById('add-more');
const deletBtn = document.getElementById('delete');
const post = document.getElementById('post');
const i = 0;
let j = 0;

function append() {
  requirements.style.display = 'block';
}
addMore.addEventListener('click', () => {
  j++;
  const newSkill = document.createElement('input');
  newSkill.setAttribute('type', 'text');
  newSkill.setAttribute('placeholder', 'Enter a required skill.');
  newSkill.setAttribute('id', j);
  skills.appendChild(newSkill);
});
deletBtn.addEventListener('click', () => {
  if (j >= 1) {
    j--;
    skills.removeChild(skills.lastChild);
  }
});
function remove() {
  if (textArea.value.length === 0) {
    requirements.style.display = 'none';
  }
}

post.addEventListener('click', () => {
  const skillsArray = [];
  for (let a = 0; a < j; a++) {
    skillsArray.push(document.getElementById(a));
  }
  const propsl = {
    description: textArea.value,
    specialization: document.getElementById('specialization').value,
    skills: skillsArray,
  };
  if (propsl.description.split(' ').join('').length >= 30) {
    fetch('/create-post', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(propsl),
      headers: { 'content-type': 'application/json' },
    });
  }else{
    Swal.fire({
      title: '<i>Sorry..</i>',
      html: `Enter a description of minimum 30 characters`,
      confirmButtonText: '<u>ok</u>',
    });
  }
});
