var score = 100
var lineWidth = 16
var CircleLeft = null
var RadianLeft = null

var CircleRight = null
var RadianRight = null

var value = 0;    //得分占比
var count = 0;

//standard
var color_obj = {
    'light': '#00FEFC',
    'deep': '#0095C3',
}

// //eco
// var color_obj = {
//     'light': '#A5FF7C',
//     'deep': '#03E5C6',
// }

// //sport
// var color_obj = {
//     'light': '#FCAD00',
//     'deep': '#C63107',
// }

function changeSysType(sys_type){
    if(sys_type.value == 'standard'){
        color_obj.light = '#00FEFC'
        color_obj.deep = '#0095C3'
    }

    if(sys_type.value == 'eco'){
        color_obj.light = '#A5FF7C'
        color_obj.deep = '#03E5C6'
    }

    if(sys_type.value == 'sport'){
        color_obj.light = '#FCAD00'
        color_obj.deep = '#C63107'
    }

    document.querySelector("#mode-icon").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/icon/"+sys_type.value+".svg"
    document.querySelector(".main-content").style.backgroundImage = "url(\'hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/background-"+sys_type.value+".png\')"
}

function changeSpeed(speed,acc){
    drawCircleLeftPromise = drawCircleLeftPromise.then(()=>{
        return drawCircleLeft(speed,acc)
    })
}

function changeMileage(mileage,acc){
    drawRadianLeftPromise = drawRadianLeftPromise.then(()=>{
        return drawRadianLeft(mileage,acc)
    })
}

function changeRev(rev,acc){
    drawCircleRightPromise = drawCircleRightPromise.then(()=>{
        return drawCircleRight(rev,acc)
    })
}

function changeTemp(temp,acc){
    drawRadianRightPromise = drawRadianRightPromise.then(()=>{
        return drawRadianRight(temp,acc)
    })
}
var screen_width = window.innerWidth;
var screen_height = window.innerHeight;
var pre_width = (screen_width/1920);
var pre_height = (screen_height/1080);

var roadLineSpeed = 1
var circle_left_value = 0;
var circle_left_count = 0;
var circle_left_canvasWidth = 540 * pre_width
var circle_left_canvasHeight = 540 * pre_width
var circle_left_speed_number = document.querySelector('.speed-number');
var circle_left_el_arcCir = document.querySelector('.left-instrument .canvasArcCir');
circle_left_el_arcCir.width = circle_left_canvasWidth;
circle_left_el_arcCir.height = circle_left_canvasHeight;
var circle_left_cxt_arc = circle_left_el_arcCir.getContext("2d");
var drawCircleLeftPromise = drawCircleLeft(1,0)

function drawCircleLeft(score,acc){
    circle_left_value = score / 150;    //得分占比
    
    roadLineSpeed = circle_left_value*5;
    
    var r = circle_left_canvasWidth/2

    var angle_max = 1.5
    var r = circle_left_canvasWidth/2;
    var r2 = r * 3 /4
    var r3 = 137 * pre_width
    
    return new Promise((resolve,reject)=>{
        CircleLeft = setInterval(()=>{
            var isUp = true
            if (circle_left_count >= circle_left_value) {
                circle_left_count -= 0.01;
                isUp = false
            }else{
                circle_left_count += 0.01;
                isUp = true
            }
            
            circle_left_speed_number.innerText = parseInt(circle_left_count*150)<0 ? 0 : parseInt(circle_left_count*150);
            // 清除上次绘画进度条
            circle_left_cxt_arc.clearRect(0, 0, circle_left_canvasWidth, circle_left_canvasHeight);
            circle_left_cxt_arc.lineWidth = lineWidth;

            // 颜色渐变-横向渐变
            var my_gradient = circle_left_cxt_arc.createLinearGradient(0,0, 0, circle_left_canvasWidth);
            my_gradient.addColorStop(1, "transparent");
            my_gradient.addColorStop(0.9, color_obj.deep);
            my_gradient.addColorStop(0, color_obj.light);
            circle_left_cxt_arc.strokeStyle = my_gradient;

            // 仪表外环
            // cxt_arc.lineCap = 'round';
            circle_left_cxt_arc.beginPath();
            circle_left_cxt_arc.arc(r, r, r - lineWidth/2-(20*pre_width), 0.5*Math.PI, 0.5*Math.PI+circle_left_count * (1.5 * Math.PI), false);
            circle_left_cxt_arc.stroke();
            circle_left_cxt_arc.restore();
            // 外环指针
            var angle = angle_max*circle_left_count
            circle_left_cxt_arc.lineWidth=3
            circle_left_cxt_arc.beginPath();
            circle_left_cxt_arc.moveTo(r-(r-(20*pre_width))*Math.sin(angle*Math.PI),r+(r-(20*pre_width))*Math.cos(angle*Math.PI));
            circle_left_cxt_arc.lineTo(r-r2*Math.sin(angle*Math.PI),r+r2*Math.cos(angle*Math.PI));
            circle_left_cxt_arc.stroke();
            circle_left_cxt_arc.restore();
            circle_left_cxt_arc.save();
            // 内环圆弧
            const gnt = circle_left_cxt_arc.createLinearGradient(r,r, r-r3*Math.sin(angle*Math.PI),r+r3*Math.cos(angle*Math.PI))
            gnt.addColorStop(0.6, 'transparent')
            // gnt.addColorStop(0.9, 'orange')
            gnt.addColorStop(1, color_obj.light)
            circle_left_cxt_arc.strokeStyle = gnt;
            circle_left_cxt_arc.beginPath();
            circle_left_cxt_arc.arc(r,r,r3, 0.2*Math.PI+circle_left_count * (1.5 * Math.PI) , 0.8*Math.PI+circle_left_count * (1.5 * Math.PI),false)
            circle_left_cxt_arc.shadowBlur=10;
            circle_left_cxt_arc.shadowColor=color_obj.light;
            circle_left_cxt_arc.stroke();
            circle_left_cxt_arc.restore();
            if(isUp){
                if (circle_left_count >= circle_left_value) {
                    clearTimeCircleLeft();
                    resolve()
                }
            }else{
                if (circle_left_count <= circle_left_value) {
                    clearTimeCircleLeft();
                    resolve()
                }
            }
        }, acc)
    });
}

function clearTimeCircleLeft() {
    if (CircleLeft) {
        clearInterval(CircleLeft);
    }
}


var radian_left_value = 0;
var radian_left_count = 0;
var radian_left_canvasWidth = 570 * pre_width
var radian_left_canvasHeight = 570 * pre_width
var radian_left_mileage_number = document.querySelector(".mileage-number");
var radian_left_el_radian = document.querySelector(".left-instrument .canvasRadian");
radian_left_el_radian.width = radian_left_canvasWidth;
radian_left_el_radian.height = radian_left_canvasHeight;
var radian_left_cxt_radian = radian_left_el_radian.getContext("2d");
var drawRadianLeftPromise = drawRadianLeft(1,0)


function drawRadianLeft(score,acc){
    radian_left_value = score / 360;
    var r = radian_left_canvasWidth/2

    var angle_max = 1.5
    var r = radian_left_canvasWidth/2
    var r2 = r * 3 /4
    var r3 = r * 1 /2

    return new Promise((resolve,reject)=>{
        RadianLeft = setInterval(()=>{
            var isUp = true
            if(radian_left_count >= radian_left_value){
                radian_left_count -= 0.01;
                isUp = false;
            }else{
                radian_left_count += 0.01;
                isUp = true;
            }
            radian_left_mileage_number.innerText = parseInt(score)<0 ? 0 : parseInt(score);

            radian_left_cxt_radian.clearRect(0,0,radian_left_canvasWidth,radian_left_canvasHeight);
            radian_left_cxt_radian.lineWidth = lineWidth;

            radian_left_cxt_radian.beginPath();
            radian_left_cxt_radian.strokeStyle = '#444A5F';
            radian_left_cxt_radian.lineCap="round";
            radian_left_cxt_radian.arc(r, r, r - lineWidth/2, 0.5*Math.PI, 1*Math.PI, false);
            radian_left_cxt_radian.stroke();
            radian_left_cxt_radian.restore();

            var my_gradient = radian_left_cxt_radian.createLinearGradient(0,0,0,radian_left_canvasWidth);
            my_gradient.addColorStop(1,color_obj.light);
            my_gradient.addColorStop(0, color_obj.deep);
            radian_left_cxt_radian.strokeStyle = my_gradient;

            radian_left_cxt_radian.beginPath();
            radian_left_cxt_radian.lineCap="round";
            radian_left_cxt_radian.arc(r, r, r - lineWidth/2, 0.5*Math.PI, 0.5*Math.PI+radian_left_count * (0.5 * Math.PI), false);
            radian_left_cxt_radian.stroke();
            radian_left_cxt_radian.restore();

            radian_left_cxt_radian.font="25px Georgia";
            radian_left_cxt_radian.fillStyle="#fff";
            radian_left_cxt_radian.fillText("E",300*pre_width,570*pre_width);
            radian_left_cxt_radian.fillText("F",0,265*pre_width);

            if(isUp){
                if(radian_left_count >= radian_left_value){
                    clearTimeRadianLeft();
                    resolve()
                }
            }else{
                if(radian_left_count <= radian_left_value){
                    clearTimeRadianLeft();
                    resolve()
                }
            }
        }, acc);
    })
}

function clearTimeRadianLeft(){
    if (RadianLeft) {
        clearInterval(RadianLeft);
    }
}

var circle_right_value = 0;
var circle_right_count = 0;
var circle_right_canvasWidth = 540 * pre_width;
var circle_right_canvasHeight = 540 * pre_width;
var circle_right_rev_number = document.querySelector('.Rev-number');
var circle_right_el_arcCir = document.querySelector('.right-instrument .canvasArcCir');
circle_right_el_arcCir.width = circle_right_canvasWidth;
circle_right_el_arcCir.height = circle_right_canvasHeight;
var circle_right_cxt_arc = circle_right_el_arcCir.getContext("2d");
var drawCircleRightPromise = drawCircleRight(0.1,0)


function drawCircleRight(score,acc){
    circle_right_value = score / 8;    //得分占比
    var r = circle_right_canvasWidth/2

    var angle_max = 1.5
    var r = circle_right_canvasWidth/2;
    var r2 = r * 3 /4
    var r3 = 137 * pre_width
    return new Promise((resolve,reject)=>{
        CircleRight = setInterval(()=>{
            var isUp = true;
            if (circle_right_count >= circle_right_value) {
                circle_right_count -= 0.01;
                isUp = false
            }else{
                circle_right_count += 0.01;
                isUp = true
            }
            if(parseFloat(circle_right_count*8) > 0){
                circle_right_rev_number.innerText = parseFloat(circle_right_count*8).toFixed(1)
            }else{
                circle_right_rev_number.innerText = "0.0"
            }
            
            // 清除上次绘画进度条
            circle_right_cxt_arc.clearRect(0, 0, circle_right_canvasWidth, circle_right_canvasHeight);
            circle_right_cxt_arc.lineWidth = lineWidth;

            // 颜色渐变-横向渐变
            var my_gradient = circle_right_cxt_arc.createLinearGradient(0,0, 0, circle_right_canvasWidth);
            my_gradient.addColorStop(1, "transparent");
            my_gradient.addColorStop(0.9, color_obj.deep);
            my_gradient.addColorStop(0, color_obj.light);
            circle_right_cxt_arc.strokeStyle = my_gradient;

            // circle_right_cxt_arc.lineCap = 'round';
            circle_right_cxt_arc.beginPath();
            circle_right_cxt_arc.arc(r, r, r - lineWidth/2-(20*pre_width), 0.5*Math.PI, 0.5*Math.PI+circle_right_count * (1.5 * Math.PI), false);
            circle_right_cxt_arc.stroke();
            circle_right_cxt_arc.restore();
            
            var angle = angle_max*circle_right_count
            circle_right_cxt_arc.lineWidth=3
            circle_right_cxt_arc.beginPath();
            circle_right_cxt_arc.moveTo(r-(r-(20*pre_width))*Math.sin(angle*Math.PI),r+(r-(20*pre_width))*Math.cos(angle*Math.PI));
            circle_right_cxt_arc.lineTo(r-r2*Math.sin(angle*Math.PI),r+r2*Math.cos(angle*Math.PI));
            circle_right_cxt_arc.stroke();
            circle_right_cxt_arc.restore();
            
            circle_right_cxt_arc.save()
            const gnt = circle_right_cxt_arc.createLinearGradient(r,r, r-r3*Math.sin(angle*Math.PI),r+r3*Math.cos(angle*Math.PI))
            gnt.addColorStop(0.6, 'transparent')
            // gnt.addColorStop(0.9, 'orange')
            gnt.addColorStop(1, color_obj.light)
            circle_right_cxt_arc.strokeStyle = gnt;
            circle_right_cxt_arc.beginPath();
            circle_right_cxt_arc.arc(r,r,r3, 0.2*Math.PI+circle_right_count * (1.5 * Math.PI) , 0.8*Math.PI+circle_right_count * (1.5 * Math.PI),false)
            circle_right_cxt_arc.shadowBlur=10;
            circle_right_cxt_arc.shadowColor=color_obj.light;
            circle_right_cxt_arc.stroke();
            circle_right_cxt_arc.restore();
            if(isUp){
                if (circle_right_count >= circle_right_value) {
                    clearTimeCircleRight();
                    resolve()
                }
            }else{
                if (circle_right_count <= circle_right_value) {
                    clearTimeCircleRight();
                    resolve()
                }
            }
        }, acc);
    })
    
}

function clearTimeCircleRight() {
    if (CircleRight) {
        clearInterval(CircleRight);
    }
}



var radian_right_value = 0;
var radian_right_count = 0;
var radian_right_canvasWidth = 570 * pre_width;
var radian_right_canvasHeight = 570 * pre_width;
var radian_right_el_radian = document.querySelector(".right-instrument .canvasRadian");
radian_right_el_radian.width = radian_right_canvasWidth;
radian_right_el_radian.height = radian_right_canvasHeight;
var radian_right_cxt_radian = radian_right_el_radian.getContext("2d");
var drawRadianRightPromise = drawRadianRight(1,0)


function drawRadianRight(score,acc){
    radian_right_value = score / 100;
    var r = radian_right_canvasWidth/2

    return new Promise((resolve,reject)=>{
        RadianRight = setInterval(()=>{
            var isUp = true
            if(radian_right_count >= radian_right_value){
                radian_right_count -= 0.01;
                isUp = false;
            }else{
                radian_right_count += 0.01;
                isUp = true;
            }
            radian_right_cxt_radian.clearRect(0,0,radian_right_canvasWidth,radian_right_canvasHeight);
            radian_right_cxt_radian.lineWidth = lineWidth;

            radian_right_cxt_radian.beginPath();
            radian_right_cxt_radian.strokeStyle = '#444A5F';
            radian_right_cxt_radian.lineCap="round";
            radian_right_cxt_radian.arc(r, r, r - lineWidth/2, 0.5*Math.PI, 2*Math.PI, true);
            radian_right_cxt_radian.stroke();
            radian_right_cxt_radian.restore();

            var my_gradient = radian_right_cxt_radian.createLinearGradient(0,0,0,radian_right_canvasWidth);
            my_gradient.addColorStop(1,color_obj.light);
            my_gradient.addColorStop(0, color_obj.deep);
            radian_right_cxt_radian.strokeStyle = my_gradient;

            radian_right_cxt_radian.beginPath();
            radian_right_cxt_radian.lineCap="round";
            radian_right_cxt_radian.arc(r, r, r - lineWidth/2, 0.5*Math.PI, 0.5*Math.PI-radian_right_count * (0.5 * Math.PI), true);
            radian_right_cxt_radian.stroke();
            radian_right_cxt_radian.restore();

            radian_right_cxt_radian.font="25px Georgia";
            radian_right_cxt_radian.fillStyle="#fff";
            // radian_right_cxt_radian.fillText("C",250,570);
            // radian_right_cxt_radian.fillText("F",555,265);

            if(isUp){
                if(radian_right_count >= radian_right_value){
                    clearTimeRadianRight();
                    resolve()
                }
            }else{
                if(radian_right_count <= radian_right_value){
                    clearTimeRadianRight();
                    resolve()
                }
            }          
        }, acc);
    }) 
}

function clearTimeRadianRight(){
    if (RadianRight) {
        clearInterval(RadianRight);
    }
}

function changeLabel(str){
    document.querySelectorAll('.info .label-text').forEach(Element=>{
        Element.innerHTML=str.value
    })
}