const streamer = document.getElementById('streamers');
const streamerLive = document.getElementById('streamers-live');

const spinner = document.getElementById('spinner');
const spinnerC = document.getElementById('spinner-contend');

const spinnersLive = document.getElementById('spinnerslive');
const spinnerLive = document.getElementById('spinnerLive');

const templateOffline = document.getElementById('offline').content;
const templateLive = document.getElementById('live').content;
const fragment = document.createDocumentFragment();
const urlLive = 'https://api.twitch.tv/helix/streams?user_login=';
const token = { method: "GET", headers: {"Authorization": "Bearer s2t89l66iaso9cr6g0kyin3ovebl0i", "Client-Id": "9evi49kf49azcz9t4si807u6e0sban" }};

document.addEventListener('DOMContentLoaded', () => {
    streamers();
});

const streamers = async ()=> {
    try {
        const res = await fetch('../json/list-streamer.json');
        const data = await res.json();
        checkData(data);
    } catch (error) {
        console.log(error, "adf");
    };
};

const checkData = async (data) => {
    const streamerCheked = data;
    try {
        let total = streamerCheked.length;
        for (let i = 0; i < total; i++) {
            let name = streamerCheked[i].streamer;
            name = await axios(urlLive+`${name}`, token);
            if (name.data.data[0] === undefined) {streamerCheked[i].live = false};  
        };
        let live = streamerCheked.filter(streamer=> streamer.live == true);
        let offline = streamerCheked.filter(streamer=> streamer.live == false);
        checkOffline(offline);
        checkLive(live);
    } catch (error) {
        console.log(error);
    };
};

const checkOffline = (offline)=>{
    let link = "https://api.twitch.tv/helix/users?";
    for (let i = 0; i < offline.length; i++) {
        let name = offline[i].streamer;
        link += `login=${name}&`;
    };
    fetchOffline(link);
};

const checkLive = (live)=>{
    let linkUser = 'https://api.twitch.tv/helix/users?';
    let linkStreams = 'https://api.twitch.tv/helix/streams?';
    for (let i = 0; i < live.length; i++) {
        let name = live[i].streamer;
        linkUser += `login=${name}&`;
        linkStreams += `user_login=${name}&`;
    }
    fetchLive(linkUser, linkStreams);
}

const fetchLive = async (linkUser, linkStreams) => {
    if(linkUser.length <= 34 && linkStreams.length <= 36){
        return;
    }
    try {
        const linkS = await fetch(linkUser, token);
        const linkU = await fetch(linkStreams, token);
        const dataS = await linkS.json();
        const dataU = await linkU.json();
        console.log("dataS", dataS, "dataU", dataU)
        painLive(dataS,dataU)
        spinnersLive.classList.remove("spinner-contend");
        spinnerLive.classList.remove("spinner");
    } catch (error) {
        console.log(error);
    };  
};


const fetchOffline = async (link) => {
    try {
        const res = await fetch(link, token);
        const data = await res.json();
        painOffline(data);
        spinnerC.classList.remove("spinner-contend");
        spinner.classList.remove("spinner");
    } catch (error) {
        console.log(error);
    };  
};

const painOffline = (data) =>{
    for (let i = 0; i < data.data.length; i++) {
        let imgP = data.data[i].profile_image_url;
        let nameP = data.data[i].display_name.toUpperCase();
        let viewerT = data.data[i].view_count.toLocaleString('en-US');
        let description = data.data[i].description;
        let partnerT = data.data[i].broadcaster_type;


        templateOffline.querySelector('#Img').setAttribute('src', imgP);
        templateOffline.querySelector('#Name').textContent = nameP;
        templateOffline.querySelector('#viwers').textContent = viewerT;
        templateOffline.querySelector('#description').textContent = description;
        if(partnerT === "affiliate"){
            templateOffline.querySelector('#partner').innerHTML = ``;
        }

        const clone = templateOffline.cloneNode(true);
        fragment.appendChild(clone);
        streamer.appendChild(fragment);
    };
}

const painLive = (dataS,dataU) =>{
    console.log(dataS.data.length)
    console.log(dataS)
    for (let i = 0; i < dataS.data.length; i++) {
        let imgP = dataS.data[i].profile_image_url;
        let nameP = dataS.data[i].display_name.toUpperCase();
        let viewerT = dataS.data[i].view_count.toLocaleString('en-US');
        let description = dataS.data[i].description;
        let partnerT = dataS.data[i].broadcaster_type;

        templateLive.querySelector('#img-live').setAttribute('src', imgP);
        templateLive.querySelector('#name-live').textContent = nameP;
        templateLive.querySelector('#viwers-live').textContent = viewerT;
        templateLive.querySelector('#description-live').textContent = description;
        if(partnerT === "affiliate"){
            templateLive.querySelector('#partner-live').innerHTML = ``;
        }
        const clone = templateLive.cloneNode(true);
        fragment.appendChild(clone);
        streamerLive.appendChild(fragment);
    };
}



// ibai
// elded
// victorvaldivia
// werlyb
// thegrefg
// xokas
// akim
// nissaxter
// auronplay
// rubius
// bysTaXx