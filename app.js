let cityinput=document.querySelector('#cityname');
let cityButton=document.querySelector('#cityButton');
let temperatureDescription=document.querySelector('.temperature-description');
let temperatureDegree=document.querySelector('.temperature-degree');
let locationTimezone=document.querySelector('.location-timezone');
let tempCategory=document.querySelector('.tempcategory');

window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async function(position){
            long=position.coords.longitude;
            lat =position.coords.latitude;
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=72c01f97f09a129f74d730a4a6999ab1`; 
            fetchWeather(url)   
        });
    }
})

cityButton.addEventListener('click',async function(){
    let cityname = cityinput.value;
    if(cityname!=''){
        const url_city=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=72c01f97f09a129f74d730a4a6999ab1`;
        console.log('from if cityname')
        fetchWeather(url_city);
    }
});


    async function  fetchWeather(url){
        let proxy = 'https://cors-anywhere.herokuapp.com/'
        url = proxy+url;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    const { name, weather, main:{temp} } = data;
    temperatureDegree.innerText=(temp-273.15).toFixed(1);
    temperatureDescription.innerText=weather[0].description;
    locationTimezone.innerText=name;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    if((temp-273.15).toFixed(1)<=20){
        tempCategory.innerText = "COOL"
    }else if((temp-273.15).toFixed(1)<=30){
        tempCategory.innerText="MEDIUM";
    }else{
        tempCategory.innerText="HOT"
    }

}