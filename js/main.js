$(document).ready(() => {
  getMealByName("").then(() => {
    $(".loader").fadeOut(300, function () {
      $(".load").fadeOut(300, function () {
        $("body").css("overflow", "visible");
      });
    });
  });
});

function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 500);

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate({ top: 300 }, 500);
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

const rowData = document.getElementById("rowData");
const category = document.querySelector(".category");
const area = document.querySelector(".area");
const ingredients = document.querySelector(".ingredients");
const search = document.querySelector(".search");
const contactBtn = document.querySelector(".contactBtn");
const searchContainer = document.getElementById("searchContainer");

// Category Functions
async function getCategories() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
}
function displayCategories(arr) {
  rowData.innerHTML = "";
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
              <div onclick="getCategoryMeals('${
                arr[i].strCategory
              }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${
                    arr[i].strCategoryThumb
                  }" onclick=''>
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                      <p>${arr[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
                  </div>
              </div>
      </div>`;
  }
  rowData.innerHTML = cartona;
  searchContainer.innerHTML = "";
}
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}
category.addEventListener("click", function () {
  getCategories();
  closeSideNav();
});
// Area Functions
async function getArea() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  areas = await area.json();
  displayArea(areas.meals.slice(0, 20));
}
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3 d-flex justify-content-center">
      <div onclick=" getAreaMeals('${arr[i].strArea}') " "class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-house-laptop fa-4x"}"></i>
        <h3>${arr[i].strArea}</h3>
      </div>
    </div>`;
  }
  rowData.innerHTML = cartona;
  searchContainer.innerHTML = "";
}
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}
area.addEventListener("click", function () {
  getArea();
  closeSideNav();
});
// Imgredients Functions
async function getIngredients() {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let ingred = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  ingredient = await ingred.json();
  displayIngredients(ingredient.meals.slice(0, 20));
}
function displayIngredients(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class='col-md-3'>
      <div onclick="getIngredientMeals('${
        arr[i].strIngredient
      }') " class="rounded-2 text-center cursor-pointer">
         <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${arr[i].strIngredient}</h3>
      <p> ${arr[i].strDescription.split(" ").slice(0, 20).join(" ")} </p>
      </div>
    </div>`;
  }
  rowData.innerHTML = cartona;
  searchContainer.innerHTML = "";
}
async function getIngredientMeals(ing) {
  rowData.innerHTML = "";
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}
ingredients.addEventListener("click", function () {
  getIngredients();
  closeSideNav();
});
// Search
async function getMealByName(mealName) {
  rowData.innerHTML = "";
  let mealsName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  mealsName = await mealsName.json();
  displaySearchResult(mealsName.meals.slice(0, 20));
}
async function getMealByLetter(letter) {
  rowData.innerHTML = "";
  let mealLetter = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  mealLetter = await mealLetter.json();
  displaySearchResult(mealLetter.meals.slice(0, 20));
}
function displaySearchResult(arr) {
  let catona = " ";
  for (let i = 0; i < arr.length; i++) {
    catona += `
    <div class='col-md-3'>
    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src=${arr[i].strMealThumb} alt="">
      <div class="search-layer d-flex align-content-center justify-content-center position-absolute text-black p-2">
       <h3>${arr[i].strMeal}</h3>
       </div>
    </div>
    </div>
    `;
  }
  rowData.innerHTML = catona;
}
function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class='container w-75'>
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="getMealByName(this.value)" class="form-control bg-transparent text-white" type="search" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="getMealByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="search" placeholder="Search By First Letter">
      </div>
  </div>
  </div>`;
  rowData.innerHTML = "";
}
// Show search
search.addEventListener("click", function () {
  showSearchInputs();
  closeSideNav();
});

function displayMeals(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div onclick=" getMealDetails('${arr[i].idMeal}') " class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>`;
  }

  rowData.innerHTML = cartoona;
}
async function getMealDetails(id) {
  closeSideNav();
  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
}
function displayMealDetails(meal) {
  searchContainer.innerHTML = "";
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let cartoona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  rowData.innerHTML = cartoona;
}

// Contact us
/*---------------------------------------------------  Validations Begin --------------------------------------------------------*/
const nameInput = document.getElementById("nameInput");
const mailInput = document.getElementById("mailInput");
const numberInput = document.getElementById("numberInput");
const ageInput = document.getElementById("ageInput");
const passwordInput = document.getElementById("passwordInput");
const repasswordInput = document.getElementById("repasswordInput");
const nameAlert = document.getElementById("nameAlert");
const mailAlert = document.getElementById("mailAlert");
const phoneAlert = document.getElementById("phoneAlert");
const ageAlert = document.getElementById("ageAlert");
const passwordAlert = document.getElementById("passwordAlert");
const repasswordAlert = document.getElementById("repasswordAlert");

function validName() {
  let namePattern = /^[a-zA-Z ]+$/;
  let name = nameInput.value;
  if (namePattern.test(name)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");
  }
}
function validMail() {
  let mailPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  let mail = mailInput.value;
  if (mailPattern.test(mail)) {
    mailInput.classList.add("is-valid");
    mailInput.classList.remove("is-invalid");
    mailAlert.classList.add("d-none");
  } else {
    mailInput.classList.remove("is-valid");
    mailInput.classList.add("is-invalid");
    mailAlert.classList.remove("d-none");
  }
}
function validPhone() {
  let phonePattern = /(\(\d{3}\)|\d{3}-)?\d{11}/;
  let phone = numberInput.value;
  if (phonePattern.test(phone)) {
    numberInput.classList.add("is-valid");
    numberInput.classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
  } else {
    numberInput.classList.remove("is-valid");
    numberInput.classList.add("is-invalid");
    phoneAlert.classList.remove("d-none");
  }
}
function validAge() {
  let agePattern = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  let age = ageInput.value;
  if (agePattern.test(age)) {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
    ageAlert.classList.add("d-none");
  } else {
    ageInput.classList.remove("is-valid");
    ageInput.classList.add("is-invalid");
    ageAlert.classList.remove("d-none");
  }
}
function validPassword() {
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let password = passwordInput.value;
  if (passwordPattern.test(password)) {
    passwordAlert.classList.add("d-none");
    passwordInput.classList.remove("is-invalid");
  } else {
    passwordAlert.classList.remove("d-none");
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
  }
}
function validRepassword() {
  let password = passwordInput.value;
  let repassword = repasswordInput.value;
  if (repassword == password) {
    repasswordAlert.classList.add("d-none");
    passwordInput.classList.remove("is-invalid");
  } else {
    repasswordAlert.classList.remove("d-none");
    passwordInput.classList.add("is-invalid");
  }
}
/*------------------------------------------------------  Validations End  ------------------------------*/
function contactusContainer() {
  rowData.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
              <div class="container w-75 text-center">
                  <div class="row g-4">
                    <div class="col-md-6">
                      <input type="text" class="form-control" placeholder="Enter your name" id="nameInput" oninput="validName()">
                      <div class="alert alert-danger w-100 mt-2 d-none " id="nameAlert">
                        <p>Special characters or numbers not allowed </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <input type="email" class="form-control" placeholder="Enter your mail" id="mailInput" oninput="validMail()">
                      <div class="alert alert-danger w-100 mt-2 d-none " id="mailAlert">
                        <p>Email not valid *exemple@yyy.zzz</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <input type="number" class="form-control" placeholder="Enter your phone" id="numberInput" oninput="validPhone()">
                      <div class="alert alert-danger w-100 mt-2 d-none " id="phoneAlert">
                        <p>Enter valid phone number</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <input type="number" class="form-control" placeholder="Enter your age" id="ageInput" oninput="validAge()">
                      <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
                        <p>Enter valid age</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <input type="password" class="form-control" placeholder="Enter your password" id="passwordInput" oninput="validPassword()">
                      <div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">
                        <p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <input type="password" class="form-control" placeholder="Repassword" id="repasswordInput" oninput="validRepassword()">
                      <div class="alert alert-danger w-100 mt-2 d-none" id="repasswordAlert">
                        <p>Doesn't equal the password </p>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-outline-danger px-2 mt-3">Submit</button>
              </div>
              </div>`;
  searchContainer.innerHTML = "";
}
contactBtn.addEventListener("click", function () {
  contactusContainer();
  closeSideNav();
});
