export const arraySearchQuery = (choicesArray, boolArray, queryType) => {
  const filteredArray = choicesArray.filter((color, index) => {
    return boolArray[index] === true ? color : null;
  });
  if (filteredArray.length !== 0) {
    let queryString = `&${queryType}=${filteredArray.toString()}`;
    return queryString;
  }
  return "";
};

export const selectMenuQuery = (selectType, queryType) => {
  if (selectType !== " ") {
    let queryString = `&${queryType}=${selectType}`;
    return queryString;
  }
  return "";
};
