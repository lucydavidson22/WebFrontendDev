const checkedChecker = document.querySelector('input[Type="checkbox"]');
const formForTheGifts = document.querySelector(`[newformForTheGifts]`)
const inputtingGifts = document.querySelector(`[addingGiftsElements]`)

let giftings = [];

//listens for a submit in the html document for the newformForTheGifts and then takes the value of what was input in the giftElements tag
formForTheGifts.addEventListener('submit', e => {
    e.preventDefault()
    let present = inputtingGifts.value.trim();
    if(present !== '') {       //checks for input, if the user has actually given something, it can continue and  
       addGift(present);       //add the presentto the ideas list
       inputtingGifts.value = '';  //clears the add gift bar and 
       inputtingGifts.focus();   //refocuses the page on the bar again
    } 
})

// delete the item when the user clicks the X, otherwise, the item is struckthrough and marked completed
document.getElementById('listedGifts').addEventListener('click', e => {   
  const itemKey = e.target.parentElement.dataset.key;
  if (e.target.classList.contains('isChecked')) {                       
        doneStaysDone(itemKey);                                         
    }
    if (e.target.classList.contains('delete')) {                         
        deleteGift(itemKey);
        counter();
      }    
});

// displays all the gifts on the list, complete or not and retrieves items from the localStorage
document.getElementById('All').addEventListener('click',  (e) => {
    document.getElementById('listedGifts').innerHTML = ''
    const key = localStorage.getItem('presentKey');
    if (key) {
      giftings = JSON.parse(key);
      giftings.forEach(present=> {
        showGifts(present, true);
        counter();
      });
    }
})

/*displays only the gifts that have not be completed, so 
  it removes the gifts that have not been checked */
  document.getElementById('Active').addEventListener('click',  (e) => {
    document.getElementById('listedGifts').innerHTML = ''
    const key = localStorage.getItem('presentKey');
    if (key) {
      giftings = JSON.parse(key);
      giftings.filter(item => !item.checked).forEach(present => {
        showGifts(present, true);
        counter();
      });
    }
})

// displays only the gifts that have been marked as completed
document.getElementById('Completed').addEventListener('click',  (e) => {
    document.getElementById('listedGifts').innerHTML = ''
    const key = localStorage.getItem('presentKey');
    if (key) {
      giftings = JSON.parse(key);
      giftings.filter(item=>item.checked).forEach(present => {
        showGifts(present, true);
        counter();
      });
    }
})

/****************************************Event Listener for the Local Storage*******************************************/

//keeps the gifts loaded so that a page refresh doesn't delete everything that's added
document.addEventListener('DOMContentLoaded', () => {     //when the content is loaded it pulls the previously existing gifts 
  const key = localStorage.getItem('presentKey');
  if (key) {
    //reads a values in the array from local storage and parses it as a JSON
    giftings = JSON.parse(key);
    giftings.forEach(present => {
      showGifts(present);
      counter();
    });
  }
});

/****************************************All of the functions*******************************************/
/* creates a gift object */
const addGift = (text) => {
    const presentIdea = {
        text,
        checked: false,
        id: Date.now(),
    }
    giftings.push(presentIdea);
    showGifts(presentIdea);

};

const showGifts = (presentIdea, preventMutableStorage)=> {
  //stops data in the localstorage from being changed  
  if (!preventMutableStorage) {
        localStorage.setItem('presentKey', JSON.stringify(giftings));
    }
    const item = document.querySelector(`[data-key='${presentIdea.id}']`);
    if (presentIdea.deleted) {
        item.remove();
        return
      }
    const isChecked = presentIdea.checked ? 'done': '';
    const node = document.createElement('li')
    //assigns an added item to the list a class and assigns it to id=gift-item
    node.setAttribute('class', `gifts-item ${isChecked}`);
    node.setAttribute('data-key', presentIdea.id);
    //add the html code for displaying each item with the newly assigned class, type, is, and checked status
    node.innerHTML = `
    <input class="isChecked" id="${presentIdea.id}" type="checkbox" ${isChecked ? "checked" : ""}/>
    <span>${presentIdea.text}</span>
    <span class="delete" style="text-align:right;">X</span>`;
    //adds new items onto the bottom of the list of gifts
    document.getElementById('listedGifts').append(node);
    if (item) {
        node.replaceWith(item)
    } else {
        document.getElementById('listedGifts').append(node);
    }
    counter();

}

//displays the completed gifts from the local storage, so past user's that left completed items on the list 
// don't lose what they have completed
const showGatheredGifts = () => {
    const key = localStorage.getItem('presentKey');
    if (key) {
        giftings = JSON.parse(key);
        giftings.filter(item => item.check).forEach(present=> {
        showGifts(present, true);
        counter();
      });
    }
}

//keeps the checked off items checked when the page changes or a button is clicked
const doneStaysDone = (key) => {    
  const index = giftings.findIndex(present=> present.id === Number(key));
  giftings[index].checked = !giftings[index].checked;
  showGifts(giftings[index]);
  showGatheredGifts()
}

//function to delete a gift from the list whne the X is selected
const deleteGift = (key) => {
  const index = giftings.findIndex(item => item.id === Number(key));
  const presentIdea = {
      ...giftings[index],    //spreads the array into each element so they can be set to "deleted"
      deleted: true  
    };
    giftings = giftings.filter(item => item.id !== Number(key));
  showGifts(presentIdea);
  
}

// to display how many items are left to be completed
const counter = () => {
  const itemsCounter =  giftings.filter(present=> !present.checked)
  const count = document.getElementById('giftsLeft');
  // has to check if there is more than one item in order to display plural items or not
  const counterString = itemsCounter.length === 1 ? 'gift' : 'gifts';
  count.innerText = `${itemsCounter.length} ${counterString} left to get`
}