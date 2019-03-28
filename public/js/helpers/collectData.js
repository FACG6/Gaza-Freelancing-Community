const collectData = (selector) => {
  const data = {};
  selector.forEach((element) => {
    data[element] = document.getElementById(`${element}`).value.trim();
  });
  return data;
};
