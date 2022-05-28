const streamer = document.getElementById('streamers');
const templateStreamer = document.getElementById('streamer').content;
const fragment = document.createDocumentFragment();

const fetchData = async () => {
    try {
        const res = await fetch('https://api.twitch.tv/helix/users?login=ibai&login=elded&login=victorvaldiviaa', {
            method: "GET",
            headers: {"Authorization": "Bearer s2t89l66iaso9cr6g0kyin3ovebl0i", "Client-Id": "9evi49kf49azcz9t4si807u6e0sban" }

        });
        const data = await res.json();
        painInfo(data)
    } catch (error) {
        console.log(error);
    };  
};

const painInfo = (data) =>{

    for (let i = 0; i < 3; i++) {
        let imgP = data.data[i].profile_image_url
        let nameP = data.data[i].display_name.toUpperCase()
        let viewerT = data.data[i].view_count.toLocaleString('en-US')
        let description = data.data[i].description
        let partnerT = data.data[i].broadcaster_type

        templateStreamer.querySelector('#Img').setAttribute('src', imgP)
        templateStreamer.querySelector('#Name').textContent = nameP
        templateStreamer.querySelector('#viwers').textContent = viewerT
        templateStreamer.querySelector('#description').textContent = description


        if(partnerT === "partner"){
            templateStreamer.querySelector('#partner').innerHTML = `
            <i class="fa-brands fa-twitch"></i>
            <p>Partner</p>`
        }else{
            templateStreamer.querySelector('#partner').innerHTML = ''
        }
        const clone = templateStreamer.cloneNode(true)
        fragment.appendChild(clone)
        streamer.appendChild(fragment)

    }

}


fetchData()