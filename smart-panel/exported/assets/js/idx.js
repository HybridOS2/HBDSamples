function show_page(page_id) {
    $(page_id).removeClass('d-none');
}

function hide_page(page_id) {
    $(page_id).addClass('d-none');
}

function switch_to_network() {
    hide_page("#id_load_page");
    show_page("#id_network_page");
}

function switch_to_main() {
    hide_page("#id_load_page");
    hide_page("#id_network_page");
    show_page("#id_main_page");
}



