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

// Setting moment dates for today and all 5 days of the forcast
$('#today').text(moment().format("MM-DD-YYYY"))
$('.date2').text(moment().add(1,'days').format("MM-DD-YYYY"))
$('.date3').text(moment().add(2,'days').format("MM-DD-YYYY"))
$('.date4').text(moment().add(3,'days').format("MM-DD-YYYY"))
$('.date5').text(moment().add(4,'days').format("MM-DD-YYYY"))
$('.date6').text(moment().add(5,'days').format("MM-DD-YYYY"))

$('#searchBtn').on('click', function(){
    $('#today').removeClass('hideMe')
    $('.date2').removeClass('hideMe')
    $('.date3').removeClass('hideMe')
    $('.date4').removeClass('hideMe')
    $('.date5').removeClass('hideMe')
    $('.date6').removeClass('hideMe')
})

var getWeather = function(e) {
    e.preventDefault()
    var apiKey = 'e6c7145ef0589d5c1799b396e8bd2be3'

    let city = cityInput.value
    

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
        temp.textContent = data.main.temp + '°F'
        wind.textContent = data.wind.speed + 'MPH'
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
            uv1.textContent = data.current.uvi
            $('.humidity').text(data.current.humidity + '%')
            // $('.icon2').attr('src',data.daily[1].weather[0].icon)
            // $('.icon3').attr('src',data.daily[2].weather[0].icon)
            // $('.icon4').attr('src',data.daily[3].weather[0].icon)
            // $('.icon5').attr('src',data.daily[4].weather[0].icon)
            // $('.icon6').attr('src',data.daily[5].weather[0].icon)
            $('.temp2').text(data.daily[1].temp.max+ '°F')
            $('.temp3').text(data.daily[2].temp.max+ '°F')
            $('.temp4').text(data.daily[3].temp.max+ '°F')
            $('.temp5').text(data.daily[4].temp.max+ '°F')
            $('.temp6').text(data.daily[5].temp.max+ '°F')
            $('.wind2').text(data.daily[1].wind_gust+ 'MPH')
            $('.wind3').text(data.daily[2].wind_gust+ 'MPH')
            $('.wind4').text(data.daily[3].wind_gust+ 'MPH')
            $('.wind5').text(data.daily[4].wind_gust+ 'MPH')
            $('.wind6').text(data.daily[5].wind_gust+ 'MPH')
            $('.humidity2').text(data.daily[1].humidity+ '%')
            $('.humidity3').text(data.daily[2].humidity+ '%')
            $('.humidity4').text(data.daily[3].humidity+ '%')
            $('.humidity5').text(data.daily[4].humidity+ '%')
            $('.humidity6').text(data.daily[5].humidity+ '%')
            

            if (uv1 > 5) {
                uv1.classList.add('bad')
            } else if (uv1 > 2){
                uv1.classList.add('ok')
            } else{
                uv1.classList.add('good')
            }

            // for(i=1; i<7; i++){
            //     data.daily.forEach( daily =>{
            //         let results =  `<p> ${daily[i].temp.max}</p>`

            //         $('#forecastCards').append(results)
            //     })
            // }

        }
        function saveCity(){
    
            localStorage.setItem(city, city)
            
        }
        saveCity();

        function renderCity(){
            let city = localStorage.getItem(city)
            let renderedCity = '<button class="pastCities">'+city +'</button>'


            $('#cities').val(renderedCity)
        }
        renderCity();
    }
}


searchBtn.addEventListener('click', getWeather)



// function renderCity(){
//     var pastCities = document.getElementById('cities')
    
//     var city = localStorage.getItem(city)
//     var newCity = document.createElement('button')
//     var buttonName = city.value
//     newCity.appendChild(buttonName)
//     pastCities.appendChild(newCity)
   
   
//     let pastCity= localStorage.getItem(city)
    
//     // citiesList.value = '<button class="listBtn list-group-item" onclick"pressCity()">' +city+ '</button>'

// }
// cities


// function pressCity(){
//     city = this.textContent
//     getWeather();
// }

//  fetch(url)
//         .then(response=>response.json())
//         .then(function(data) {
//             displayData(data)
//         })
//         .catch(err => console.error(err))

//         var locationData = function(data){
//             var lon1 = data.lon
//             var lat1 = data.lat
//             console.log(lon1)
//             console.log(lat1)
//         }

//         var displayData= function(data){
//             cityDisplay.textContent = data.name
//             icon.textContent = data.weather.icon
//             temp.textContent = data.main.temp + '°F'
//             wind.textContent = data.wind.speed + 'MPH'
//             humidity.textContent = data.main.humidity
//         }
//     saveCity();



// $('#searchBtn').click(function(e){
//     e.preventDefault()
//     let city = cityInput.value
//     let apiKey = 'e6c7145ef0589d5c1799b396e8bd2be3';
//     // let url1 = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city+'&limit=1&appid=' + apiKey;
    
//     let url1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;


//     $.ajax({
//         url: url1,
//         type: 'GET', 
//         success: function(data){
//             console.log(data)
//             let long;
//             let lat;
//             long.textContent = data.coord.lon
//             lat.textContent = data.coord.lat
//             console.log(long)
//         },
//         complete: function(){
//             let url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat +'&lon='+long +'&exclude=minutely,hourly&appid='+ apiKey;

//             $.ajax({
//                 url:url2,
//                 type: 'GET'
//             }).done(function(data){
//                 var displayData= function(data){
//                     cityDisplay.textContent = data.coord.lon
//                     icon.textContent = data.weather.icon
//                     temp.textContent = data.main.temp + '°F'
//                     wind.textContent = data.wind.speed + 'MPH'
//                     uv.textContent = data.coord.lat
//                     console.log(cityDisplay)
//                 }
//                 displayData(data);
//             })
//         }
//     })
// })
//     }).done(function(data){
//         console.log(data)
//         console.log(data.country)
//         console.log(data.lat)
//         let long= '';
//         let lat= '';
//         let locationData= function(data){
//             long.textContent = data.lon
//             lat.textContent = data.lat
//             console.log(long)
//         }
//         locationData(data)
//         let url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat +'&lon='+long +'&exclude=minutely,hourly&appid='+ apiKey;
//         $.ajax({
//             url:url2,
//             type: 'GET'
//         }).done(function(data){
//             var displayData= function(data){
//                 cityDisplay.textContent = data.coord.lon
//                 icon.textContent = data.weather.icon
//                 temp.textContent = data.main.temp + '°F'
//                 wind.textContent = data.wind.speed + 'MPH'
//                 uv.textContent = data.coord.lat
//                 console.log(cityDisplay)
//             }
//             displayData(data);
//         })
//     })
// })