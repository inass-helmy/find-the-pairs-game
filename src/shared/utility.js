export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const shuffleCards = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


export const getCardSize = (deckSize, noOfPairs) =>  {
  let initialVal = Math.ceil(Math.sqrt(noOfPairs * 2)) + 1;
  let cols = initialVal;
  for (cols; cols >= 1; cols--) {
    if ((noOfPairs * 2) % cols == 0) {
      break;
    }
  }

  let noOfRows = (noOfPairs * 2) / cols;
  let width = Math.ceil(((deckSize.width) / cols) * 100) / 100;
  let height = Math.ceil((deckSize.height / noOfRows) * 100) / 100;
  let cardSize = { width, height };
  return { cardSize, cols };
}
