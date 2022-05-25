var cityInput = document.getElementById('cityInput')
var searchBtn = document.getElementById('searchBtn')
var form1 = document.getElementById('form')
var cityButtons= document.querySelectorAll('li')
var forecast = document.getElementById('forecast')


var apiKey = 'e6c7145ef0589d5c1799b396e8bd2be3'



var getWeather = function(e) {
    e.preventDefault()
    var apiKey = 'e6c7145ef0589d5c1799b396e8bd2be3'

    let city = cityInput.value


    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial&appid=' + apiKey
    
    
    fetch(url)
        .then(response=>response.json())
        .then((data) => console.log(data))
        .then(function(data){
            displayData(data)
        })
        
    saveCity();

}

    

function displayData(res){

}

function saveCity(){
    let firstKey= 0
    let cityKey = firstKey
    let city = cityInput.value

    if(localStorage.getItem(city).length > 0){
        cityKey++
        localStorage.setItem(cityKey,city)
    } else{
        localStorage.setItem(cityKey, city)
    }
    
    renderCity();
}

function renderCity(){
    const pastCities = document.getElementById('cities')
    let pastCity= localStorage.getItem(0)
    
    let createList = '<li class="list-group-item">' +pastCity+ '</li>'

    pastCities.innerHTML = createList

}



searchBtn.addEventListener('click', getWeather)