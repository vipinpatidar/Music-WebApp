console.log('soptify is running');

// intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/6.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =  Array.from(document.querySelectorAll('.songItem'))
let songIconPlay = Array.from(document.querySelectorAll('.songIconPlay'));

// ====================================================================================================

// all songs in a array

let songs = [
    {songName: "No Love [By VMB]" , filePath: 'songs/1.mp3' , coverPath: 'covers/1.jpg'},
    {songName: "Raatan Lambiyan Song [By VMB]" , filePath: 'songs/2.mp3' , coverPath: 'covers/2.jpg'},
    {songName: "Elevated [By VMB]" , filePath: 'songs/3.mp3' , coverPath: 'covers/3.jpg'},
    {songName: "The Night We Met  [By VMB]" , filePath: 'songs/4.mp3' , coverPath: 'covers/4.jpg'},
    {songName: "Hymn For The Weekend [By VMB]" , filePath: 'songs/5.mp3' , coverPath: 'covers/5.jpg'},
    {songName: " KOI JAYE TO LE AAYE [By VMB] " , filePath: 'songs/6.mp3' , coverPath: 'covers/6.jpg'},
    {songName: "CHIDIYA - VILEN [By VMB]" , filePath: 'songs/7.mp3' , coverPath: 'covers/7.jpg'},
    {songName: "Milne Hai Mujhse Aai [By VMB] " , filePath: 'songs/8.mp3' , coverPath: 'covers/8.jpg'},
    {songName: "MOH MOH KE DHAAGE [By VMB]" , filePath: 'songs/9.mp3' , coverPath: 'covers/9.jpg'},
    {songName: "Let Me Love You [By VMB] " , filePath: 'songs/10.mp3' , coverPath: 'covers/10.jpg'}
]
console.log(songs.length)
  
// ====================================================================================================================================

songItems.forEach((element , i)=>{
    //  console.log(element,i)
     element.querySelectorAll("img")[0].src = songs[i].coverPath;
     element.querySelectorAll('.songName')[0].innerText =songs[i].songName
})

// ====================================================================================================================================


// Hendle play and pause click 
masterPlay.addEventListener('click', ()=>{
   
    if(audioElement.paused || audioElement.currentTime<=0){

        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = "1"
        masterSongName.innerHTML = songs[songIndex].songName;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = "0";
    }
})

// ====================================================================================================================================


// listen to events on progress bar

audioElement.addEventListener('timeupdate',()=>{
    //    update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
    // if(myProgressBar.value >=100){
    //     for (let index = 0; index < songs.length; index++) {
    //          audioElement.src += `songs/${songIndex+1}.mp3`;
    //         audioElement.currentTime = 0;
    //         audioElement.play();
    //         // console.log(audioElement.src +=` songs${[[index+1]]}.filePath`);
            
    //     }
     
    // }
})

// to catch current time progress of range so we can change range of song 

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// ====================================================================================================================================


// Adding event listener at small play icon
const makeAllPlay = ()=>{
    Array.from(document.querySelectorAll('.songIconPlay')).forEach(element=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// a function to stop previous song to stop when next song play
function stopAllAudio(){
    songIconPlay.forEach(function(audio){
     audioElement.src = `songs/${Number(audio.id)+1}.mp3`;
     // audioElement.currentTime = 0;
     audioElement.pause();
   
     });
 }

// let a = stopAllAudio()
// console.log(a);


songIconPlay.forEach(element=>{
    element.addEventListener('click',(e)=>{
        e.preventDefault();

        // stopAllAudio()

        if(audioElement.paused || audioElement.currentTime<=0){

            makeAllPlay();
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerHTML = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle') 
            gif.style.opacity = "1"

            // audioElement.pause();
        }else{
            audioElement.pause();
            // stopAllAudio()
            
            makeAllPlay()
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = "0";
        }
      
    })
})

// ====================================================================================================================================


// targeting previous and next buttons

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
       songIndex=9;
    }else{
       songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerHTML = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle') 
    gif.style.opacity = "1" 
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >=9){
        songIndex= 0;
    }else{
         songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerHTML = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle') 
    gif.style.opacity = "1"
})


//playing next song if last on is ended  


// var song = new Audio();
// var currentSong = 0;
var len = songs.length;

function playSong(index) {
    
  audioElement.src = songs[index].filePath;
  audioElement.play();
}
audioElement.addEventListener("ended", function playNextS() {
      songIndex++;
      if (songIndex == len) {
        songIndex = 0;
        playSong(songIndex);
        masterSongName.innerHTML = songs[songIndex].songName;
      }
      else{
        playSong(songIndex);
        masterSongName.innerHTML = songs[songIndex].songName;
      }
    })


//     console.log(audioElement.currentTime);
    
// audioElement.currentTime
    // var minute = Math.floor(audioElement.currentTime );
//     var second = Math.floor(audioElement.currentTime % 60);
//     console.log(minute,second);
    
//     var leftTime = audioElement.duration - audioElement.currentTime;
    // document.getElementById(currentTimeIndicator).innerHTML =
    // ("0" + minute) + ":" + ("0" + second);


    /*<audio id='audioTrack' ontimeupdate='updateTrackTime(this);'>
  Audio tag not supported in this browser</audio>
<script>
function updateTrackTime(track){
  var currTimeDiv = document.getElementById('currentTime');
  var durationDiv = document.getElementById('duration');

  var currTime = Math.floor(track.currentTime).toString(); 
  var duration = Math.floor(track.duration).toString();

  currTimeDiv.innerHTML = formatSecondsAsTime(currTime);

  if (isNaN(duration)){
    durationDiv.innerHTML = '00:00';
  } 
  else{
    durationDiv.innerHTML = formatSecondsAsTime(duration);
  }
}
</script>*/