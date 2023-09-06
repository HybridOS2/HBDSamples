$('#id_load').hide();

function show_elem(page_id) {
    $(page_id).removeClass('d-none');
}

function hide_elem(page_id) {
    $(page_id).addClass('d-none');
}

function switch_normal()
{
    show_elem('#id_network_title');
    hide_elem('#id_network_btn');
}

function switch_retry()
{
    hide_elem('#id_network_title');
    show_elem('#id_network_btn');
}

function switch_main_page()
{
    hide_elem('#id_network');
}

function hide_title()
{
    hide_elem('#id_network_title');
}

function stop_anim()
{
    $('#id_network_icon').removeClass('network__icon__anim');
}

switch_normal();
