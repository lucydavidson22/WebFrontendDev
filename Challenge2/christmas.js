//  ************************************snowfall js ******************************
const flake = document.querySelector(".flake");
const container = document.querySelector(".container");

function createFlake() {
  const clone = flake.cloneNode(true);
  clone.style.paddingLeft = Math.random() * 10 + "px"; //left padding
  clone.style.animationDuration = Math.random() * 5 + 3 + "s"; // animation duration between 3-5
  clone.style.opacity = Math.random() * 1;
  container.append(clone); // adding clone flake to container
}
const s = setInterval(createFlake, 50); 

setTimeout(() => {
  clearInterval(s);
}, 3000); 

//  ************************************countdown to christmas js ******************************
function clean0(timeto0) {
    if (timeto0 < 10){
     var timeto0 = '0'+timeto0;  
    }else{
      var timeto0 = timeto0;
    }
     return timeto0;
 }
 function showCountdown() {
 var fecha = document.getElementById("dateEnd").value;
 if (fecha != '') {  
 var countDownDate = new Date(fecha).getTime();
 
 // Update the count down every 1 second
 var x = setInterval(function() {
 
     // Get todays date and time
     var now = new Date().getTime();
     
     // Find the distance between now an the count down date
     var distance = countDownDate - now;
     
     // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
     var days = clean0(days);
     var hours = clean0(hours);
     var minutes = clean0(minutes);
     var seconds = clean0(seconds);
     
     // Output the result in an element with id="demo"
     document.getElementById("Days").innerHTML = "<span class='box'>"+days+"</span><small>Days</small>";
     document.getElementById("Hours").innerHTML = "<span class='box'>"+hours+ "</span><small>Hours</small>";
     document.getElementById("Minutes").innerHTML = "<span class='box'>"+minutes+"</span><small>Minutes</small>";
     document.getElementById("Seconds").innerHTML = "<span class='box'>"+ seconds + "</span><small>Seconds</small>";
     
     // If the count down is over, write some text 
     if (distance < 0) {
         clearInterval(x);
         document.getElementById("demo").innerHTML = "EXPIRED";
     }
    
 }, 1000);
   }else{
     document.getElementById("demo").innerHTML = "EXPIRED";
   }
 }




//  ************************************Lists js ******************************
///////////////////////////Mom List/////////////////////////////////////////////
function addMomItem(){
  var ul = document.getElementById("mom-list");
  var momCandidate = document.getElementById("mom-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',momCandidate.value);
  li.appendChild(document.createTextNode(momCandidate.value));
  ul.appendChild(li);
  document.getElementById('mom-candidate').value=null;
}

function removeMomItem(){
  var ul = document.getElementById("mom-list");
  var momCandidate = document.getElementById("mom-candidate");
  var item = document.getElementById(momCandidate.value);
  ul.removeChild(item);
}
///////////////////////////Dad List/////////////////////////////////////////////
function addDadItem(){
  var ul = document.getElementById("dad-list");
  var dadCandidate2 = document.getElementById("dad-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',dadCandidate2.value);
  li.appendChild(document.createTextNode(dadCandidate2.value));
  ul.appendChild(li);
  document.getElementById('dad-candidate').value=null;
}

function removeDadItem(){
  var ul = document.getElementById("dad-list");
  var dadCandidate2 = document.getElementById("dad-candidate");
  var item = document.getElementById(dadCandidate2.value);
  ul.removeChild(item);
}
///////////////////////////Siblings List/////////////////////////////////////////////
function addSiblingsItem(){
  var ul = document.getElementById("siblings-list");
  var siblingsCandidate = document.getElementById("siblings-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',siblingsCandidate.value);
  li.appendChild(document.createTextNode(siblingsCandidate.value));
  ul.appendChild(li);
  document.getElementById('siblings-candidate').value=null;
}

function removeSiblingsItem(){
  var ul = document.getElementById("siblings-list");
  var siblingsCandidate = document.getElementById("siblings-candidate");
  var item = document.getElementById(siblingsCandidate.value);
  ul.removeChild(item);
}
///////////////////////////Friends List/////////////////////////////////////////////
function addFriendsItem(){
  var ul = document.getElementById("friends-list");
  var friendsCandidate = document.getElementById("friends-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',friendsCandidate.value);
  li.appendChild(document.createTextNode(friendsCandidate.value));
  ul.appendChild(li);
  document.getElementById('friends-candidate').value=null;
}

function removeFriendsItem(){
  var ul = document.getElementById("friends-list");
  var friendsCandidate = document.getElementById("friends-candidate");
  var item = document.getElementById(friendsCandidate.value);
  ul.removeChild(item);
}

///////////////////////////Pets List/////////////////////////////////////////////
function addPetsItem(){
  var ul = document.getElementById("pets-list");
  var petsCandidate = document.getElementById("pets-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',petsCandidate.value);
  li.appendChild(document.createTextNode(petsCandidate.value));
  ul.appendChild(li);
  document.getElementById('pets-candidate').value=null;
}

function removePetsItem(){
  var ul = document.getElementById("pets-list");
  var petsCandidate = document.getElementById("pets-candidate");
  var item = document.getElementById(petsCandidate.value);
  ul.removeChild(item);
}

///////////////////////////Others List/////////////////////////////////////////////
function addOthersItem(){
  var ul = document.getElementById("others-list");
  var othersCandidate = document.getElementById("others-candidate");
  var li = document.createElement("li");
  li.setAttribute('id',othersCandidate.value);
  li.appendChild(document.createTextNode(othersCandidate.value));
  ul.appendChild(li);
  document.getElementById('others-candidate').value=null;
}

function removeOthersItem(){
  var ul = document.getElementById("others-list");
  var othersCandidate = document.getElementById("others-candidate");
  var item = document.getElementById(othersCandidate.value);
  ul.removeChild(item);
}