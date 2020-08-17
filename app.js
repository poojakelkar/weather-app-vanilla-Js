window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;

            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}72c01f97f09a129f74d730a4a6999ab1/${lat},${long}`;
            fetch(api).then(response=>{
                return response.json();
            }).then(data=>{
                
                const {temperature,summary,icon}=data.currently;
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent=data.timezone;
                setIcons(icon,document.querySelector(".icon"));
            });
        
        });
       

    }
});