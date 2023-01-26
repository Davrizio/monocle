document.querySelector('button').addEventListener('click', proPresenterActivePresentation)
document.querySelector('button').addEventListener('click', proPresenterActivePresentationSlide)
document.querySelector('button').addEventListener('click', proPresenterActivePresentationLook)
document.querySelector('button').addEventListener('click', proPresenterActivePresentationStage)
document.querySelector('button').addEventListener('click', pcoPlan)


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
//////* PROPRESENTER *////

function proPresenterActivePresentation(){
  fetch(`http://192.168.0.125:1025/v1/presentation/active`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      if(data.presentation.id.name == undefined){
        document.querySelector('#currentPresentation').innerText = "No Presentation Active"
      }else{
        document.querySelector('#currentPresentation').innerText = `Current Presentation ${data.presentation.id.name}`
      }
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentation, 5000)
}

function proPresenterActivePresentationSlide(){
  fetch(`http://192.168.0.125:1025/v1/presentation/slide_index`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      document.querySelector('#currentSlide').innerText = `Slide Number ${data.presentation_index.index}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentationSlide, 3000)
}

function proPresenterActivePresentationLook(){
  fetch(`http://192.168.0.125:1025/v1/look/current`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      document.querySelector('#currentLook').innerText = `Current Look ${data.id.name}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentationSlide, 10000)
}

function proPresenterActivePresentationStage(){
  fetch(`http://192.168.0.125:1025/v1/stage/screen/0/layout`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      document.querySelector('#currentStage').innerText = `Current Stage Layout ${data.name}`
      document.querySelector('#currentStageImage').src = `http://192.168.0.125:1025/v1/stage/layout/${data.index}/thumbnail`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentationSlide, 10000)
}

///// Planning Center Live ///////

const pcoAuth = 'd5ce11575a546bfd596581e14083607044349ebac03d15244cdd5b5d72422503:3c5e4d41c2ddc955299b63dd607dcf0648d02e5193fd1f03739cbabee8cf6f1c'

/*module.exports{
pcoPlans: async (req, res) => {
  try {
    let response = await fetch('https://api.planningcenteronline.com/services/v2/service_types/1/plans', {method:'GET', 
    headers: {'Authorization': 'Basic ' + btoa('d5ce11575a546bfd596581e14083607044349ebac03d15244cdd5b5d72422503:3c5e4d41c2ddc955299b63dd607dcf0648d02e5193fd1f03739cbabee8cf6f1c')}});
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

} */
function pcoPlan(){
  fetch(`https://api.planningcenteronline.com/services/v2/service_types/285487/plans?order=-sort_date`, {method:'GET', 
  headers: {'Authorization': 'Basic ' + btoa(pcoAuth)}})
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      console.log(data)
      document.querySelector('#pco').innerText = data
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentation, 5000)
}