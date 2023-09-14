function init() {
    var lock_count = 0;
    const mainContent = document.getElementById('mainContent');
    const lockScreen = document.getElementById('theLockScreen');
    const lockOffcanvas = new bootstrap.Offcanvas('#theLockScreen');

    function on_any_input(evt) {
        lock_count = 0;
    }

    var lock_timer;
    lockScreen.addEventListener('hidden.bs.offcanvas', event => {
        lock_count = 0;
        lock_timer = setInterval(() => {
            lock_count += 1;
            let lock_time = parseInt(lockScreen.getAttribute('data-time-to-lock'));
            if (lock_count >= lock_time) {

                bootstrap.Offcanvas.getInstance(lockScreen).show();

                let data = {
                    targetTagName: lockScreen.tagName,
                    targetHandle: lockScreen.hvmlHandleText,
                    targetId: lockScreen.id,
                    targetClass: lockScreen.className
                };

                HVML.post('locked', "id", lockScreen.id, JSON.stringify(data));
                lock_count = 0;
            }
        }, 1000);

        mainContent.addEventListener("mousedown", on_any_input);
        mainContent.addEventListener("keydown", on_any_input);
        mainContent.addEventListener("touchstart", on_any_input);
        mainContent.addEventListener("touchmove", on_any_input);
    });

    lockScreen.addEventListener('shown.bs.offcanvas', event => {
        clearInterval(lock_timer);
        mainContent.removeEventListener("mousedown", on_any_input);
        mainContent.removeEventListener("keydown", on_any_input);
        mainContent.removeEventListener("touchstart", on_any_input);
        mainContent.removeEventListener("touchmove", on_any_input);
    });
}

init();

