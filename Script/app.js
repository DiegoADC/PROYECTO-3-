const streamer = document.getElementById('streamers');
const streamerLive = document.getElementById('streamers-live');
const spinner = document.getElementById('spinner');
const spinnerC = document.getElementById('spinner-contend');
const spinnersLive = document.getElementById('spinnerslive');
const spinnerLive = document.getElementById('spinnerLive');
const templateOffline = document.getElementById('offline').content;
const templateOfflinePartner = document.getElementById('offlineP').content;
const templateLive = document.getElementById('live').content;
const templateLivePartner = document.getElementById('livePartner').content;
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

const checkLive = async(live)=>{
    for (let i = 0; i < live.length; i++) {
        const streamer = live[i].streamer;
        try {
            const linkU= await fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, token);
            const linkS = await fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer}`, token);
            const dataU = await linkS.json();
            const dataS = await linkU.json();
            const linkI = await fetch(`https://api.twitch.tv/helix/games?id=${dataU.data[0].game_id}`, token);
            const dataI = await linkI.json();
            const imgData =await dataI.data[0].box_art_url;
            painLive(dataS,dataU,imgData);
            spinnersLive.remove("spinner-contend");
            spinnerLive.remove("spinner");
        } catch (error) {
            console.log(error);
        };  
    }
}

const fetchOffline = async (link) => {
    try {
        const res = await fetch(link, token);
        const data = await res.json();
        painOffline(data);
        spinnerC.remove();
        spinner.remove();
    } catch (error) {
        console.log(error);
    };  
};

const painOffline = (data) =>{
    for (let i = 0; i < data.data.length; i++) {
        const imgP = data.data[i].profile_image_url;
        const nameP = data.data[i].display_name.toUpperCase();
        const viewerT = data.data[i].view_count.toLocaleString('en-US');
        const description = data.data[i].description;
        const partnerT = data.data[i].broadcaster_type;
        const url = `https://www.twitch.tv/${nameP}`;
        let partnerComp = templateOfflinePartner;

        if(partnerT === "affiliate") {
            partnerComp = templateOffline;
        };

        partnerComp.querySelector('#Img').setAttribute('src', imgP);
        partnerComp.querySelector('#Name').textContent = nameP;
        partnerComp.querySelector('#Name').setAttribute('href', url);
        partnerComp.querySelector('#viwers').textContent = viewerT;
        partnerComp.querySelector('#description').textContent = description;

        const clone = partnerComp.cloneNode(true);
        fragment.appendChild(clone);
        streamer.appendChild(fragment);
    };
}

const painLive = (dataS,dataU,imgGame) =>{
    for (let i = 0; i < dataS.data.length; i++) {
        const imgP = dataS.data[i].profile_image_url;
        const nameP = dataS.data[i].display_name.toUpperCase();
        const viewerT = dataS.data[i].view_count.toLocaleString('en-US');
        const description = dataS.data[i].description;
        const partnerT = dataS.data[i].broadcaster_type;
        const viwersL = dataU.data[i].viewer_count.toLocaleString('en-US');
        const descriptionL = dataU.data[i].title;
        const url = `https://www.twitch.tv/${nameP}`;
        let partnerComp = templateLivePartner;

        const gameImg = imgGame.replace("{width}x{height}", "300x400");
        if(partnerT === "affiliate") {
            partnerComp = templateLive;
        };
        partnerComp.querySelector('#viwersLive').textContent = viwersL;
        partnerComp.querySelector('#descriptionLive').textContent = descriptionL;
        partnerComp.querySelector('#img-live').setAttribute('src', imgP);
        partnerComp.querySelector('#name-live').textContent = nameP;
        partnerComp.querySelector('#name-live').setAttribute('href', url);
        partnerComp.querySelector('#viwers-live').textContent = viewerT;
        partnerComp.querySelector('#description-live').textContent = description;
        partnerComp.querySelector('#imgGame').setAttribute('src', gameImg);

        const clone = partnerComp.cloneNode(true);
        fragment.appendChild(clone);
        streamerLive.appendChild(fragment);
    };
}

