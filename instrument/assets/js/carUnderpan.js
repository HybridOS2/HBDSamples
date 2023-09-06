function setTire(str){
    var str = str.value;
    var tires = str.split(",");
    tires.forEach(item=>{
        var tire = item.split("-")
        var tire_document_bar = null;
        var tire_document_temp = null;
        var tire_document_img = null;
        var is_select = false
        var img_url = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/";

        tire_document_bar = document.querySelector(".carTire"+tire[0]+"Label .bar-text");
        tire_document_temp = document.querySelector(".carTire"+tire[0]+"Label .temp-text");
        tire_document_img = document.querySelector(".carTire"+tire[0]);
        if(tire[1] <= 1.8){
            document.querySelector(".carTire"+tire[0]+"Label .bar").classList.add("warn");
            is_select = true
        }else{
            document.querySelector(".carTire"+tire[0]+"Label .bar").classList.remove("warn");
        }
        if(tire[2] >= 70){
            document.querySelector(".carTire"+tire[0]+"Label .temp").classList.add("warn");
            is_select = true
        }else{
            document.querySelector(".carTire"+tire[0]+"Label .temp").classList.remove("warn");
        }

        if(is_select){
            tire_document_img.src=img_url+"car-tire-selected.png";
        }else{
            tire_document_img.src=img_url+"car-tire.png";
        }

        tire_document_bar.textContent = tire[1];
        tire_document_temp.textContent = tire[2];
        
    })
}