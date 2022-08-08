const submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  search = document.getElementById("search"),
  mealsEl = document.getElementById("meals"),
  searchHeading = document.getElementById("search-results"),
  singleMealEl = document.getElementById("single-meal");

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  singleMealEl.innerHTML = "";
  const searchValue = search.value;
  if (searchValue == "") {
    alert("Please enter a search term");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.meals !== null) {
          searchHeading.innerHTML = `<h3>Search results for "${searchValue}:"</h3>`;
          mealsEl.innerHTML = data.meals
            .map((meal) => {
              return `<div class="meal" >
          <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
         <div class="meal-info" data-mealid=${meal.idMeal}>
         <h4>${meal.strMeal}</h4></div>
          </div>`;
            })
            .join("");
        } else {
          searchHeading.innerHTML =
            "<h4>There are no search results. Try again!</h4>";
        }
      });
  }
  search.value = "";
});

function populateSingleMeal(meal) {
  const ingredients = [];
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `<h2>${meal.strMeal}</h2>
  <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
  <div class="meal-CategoryArea">
  <h4>${meal.strCategory}</h4>
  <h4>${meal.strArea}</h4>
  </div>
  <p>${meal.strInstructions}</p>
<h3>Ingredients</h4>
 <ul class="meal-ingredients">${ingredients
   .map((ingredient) => `<li>${ingredient}</li>`)
   .join("")}</ul>
 `;
}

random.addEventListener("click", async function () {
  mealsEl.innerHTML = "";
  singleMealEl.innerHTML = "";
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const { meals } = await res.json();
  populateSingleMeal(meals[0]);
});

mealsEl.addEventListener("click", async function (e) {
  const mealId = e.target.getAttribute("data-mealid");
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const { meals } = await res.json();
  console.log(meals[0]);
  populateSingleMeal(meals[0]);
});
