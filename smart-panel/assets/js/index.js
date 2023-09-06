function hidePrevPage() {
    console.log(".............................................hidePrevPage is called");
    $('#id_load').hide()
    $('#id_network').hide()
}

function init() {
    // 隐藏DOM元素
    console.log(".............................................init begin");
    $('#id-wrapper').removeClass("d-none")
    hidePrevPage();
    $('#right').hide()
    $('#left').hide()
    $('#pause').hide()
    $('#pause2').hide()
    var handleTime = 0   // 记录没操作的时间
    var timer 
    var openRight = false
    var lockScreen = true


    timer = setInterval(() => { // 定时器
        handleTime += 1
        //console.log('计时',handleTime);
        if(handleTime >= 60){
            $('#lockScreen').show()
            lockScreen = true
            $('#right').hide()
            $('#left').show()
            openRight = false
            $('.container').removeClass('landscape')
            $('.container').removeClass('unlocked')
            $('#lockScreen').css('top',0)
            $('#lockScreen').css('left',0)
            $('.container').css('overflow-y', 'hidden')

            $('.container').animate({ scrollTop: 0 }, 200)
        }
        if(handleTime >= 63) {
            handleTime = 0
        }
    }, 1000);

    // 添加点击事件监听器
    $('#toright').on('click', function() {
        // 在这里编写处理点击事件的代码
        //console.log('点击按钮');
        $('#left').hide()
        $('#right').show()
        $('.container').addClass('landscape')
        // $('.container').animate({ scrollLeft: 0 }, 200);    
        setTimeout(() => {
            openRight = true
        }, 500);

    });

    // 卧室
    $('#bedroom').on('click', function() {
        // 在这里编写处理点击事件的代码
        //console.log('点击按钮');
        $('#left').hide()
        $('#right').show()
        $('.container').addClass('landscape')
        $('.container').animate({ scrollLeft: 480 }, 200);    
        setTimeout(() => {
            openRight = true
        }, 500);

    });

    // 返回
    $('#back').on('click', function() {
        // 在这里编写处理点击事件的代码
        //console.log('点击按钮');
        $('#left').show()
        $('#right').hide()
        $('.container').removeClass('landscape')
        setTimeout(() => {
            openRight = false
        }, 500);

    });

    $('.container').scroll(function() {
        var scrollLeft = $(this).scrollLeft();
        var scrollTop = $(this).scrollTop();
        //console.log('计时器',timer);
        if(!timer) {
            timer = setInterval(() => { // 定时器
                handleTime += 1
                //console.log('计时',handleTime);
            }, 1000);
        }
        //console.log('元素内部滚动距离：' + scrollLeft + '像素');
        // if(scrollLeft > 0 && scrollLeft < 380 && openRight) {
        //   $('.container').animate({ scrollLeft: 0 }, 100);
        //   setTimeout(() => {
        //     $('#right').hide()
        //     $('#left').show()
        //     openRight = false
        //     $('.container').removeClass('landscape')
        //   }, 500);
        // }

        if(scrollTop > 20 ){
            // $('#toTop').hide()
            if(lockScreen && handleTime < 60) {
                lockScreen = false
                // $('#lockScreen').hide()
                handleTime = 0
            }
        }else {
            $('#toTop').show()
        }
    });

    var musicIndex = 0
    var musicIndex2 = 0
    const musicList = [
        {
            author:'久石让',
            title: '天空之城',
            img:'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m1.jpg',
            audio: 'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m1.mp3'
        },
        {
            author:'Radiohead',
            title: 'Creep',
            img:'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m2.png',
            audio: 'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m2.mp3'
        }, 
        {
            author:'Ed Sheeran',
            title: 'Shape of You',
            img:'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m3.jpg',
            audio: 'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m3.mp3'
        },
        {
            author:'五月天',
            title: '知足',
            img:'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m4.png',
            audio: 'file:///app/cn.fmsoft.hybridos.smartcontrolpanel/resources/music/m4.mp3'
        }
    ]

    // 音乐播放器
    const audio = document.getElementById('audio');
    const currentTime = document.getElementById('current-time');
    const duration = document.getElementById('duration');
    // const progressBar = document.getElementById('progress-bar');

    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const preBtn = document.getElementById('pre');
    const nextBtn = document.getElementById('next');

    const playButton2 = document.getElementById('play2');
    const pauseButton2 = document.getElementById('pause2');
    const preBtn2 = document.getElementById('pre2');
    const nextBtn2 = document.getElementById('next2');

    function initPlayer() {
        $('#audio').attr('src', musicList[musicIndex].audio)
        $('#music-pic').attr('src', musicList[musicIndex].img)
        $('#music-pic2').attr('src', musicList[musicIndex].img)
    }

    function preBtnClick() {
        if(musicIndex >= 1) {
            musicIndex -= 1
        }else {
            musicIndex = musicList.length - 1
        }
        $('#audio').attr('src', musicList[musicIndex].audio)
        $('#music-pic').attr('src', musicList[musicIndex].img)
        $('#music-pic2').attr('src', musicList[musicIndex].img)
        playButton.click()
    }

    function nextBtnClick() {
        if(musicIndex < musicList.length - 1) {
            musicIndex += 1
        }else {
            musicIndex = 0
        }
        $('#audio').attr('src', musicList[musicIndex].audio)
        $('#music-pic').attr('src', musicList[musicIndex].img)
        $('#music-pic2').attr('src', musicList[musicIndex].img)
        // audio.play();
        playButton.click()
    }

    function playBtnClick() {
        audio.play();
        $('#music-pic').addClass('animate-img')
        $('#music-pic2').addClass('animate-img')
        $('#play').hide()
        $('#play2').hide()
        $('#pause').show()
        $('#pause2').show()
    }

    function pauseBtnClick() {
        audio.pause();
        $('#play').show()
        $('#play2').show()
        $('#pause').hide()
        $('#pause2').hide()
        $('#music-pic').removeClass('animate-img')
        $('#music-pic2').removeClass('animate-img')
    }

    preBtn.addEventListener('click', preBtnClick);
    nextBtn.addEventListener('click', nextBtnClick);
    playButton.addEventListener('click', playBtnClick);
    pauseButton.addEventListener('click', pauseBtnClick);

    preBtn2.addEventListener('click', preBtnClick);
    nextBtn2.addEventListener('click', nextBtnClick);
    playButton2.addEventListener('click', playBtnClick);
    pauseButton2.addEventListener('click', pauseBtnClick);

    audio.addEventListener('timeupdate', function() {
        // const currentTimeValue = formatTime(audio.currentTime);
        // const durationValue = formatTime(audio.duration);
        // currentTime.textContent = currentTimeValue;
        // duration.textContent = durationValue;
        // const progress = (audio.currentTime / audio.duration) * 100;
        // progressBar.style.width = `${progress}%`;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // 滑动解锁功能
    var isDragging = false;
    var startY, currentY;
    var containerUnLock = false;

    // 检查滑块是否已解锁
    function checkUnlocked() {
        //console.log('检查解锁', $('#container').hasClass('unlocked'));
        if ($('#container').hasClass('unlocked')) {
            //console.log('解锁成功');
            $('.container').css('overflow-y', 'auto'); // 解锁后允许滚动
            containerUnLock = true
        }
    }

    // 拖动滑块
    $('#toTop').on('mousedown touchstart', function(e) {
        e.preventDefault();
        isDragging = true;
        startY = e.pageY || e.originalEvent.touches[0].pageY;
        $('#left').show()
        //console.log('开始拖动',startY);
    });

    $(document).on('mousemove touchmove', function(e) {
        if (isDragging) {
            currentY = e.pageY || e.originalEvent.touches[0].pageY;
            var distance = currentY - startY;

            $('#lockScreen').css('top',distance + 'px')
            var opacity = 1 - (distance * -1) / 480; // 计算当前透明度
            opacity = Math.min(Math.max(opacity, 0), 1); // 限制透明度在0到1之间
            // console.log('拖动距离',distance,'透明度',opacity);
            $('#lockScreen').css('opacity',opacity)
            if (distance <= -50) { // 解锁滑块
                $('#container').addClass('unlocked');

                checkUnlocked();
            } 
        }
    });

    $(document).on('mouseup touchend', function(e) {
        if(containerUnLock) {
            $("#lockScreen").animate({top:-480}, function() {
                $('#lockScreen').hide()
                $('#lockScreen').css('opacity',1)
            });
        } else {
            $('#lockScreen').css('opacity',1)
            $('#lockScreen').css('top',0)
        }
        handleTime = 0;
        containerUnLock = false;
        isDragging = false;
    });

    initPlayer();
    console.log(".............................................init end");
}

function do_classify() {
    var mySlider = document.getElementById("mySlider");
    //console.log(mySlider.value);
    $('#percent').text(mySlider.value + '%');
}

$(document).ready(function() {
    init();
});

