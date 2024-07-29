//add function that listen to click events of the element id="submit-button"
console.log("document loaded")
document.getElementById('submit-button').addEventListener('click', function() {
  console.log("Button clicked")
  //get the value of the textarea 
  var text = document.getElementById('decklist').value;
  var selectionOption = document.getElementById('format').value;
  //Process with the correct function to get the result
  if(selectionOption === 'limitless'){
    var result = formatDeckList(text);
    //set the result in the element id="result"
    //Y hacerlo aparecer porque está oculto
    document.getElementById('result').value = result;
    document.getElementById('copy-button').style.display = 'block';
    document.getElementById('result').style.display = 'block';
  }
 
});
document.getElementById('submit-button2').addEventListener('click', function() {
  console.log("Button clicked")
  //get the value of the textarea 
  var text = document.getElementById('decklist2').value;
  var selectionOption = document.getElementById('format2').value;
  //Process with the correct function to get the result
  if(selectionOption === 'limitless'){
    var result = formatDeckListCardtrader(text);
    //console.log(result)
    //set the result in the element id="result"
    //Y hacerlo aparecer porque está oculto
    document.getElementById('result2').value = result;
    document.getElementById('copy-button2').style.display = 'block';
    document.getElementById('result2').style.display = 'block';
  }
 
});

document.getElementById('delete-button').addEventListener('click', function() {
  //Delete the content of the two textareas and hide the copy button
  //and hide the second textarea
  document.getElementById('decklist').value = '';
  document.getElementById('result').value = '';
  document.getElementById('copy-button').style.display = 'none';
  document.getElementById('result').style.display = 'none';
  
 
});

document.getElementById('delete-button2').addEventListener('click', function() {
  //Delete the content of the two textareas and hide the copy button
  //and hide the second textarea
  document.getElementById('decklist2').value = '';
  document.getElementById('result2').value = '';
  document.getElementById('copy-button2').style.display = 'none';
  document.getElementById('result2').style.display = 'none';
  
 
});

//add function that listen to click events of the element id="copy-button"
//and copy the value of the element id="result"
//into the clipboard
document.getElementById('copy-button').addEventListener('click', function() {
  var copyText = document.getElementById('result');
  copyText.select();
  document.execCommand('copy');
  alert('Copied the text: ' + copyText.value);
});
document.getElementById('copy-button2').addEventListener('click', function() {
  var copyText = document.getElementById('result2');
  copyText.select();
  document.execCommand('copy');
  alert('Copied the text: ' + copyText.value);
});

function formatDeckList(deckList) {
  let deckListArray = deckList.split('\n');
  //filter the elements that not begin with a number
  deckListArray = deckListArray.filter((card) => {
      return card.match(/^\d/);
  });
  //now we have an array with the cards, we can format it
  //Get the first number character of the string, it needs to be the quantity of the card from 1 to 4.
  //ditch the rest of the string, and then add the content between parentheses, its needs to be the last appearance of parentheses in the string because one card can have a nickname
  //Return an error message if the quantity is not between 1 and 4
  deckListArray = deckListArray.map((card) => {
      let quantity = card.match(/^\d/)[0];
      
      if (quantity < 1 || quantity > 4) {
          return 'Invalid quantity of cards';
      }
      let cardName = card.match(/\(([^)]+)\)$/)[1];
      
      return convertFormat(card);
  });
  let formattedDeckList = '';
  console.log(deckListArray)
  deckListArray.forEach((card) => {
      formattedDeckList += card + '\n';
  });
  return formattedDeckList;
}
function convertFormat(input) {
  // Buscamos el patrón "(EXPANSIONCODE-NUMBER)" en el texto de entrada
  const regex = /\((\w+-\d+)\)/;
  const match = input.match(regex);

  if (match) {
      const expansionCode = match[1];
      // Dividimos el código de expansión en parte antes del guion y parte después del guion
      const [expansionPart1, expansionPart2] = expansionCode.split('-');
      const result = input.replace(regex, `(${expansionPart1}) ${expansionPart2}`);
      return result;
  } else {
      // Si no se encuentra el patrón, devolvemos el mismo texto de entrada
      return input;
  }
}
function formatDeckListCardtrader(deckList){
  // Buscamos el patrón "(EXPANSIONCODE-NUMBER)" en el texto de entrada
  let deckListArray = deckList.split('\n');
  console.log(deckListArray)
  deckListArray = deckListArray.filter((card) => {
    return card.match(/^\d/);
  });
  console.log(deckListArray)
  let formattedDeckList = '';
  const regex = /\((\w+-\d+)\)/;
  deckListArray = deckListArray.map((card) => {
    let quantity = card.match(/^\d/)[0];
    console.log(quantity)
    if (quantity < 1 || quantity > 4) {
        return 'Invalid quantity of cards';
    }
    return convertFormat(card)
  });
  console.log(deckListArray)
  deckListArray.forEach((card) => {
    formattedDeckList += card + '\n';
  });
  return formattedDeckList;
  /* const regex = /\((\w+-\d+)\)/;
  deckListArray = deckListArray.map((card) => {
    let quantity = card.match(/^\d/)[0];
    console.log(quantity)
    if (quantity < 1 || quantity > 4) {
        return 'Invalid quantity of cards';
    }
    
    const match = deckList.match(regex);
    if (match) {
      const expansionCode = match[1];
      // Dividimos el código de expansión en parte antes del guion y parte después del guion
      const [expansionPart1, expansionPart2] = expansionCode.split('-');
      const result = deckList.replace(regex, `(${expansionPart1}) ${expansionPart2}`);
      return result;
    } else {
      // Si no se encuentra el patrón, devolvemos el mismo texto de entrada
      return input;
    }
});
let formattedDeckList = '';
  console.log(deckListArray)
  deckListArray.forEach((card) => {
      formattedDeckList += card + '\n';
  }); */
  return formattedDeckList;

}