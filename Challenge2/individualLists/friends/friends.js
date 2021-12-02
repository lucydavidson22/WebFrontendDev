const checkedChecker = document.querySelector('input[Type="checkbox"]');
const friendsGiftForm = document.querySelector(`[newFriendsGifts]`)
const friendsGiftInput = document.querySelector(`[friendsGiftsElements]`)

let friendsGifts = [];

//listens for a submit in the html document for the newGiftForm and then takes the value of what was input in the giftElements tag
friendsGiftForm.addEventListener('submit', e => {
    e.preventDefault()
    let friendsGift = friendsGiftInput.value.trim();
    if(friendsGift !== '') {       //checks for input, if the user has actually given something, it can continue and  
       addGift(friendsGift);       //add the gift to the ideas list
       friendsGiftInput.value = '';  //clears the add gift bar and 
       friendsGiftInput.focus();   //refocuses the page on the bar again
    } 
})

// delete the item when the user clicks the X, otherwise, the item is struckthrough and marked completed
document.getElementById('friendsListedGifts').addEventListener('click', e => {   
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
    document.getElementById('friendsListedGifts').innerHTML = ''
    const key = localStorage.getItem('friendsGiftKey');
    if (key) {
      friendsGifts = JSON.parse(key);
      friendsGifts.forEach(friendsGift => {
        showGifts(friendsGift, true);
        counter();
      });
    }
})

/*displays only the gifts that have not be completed, so 
  it removes the gifts that have not been checked */
  document.getElementById('Active').addEventListener('click',  (e) => {
    document.getElementById('friendsListedGifts').innerHTML = ''
    const key = localStorage.getItem('friendsGiftKey');
    if (key) {
      friendsGifts = JSON.parse(key);
      friendsGifts.filter(item => !item.checked).forEach(friendsGift => {
        showGifts(friendsGift, true);
        counter();
      });
    }
})

// displays only the gifts that have been marked as completed
document.getElementById('Completed').addEventListener('click',  (e) => {
    document.getElementById('friendsListedGifts').innerHTML = ''
    const key = localStorage.getItem('friendsGiftKey');
    if (key) {
      friendsGifts = JSON.parse(key);
      friendsGifts.filter(item=>item.checked).forEach(friendsGift => {
        showGifts(friendsGift, true);
        counter();
      });
    }
})

/****************************************Event Listener for the Local Storage*******************************************/

//keeps the gifts loaded so that a page refresh doesn't delete everything that's added
document.addEventListener('DOMContentLoaded', () => {     //when the content is loaded it pulls the previously existing gifts 
  const key = localStorage.getItem('friendsGiftKey');
  if (key) {
    //reads a values in the array from local storage and parses it as a JSON
    friendsGifts = JSON.parse(key);
    friendsGifts.forEach(friendsGift => {
      showGifts(friendsGift);
      counter();
    });
  }
});

/****************************************All of the functions*******************************************/
/* creates a gift object */
const addGift = (text) => {
    const friendsGiftIdea = {
        text,
        checked: false,
        id: Date.now(),
    }
    friendsGifts.push(friendsGiftIdea);
    showGifts(friendsGiftIdea);

};

const showGifts = (friendsGiftIdea, preventMutableStorage)=> {
  //stops data in the localstorage from being changed  
  if (!preventMutableStorage) {
        localStorage.setItem('friendsGiftKey', JSON.stringify(friendsGifts));
    }
    const item = document.querySelector(`[data-key='${friendsGiftIdea.id}']`);
    if (friendsGiftIdea.deleted) {
        item.remove();
        return
      }
    const isChecked = friendsGiftIdea.checked ? 'done': '';
    const node = document.createElement('li')
    //assigns an added item to the list a class and assigns it to id=gift-item
    node.setAttribute('class', `gifts-item ${isChecked}`);
    node.setAttribute('data-key', friendsGiftIdea.id);
    //add the html code for displaying each item with the newly assigned class, type, is, and checked status
    node.innerHTML = `
    <input class="isChecked" id="${friendsGiftIdea.id}" type="checkbox" ${isChecked ? "checked" : ""}/>
    <span>${friendsGiftIdea.text}</span>
    <span class="delete" style="text-align:right;">X</span>`;
    //adds new items onto the bottom of the list of gifts
    document.getElementById('friendsListedGifts').append(node);
    if (item) {
        node.replaceWith(item)
    } else {
        document.getElementById('friendsListedGifts').append(node);
    }
    counter();

}

//displays the completed gifts from the local storage, so past user's that left completed items on the list 
// don't lose what they have completed
const showGatheredGifts = () => {
    const key = localStorage.getItem('friendsGiftKey');
    if (key) {
      friendsGifts = JSON.parse(key);
      friendsGifts.filter(item => item.check).forEach(friendsGift => {
        showGifts(friendsGift, true);
        counter();
      });
    }
}

//keeps the checked off items checked when the page changes or a button is clicked
const doneStaysDone = (key) => {    
  const index = friendsGifts.findIndex(friendsGift=> friendsGift.id === Number(key));
  friendsGifts[index].checked = !friendsGifts[index].checked;
  showGifts(friendsGifts[index]);
  showGatheredGifts()
}

//function to delete a gift from the list whne the X is selected
const deleteGift = (key) => {
  const index = friendsGifts.findIndex(item => item.id === Number(key));
  const friendsGiftIdea = {
      ...friendsGifts[index],    //spreads the array into each element so they can be set to "deleted"
      deleted: true  
    };
    friendsGifts = friendsGifts.filter(item => item.id !== Number(key));
  showGifts(friendsGiftIdea);
  
}

// to display how many items are left to be completed
const counter = () => {
  const itemsCounter =  friendsGifts.filter(friendsGift=> !friendsGift.checked)
  const count = document.getElementById('giftsLeft');
  // has to check if there is more than one item in order to display plural items or not
  const counterString = itemsCounter.length === 1 ? 'gift' : 'gifts';
  count.innerText = `${itemsCounter.length} ${counterString} left to do`
}