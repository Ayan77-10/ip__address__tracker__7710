const  mymap = L.map('map').setView([0, 0], 13);
const marker = L.marker([0,0]).addTo(mymap)
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">openstreetmap</a>'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl , {attribution})
tiles.addTo(mymap)
// marker.bindPopup("<b>I am here</b>").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");



function myApi(){
    fetch('https://api.ipify.org/?format=json').then(response => {
        return response.json()
    }).then(mainData => {
        var mainIp = mainData.ip
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api__key}&ipAddress=${mainIp}`).then(res => {
            return res.json()
        }).then(data =>{
            console.log(data)
            document.getElementById('ip').innerText = data.ip
            document.getElementById('loc').innerText = `${data.location.city} ${data.location.country}`
            document.getElementById('timezone').innerText = `UTC ${data.location.timezone}`
            document.getElementById('isp').innerText = data.isp
            marker.setLatLng([data.location.lat , data.location.lng])
        })
    
        
    })
}

window.onload = myApi();

const fetchApi = async ()  =>{

    var  ip =  document.querySelector('#input').value
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api__key}&ipAddress=${ip}`)
    const data = await res.json()

    console.log(data);
    document.getElementById('ip').innerText = data.ip;
    document.getElementById('loc').innerText = `${data.location.city} ${data.location.country}`;
    document.getElementById('timezone').innerText = data.location.timezone;
    document.getElementById('isp').innerText = data.isp ;
    marker.setLatLng([data.location.lat , data.location.lng])
    
    document.querySelector('#input').value = ""

}
const button = document.querySelector('.icon').addEventListener('click' , fetchApi)

function runScript(event) {
    if (event.keyCode == 13) {
        fetchApi() ; 
    }
}