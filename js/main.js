window.addEventListener('load', () => {
    let lon, lat;
    let temperatureDesc = document.getElementsByClassName('weather__temperature--description')[0];
    let temperatureDegree = document.getElementsByClassName('weather__temperature--degree--value')[0];
    let locationTimezone = document.getElementsByClassName('weather__location--timezone--h1')[0];
    let Icon = document.getElementsByClassName('weather__location--icon')[0];
    let temperatureSection = document.getElementsByClassName('weather__temperature--degree')[0];

    const temperatureSpan = document.getElementsByClassName('weather__temperature--degree--symbol')[0];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const newAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80&include=hourly`
            //const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3a90ce0d88c9ed70698a799aa7a391b0`

            const test = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80&hours=24`

            fetch(test)
                .then(response => {
                    return response.json();
                })
                .then(allData => {
                    console.log(allData);
                    const { timezone, city_name } = allData;
                    const { temp } = allData.data[0];
                    //const { temp, timezone } = allData.data[0];
                    const { description, icon } = allData.data[0].weather;
                    let temperature = Math.round(temp);
                    let far = Math.round((temp * 9 / 5) + 32)

                    locationTimezone.innerHTML = timezone;
                    temperatureDegree.innerHTML = temperature;
                    temperatureDesc.innerHTML = description;



                    Icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${icon}.png">`;

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML === 'C') {
                            temperatureSpan.innerHTML = 'F';
                            temperatureDegree.innerHTML = far;
                        } else {
                            temperatureSpan.innerHTML = 'C';
                            temperatureDegree.innerHTML = temperature;
                        }
                    })

                });

        });
    } else {
        h1.textContent = "it's not working because some reasons"
    }

});

