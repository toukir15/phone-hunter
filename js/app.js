// load search phone data 
const loadPhoneData = async (phoneName) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    console.log(URL);
    const res = await fetch(URL)
    const data = await res.json();
    displayPhoneData(data.data);
}

// display search phone data 
const displayPhoneData = phones => {
    const phoneContainer = document.getElementById('phone__container')
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
}

// add event handler search btn 
document.getElementById('search__btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search__input');
    const searchInputValue = searchInput.value;
    console.log(searchInputValue);
    loadPhoneData(searchInputValue);
})