function show_elem(elem_id) {
    $(elem_id).removeClass('d-none');
}

function hide_elem(elem_id) {
    $(elem_id).addClass('d-none');
}

function switch_normal() {
    show_elem('#id_init_status');
    hide_elem('#id_init_btns');
}

function switch_retry() {
    hide_elem('#id_init_status');
    show_elem('#id_init_btns');
}


