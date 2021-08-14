console.log('Hallo')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massageOne')
const massageTwo = document.querySelector('#massageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                massageOne.textContent = data.error
            } else {
                massageOne.textContent = data.location.location
                massageTwo.textContent =data.foreCast.weatherDescription
            }
        })
    })

})
