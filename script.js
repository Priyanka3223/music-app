
let songs=[{songName:"salam-e-ishq",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
{songName:"nira ishq",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
{songName:"pasoori",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
{songName:"love dose",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
{songName:"dil chori",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
{songName:"jaani tera naah",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
{songName:"channa mereya",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
{songName:"sanu ik pal chain",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
{songName:"cute munda",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
]
let defaulttime=[4.25,1.82,2.76,2.28,2.26,1.89,2.89,"2.10",2.23];

let i=0;
let songitem=Array.from(document.getElementsByClassName('songitem'))
let songname=document.getElementsByClassName('songname');
let audio=new Audio('songs/1.mp3');
let masterPlay= document.getElementById('master');
let progress=document.getElementById('bar');
let gif=document.getElementById('s');
// let t=progress.value*audio.duration;
// console.log(audio.duration);

// naming all songs and placing images
songitem.forEach((element)=>{
    element.getElementsByClassName('songname')[0].innerHTML=songs[i].songName;
    element.getElementsByClassName('img')[0].src=songs[i].coverPath;
    // tim[i].innerHTML=progress.value * audio.duration/100;
    i++;
})

const settime=()=>{
    for(let j=1;j<=9;j++){
        document.getElementById(`tim${j}`).innerHTML=defaulttime[j-1];
    }
}
settime();

// changing buttons on playing and pausing 
const makeAllplay=()=>{
    Array.from(document.getElementsByClassName('play')).forEach((e)=>{
        e.classList.remove('fa-circle-pause');
        e.classList.add('fa-circle-play');
    })
}

//playing song on clicking the buttons near song name
let songi=0;
let vis=[0,0,0,0,0,0,0,0,0];
Array.from(document.getElementsByClassName('play')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songi=parseInt(e.target.id);
        if(audio.paused || audio.currentTime<=0){
            audio.currentTime=0;
            makeAllplay();
            settime();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            vis[songi]=1;
            audio.src=`songs/${songi}.mp3`;
            audio.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        }
        else if(vis[songi]==1){
            audio.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity=0;
            vis[songi]=0;
        }
        else{
            makeAllplay();
            settime();
            vis=[0,0,0,0,0,0,0,0,0];
            vis[songi]=1;
            audio.src=`songs/${songi}.mp3`;
            audio.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
})

//handle master play button
masterPlay.addEventListener('click',()=>{
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audio.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// regularly changing sliding bar according to song duration
audio.addEventListener('timeupdate',()=>{
    //update seekbar
    prog = parseInt((audio.currentTime/audio.duration)*100);
    // console.log(prog);
    progress.value=prog;
    let t=audio.currentTime;
    t=parseFloat(t/100)
    let e=document.getElementById(`tim${songi}`);
    e.innerHTML=t.toFixed(2);

})

// forwarding song time according to changes slider
progress.addEventListener('change',()=>{
    let t=progress.value * audio.duration/100;
    console.log(t);
    audio.currentTime=t;
    t=parseFloat(t/100)
    let e=document.getElementById(`tim${songi}`);
    e.innerHTML=t.toFixed(2);
})

// handling forward and previous buttons
document.getElementById('prev').addEventListener('click',()=>{
    songi--;
    if(songi<=0){
        songi=9;
    }
    // console.log(songi);
    makeAllplay();
    settime();
    audio.currentTime=0;
    audio.src=`songs/${songi}.mp3`;
    audio.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
    let e=document.getElementById(`${songi}`);
    e.classList.remove('fa-circle-play');
    e.classList.add('fa-circle-pause');
    gif.style.opacity=1;
})
const nex=()=>{
    songi++;
    if(songi>9){
        songi=1;
    }
    // console.log(songi);
    makeAllplay();
    settime();
    audio.currentTime=0;
    audio.src=`songs/${songi}.mp3`;
    audio.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
    let e=document.getElementById(`${songi}`);
    e.classList.remove('fa-circle-play');
    e.classList.add('fa-circle-pause');
    gif.style.opacity=1;

}
document.getElementById('next').addEventListener('click',()=>{
    nex();
})


// if song is completed then play next song
audio.addEventListener('timeupdate',()=>{
    //update seekbar
    let t=audio.currentTime;
    t=parseFloat(t/100);
    t=t.toFixed(2);
    if(t==defaulttime[songi-1]){
        nex();
    }
})

// enabling shuffle button
// shuffle=document.getElementById('sh');
document.getElementById('sh').addEventListener('click',()=>{
    let r=Math.floor(Math.random()*9)+1;
    songi=r;
    makeAllplay();
    settime();
    audio.currentTime=0;
    audio.src=`songs/${songi}.mp3`;
    audio.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
    let e=document.getElementById(`${songi}`);
    e.classList.remove('fa-circle-play');
    e.classList.add('fa-circle-pause');
    gif.style.opacity=1;
})

// changing login button on clicking

const login=document.getElementById('log');
const logout=document.getElementById('logout');

login.addEventListener('click',()=>{
    console.log("clicked");
    login.style.display=none;
    logout.style.display=block;
})


app.get('/play',(req,res)=>{
    const email=req.email;
})
