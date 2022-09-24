export const getAllPokemon = (url) => {
  // Promiseオブジェクトを使用
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data));
  });
};
