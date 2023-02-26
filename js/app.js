// load search phone data 
const loadPhoneData = async (phoneName, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    console.log(URL);
    const res = await fetch(URL)
    const data = await res.json();
    displayPhoneData(data.data, dataLimit);
}

// display search phone data 
const displayPhoneData = (phones, dataLimit) => {
    // clear search input
    const searchInputValue = document.getElementById('search__input');
    searchInputValue.value = '';

    // max show phone 
    const showAll = document.getElementById('show__all__btn')
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }


    const phoneContainer = document.getElementById('phone__container')

    // not found message 
    const errorMessage = document.getElementById('error__message');
    if (phones.length === 0) {
        errorMessage.classList.remove('d-none')
    }
    else {
        errorMessage.classList.add('d-none')
    }


    // clear previous data 
    phoneContainer.innerText = '';
    phones.forEach(phone => {
        console.log(phone);
        const { phone_name, brand, image } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card shadow-lg">
              <img class="w-50 mx-auto p-4" src="${image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">
            Brand: ${brand}
                </p>
              </div>
            </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    // stop loader
    toggleLoader(false)
}

const processSearch = (dataLimit) => {
    // start loader
    toggleLoader(true)

    const searchInput = document.getElementById('search__input');
    const searchInputValue = searchInput.value;
    // console.log(searchInputValue);
    loadPhoneData(searchInputValue, dataLimit);
}

// add event handler search btn 
document.getElementById('search__btn').addEventListener('click', function () {
    processSearch(10);
})


const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// display all data 
document.getElementById('show__all__btn').addEventListener('click', function () {
    processSearch();
})