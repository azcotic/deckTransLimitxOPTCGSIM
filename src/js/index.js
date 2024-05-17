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

document.getElementById('delete-button').addEventListener('click', function() {
  //Delete the content of the two textareas and hide the copy button
  //and hide the second textarea
  document.getElementById('decklist').value = '';
  document.getElementById('result').value = '';
  document.getElementById('copy-button').style.display = 'none';
  document.getElementById('result').style.display = 'none';
  
 
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
      return quantity + 'x' + cardName;
  });
  let formattedDeckList = '';
  console.log(deckListArray)
  deckListArray.forEach((card) => {
      formattedDeckList += card + '\n';
  });
  return formattedDeckList;
}