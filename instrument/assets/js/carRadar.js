function radarShow(str){
    console.log(str);
    str=str.value;
    if(!str){
        return;
    }
    radars = str.split(",");
    document.querySelectorAll(".radar-line").forEach(Element=>{
        Element.style.visibility = "hidden"
    })
    radars.forEach(item => {
        radar = item.split('-')
        document.querySelector(".radar-line.radar-level-"+radar[0]+".radar-left-"+radar[1]).style.visibility="visible"
    });
}