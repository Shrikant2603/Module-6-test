function setError(id, error){
    if(id == "location"){
        document.getElementById("error1").innerHTML = error;
    }else{
        document.getElementById("error2").innerHTML = error;
    }
}
function checkInput(){
    var flag = true;
    if(document.getElementById("location").value=="" || document.getElementById("token").value==""){
        if(document.getElementById("location").value==""){
            setError("location", "*Location can not be empty");
            
        }
        else{
            setError("token", "*Accesss key can not be empty");
        }
        flag = false;
    }
    return flag
}
let loc = document.getElementById("location"); 
let key = document.getElementById("token");

let searchBtn = document.getElementById("button");
searchBtn.addEventListener("click", () => {
    let keyv = key.value;
    let locv = loc.value;
    let url = (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locv}?unitGroup=metric&key=${keyv}&contentType=json`);
    console.log(url);
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } 
            else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            weatherReport(data);
        }).catch((error) => {
            console.log(error);
            alert("no result found")
        });
})

function weatherReport(data){
    document.getElementById("loc").innerHTML = 'Location: ' + data.resolvedAddress;
    document.getElementById("lat").innerHTML = 'Lat: ' + data.lattitude;
    document.getElementById("timezone").innerHTML = 'TimeZone: ' + data.timezone;
    document.getElementById("wind-speed").innerHTML = 'Wind Speed: ' + data.currentConditions.windspeed;
    document.getElementById("pressure").innerHTML = 'Pressure: ' + data.currentConditions.pressure;
    document.getElementById("humidity").innerHTML = 'Humidity: ' + data.currentConditions.humidity;
    document.getElementById("wind-direction").innerHTML = 'Wind Direction: ' + data.currentConditions.winddir;
    document.getElementById("uv-index").innerHTML = 'UV Index: ' + data.currentConditions.uvindex;
    document.getElementById("feels-like").innerHTML = 'Feels Like: ' + data.currentConditions.feelslike;
    document.getElementById("long").innerHTML = 'Long: ' + data.longitude;
}
