function closure_for_lockscreen() {
    var lock_count = 0;
    const mainContent = document.getElementById('mainContent');
    const lockScreen = document.getElementById('theLockScreen');
    const lockOffcanvas = new bootstrap.Offcanvas('#theLockScreen');

    function on_any_input(evt) {
        lock_count = 0;
    }

    function post_event(evt) {
        let data = {
            originTag: lockScreen.tagName,
            originHandle: lockScreen.hvmlHandleText,
            originId: lockScreen.id,
            originClass: lockScreen.className,
            originName: lockScreen.getAttribute('name'),
            originValue: (typeof(lockScreen.value) === 'undefined') ? lockScreen.getAttribute('value') : lockScreen.value,
            targetDiffersOrigin: false,
        };

        HVML.post(evt, "id", lockScreen.id, JSON.stringify(data));
    }

    var lock_timer;
    lockScreen.addEventListener('hidden.bs.offcanvas', event => {
        lock_count = 0;
        lock_timer = setInterval(() => {
            lock_count += 1;
            let lock_time = parseInt(lockScreen.getAttribute('data-time-to-lock'));
            if (lock_count >= lock_time) {

                bootstrap.Offcanvas.getInstance(lockScreen).show();

                lock_count = 0;
            }
        }, 1000);

        mainContent.addEventListener("mousedown", on_any_input);
        mainContent.addEventListener("keydown", on_any_input);
        mainContent.addEventListener("touchstart", on_any_input);
        mainContent.addEventListener("touchmove", on_any_input);
        post_event('unlocked');
    });

    lockScreen.addEventListener('shown.bs.offcanvas', event => {
        clearInterval(lock_timer);
        mainContent.removeEventListener("mousedown", on_any_input);
        mainContent.removeEventListener("keydown", on_any_input);
        mainContent.removeEventListener("touchstart", on_any_input);
        mainContent.removeEventListener("touchmove", on_any_input);
        post_event('locked');
    });
}

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
        }
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
        });
    });
}

function reset_music_progress(selector)
{
    let playProgresses = document.querySelectorAll(selector);
    playProgresses.forEach(function(progress) {
        progress.previousSibling.textContent = "00:00";
        progress.nextSibling.textContent = "--:--";
        progress.firstChild.style = "width:0%";
    });
}

closure_for_lockscreen();
closure_for_music_player();

