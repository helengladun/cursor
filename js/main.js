// setting variables
var name = prompt ("Enter your name", "Petro"),
    event = prompt ("Enter the event you have to visit", "meeting"),
    place  = prompt ("Enter the place you need to be", "Milan"),
    time = prompt ("Enter the time", "today at 17:00"),
    output;

//  check if all variables are set
if (name && event && place && time) {
    output = name + ' has a ' + event + ' ' + time + ' in ' + place;

    //result in console
    console.log(output);

    document.getElementsByClassName('main-text')[0].innerHTML = "Great, thank you!";
}





