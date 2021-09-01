const searchInput = document.getElementById('searchInput');
// search btn 
const searchBtn = document.getElementById('search-btn');
// item container 
const itemContainer = document.getElementById('itemContainer');
// details item 
const detailsItem = document.getElementById('details');
// error 
const errors = document.getElementById('error');

// btn event hanlar
searchBtn.addEventListener('click', captureInputValue)

function captureInputValue(){
    const search = searchInput.value;
if(search === ''){
  errors.innerText = 'Search fild cannot be empty';
  return;
}
// clear
    searchInput.value = '';
    itemContainer.textContent = '';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => res.json())
    .then(data => displayCock(data.drinks))
}

 
const displayCock = cockItems => {
if(cockItems == null){
  errors.innerText = 'No Result Found';
     return;
   }
   else{
     errors.innerText = '';
   }

    for(const item of cockItems){
        // console.log(item);
        const div = document.createElement('div');
        div.classList.add('col-md-3')
        div.innerHTML = `
        <div class="rounded row overflow-hidden border p-2">
      <img
        src="${item.strDrinkThumb}"
        class="w-100"
        alt=""
      />
    </div>
    
    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
    >
      <h3>${item.strDrink}</h3>
      <button onclick="itemDetails('${item.idDrink}')" class="btn btn-dark">Learn More</button>
    </div>
        `
        itemContainer.appendChild(div)
    }
}

const itemDetails = code =>{
 fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${code}`)
 .then(res => res.json())
 .then(data => detailsItemDisplay(data.drinks[0]))
}

const detailsItemDisplay = details =>{
  detailsItem.innerHTML = `
  <div class="row">
        <div class="col-md-12">
          <h1>code:${details.idDrink}</h1>
          <p>Introduction:${details.strInstructions}</p>
          <p>Gass:${details.strGlass}</p>
        </div>
      </div>
      <hr />
  `
}