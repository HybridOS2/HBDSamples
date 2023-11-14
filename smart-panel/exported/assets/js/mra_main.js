function post_hvml_event(evt, elem) {
    let data = {
            originTag: elem.tagName,
            originHandle: elem.hvmlHandleText ? elem.hvmlHandleText : elem.getAttribute('hvml-handle'),
            originId: elem.id,
            originClass: elem.className,
            originName: elem.getAttribute('name'),
            originValue: (typeof(elem.value) === 'undefined') ? elem.getAttribute('value') : elem.value,
            targetDiffersOrigin: false,
    };

    HVML.post(evt, "handle", data.originHandle, JSON.stringify(data));
}

function post_hvml_event_with_data(evt, elem, value) {
    let data = {
            originTag: elem.tagName,
            originHandle: elem.hvmlHandleText ? elem.hvmlHandleText : elem.getAttribute('hvml-handle'),
            originId: elem.id,
            originClass: elem.className,
            originName: elem.getAttribute('name'),
            originValue: value,
            targetDiffersOrigin: false,
    };

    HVML.post(evt, "handle", data.originHandle, JSON.stringify(data));
}

var lock_count = 0;
function on_any_input(evt) {
    lock_count = 0;
}

var lock_timer;
var allow_post_music_event = true;
function start_lockscreen_timer() {
    console.log("############################################### start lockscreen timer");
    allow_post_music_event = false;
    const mainContent = document.getElementById('mainContent');
    lock_count = 0;
    lock_timer = setInterval(() => {
        lock_count += 1;
        let lock_time = parseInt(mainContent.getAttribute('data-time-to-lock'));
        if (lock_count >= lock_time) {
            post_hvml_event('locked', mainContent);
            lock_count = 0;
        }
    }, 1000);

    mainContent.addEventListener("mousedown", on_any_input);
    mainContent.addEventListener("keydown", on_any_input);
    mainContent.addEventListener("touchstart", on_any_input);
    mainContent.addEventListener("touchmove", on_any_input);
}

function stop_lockscreen_timer() {
    console.log("############################################### stop lockscreen timer");
    allow_post_music_event = true;
    clearInterval(lock_timer);
    const mainContent = document.getElementById('mainContent');
    mainContent.removeEventListener("mousedown", on_any_input);
    mainContent.removeEventListener("keydown", on_any_input);
    mainContent.removeEventListener("touchstart", on_any_input);
    mainContent.removeEventListener("touchmove", on_any_input);
}

function post_music_player_event(data) {
    if (allow_post_music_event) {
        const musicPlayer = document.getElementById('theMusicPlayer');
        post_hvml_event_with_data('stateChange', musicPlayer, data);
    }
}

function post_music_player_music_change_event() {
    const musicPlayer = document.getElementById('theMusicPlayer');
    var data = {
        "type":"musicPlayer",
        "name":"musicChange",
    }
    const musicPic = document.querySelectorAll('.music-pic');
    if (musicPic.length > 0) {
        data.img = musicPic[0].src;
    }
    const musicTitle = document.querySelectorAll('.music-title');
    if (musicTitle.length > 0) {
        data.title = musicTitle[0].textContent;
    }
    const musicArtist = document.querySelectorAll('.music-artist');
    if (musicArtist.length > 0) {
        data.artist = musicArtist[0].textContent;
    }
    post_hvml_event_with_data('stateChange', musicPlayer, data);
}

function post_music_player_playstate_event(state) {
    const musicPlayer = document.getElementById('theMusicPlayer');
    var data = {
        type:"musicPlayer",
        name:"playerState",
        playState:state
    }
    post_hvml_event_with_data('stateChange', musicPlayer, data);
}

function post_music_player_state_change_event() {
    const musicPlayer = document.getElementById('theMusicPlayer');
    var data = {
        "type":"musicPlayer",
        "name":"playerState",
        "muted":musicPlayer.muted,
        "volume":musicPlayer.volume,
        "duration":musicPlayer.duration,
        "currentTime":musicPlayer.currentTime,
        "progress": (musicPlayer.currentTime / musicPlayer.duration * 100)
    };
    if (musicPlayer.paused) {
        data.playState = "paused";
    }
    else {
        data.playState = "playing";
    }
    const musicPic = document.querySelectorAll('.music-pic');
    if (musicPic.length > 0) {
        data.img = musicPic[0].src;
    }
    const musicTitle = document.querySelectorAll('.music-title');
    if (musicTitle.length > 0) {
        data.title = musicTitle[0].textContent;
    }
    const musicArtist = document.querySelectorAll('.music-artist');
    if (musicArtist.length > 0) {
        data.artist = musicArtist[0].textContent;
    }
    post_hvml_event_with_data('stateChange', musicPlayer, data);
}

var music_player_post_progress_time;
function closure_for_music_player() {
    const musicPlayer = document.getElementById('theMusicPlayer');
    musicPlayer.volume = 0.8;

    musicPlayer.addEventListener('timeupdate', event => {
        if (musicPlayer.duration) {
            let curr_minutes = parseInt(musicPlayer.currentTime / 60);
            let curr_seconds = parseInt(musicPlayer.currentTime - 60 * curr_minutes);

            let total_minutes = parseInt(musicPlayer.duration / 60);
            let total_seconds = parseInt(musicPlayer.duration - 60 * total_minutes);

            let playProgresses = document.querySelectorAll(".music-play-progress");
            playProgresses.forEach(function(progress) {
                progress.previousSibling.textContent = curr_minutes.toString().padStart(2, "0") + ":" + curr_seconds.toString().padStart(2, "0");
                progress.nextSibling.textContent = total_minutes.toString().padStart(2, "0") + ":" + total_seconds.toString().padStart(2, "0");
                progress.firstChild.style = "width:" + (musicPlayer.currentTime / musicPlayer.duration * 100) + "%";
            });
            post_music_player_event({
                type:"musicPlayer",
                name:"timeupdate",
                duration:musicPlayer.duration,
                currentTime:musicPlayer.currentTime,
                progress: (musicPlayer.currentTime / musicPlayer.duration * 100),
                prevContent:curr_minutes.toString().padStart(2, "0") + ":" + curr_seconds.toString().padStart(2, "0"),
                nextContent:total_minutes.toString().padStart(2, "0") + ":" + total_seconds.toString().padStart(2, "0"),
                progressFill: "width:" + (musicPlayer.currentTime / musicPlayer.duration * 100) + "%"
            });
        }
    });
    musicPlayer.addEventListener('play', event => {
        post_music_player_playstate_event('playing');
    });
    musicPlayer.addEventListener('pause', event => {
        post_music_player_playstate_event('paused');
    });

    const musicVolumeControllers = document.querySelectorAll('.range-for-music-volume');
    musicVolumeControllers.forEach(function(range) {
        range.addEventListener('change', function(evt) {
            musicPlayer.volume = evt.target.value / 100.0;

            musicVolumeControllers.forEach(function(other) {
                if (other != evt.target) {
                    other.value = evt.target.value;
                }
            });

            post_hvml_event_with_data('stateChange', musicPlayer, {
                type:"musicPlayer",
                name:"volumeChange",
                volume:evt.target.value
            });
        });

        range.previousSibling.addEventListener('click', event => {
            if (musicPlayer.muted) {
                musicPlayer.muted = false;
            }
            else {
                musicPlayer.muted = true;
            }

            musicVolumeControllers.forEach(function(other) {
                if (musicPlayer.muted) {
                    other.previousSibling.firstChild.classList.replace('text-secondary', 'text-danger');
                    other.nextSibling.firstChild.classList.replace('text-primary', 'text-secondary');
                }
                else {
                    other.previousSibling.firstChild.classList.replace('text-danger', 'text-secondary');
                    other.nextSibling.firstChild.classList.replace('text-secondary', 'text-primary');
                }
            });
            post_music_player_event({
                type:"musicPlayer",
                name:"mutedChange",
                muted:musicPlayer.muted
            });
        });
    });
}

function music_player_mute_click() {
    const musicPlayer = document.getElementById('theMusicPlayer');
    if (musicPlayer.muted) {
        musicPlayer.muted = false;
    }
    else {
        musicPlayer.muted = true;
    }

    const musicVolumeControllers = document.querySelectorAll('.range-for-music-volume');
    musicVolumeControllers.forEach(function(other) {
        if (musicPlayer.muted) {
            other.previousSibling.firstChild.classList.replace('text-secondary', 'text-danger');
            other.nextSibling.firstChild.classList.replace('text-primary', 'text-secondary');
        }
        else {
            other.previousSibling.firstChild.classList.replace('text-danger', 'text-secondary');
            other.nextSibling.firstChild.classList.replace('text-secondary', 'text-primary');
        }
    });
    post_music_player_event({
        type:"musicPlayer",
        name:"mutedChange",
        muted:musicPlayer.muted
    });
}

function music_player_volume_change(value) {
    const musicPlayer = document.getElementById('theMusicPlayer');
    musicPlayer.volume = value / 100.0;
    const musicVolumeControllers = document.querySelectorAll('.range-for-music-volume');
    musicVolumeControllers.forEach(function(other) {
        other.value = value;
    });
}

function closure_for_timer_picker() {
    const timePickers = document.querySelectorAll('hipicker.time');
    timePickers.forEach(function(picker) {
        picker.addEventListener('change', function(evt) {
            var hour, minute;
            if (evt.target.classList.contains('hour')) {
                hour = parseInt(evt.target.value);
                minute = parseInt(evt.target.nextSibling.value);
            }
            else {
                hour = parseInt(evt.target.previousSibling.value);
                minute = parseInt(evt.target.value);
            }

            let timeId = evt.target.getAttribute('for');
            let timeElem = document.getElementById(timeId);
            let value = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
            timeElem.textContent = value;
            timeElem.setAttribute('value', value);

            on_any_input();
            post_hvml_event('change', timeElem);
        });

        /* not work
        picker.addEventListener('mousemove', function(evt) {
            evnt.stopImmediatePropagation();
        });

        picker.addEventListener('touchmove', function(evt) {
            evnt.stopImmediatePropagation();
        }); */
    });
}

function reset_music_progress(selector)
{
    music_player_post_progress_time = 0;
    let playProgresses = document.querySelectorAll(selector);
    playProgresses.forEach(function(progress) {
        progress.previousSibling.textContent = "00:00";
        progress.nextSibling.textContent = "--:--";
        progress.firstChild.style = "width:0%";
    });

    post_music_player_music_change_event();
}

window.addEventListener("load", (event) => {
    let elem = document.getElementById("mainContent");
    post_hvml_event('load', elem);
});

closure_for_music_player();
closure_for_timer_picker();

