/**
 *
 * @param {array} array
 * @returns un tableau les donnes du tableau cochée
 */
export const getDataChecked = (array) => {
  let data = array.filter((item) => {
    return item.checked === true;
  });
  return data;
};

/**
 *
 * @param {array} array
 * @returns un tableau les donnes du tableau non cochée
 */
export const getDataUnChecked = (array) => {
  let data = array.filter((item) => {
    return item.checked === false;
  });
  return data;
};
