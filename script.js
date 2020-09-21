const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const imgContainer = document.getElementById('img-container');
const heroName = document.getElementById('name');
const VoiceRSS={speech(e){this._validate(e),this._request(e)},_validate(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){let a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw`The browser does not support the audio codec ${e.c}`}},_request(e){const a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;let e=t.responseText;audioElement.src=e,audioElement.onloadedmetadata=(()=>{audioElement.play()})}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest(e){const a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return`key=${e.key||""}&src=${e.src||""}&hl=${e.hl||""}&r=${e.r||""}&c=${a||""}&f=${e.f||""}&ssml=${e.ssml||""}&b64=true`},_detectCodec(){const e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

function herosName(newName) {
    console.log('tell me:', newName)
        VoiceRSS.speech({
            key: '8a94151a18f94381914e22f7604f982e',   
            src: newName,
            hl: 'en-us',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        })
}

async function getHeroData() {
let newName;
imgContainer.innerHTML ='';
const proxyUrl = 'https://limitless-everglades-36779.herokuapp.com/';
const apiKey = 129149688919159;
let superHero = Math.floor(Math.random() * 731) + 1 
const apiURL = `https://superheroapi.com/api/${apiKey}/${superHero}`;
try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    console.log(imgContainer)
    imgContainer.innerHTML += `<img src="${data.image.url}" alt="Placheholder Image" />`
    if(data.name === '') {
        console.log(data.name)
    } else {
        heroName.innerText = `${data.name}`
        newName = data.name;
    }
    // Text-to-Speech function
    herosName(newName)
    // Disable Button
    toggleButton();
} catch(error) {
    console.log(error)
}
}

button.addEventListener('click', getHeroData)