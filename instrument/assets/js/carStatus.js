function openDoor(type){
    if(type.value == 'LeftFront'){
        document.querySelector(".carDoorLeftFrontSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-left-front-selected.png"
        document.querySelector(".carDoorLeftFrontSelected").style.transform = "rotate(45deg)"
    }
    if(type.value == 'LeftRear'){
        document.querySelector(".carDoorLeftRearSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-left-rear-selected.png"
        document.querySelector(".carDoorLeftRearSelected").style.transform = "rotate(-45deg)"
    }
    if(type.value == 'RightFront'){
        document.querySelector(".carDoorRightFrontSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-right-front-selected.png"
        document.querySelector(".carDoorRightFrontSelected").style.transform = "rotate(-45deg)"
    }
    if(type.value == 'RightRear'){
        document.querySelector(".carDoorRightRearSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-right-rear-selected.png"
        document.querySelector(".carDoorRightRearSelected").style.transform = "rotate(45deg)"
    }
    
}

function closeDoor(type){
    if(type.value == 'LeftFront'){
        document.querySelector(".carDoorLeftFrontSelected").style.transform = "rotate(0deg)"
        document.querySelector(".carDoorLeftFrontSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-left-front.png"
    }
    if(type.value == 'LeftRear'){
        document.querySelector(".carDoorLeftRearSelected").style.transform = "rotate(0deg)"
        document.querySelector(".carDoorLeftRearSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-left-rear.png"
    }
    if(type.value == 'RightFront'){
        document.querySelector(".carDoorRightFrontSelected").style.transform = "rotate(-45deg)"
        document.querySelector(".carDoorRightFrontSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-right-front.png"
    }
    if(type.value == 'RightRear'){
        document.querySelector(".carDoorRightRearSelected").style.transform = "rotate(45deg)"
        document.querySelector(".carDoorRightRearSelected").src = "hvml://localhost/_system/_filesystem/-/app/instrument/assets/img/car-door-right-rear.png"
    }
    
}