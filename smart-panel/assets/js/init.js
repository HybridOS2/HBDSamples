function show_elem(elem_id) {
    var element = document.getElementById(elem_id);
    element.classList.remove("d-none");
}

function hide_elem(elem_id) {
    var element = document.getElementById(elem_id);
    element.classList.add("d-none");
}

function switch_normal() {
    show_elem('id_init_status');
    hide_elem('id_init_btns');
}

function switch_retry() {
    hide_elem('id_init_status');
    show_elem('id_init_btns');
}

function close_window() {
    window.close();
}

