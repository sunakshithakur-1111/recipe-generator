const search=document.getElementById('search');
const submit= document.getElementById('submit');
const random= document.getElementById('random');
const mealEL= document.getElementById('meals');
const single_mealEL= document.getElementById('single-meal');
const resultHeading=document.getElementsByClassName('result-heading');

// search meals
function searchMeal(e){
    e.preventDefault();
    // clear single meal
    single_mealEL.innerHTML="";
    //get search meal
    const term=search.value;
    //check for empty input
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        ).then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML=`<h2>Search for the Result for ${term}`;
            if(data.meals==null){
                resultHeading.innerHTML=`<h2>No results found for ${term}`;
        
            }
            else{
                mealEL.innerHTML=data.meals.map(
                    meal=>`
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
                        <div class="meal-info" data-mealId="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `
                )
                .join(""); 
            } 
        });
    }
    else{
        alert("Please insert value in searchbox");
    }
}

// fetch the recepie
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then(res=>res.json())
    .then(data=> {
        console.log(data);
        const meal=data.meals[0];
        addMealToDOM(meal);
    });
}
//add meal to dom
function addMealToDOM(meal){
const ingredients=[];
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`
            ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]
            }`
            
            );
        }
        else{
            break;
        }
    }

    single_mealEL.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` :''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <d.iv class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `

}

function randomMeal(){
   mealEL.innerHTML="";
   resultHeading.innerHTML="";
   
   fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
   )
   .then(res=>res.json())
   .then(data=>{
    const meal=data.meals[0];
    addMealToDOM(meal);
   });
}

// events listners
submit.addEventListener("submit",searchMeal);

random.addEventListener('click',randomMeal);

mealEL.addEventListener('click', e => {
    console.log(e);
    const mealInfo = findMealInfoElement(e.target);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});

function findMealInfoElement(element) {
    let currentElement = element;
    while (currentElement !== null && !currentElement.classList.contains("meal-info")) {
        currentElement = currentElement.parentElement;
    }
    return currentElement;
}


//mealEL.addEventListener('click',e => {
    // const mealInfo = e.target( item => {
    //     if(item.classList){
    //         return item.classList.contains("meal-info");
    //     }
    //     else{
    //         return false;
    //     }
    // });
    // if(mealInfo){
    //     const mealID=mealInfo.getAttribute("data-mealid");
    //     getMealById(mealID);
    // }

//});