
// Hour, minute,amps dropdown list instance
const selectMenu = document.querySelectorAll("ul")

// current time instance
const cTime = document.querySelectorAll("h1");

// hour,minute,amps group div instance
let content = document.getElementsByClassName('btn-group');

// alarm setting/clearing/snoozing btns instance
let setAlarmBtn = document.getElementsByClassName('set-alarm');
let snoozeAlarmBtn = document.getElementsByClassName('snooze-alarm');
snoozeAlarmBtn[0].classList.add('disable');
let clearAlarmBtn = document.getElementsByClassName('clear-alarm');
clearAlarmBtn[0].classList.add('disable');

// Hour, minute,amps dropdown buttons instance
let timeDropDownbtn = document.getElementsByClassName("time-btn-style");

// refresh time instance
let refresh = document.getElementsByClassName("refresh-icon");

// variables
let alarmTime;
let isAlarm = false;

// ringtone audio
let ringtone = new Audio("./files/alarm.wav");


// Dropdown time listing logic
for (let i = 12; i >= 1; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<li key=${i} class="hour-list"><a class="dropdown-item" href="#">${i}</a></li>`
    if (selectMenu[0].firstElementChild == null) {
        selectMenu[0].insertAdjacentHTML("afterbegin", option);
    } else {
        selectMenu[0].firstElementChild.insertAdjacentHTML("beforebegin", option);
    }

}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<li key=${i} class="min-list"><a class="dropdown-item " href="#">${i}</a></li>`

    if (selectMenu[1].firstElementChild == null) {
        selectMenu[1].insertAdjacentHTML("afterbegin", option);
    } else {
        selectMenu[1].firstElementChild.insertAdjacentHTML("beforebegin", option);
    }
}
let amp = ['AM', 'PM'];
for (let i = 1; i >= 0; i--) {
    let option = `<li key=${i} class="sec-list"><a class="dropdown-item " href="#">${amp[i]}</a></li>`
    if (selectMenu[2].firstElementChild == null) {
        selectMenu[2].insertAdjacentHTML("afterbegin", option);
    } else {
        selectMenu[2].firstElementChild.insertAdjacentHTML("beforebegin", option);
    }
}

// get current time logic
setInterval(() => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    amps = "AM"

    if (h >= 12) {
        h = h - 12;
        amps = "PM"
    }
    h = h == 0 ? 12 : h;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    cTime[0].innerText = `${h}:${m}:${s} ${amps}`;
    if (alarmTime == `${h}:${m} ${amps}` && `${s}`=="00") {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

let alHours = timeDropDownbtn[0];
let alMinutes = timeDropDownbtn[1];
let alAmps = timeDropDownbtn[2]

selectMenu[0].addEventListener('click', function (e) {
    let value = e.target.innerText;
    alHours.innerHTML = value;
})

selectMenu[1].addEventListener('click', function (e) {
    let value = e.target.innerText;
    alMinutes.innerHTML = value;
})
selectMenu[2].addEventListener('click', function (e) {
    let value = e.target.innerText;
    alAmps.innerHTML = value;
})


// alarm btn logic
function setAlarm() {
    if (isAlarm) {
        alarmTime="";
        ringtone.pause();
        content[0].classList.remove('disable');
        setAlarmBtn[0].classList.remove('disable');
        clearAlarmBtn[0].classList.add('disable');
        snoozeAlarmBtn[0].classList.add('disable');
        isAlarm = false;
        return;
    }
    const time = `${alHours.innerHTML}:${alMinutes.innerHTML} ${alAmps.innerHTML}`
    if (time.includes('Hour') || time.includes("Minutes") || time.includes("AM/PM")) {
        return alert("Selected time is not a valid time");
    }
    alarmTime = time;
    isAlarm = true;
    content[0].classList.add('disable');
    setAlarmBtn[0].classList.add('disable');
    clearAlarmBtn[0].classList.remove('disable');
    snoozeAlarmBtn[0].classList.remove('disable');
}

//refresh logic
function refreshAlarm(){
    alHours.innerHTML = "Hour "
    alMinutes.innerHTML = "Minute "
    alAmps.innerHTML = "AM/PM "
}

//snooze Alarm logic
function snoozeAlarm(){
    alarmTime="";
    ringtone.pause();
    const time = `${alHours.innerHTML}:${alMinutes.innerHTML} ${alAmps.innerHTML}`
    if (!time.includes('Hour') && !time.includes("Minutes") && !time.includes("AM/PM")) {
       let snooze = 10;
       if(Number(alMinutes.innerHTML) < 50){
         snooze+=Number(alMinutes.innerHTML);
         alMinutes.innerHTML =snooze < 10 ? '0' + String(snooze) : String(snooze);
       }else if(Number(alMinutes.innerHTML)>=50){
         snooze = (Number(alMinutes.innerHTML)+snooze) - 60;
         if(snooze == 0){
            alMinutes.innerHTML = "00";
         }else {
            alMinutes.innerHTML = '0'+ String(snooze);
         }
         alHours.innerHTML = Number(alHours.innerHTML) + 1;
         if (alHours.innerHTML >= 12) {  
            alHours.innerHTML = alHours.innerHTML - 12;
            if(alHours.innerHTML == 0 ){
                alAmps.innerHTML = amp.filter(item=>item!=alAmps.innerHTML);
            }
            alHours.innerHTML = alHours.innerHTML == 0 ? 12 : alHours.innerHTML;
           
         }
         alHours.innerHTML =  alHours.innerHTML < 10 ? '0' + alHours.innerHTML : alHours.innerHTML;
         String(alHours.innerHTML);
       }
       alarmTime = `${alHours.innerHTML}:${alMinutes.innerHTML} ${amps}`
    }
}

setAlarmBtn[0].addEventListener('click', setAlarm);
clearAlarmBtn[0].addEventListener('click', setAlarm);
refresh[0].addEventListener('click', refreshAlarm);
snoozeAlarmBtn[0].addEventListener('click',snoozeAlarm)
