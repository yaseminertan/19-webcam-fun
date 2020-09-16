const canvas=document.querySelector(".photo");
const video=document.querySelector(".player");
const strip=document.querySelector(".strip");
const snap=document.querySelector(".snap");
const ctx=canvas.getContext('2d');
 let red=false;
navigator.mediaDevices.getUserMedia({video:true,audio:false})
.then(localMediaStream => {
    console.log(localMediaStream);
    video.srcObject = localMediaStream;
    video.play();
});
let redInterval,rgbInterval;
const firstInterval=setInterval(() => 
{ 
    ctx.drawImage(video,0,0,canvas.width,canvas.height); 
} , 16);

function takePhoto()
 {
    snap.currentTime=0;
    snap.play();
    const data=canvas.toDataURL('image/jpeg');
    const link=document.getElementById('link');
    //link.href=data;
    link.setAttribute('download','pretty');
    link.textContent='download image';
    link.innerHTML=`<img src="${data}" />`;
 }

 function redEffect()
 {
    clearInterval(firstInterval);
    clearInterval(rgbInterval);
    clearInterval(redInterval);
    redInterval=setInterval(() => 
    { 
        ctx.drawImage(video,0,0,canvas.width,canvas.height); 
        let pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let i=0;i<pixels.data.length;i+=4)
        {
            pixels.data[i]+=100;
            pixels.data[i+1]-=50;
            pixels.data[i+2]*=0,5;
        }
        ctx.putImageData(pixels,0,0);
    } , 16);
 }
 function rgbSplit()
 {
    clearInterval(firstInterval);
    clearInterval(redInterval);
    clearInterval(rgbInterval);
    rgbInterval=setInterval(() => 
    { 
        ctx.drawImage(video,0,0,canvas.width,canvas.height); 
        let pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
        for(let i=0;i<pixels.data.length;i+=4)
        {
            pixels.data[i-150]=pixels.data[i];
            pixels.data[i+100]=pixels.data[i+1];
            pixels.data[i-150]=pixels.data[i+2];
        }
       // ctx.globalAlpha=0.1;
        ctx.putImageData(pixels,0,0);
    } , 1);
 }
