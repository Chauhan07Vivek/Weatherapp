console.log('THis is client side js')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            console.log(data.error)
        }else {
            console.log(data.Location)
            console.log(data.Forecast)
        }
    })
})
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            msg1.textContent = data.error
        }else {
            msg1.textContent = data.Location
            msg2.textContent = data.Forecast
        }
    })
}) 
})