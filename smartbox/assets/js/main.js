


var content = '';
function keyboardReady(){
    //*************************点击事件 开始*************************
    document.querySelector('#all-body').addEventListener('click', function (evt) {
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        };
        data.targetXY = { x: evt.clientX, y: evt.clientY };
        console.log(data);

        if (get_element_hvml_handle(evt.currentTarget) == "") {
            HVML.post('newClick', "id",
                evt.currentTarget.id,
                JSON.stringify(data));
        }
        else {
            HVML.post('newClick', "handle",
                get_element_hvml_handle(evt.currentTarget),
                JSON.stringify(data));
        }
    })
    //*************************点击事件 结束*************************

    //**************************键盘事件 开始************************
    document.querySelector('.setting-wifi-password .submit').addEventListener('click', function (evt) {
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        };
        data.keyboardContent = content;

        if (get_element_hvml_handle(evt.currentTarget) == "") {
            HVML.post('keyboardClick', "id",
                evt.currentTarget.id,
                JSON.stringify(data));
        }
        else {
            HVML.post('keyboardClick', "handle",
                get_element_hvml_handle(evt.currentTarget),
                JSON.stringify(data));
        }
    })
    document.querySelectorAll('.keyboardContent ul li').forEach((item) => {

        item.addEventListener('click', function (evt) {
            content = document.querySelector('.setting-wifi-password .input').value;
            switch (item.textContent) {
                case 'back':
                    content = content.substr(0, content.length - 1)
                    break;
                case 'Tab':
                    break;
                case 'Caps':
                    document.querySelectorAll('.keyboardContent ul li').forEach((item) => {
                        if (item.getAttribute('data-b') != null) {
                            if (item.getAttribute('data-b') == item.textContent) {
                                item.textContent = item.getAttribute('data-l')
                            } else {
                                item.textContent = item.getAttribute('data-b')
                            }
                        }
                    })
                    break;
                case 'Shift':
                    document.querySelectorAll('.keyboardContent ul li').forEach((item) => {
                        if (item.getAttribute('data-s') != null) {
                            if (item.getAttribute('data-s') == item.textContent) {
                                item.textContent = item.getAttribute('data-n')
                            } else {
                                item.textContent = item.getAttribute('data-s')
                            }
                        }
                    })
                    break;
                case 'Clear':
                    content = '';
                    break;
                case 'Enter':
                    let data = {
                        targetTagName: evt.target.tagName,
                        targetHandle: get_element_hvml_handle(evt.target),
                        targetId: evt.target.id,
                        targetClass: evt.target.className,
                        targetValue: evt.target.value,
                        timeStamp: evt.timeStamp,
                        details: evt
                    };
                    data.keyboardContent = content;

                    if (get_element_hvml_handle(evt.currentTarget) == "") {
                        HVML.post('keyboardClick', "id",
                            evt.currentTarget.id,
                            JSON.stringify(data));
                    }
                    else {
                        HVML.post('keyboardClick', "handle",
                            get_element_hvml_handle(evt.currentTarget),
                            JSON.stringify(data));
                    }
                    break;
                default:
                    content += item.textContent;
                    break;
            }
            document.querySelector('.setting-wifi-password .input').value = content
        })
    })
    //**************************键盘事件 结束************************


    //*************************设置亮度调节 开始***********************
    let x;
    let start;
    let fn = function(evt){
        let move = Math.ceil(((evt.clientX-x)/1340)*10000)/100;
        let target_move = start + move;
        if(target_move > 100){
            target_move = 100;
        }
        if(0 > target_move){
            target_move = 0;
        }
        
        let data = {
                targetTagName: evt.target.tagName,
                targetHandle: get_element_hvml_handle(evt.target),
                targetId: evt.target.id,
                targetClass: evt.target.className,
                targetValue: evt.target.value,
                timeStamp: evt.timeStamp,
                details: evt};
        data.targetMove = target_move;
        HVML.post("slider", "id",
                    "slider-button",
                    JSON.stringify(data));                
    }
    document.querySelector('.button-wrapper').addEventListener('mousedown',function(event){
        x = event.clientX;
        start = parseFloat(document.querySelector('.select').style.width);
        document.addEventListener('mousemove',fn);
    });
    document.querySelector('.setting-screen').addEventListener('mouseup',function(event){
        document.removeEventListener('mousemove',fn);
    });
    //*************************设置亮度调节 结束***********************


    //*************************音乐播放按钮 开始***********************
    document.querySelector('#muisc-player-play-pause').addEventListener('click',function(evt){
        var url = document.querySelector('#muisc-player-audio').getAttribute('dataUrl');
        var player_url = document.querySelector('#muisc-player-audio-source').getAttribute('src')
        
        var player = document.querySelector('#muisc-player-audio');
        if(player_url == url){
            if(player.paused){
                player.play();
            }else{
                player.pause();
            }
        }else{
            player.load();
            player.play();
        }
        
        
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        };
        if (get_element_hvml_handle(evt.currentTarget) == "") {
            HVML.post('muiscplay', "id",
                    evt.currentTarget.id,
                    JSON.stringify(data));
        }
        else {
            console.log(get_element_hvml_handle(evt.currentTarget));
            HVML.post('muiscplay', "handle",
                    get_element_hvml_handle(evt.currentTarget),
                    JSON.stringify(data));
        }
    })

    document.querySelector('#muiscCard').addEventListener('click',function(evt){
                
        var player = document.querySelector('#muisc-player-audio');
        if(player.paused){
            player.play();
        }else{
            document.querySelector('#muisc-player-audio').pause();
        }
        
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        };
        if (get_element_hvml_handle(evt.currentTarget) == "") {
            HVML.post('muiscplay', "id",
                    evt.currentTarget.id,
                    JSON.stringify(data));
        }
        else {
            HVML.post('muiscplay', "handle",
                    get_element_hvml_handle(evt.currentTarget),
                    JSON.stringify(data));
        }
    })

    document.querySelector('#muisc-tool-img').addEventListener('click',function(evt){
        var player = document.querySelector('#muisc-player-audio');
        if(player.paused){
            player.play();
        }else{
            document.querySelector('#muisc-player-audio').pause();
        }
        
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        };
        if (get_element_hvml_handle(evt.currentTarget) == "") {
            HVML.post('muiscplay', "id",
                    evt.currentTarget.id,
                    JSON.stringify(data));
        }
        else {
            HVML.post('muiscplay', "handle",
                    get_element_hvml_handle(evt.currentTarget),
                    JSON.stringify(data));
        }
    })
    //*************************音乐播放按钮 结束***********************

    //*************************相册滑动 开始*****************************
    var photo_doc = document.querySelector('.photo-container');
    var photo_start = 0;
    var photo_end = 0;
    
    photo_doc.addEventListener('touchstart',function(evt){
        photo_start = evt.changedTouches[0].clientX;
    });
    photo_doc.addEventListener('touchend',function(evt){
        photo_end = evt.changedTouches[0].clientX;
        var photo_res = photo_end - photo_start;
        let data = {
            targetTagName: evt.target.tagName,
            targetHandle: get_element_hvml_handle(evt.target),
            targetId: evt.target.id,
            targetClass: evt.target.className,
            targetValue: evt.target.value,
            timeStamp: evt.timeStamp,
            details: evt
        }
        if(photo_res > 50){
            if (get_element_hvml_handle(evt.currentTarget) == "") {
                HVML.post('lastPhoto', "id",
                        evt.currentTarget.id,
                        JSON.stringify(data));
            }else {
                HVML.post('lastPhoto', "handle",
                        get_element_hvml_handle(evt.currentTarget),
                        JSON.stringify(data));
            }
        }

        if(-50 > photo_res){
            if (get_element_hvml_handle(evt.currentTarget) == "") {
                HVML.post('nextPhoto', "id",
                        evt.currentTarget.id,
                        JSON.stringify(data));
            }else {
                HVML.post('nextPhoto', "handle",
                        get_element_hvml_handle(evt.currentTarget),
                        JSON.stringify(data));
            }
        }
    });
    //*************************相册滑动 结束*****************************

    //************************视频控件 开始************************
    var url = "https://files.fmsoft.cn/hvml/smartbox/mp4/708b22d7d52f4edba7c33d3d63612335.mp4"
    var cover = ""
    var videoPlayer = videojs("my-video",{controlBar: {fullscreenToggle: false}});
    videoPlayer.ready(function(){
        videoPlayer.on("fullscreenchange", function(){
            if(videoPlayer.isFullscreen()){
                videoPlayer.exitFullscreen();
            }
        });
    });

    document.querySelectorAll(".video-content .video-item").forEach((item)=>{
        item.addEventListener('click',function(evt){
            url = this.getAttribute('data')
            cover = this.getAttribute('cover')
            videoPlayer.src(url)
            document.querySelector("#my-video").setAttribute('poster',cover)
            document.querySelector('.vjs-poster img').src = cover
            
            var muiscplayer = document.querySelector('#muisc-player-audio');
            muiscplayer.pause()
        })
    })

    document.querySelector(".video-player .goBack").addEventListener('click',function(evt){
        videoPlayer.src(url)
    })
    //*************************视频控件 结束************************
}



function muiscPlay() {
    var url = document.querySelector('#muisc-player-audio').getAttribute('dataUrl');
    var player_url = document.querySelector('#muisc-player-audio-source').getAttribute('src')

    var player = document.querySelector('#muisc-player-audio');
    player.load();
    player.play();
}

function muiscPause() {
    var player = document.querySelector('#muisc-player-audio');
    player.pause();
}

//**********************重载网络图片资源 开始*******************
function reloadImg(){
    document.querySelectorAll('.video-cover img').forEach((item)=>{
        item.src = item.src.replace(/&r=\d+/, "&r="+ ~~(Math.random()*1e7));
    })
}
//**********************重载网络图片资源 结束*******************

//**********************退回按钮 开始**************************
function goBackPage(classname){
    document.querySelector('.'+classname).className = "dialog popOut show "+classname
}
//**********************退回按钮 结束**************************

//**********************wifi图标修改 **************************
function changeWifiLoading(wifibssid){
    // var wifiinfo = JSON.parse(wifiInfoStr);
    // document.querySelector('#getNetTxt').textContent = wifibssid
    document.querySelectorAll('#wifi-my-group .wifi-item').forEach((item)=>{
        var bssid = item.getAttribute('id')
        if(bssid == wifibssid){
            item.childNodes[0].className = "wifi-icon"
            item.childNodes[2].className = "wifi-icon hidden"
        }
    })
}


