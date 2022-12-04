// ALL SELECTORS FROM HTML
var btn = document.getElementById("set-alrm");
var hrs = document.getElementById("hrs-optns");
var mins = document.getElementById("min-optns");
var secs = document.getElementById("secnds-optns");
var time = document.getElementById("clock-time");

// AUDIO FILE FOR ALARM SOUND
var audio = new Audio("./audio.wav");

// NOTIFICATION MESSAGE
const AddMessage = "alarm is already set for this time";

// ALARM ARRAY FOR STORING ALL ALARMS
alarmArray=[];

// EXTRACT CURRENT TIME AND SET THE CONTENT INSIDE THE HEADING TAG (UPDATED EVERY SECOND)
var currentTime = setInterval(function(){
      var date = new Date();
      currhours=date.getHours();
      currmins=date.getMinutes();
      currsecs= date.getSeconds();
      time.textContent=addZero(currhours)+":"+addZero(currmins)+":"+addZero(currsecs);
},1000)

// NOTIFICATION FUNCTION
function alertMessage(msg) {
  var alertbox = document.getElementById("alert");
  alertbox.innerHTML = msg;
  alertbox.className = "show";
  setTimeout(function () {
    alertbox.className = alertbox.className.replace("show", "");
  }, 2500);
}

// SET ALARM CLICK EVENT LISTENER FUNCTION AND CREATE A LI TAG
btn.addEventListener('click',function(){
    alarmtime = hrs.value + ":" + mins.value + ":" + secs.value;

    if(alarmArray.includes(alarmtime)==true){
        alertMessage(AddMessage);
        return;
    }

    liTag = document.createElement("li");
    liTag.id=alarmtime;
    liTag.innerHTML = "<span>"+alarmtime+"</span><span><button id='stop-alrm'>Stop Alarm</button></span><span><button id='del'>Delete Alarm</button></span>";
    alarmArray.push(alarmtime);
    document.getElementsByClassName("alrm-list")[0].appendChild(liTag);
})

// STOP ALARM AND DELETE ALARM CLICK EVENT LISTENER
document.addEventListener("click", function (event) {

    clickedId = event.target.id;
    if (clickedId == "stop-alrm")
    {
        let activealarm = document.getElementById(event.target.parentNode.parentNode.id);
        if(activealarm.style.backgroundColor=='red')
        {
            activealarm.style.backgroundColor = "#131419";
        }
        audio.pause();
    }
    else if(clickedId == 'del'){
        let index = alarmArray.indexOf(event.target.parentNode.parentNode.id);
        alarmArray.splice(index, 1);
        alertMessage(event.target.parentNode.parentNode.id+" alarm deleted successfully");
        audio.pause();
        document.getElementById(event.target.parentNode.parentNode.id).remove();
    }
});

//CHECKING EVERY SECOND WHETHER THE CURRENTTIME HAS AN ALARM FOR IT OR NOT FROM ARRAY
var checkalarm = setInterval(function(){
   
    if(alarmArray.includes(time.innerText)==true)
    {
        document.getElementById(time.innerText).style.backgroundColor='red';
        audio.loop = true;
        audio.play();
    }
},1000)

// ADD ZEROS AT THE BEGINNING FOR <10
function addZero(number)
{
    if(number<10)
    {
        return '0'+number;
    }

    return number;
}

// OPTIONS FOR HOURS, MINUTES, SECONDS
function CreateOptions(selector,min,max){
    for(let i=min;i<max;i++)
    {
        let optionsTag = document.createElement("option");
        if(i<10)
        {
            optionsTag.value='0'+i;
            optionsTag.innerHTML='0'+i;
        }
        else
        {
            optionsTag.value = i;
            optionsTag.innerHTML = i;
        }
        selector.appendChild(optionsTag);
    }
}

// FUNCTIONS CALLS
CreateOptions(hrs,0,24);
CreateOptions(mins,0,60);
CreateOptions(secs,0,60);