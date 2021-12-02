const checkedChecker = document.querySelector('input[Type="checkbox"]');
const petsGiftForm = document.querySelector(`[newPetsGiftsForm]`)
const petsGiftInput = document.querySelector(`[petsGiftElements]`)

let petsGifts = [];

//listens for a submit in the html document for the newGiftForm and then takes the value of what was input in the giftElements tag
petsGiftForm.addEventListener('submit', e => {
    e.preventDefault()
    let petsGift = petsGiftInput.value.trim();
    if(petsGift !== '') {       //checks for input, if the user has actually given something, it can continue and  
       addGift(petsGift);       //add the gift to the ideas list
       petsGiftInput.value = '';  //clears the add gift bar and 
       petsGiftInput.focus();   //refocuses the page on the bar again
    } 
})

// delete the item when the user clicks the X, otherwise, the item is struckthrough and marked completed
document.getElementById('petsListedGifts').addEventListener('click', e => {   
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
    document.getElementById('petsListedGifts').innerHTML = ''
    const key = localStorage.getItem('petsGiftKey');
    if (key) {
      petsGifts = JSON.parse(key);
      petsGifts.forEach(petsGift => {
        showGifts(petsGift, true);
        counter();
      });
    }
})

/*displays only the gifts that have not be completed, so 
  it removes the gifts that have not been checked */
  document.getElementById('Active').addEventListener('click',  (e) => {
    document.getElementById('petsListedGifts').innerHTML = ''
    const key = localStorage.getItem('petsGiftKey');
    if (key) {
      petsGifts = JSON.parse(key);
      petsGifts.filter(item => !item.checked).forEach(petsGift => {
        showGifts(petsGift, true);
        counter();
      });
    }
})

// displays only the gifts that have been marked as completed
document.getElementById('Completed').addEventListener('click',  (e) => {
    document.getElementById('petsListedGifts').innerHTML = ''
    const key = localStorage.getItem('petsGiftKey');
    if (key) {
      petsGifts = JSON.parse(key);
      petsGifts.filter(item=>item.checked).forEach(petsGift => {
        showGifts(petsGift, true);
        counter();
      });
    }
})

/****************************************Event Listener for the Local Storage*******************************************/

//keeps the gifts loaded so that a page refresh doesn't delete everything that's added
document.addEventListener('DOMContentLoaded', () => {     //when the content is loaded it pulls the previously existing gifts 
  const key = localStorage.getItem('petsGiftKey');
  if (key) {
    //reads a values in the array from local storage and parses it as a JSON
    petsGifts = JSON.parse(key);
    petsGifts.forEach(petsGift => {
      showGifts(petsGift);
      counter();
    });
  }
});

/****************************************All of the functions*******************************************/
/* creates a gift object */
const addGift = (text) => {
    const petsGiftIdea = {
        text,
        checked: false,
        id: Date.now(),
    }
    petsGifts.push(petsGiftIdea);
    showGifts(petsGiftIdea);

};

const showGifts = (petsGiftIdea, preventMutableStorage)=> {
  //stops data in the localstorage from being changed  
  if (!preventMutableStorage) {
        localStorage.setItem('petsGiftKey', JSON.stringify(petsGifts));
    }
    const item = document.querySelector(`[data-key='${petsGiftIdea.id}']`);
    if (petsGiftIdea.deleted) {
        item.remove();
        return
      }
    const isChecked = petsGiftIdea.checked ? 'done': '';
    const node = document.createElement('li')
    //assigns an added item to the list a class and assigns it to id=gift-item
    node.setAttribute('class', `gifts-item ${isChecked}`);
    node.setAttribute('data-key', petsGiftIdea.id);
    //add the html code for displaying each item with the newly assigned class, type, is, and checked status
    node.innerHTML = `
    <input class="isChecked" id="${petsGiftIdea.id}" type="checkbox" ${isChecked ? "checked" : ""}/>
    <span>${petsGiftIdea.text}</span>
    <span class="delete" style="text-align:right;">X</span>`;
    //adds new items onto the bottom of the list of gifts
    document.getElementById('petsListedGifts').append(node);
    if (item) {
        node.replaceWith(item)
    } else {
        document.getElementById('petsListedGifts').append(node);
    }
    counter();

}

//displays the completed gifts from the local storage, so past user's that left completed items on the list 
// don't lose what they have completed
const showGatheredGifts = () => {
    const key = localStorage.getItem('petsGiftKey');
    if (key) {
      petsGifts = JSON.parse(key);
      petsGifts.filter(item => item.check).forEach(petsGift => {
        showGifts(petsGift, true);
        counter();
      });
    }
}

//keeps the checked off items checked when the page changes or a button is clicked
const doneStaysDone = (key) => {    
  const index = petsGifts.findIndex(petsGift=> petsGift.id === Number(key));
  petsGifts[index].checked = !petsGifts[index].checked;
  showGifts(petsGifts[index]);
  showGatheredGifts()
}

//function to delete a gift from the list whne the X is selected
const deleteGift = (key) => {
  const index = petsGifts.findIndex(item => item.id === Number(key));
  const petsGiftIdea = {
      ...petsGifts[index],    //spreads the array into each element so they can be set to "deleted"
      deleted: true  
    };
    petsGifts = petsGifts.filter(item => item.id !== Number(key));
  showGifts(petsGiftIdea);
  
}

// to display how many items are left to be completed
const counter = () => {
  const itemsCounter =  petsGifts.filter(petsGift=> !petsGift.checked)
  const count = document.getElementById('giftsLeft');
  // has to check if there is more than one item in order to display plural items or not
  const counterString = itemsCounter.length === 1 ? 'gift' : 'gifts';
  count.innerText = `${itemsCounter.length} ${counterString} left to do`
}