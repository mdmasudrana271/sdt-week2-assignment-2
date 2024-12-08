const mainContainer = document.getElementById("meal-container");
const noDataContainer = document.getElementById("no-data");
const cartContainer = document.getElementById("cart-container");
let cart = [];

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
  .then((res) => res.json())
  .then((data) => {
    //   console.log(data.meals);
    //   meals = data.meals;
    defaultData(data.meals);
  })
  .catch((error) => {
    console.error(error);
  });

const defaultData = (data) => {
  console.log(data);
  data.forEach((element) => {
    const {
      strMealThumb,
      strMeal,
      strInstructions,
      strCategory,
      strArea,
      idMeal,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
    } = element;
    const div = document.createElement("div");
    div.classList.add("meal");
    div.classList.add("col-md-6");
    div.classList.add("col-lg-4");
    div.classList.add("mb-3");
    div.innerHTML = `
          <div class="card Larger shadow" >
              <img src=${strMealThumb} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${strMeal}</h5>
                <p class="card-text">${strInstructions.slice(0, 50)}</p>
                <p class="card-text">Category: ${strCategory}</p>
                <p class="card-text">Area: ${strArea}</p>
                <div class="">
                    <a href="#" class="btn btn-success cart-add-btn" data-id="${idMeal}" id="details-btn" onclick="handleCart('${idMeal}','${strMeal}','${strMealThumb}')">Add To Cart</a>
                    <a href="#" class="btn btn-primary" data-id="${idMeal}" id="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleModalDetails('${idMeal}')">Details</a>
                </div>
              </div>
            </div>
              `;
    mainContainer.appendChild(div);
  });
};

const handleSearch = (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.meals);
      //   meals = data.meals;
      showData(data.meals);
    })
    .catch((error) => {
      console.error(error);
    });
  searchInput.value = "";
};

const showData = (data) => {
  if (data == null) {
    console.log(data);
    console.log("No data found");
    mainContainer.innerHTML = "";
    noDataContainer.innerText = "No Meals Found !";
    mainContainer.appendChild(noDataContainer);
  } else {
    console.log(data);
    noDataContainer.innerText = "";
    mainContainer.innerHTML = "";
    data.forEach((element) => {
      const {
        strMealThumb,
        strMeal,
        strInstructions,
        strCategory,
        strArea,
        idMeal,
      } = element;
      const div = document.createElement("div");
      //   div.classList.add("meal");
      div.classList.add("meal");
      div.classList.add("col-md-6");
      div.classList.add("col-lg-4");
      div.classList.add("my-3");
      div.innerHTML = `
          <div class="card Larger shadow" >
              <img src=${strMealThumb} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${strMeal}</h5>
                <p class="card-text">${strInstructions.slice(0, 50)}</p>
                <p class="card-text">Category: ${strCategory}</p>
                <p class="card-text">Area: ${strArea}</p>
                <div class="">
                    <a href="#" class="btn btn-success cart-add-btn" data-id="${idMeal}" id="details-btn" onclick="handleCart('${idMeal}','${strMeal}','${strMealThumb}')">Add To Cart</a>
                    <a href="#" class="btn btn-primary dettailss" data-id="${idMeal}" id="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleModalDetails('${idMeal}')">Details</a>
                </div>
              </div>
            </div>
              `;
      mainContainer.appendChild(div);
    });
  }
};

const handleModalDetails = (idMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.meals);
      //   meals = data.meals;
      showModalData(data.meals);
    })
    .catch((error) => {
      console.error(error);
    });
};

const showModalData = (data) => {
  const {
    strMealThumb,
    strMeal,
    strInstructions,
    strCategory,
    strArea,
    idMeal,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  } = data[0];
  const modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.getElementById("modal-body");
  modalTitle.innerText = `${strMeal} Details`;
  modalBody.innerHTML = `
  
        <div class="card mb-3">
            <img src=${strMealThumb} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${strMeal}</h5>
                <p class="card-text"><span class="fw-bolder">Instruction: </span>${strInstructions.slice(
                  0,
                  250
                )}</p>
                <p class="card-text"><span class="fw-bolder">Category: </span> ${strCategory}</p>
                <p class="card-text"><span class="fw-bolder">Region: </span> ${strArea}</p>
                <p class="card-text"><span class="fw-bolder">Ingredients: </span> ${strIngredient1}: ${strMeasure1}, ${strIngredient2}: ${strMeasure2}, ${strIngredient3}: ${strMeasure3}, ${strIngredient4}: ${strMeasure4}, ${strIngredient5}: ${strMeasure5}</p>
                
            </div>
        </div>
  
  
  `;
};

const handleCart = (idMeal, strMeal, strMealThumb) => {
  console.log("Hello world!", idMeal, strMeal, strMealThumb);
  const cartCnt = document.getElementById("cart-cnt");
  if (cart.indexOf(idMeal) != -1) {
    alert("Item already added in cart");
    return;
  }

  if (cart.length >= 11) {
    alert("You can only add 11 items in cart");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("cart-div");
  div.innerHTML = `
  
      <div class="card cart-divs">
        <img src=${strMealThumb} class="card-img-top cart-img" alt="...">
        <div class="card-body ">
          <h5 class="card-title">${strMeal}</h5>
          <button  type="button" class="rmv-btn btn btn-outline-danger btn-sm">Remove</button>
        </div>
      </div>
  
  `;

  cartContainer.appendChild(div);
  cartCnt.innerText = cart.length + 1;
  cart.push(idMeal);

  const rmvBtn = div.querySelector(".rmv-btn");
  rmvBtn.addEventListener("click", () => {
    div.remove();
    cart.splice(cart.indexOf(idMeal), 1);
    cartCnt.innerText = cart.length;
  });
};
