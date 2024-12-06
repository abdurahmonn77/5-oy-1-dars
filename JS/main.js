let elCountryList = document.querySelector('.list')
let elSelect = document.querySelector('.capital-select')
let elSearchInput = document.querySelector('.search-input')
let elLikedCount = document.querySelector('.likedCount')
let elSavedCount = document.querySelector('.savedCount')
let elLikeBtn = document.querySelector('.heart-btn')
let elSavedBtn = document.querySelector('.saved-btn')


function renderCountries(arr, list) {
    list.innerHTML = null
    arr.map(item => {
        let elCountryItem = document.createElement('li')
        elCountryItem.className = "w-[264px] rounded-md overflow-hidden bg-white mt-[48px]"
        elCountryItem.innerHTML = `
        <img class="w-full h-[160px] object-cover" src=${item.flag} alt="" width="100" height="160">
        <div class="p-5">
        <h2 class="font-bold mb-2 text-[22px]">${item.name}</h2>
        <p class="mb-2 ">Population: ${item.population}</p>
        <p class="mb-2 ">Capital: ${item.capital}</p>
        </div>
        <div class="flex items-center justify-between p-2">
            <button onclick="handleLikeBtnClick(${item.id})" class="${item.isLiked ? "bg-red-600" : ""} heart-btn w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
            <img src="./images/heart.svg" width="20" height="20">
            </button>
            <button onclick="handleSaveBtnClick(${item.id})" class="${item.isBasket ? "bg-blue-400" : ""} save-btn w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
            <img src="./images/saved.svg" width="20" height="20">
            </button>
        </div>
        `
        list.append(elCountryItem)

        
    })
}


renderCountries(countrys, elCountryList)

// LIKE BTN CLICK START
function handleLikeBtnClick(id) {
    const singleObj = countrys.find(item => item.id == id)
    singleObj.isLiked = !singleObj.isLiked
    renderCountries(countrys, elCountryList)
    elLikedCount.textContent = countrys.filter(item => item.isLiked == true).length
}
// LIKE BTN CLICK END

// SAVE BTN START
function handleSaveBtnClick(id) {
    const singleObj = countrys.find(item => item.id == id) 
    singleObj.isBasket = !singleObj.isBasket
    renderCountries(countrys, elCountryList)
    elSavedCount.textContent = countrys.filter(item => item.isBasket == true).length
}
// SAVE BTN END

// SHOW LIKE BTN
elLikeBtn.addEventListener('click', function(e) {
    const likedCountry = countrys.filter(item => item.isLiked)
    renderCountries(likedCountry, elCountryList)
})
//SHOW LIKE BTN END


// SHOW SAVED BTN
elSavedBtn.addEventListener('click', function(e) {
    const savedCountry = countrys.filter(item => item.isBasket)
    renderCountries(savedCountry, elCountryList)
})
//SHOW SAVED BTN END

//SELECT PART
function renderSelectOption(arr, list) {
    arr.forEach(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        list.append(elOption)
    })
}
renderSelectOption(countrys, elSelect)

elSelect.addEventListener("change", function(e){
    const result = countrys.filter(item => item.capital.toLowerCase() == e.target.value.toLowerCase())
    renderCountries(result, elCountryList)
})
// SELECT PART END


// SEARCH PART 
elSearchInput.addEventListener("input", function(e){
    const value = e.target.value.toLowerCase()
    const searchedList = countrys.filter(item => item.name.toLowerCase().includes(value))
    renderCountries(searchedList, elCountryList)
})

// SEARCH PART END

