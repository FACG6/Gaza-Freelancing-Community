const collectData = (selector) => {
  let data = {};
  selector.forEach(element => {
    data[element] = document.querySelector(`${element}`).value.trim();
  });
  return data;
};
