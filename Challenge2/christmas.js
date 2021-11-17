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