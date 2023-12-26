var player = videojs('my-video',{
    controlBar:{
        fullscreenToggle:false
    },
    autoplay: false
})
videojs.hook('beforeerror',(player,err)=>{
    alert("err");
    return null
})
