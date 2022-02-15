const animediv = document.querySelector('.anime-div')

// async await
let anime = []
let facts = []
let listDisplay = []

const getTodos = async () => {
    const response = await fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
    const data = await response.json();
    anime = data.data.map((result, index) => 
    ({
        ...result
    }));
 
    displayAnime(anime)

};


function displayAnime(data){
    // console.log(data)
    function removeUnderline(str) {
        var i, frags = str.split('_');
        for (i=0; i<frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
      }

      

    const pokemonHTMLString = data
        .map((animeList) => `
        <li class="anime" onclick="showFacts(this)" id="${animeList.anime_name}">
            <div class="img-container">
                <img class="card-image" src="${animeList.anime_img}"/>
            </div>    
            <div class="side" onclick="flipCard(this)">
                <div class="info">
                    <span class="number">#${animeList.anime_id.toString().padStart(3, '0')}</span>
                    <h3 class="name"> ${removeUnderline(animeList.anime_name)} </h3>  
                </div>
                <div class="facts"></div>
                <div class="voice">
                    <form action="#">
                    <div class="row" style="display:none;">
                        <label>Enter Text</label>
                        <textarea class="textarea"></textarea>
                    </div>
                    <div class="row" style="display:none;">
                        <label>Select Voice</label>
                        <div class="outer">
                        <select class="select"></select>
                        </div>
                    </div>
                    <i onclick="soundOn(this)" class="icon fa-solid fa-volume-high"></i>
                    </form>
               
                </div>
                </div>
                
                </li>
                `
                )
                
                .join('');
                animediv.innerHTML = pokemonHTMLString;
                // console.log(animediv)
                
                // <i class="fa-solid fa-volume-xmark"></i>
    const displayList = document.querySelectorAll('.anime')
    let randomList = displayList[Math.floor(Math.random()*displayList.length)]
 
    randomList.style.display = "block"
}

const showFacts = async (name) => {
    const url = `https://anime-facts-rest-api.herokuapp.com/api/v1/${name.id}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(Animefacts)
    facts = data.data.map((result, index) => 
    ({
        ...result
    }));
    showAnimeFacts(facts ,name)
    // console.log(name.id)
    
}


function showAnimeFacts(data, name){
     // console.log(data)
    // const side = document.querySelector('.side')

    const randomData = data[Math.floor(Math.random()*data.length)]
console.log()
    const animeFactsString =  
        `<span>Facts: ${randomData.fact}</span>
        `
    // animediv.innerHTML = pokemonHTMLString;
    
    const factdiv = name.querySelector('.facts')
    // const side = name.querySelector('.side')
    const imgContainer = name.querySelector('.img-container')
    // console.log(animeFactsString)
    factdiv.innerHTML = animeFactsString
    
    // imgContainer.style.display = "none"
    name.classList.add('sideActive')
    // name.style.pointerEvents = "none"
    // const sound = name.querySelector('.side')
    // sound.style.pointerEvents = "all"
    // // name.style.pointerEvents = "none"
}


function soundOn(sound){
    const content = sound.parentElement.parentElement.parentElement.querySelector('.facts')
    const textarea = sound.parentElement.querySelector('.textarea')
    const voiceList = sound.parentElement.querySelector('.select')

    let synth = speechSynthesis,
    isSpeaking = true;
    voices();
    function voices(e){
        for(let voice of synth.getVoices()){
            let selected = voice.name === "Google US English" ? "selected" : "";
            
        }
    }
    synth.addEventListener("voiceschanged", voices);
    function textToSpeech(text){
        let utterance = new SpeechSynthesisUtterance(text);
        for(let voice of synth.getVoices()){
            if(voice.name === voiceList.value){
                utterance.voice = voice;
            }
        }
        synth.speak(utterance);
    }
    sound.addEventListener('click', (e) => {
        
        e.stopPropagation();
        e.preventDefault();

            if(!synth.speaking){
                textToSpeech(content.textContent);
            }
            if(content.textContent.length > 80){
                setInterval(()=>{
                    if(!synth.speaking && !isSpeaking){
                        isSpeaking = true;
                    }else{
                    }
                }, 500);
                if(isSpeaking){
                    synth.resume();
                    isSpeaking = false;
                }else{
                    synth.pause();
                    isSpeaking = true;
                }
            }else{
            }
        
        // if(sound.classList.contains('fa-volume-high')){
        //     sound.classList.remove('fa-volume-high')
        //     sound.classList.add('fa-volume-xmark')
        // }else{
        //     sound.classList.add('fa-volume-high')
        //     sound.classList.remove('fa-volume-xmark')
        // }
    })
}



const btn_refresh = document.querySelector('.btn-refresh')
btn_refresh.addEventListener('click', () => {
  
    
    const displayListtwo = document.querySelectorAll('.anime')
    let refresh = displayListtwo[Math.floor(Math.random()*displayListtwo.length)]
    displayListtwo.forEach(i => {
        i.style.display = "none"
    })
    refresh.style.display = "block"
    // console.log(refresh)
})

function flipCard(myfactcontainer){
    const flipin = myfactcontainer.parentElement
    const side = document.querySelectorAll('.side')
    // flipin.classList.remove('sideActive')
    side.forEach(i => {
        // i.style.pointerEvents = "all"
        i.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const flip = e.target.parentElement
            flipin.classList.remove('sideActive')
        })
    })

}

const info_modal = document.querySelector('.info_modal')

info.addEventListener('click', (e) => {
    info_modal.classList.add('modal_active')
  
    info_modal.addEventListener('click', (e) => {
        if(e.target.classList.contains("modal_active")){
            info_modal.classList.remove('modal_active')
        }
    })
})


const themeBg = document.querySelector('#themeBg')
const allBg = document.querySelectorAll('.slide')
themeBg.addEventListener('click', () => {
    
    allBg.forEach(i => {
        i.style.display = "none"
    })
    let randomBg = allBg[Math.floor(Math.random()*allBg.length)]
    randomBg.style.display = "block";
})


function changeDefaultBg(){
    allBg.forEach(i => {
        i.style.display = "none"
    })
    let randomBg = allBg[Math.floor(Math.random()*allBg.length)]
    randomBg.style.display = "block";
}
changeDefaultBg()

getTodos()
    // .then(data => console.log(data));
 
// fetch('mario.json').then((response) => {
//     console.log('resolved', response)
//     return response.json();
// }).then(data => {
//     console.log(data)
// }).catch((err) => {
//     console.log('rejected', err)
// });


