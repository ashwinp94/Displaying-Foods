let foodcontainer = document.querySelector("#container");

const h1 = (title, style) => {
    return `<h1 class="${style}">${title}</h1>`
}
const p = (title, style) => {
    return `<p class="${style}">${title}</p>`
}

const foodlist = (name, type, ethnicity, ingredients, country, sugar, fat, calories) => `
 <div id="foodlists">
    ${h1(name, "foodname")}
    ${p(type, "foodtype")}  
    ${p(ethnicity, "foodethnicity")}
    ${p(ingredients, "fooding")}
    ${p(country, "foodcountry")}
    ${p(sugar, "foodsugar")}
    ${p(fat, "foodfat")}
    ${p(calories, "foodcalories")}
 </div>
`

fetch("http://localhost:8088/food/")
  .then(foods => foods.json())  
  .then(parsedFoods => {
   parsedFoods.forEach(allFoods=> {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${allFoods.barcode}.json`)
            .then(foods => foods.json())
            .then(productinfo => {
            allFoods.ingredients = productinfo.product.ingredients_text;
            allFoods.country = "Country: " + productinfo.product.countries;
            allFoods.sugar = productinfo.product.nutriments.sugar;
            allFoods.fat = productinfo.product.nutriments.fat;
            allFoods.calories = productinfo.product.nutriments.energy_serving;     
            foodcontainer.innerHTML += foodlist(allFoods.name, allFoods.type, allFoods.ethnicity, allFoods.ingredients, allFoods.country, allFoods.sugar, allFoods.fat, allFoods.calories); 
        })
    })
})


// fetch(`https://world.openfoodfacts.org/api/v0/product/${foods.barcode}.json`)
            // .then(foods => foods.json())
            // .then(productInfo => {
            //allFoods.igredients = productinfo.product.ingredients_text
            //allFoods.country = productinfo.product.countries
            //allFoods.sugar = productinfo.product.nutriments.sugear
            //allFoods.fat = productinfo.product.nutriments.fat
            //allFoods.calories = productinfo.product.nutriments.energy_serving
