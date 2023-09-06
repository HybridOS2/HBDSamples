var speakTimer = null
var secStr = "00";
var minStr = "00";
function startSpeaking(){
    let sec = 0;
    let min = 0;
    document.querySelector(".speaking .time").textContent = '00:00'
    speakTimer = setInterval(()=>{
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
        secStr = sec < 10 ? "0" + sec : sec;
        minStr = min < 10 ? "0" + min : min;
        document.querySelector(".speaking .time").textContent = minStr + ":" + secStr;
    },1000)
}

function stopSpeaking(){
    clearInterval(speakTimer)
    document.querySelector(".ending .time").textContent = minStr + ":" + secStr;
}