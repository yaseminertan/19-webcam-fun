const canvas=document.querySelector(".photo");
const video=document.querySelector(".player");
const strip=document.querySelector(".strip");
const snap=document.querySelector(".snap");
const ctx=canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({video:true,audio:false})
.then(localMediaStream => {
    console.log(localMediaStream);
    video.srcObject = localMediaStream;
  //  video.src=window.URL.createObjectURL(localMediaStream);
    video.play();
});

canvas.width=video.videoWidth;
canvas.height=video.videoHeight;
setInterval(() => { ctx.drawImage(video,0,0,canvas.width,canvas.height); } , 16);
