var all_length = pre_height*400;

roadLineOneInit(50)
function roadLineOneInit(length){
    var count = 0;
    var start = 0;
    var canvas = document.getElementById("road-line-one");
    canvas.width = 120*pre_width;
    canvas.height = 400*pre_height;
    var cxt = canvas.getContext("2d");

    var animation = ()=>{
        count += roadLineSpeed;
        cxt.clearRect(0,0,all_length,all_length);
        if(count > length){
            start = count - length
        }
        cxt.beginPath();
        cxt.moveTo(50*pre_width-(0.08*start),start);
        cxt.lineTo(70*pre_width+(0.08*start),start);
        cxt.lineTo(70*pre_width+(0.08*count),count);
        cxt.lineTo(50*pre_width-(0.08*count),count);
        cxt.lineTo(50*pre_width-(0.08*start),start);
        cxt.fillStyle = "#ffffffb5"
        cxt.strokeStyle = '#ffffffb5'
        cxt.fill();
        cxt.stroke();
        cxt.restore();

        if(count > all_length+50){
            count = 0;
            start = 0;
        }
    }

    setInterval(animation,10);
}