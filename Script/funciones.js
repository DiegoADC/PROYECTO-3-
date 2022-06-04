import {linkJson} from './links.js';
import {urlGames, urlFollows, urlUsers, urlStreams, urlTwitch, token} from './links.js';
// import {token} from './links.js';

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
let listStreamers;


export const streamers = async ()=> {
    try {
        const res = await fetch(linkJson);
        const data = await res.json();
        listStreamers = data
        checkData(data);
        checkDataChart(data);
    } catch (error) {
        console.log(error, "adf");
    };
};

const checkDataChart = async (data)=>{
    try {
        for (let i = 0; i < data.length; i++) {
            const linkU= await fetch(urlUsers + data[i].streamer, token);
            const dataU = await linkU.json();
            const linkF = await fetch(urlFollows + dataU.data[0].id, token);
            const dataF = await linkF.json();
            listStreamers[i].viewers = dataU.data[0].view_count
            listStreamers[i].followers = dataF.total
        }
        let viewers = listStreamers.slice().sort((streamer, otrostreamer) => otrostreamer.viewers - streamer.viewers).slice(0, 10);
        let followers = listStreamers.slice().sort((streamer, otrostreamer) => otrostreamer.followers - streamer.followers).slice(0, 10);
        painChartFollowers(followers)
        painChartViewers(viewers)
    } catch (error) {
        console.log(error)
    }
}


const checkData = async (data) => {
    try {
        for (let i = 0; i < data.length; i++) {
            const check = await fetch(urlStreams + data[i].streamer, token);
            const dataCheck = await check.json();
            if (dataCheck.data[0] === undefined) {data[i].live = false};  
        };
        let live = data.filter(streamer=> streamer.live == true);
        let offline = data.filter(streamer=> streamer.live == false);
        checkLive(live);
        checkOffline(offline);
    } catch (error) {
        console.log(error);
    };
};

const checkLive = async(live)=>{
    for (let i = 0; i < live.length; i++) {
        try {
            const linkU= await fetch(urlUsers + live[i].streamer, token);
            const linkS = await fetch(urlStreams + live[i].streamer, token);
            const dataU = await linkS.json();
            const dataS = await linkU.json();
            const linkI = await fetch(urlGames + dataU.data[0].game_id, token);
            const dataI = await linkI.json();
            const linkF = await fetch(urlFollows + dataS.data[0].id, token);
            const dataF = await linkF.json();
            const imgData =await dataI.data[0].box_art_url;
            painLive(dataS,dataU,imgData,dataF);
            spinnersLive.remove("spinner-contend");
            spinnerLive.remove("spinner");
        } catch (error) {
            console.log(error);
        };  
    }
}

const checkOffline = async(offline)=>{
    for (let i = 0; i < offline.length; i++) {
        const streamer = offline[i].streamer;
        try {
            const linkU= await fetch(urlUsers + streamer, token);
            const dataU = await linkU.json();
            const linkF = await fetch(urlFollows + dataU.data[0].id, token);
            const dataF = await linkF.json();
            painOffline(dataU,dataF);
            spinnerC.remove();
            spinner.remove();
        } catch (error) {
            console.log(error);
        };  
    }
}

const painOffline = (dataU,dataF) =>{
    for (let i = 0; i < dataU.data.length; i++) {
        const url = urlTwitch + dataU.data[i].display_name.toUpperCase();
        let partnerComp = templateOffline;
        if(dataU.data[i].broadcaster_type === "affiliate") {
            partnerComp = templateOfflinePartner;
        };

        partnerComp.querySelector('#Img').setAttribute('src', dataU.data[i].profile_image_url);
        partnerComp.querySelector('#Name').textContent = dataU.data[i].display_name.toUpperCase();
        partnerComp.querySelector('#Name').setAttribute('href', url);
        partnerComp.querySelector('#followers').textContent = dataF.total.toLocaleString('en-US');
        partnerComp.querySelector('#viwers').textContent = dataU.data[i].view_count.toLocaleString('en-US');
        partnerComp.querySelector('#description').textContent = dataU.data[i].description;;

        const clone = partnerComp.cloneNode(true);
        fragment.appendChild(clone);
        streamer.appendChild(fragment);
    };
}

const painLive = (dataS,dataU,imgGame,dataF) =>{
    for (let i = 0; i < dataS.data.length; i++) {
        const url = urlTwitch + dataS.data[i].display_name.toUpperCase();
        let partnerComp = templateLive;
        const gameImg = imgGame.replace("{width}x{height}", "300x400");
        if(dataS.data[i].broadcaster_type === "affiliate") {
            partnerComp = templateLivePartner;
        };
        partnerComp.querySelector('#img-live').setAttribute('src', dataS.data[i].profile_image_url);
        partnerComp.querySelector('#name-live').textContent = dataS.data[i].display_name.toUpperCase();
        partnerComp.querySelector('#name-live').setAttribute('href', url);
        partnerComp.querySelector('#followers').textContent = dataF.total.toLocaleString('en-US');
        partnerComp.querySelector('#viwers-live').textContent = dataS.data[i].view_count.toLocaleString('en-US');
        partnerComp.querySelector('#description-live').textContent = dataS.data[i].description;;
        partnerComp.querySelector('#viwersLive').textContent = dataU.data[i].viewer_count.toLocaleString('en-US');;
        partnerComp.querySelector('#descriptionLive').textContent = dataU.data[i].title;
        partnerComp.querySelector('#imgGame').setAttribute('src', gameImg);

        const clone = partnerComp.cloneNode(true);
        fragment.appendChild(clone);
        streamerLive.appendChild(fragment);
    };
};

const painChartViewers = (viewers)=>{
    let labelsViewers = [];
    let dataViewers = [];
    for (let i = 0; i < 10; i++) {
        labelsViewers.push(viewers[i].streamer.toUpperCase());
        dataViewers.push(viewers[i].viewers);
    };
    const data = {
      labels: labelsViewers,
      datasets: [{
        label: "",
        data: dataViewers,
        backgroundColor: [
            "#9147ff"
        ],
        borderWidth: 2
      }],
      
    
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#888'
                    },
                },
                y: {
                    ticks: {
                        callback: function(value){
                            const valueLegend = this.getLabelForValue(value);
                            const valueLegendRep = valueLegend.replaceAll(',', '');
                            if (valueLegendRep.length === 1) {
                                return valueLegendRep;
                            }
                            if (valueLegendRep.length === 10) {
                                return valueLegendRep.substr(0,3) + 'M';
                            }
                            if (valueLegendRep.length === 11) {
                                return valueLegendRep.substr(0,4) + 'M';
                            }
                        },
                        color: '#888'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                },
          }
        },
      };
      
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
    myChart
};

const painChartFollowers = (followers)=>{
    let labelsFollowers = [];
    let dataFollowers = [];
    for (let i = 0; i < 10; i++) {
        labelsFollowers.push(followers[i].streamer.toUpperCase());
        dataFollowers.push(followers[i].followers);
    };
    const data = {
      labels: labelsFollowers,
      datasets: [{
        label: '',
        data: dataFollowers,
        fill: false,
        borderColor: '#9147ff',
        tension: 0.3
      }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#888'
                    },
                },
                y: {
                    ticks: {
                        callback: function(value){
                            const valueLegend = this.getLabelForValue(value);
                            const valueLegendRep = valueLegend.replaceAll(',', '');
                            if (valueLegendRep.length === 9) {
                                return valueLegendRep.substr(0,2) + 'M';
                            };
                            if (valueLegendRep.length === 10) {
                                return valueLegendRep.substr(0,3) + 'M';
                            };
                        },
                        color: '#888'
                    },
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            },
        }
      };
    
    const myChart = new Chart(
        document.getElementById('myChart2'),
        config
      );
    myChart
};



