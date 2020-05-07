console.log('THis is client side js')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('/weather?address=').then((response) => {
//     response.json().then((data) =>{
//         if (data.error) {
//             console.log(data.error)
//         }else {
//             console.log(data.Location)
//             console.log(data.Forecast)
//         }
//     })
// })
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const temp = document.querySelector('#temp')
const humidity = document.querySelector('#humid')
const feels_like = document.querySelector('#feelslike')
const pressure = document.querySelector('#pressure')
const dew_point = document.querySelector('#dewpoint')
const uvi = document.querySelector('#uvi')
const clouds = document.querySelector('#cloud')
const wind_speed = document.querySelector('#windspeed')
const summary = document.querySelector('#summary')




weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            msg1.textContent = data.error
        }else {
            console.log(data.feels_like)
            msg1.textContent = data.Location
            msg2.textContent = data.Forecast
            temp.textContent = data.Temperature
            humidity.textContent = data.Humidity
            feels_like.textContent = data.feels_like
            pressure.textContent = data.pressure
            dew_point.textContent = data.dew_point
            uvi.textContent = data.uvi
            clouds.textContent = data.clouds
            wind_speed.textContent = data.wind_speed
            summary.textContent = data.summary


        }
    })
}) 
})