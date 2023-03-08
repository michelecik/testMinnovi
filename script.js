// tabs - ui
const nextButton = document.querySelector('#continua')
const confirmButton = document.querySelector('#confirm')
const firstTab = document.querySelector('.tab#personalData')
const secondTab = document.querySelector('.tab#jobData')
const steps = document.querySelectorAll('.steps .step')

// first tab inputs
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const tel = document.querySelector('#tel')
const email = document.querySelector('#email')

const address = document.querySelector('#address')
const cap = document.querySelector('#cap')
const province = document.querySelector('#province')
const city = document.querySelector('#city')
const nation = document.querySelector('#nation')

// second tab inputs
const job = document.querySelector('#occupation')

// modal
const modal = document.querySelector('#modal')
const messageText = document.querySelector('#message')
const closeModalBtn = document.querySelector('#closeModal')

const inputs = document.querySelectorAll('#personalData input')

// alert
const errorAlert = document.querySelector('#errorAlert')
const errorMessage = document.querySelector('#errorMessage')


let payload = {}; // payload to send

let formValid; // bool

const BASE_URL = 'https://hiring-test-dxxsnwdabq-oa.a.run.app/'

let roles = []

function populateOptions() {
    fetch(BASE_URL + 'getRoles')
        .then((res) => {
            return res.json()
        }).then((data) => {
            roles = data.data
            roles.forEach(option => {
                let newOption = document.createElement('option')
                newOption.value = option
                newOption.innerHTML = option
                job.append(newOption)
            });
        })
}

document.body.onload = populateOptions

nextButton.addEventListener('click', (e) => {
    e.preventDefault()
    formValid = true
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('invalid')
            errorAlert.classList.add('active')
            errorMessage.innerHTML = 'Compila tutti i campi per continuare!'
            formValid = false
        } else if (input.id == 'email' && (!input.value.includes('@') || !input.value.includes('.'))) {
            input.classList.add('invalid')
            errorAlert.classList.add('active')
            errorMessage.innerHTML = 'Inserisci una mail valida'
            formValid = false
        } else {
            input.classList.remove('invalid')
        }
    });

    if (formValid) {
        payload['name'] = firstName.value
        payload['surname'] = lastName.value
        payload['phone'] = tel.value
        payload['address'] = address.value
        payload['zip'] = parseInt(cap.value)
        payload['province'] = province.value
        payload['city'] = city.value
        payload['country'] = nation.value
        payload['email'] = email.value

        firstTab.classList.remove('active')
        steps[0].classList.remove('active')
        secondTab.classList.add('active')
        steps[1].classList.add('active')
    }
})

let response;

confirmButton.addEventListener('click', (e) => {
    e.preventDefault()
    payload['job'] = job.value
    
    let response;
    fetch(BASE_URL + 'sendData', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'data': payload})
    }).then(res => {
        if(res.status == 200) {
            response = 'Utente registrato'
            messageText.innerHTML = response
            modal.classList.add('active')
        } else {
            response = 'Qualcosa é andato storto'
            messageText.innerHTML = response
            modal.classList.add('active')
        }
    });
})

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active')
})