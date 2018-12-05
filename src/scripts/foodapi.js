let foodcontainer = document.querySelector("#container");

const h1 = (title, style) => {
    return `<h1 class="${style}">${title}</h1>`
}
const p = (title, style) => {
    return `<p class="${style}">${title}</p>`
}

const foodlist = (name, type, ethnicity) => `
 <div class="foodlist">
    ${h1(name, "foodname")}
    ${p(type, "foodtype")}  
    ${p(ethnicity, "foodethnicity")}
 </div>
`



fetch("http://localhost:8088/food/")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach(function(allFoods){
        foodcontainer.innerHTML += foodlist(allFoods.name, allFoods.type, allFoods.ethnicity);
        console.table(allFoods)
    }
    )
})