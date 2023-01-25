document.querySelector('button').addEventListener('click', proPresenterActivePresentation)
document.querySelector('button').addEventListener('click', proPresenterActivePresentationSlide)

/*function getDrink(){
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
      document.querySelector('h3').innerText = data.drinks[0].strInstructions
      const ing = [data.drinks[0].strMeasure1, data.drinks[0].strIngredient1, data.drinks[0].strMeasure2, data.drinks[0].strIngredient2, data.drinks[0].strMeasure3, data.drinks[0].strIngredient3, data.drinks[0].strMeasure4, data.drinks[0].strIngredient4, data.drinks[0].strMeasure5, data.drinks[0].strIngredient5, data.drinks[0].strMeasure6, data.drinks[0].strIngredient6]
      const ingMeasure = [data.drinks[0].strMeasure1, data.drinks[0].strMeasure2, data.drinks[0].strMeasure3, data.drinks[0].strMeasure4, data.drinks[0].strMeasure5, data.drinks[0].strMeasure6]
      let ingredientList = document.querySelector("#ingredientList")
      ing.forEach(function (ingredients) {
        let li = document.createElement("li");  
        li.textContent = ingredients;        
        ingredientList.appendChild(li);
      });
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
} */

function proPresenterActivePresentation(){
  fetch(`http://192.168.0.125:1025/v1/presentation/active`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
      if(data.presentation.id.name == undefined){
        document.querySelector('h2').innerText = "No Presentation Active"
      }else{
        document.querySelector('h2').innerText = data.presentation.id.name
      }
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  //setTimeout(proPresenterActivePresentation, 5000)
}

function proPresenterActivePresentationSlide(){
  fetch(`http://192.168.0.125:1025/v1/presentation/slide_index`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      console.log(data)
      document.querySelector('h3').innerText = `Slide Number ${data.presentation_index.index}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  //setTimeout(proPresenterActivePresentationSlide, 3000)
}