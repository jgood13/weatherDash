var cityInput = document.getElementById('cityInput')
var searchBtn = document.getElementById('searchBtn')
var form1 = document.getElementById('form')
var cityButtons= document.querySelectorAll('.listBtn')
var forecast = document.getElementById('forecast')
var citiesList = document.getElementById('cities')
var cityDisplay = document.querySelector('#cityDisplay')
var icon = document.getElementsByClassName('icon')
var temp = document.querySelector('.temp')
var wind = document.querySelector('.wind')
var humidity= document.querySelector('.humidty')
var uv= document.querySelector('.uv')
var uv1= document.querySelector('#uv')

var pastCities = JSON.parse(localStorage.getItem('cities'))?JSON.parse(localStorage.getItem('cities')):[]

var clearStorage = () => {
    localStorage.clear()
    $('.pastCities').remove()
    pastCities = []
}

// Setting moment dates for today and all 5 days of the forcast
$('#today').text('('+moment().format("MM-DD-YYYY")+')')
$('.date2').text('('+moment().add(1,'days').format("MM-DD-YYYY")+')')
$('.date3').text('('+moment().add(2,'days').format("MM-DD-YYYY")+')')
$('.date4').text('('+moment().add(3,'days').format("MM-DD-YYYY")+')')
$('.date5').text('('+moment().add(4,'days').format("MM-DD-YYYY")+')')
$('.date6').text('('+moment().add(5,'days').format("MM-DD-YYYY")+')')

$('#searchBtn').on('click', function(){
    $('#today').removeClass('hideMe')
    $('.date2').removeClass('hideMe')
    $('.date3').removeClass('hideMe')
    $('.date4').removeClass('hideMe')
    $('.date5').removeClass('hideMe')
    $('.date6').removeClass('hideMe')
})

var getWeather = function(city) {
    var apiKey = 'e6c7145ef0589d5c1799b396e8bd2be3'

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial&appid=' + apiKey   

    $.ajax({
        url: url,
        type: 'GET',
    }) .done(function (data){
        console.log(data)
        displayData(data)
    })
    var displayData= function(data){
        var cityDisplay2 = document.querySelector('#cityDisplay2')
        cityDisplay2.textContent = data.name 
        cityDisplay.textContent = data.coord.lon
        temp.textContent = 'Temp:'+data.main.temp + '°F'
        wind.textContent = 'Wind:'+data.wind.speed + 'MPH'
        uv.textContent = data.coord.lat
        
        let url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+uv.innerHTML +'&lon='+cityDisplay.innerHTML +'&units=imperial&exclude=minutely,hourly&appid='+ apiKey;
        // 
        // calling 2nd get inside of the first so that I can use it's scope for Lon and Lat variables
        $.ajax({
            url: url2,
            type: 'get',
        }) .done(function (data){
            console.log(data)
            displayForecast (data)
        })
        var displayForecast= function(data){
            uv1.textContent ='UV Index:'+ data.current.uvi
            $('.humidity').text('Humidity:'+data.current.humidity + '%')
            $('.icon').attr('src','http://openweathermap.org/img/wn/'+data.daily[0].weather[0].icon+'@2x.png')
            $('.icon2').attr('src','http://openweathermap.org/img/wn/'+data.daily[1].weather[0].icon+'@2x.png')
            $('.icon3').attr('src','http://openweathermap.org/img/wn/'+data.daily[2].weather[0].icon+'@2x.png')
            $('.icon4').attr('src','http://openweathermap.org/img/wn/'+data.daily[3].weather[0].icon+'@2x.png')
            $('.icon5').attr('src','http://openweathermap.org/img/wn/'+data.daily[4].weather[0].icon+'@2x.png')
            $('.icon6').attr('src','http://openweathermap.org/img/wn/'+data.daily[5].weather[0].icon+'@2x.png')
            $('.temp3').text('Temp:'+data.daily[2].temp.max+ '°F')
            $('.temp2').text('Temp:'+data.daily[1].temp.max+ '°F')
            $('.temp4').text('Temp:'+data.daily[3].temp.max+ '°F')
            $('.temp5').text('Temp:'+data.daily[4].temp.max+ '°F')
            $('.temp6').text('Temp:'+data.daily[5].temp.max+ '°F')
            $('.wind2').text('Wind:'+data.daily[1].wind_speed+ 'MPH')
            $('.wind3').text('Wind:'+data.daily[2].wind_speed+ 'MPH')
            $('.wind4').text('Wind:'+data.daily[3].wind_speed+ 'MPH')
            $('.wind5').text('Wind:'+data.daily[4].wind_speed+ 'MPH')
            $('.wind6').text('Wind:'+data.daily[5].wind_speed+ 'MPH')
            $('.humidity2').text('Humidity:'+data.daily[1].humidity+ '%')
            $('.humidity3').text('Humidity:'+data.daily[2].humidity+ '%')
            $('.humidity4').text('Humidity:'+data.daily[3].humidity+ '%')
            $('.humidity5').text('Humidity:'+data.daily[4].humidity+ '%')
            $('.humidity6').text('Humidity:'+data.daily[5].humidity+ '%')
            
            if (uv1.innerHTML > 5) {
                uv1.classList.add('bad')
            } else if (uv1.innerHTML > 2){
                uv1.classList.add('ok')
            } else{
                uv1.classList.add('good')
            }

        }
        function saveCity(){
            if(pastCities.indexOf(city) === -1){
            pastCities.push(city)
            localStorage.setItem('cities', JSON.stringify(pastCities))  
            } 
        } 
        saveCity();
        renderCity();
    }
}

$('#cities').on('click', function(e){
    getWeather(e.target.innerHTML)
    $('#today').removeClass('hideMe')
    $('.date2').removeClass('hideMe')
    $('.date3').removeClass('hideMe')
    $('.date4').removeClass('hideMe')
    $('.date5').removeClass('hideMe')
    $('.date6').removeClass('hideMe')

})

function renderCity(){
    $('#cities').html('')
    for(i=0; i<pastCities.length; i++){
        let renderedCity = `<button class="btn-primary pastCities">${pastCities[i]}</button>`
        $('#cities').append(renderedCity) 
    }   
}

renderCity();

searchBtn.addEventListener('click', e => {e.preventDefault();getWeather(cityInput.value)})