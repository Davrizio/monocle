//document.querySelector('button').addEventListener('click', proPresenterActivePresentation)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationSlide)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationLook)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationStage)
document.addEventListener('DOMContentLoaded', pcoPlan)
document.addEventListener('DOMContentLoaded', pcoPlanItems)



//////* PROPRESENTER

/*function proPresenterActivePresentation(){
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
} */

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
  fetch(`https://api.planningcenteronline.com/services/v2/service_types/285487/plans?where[series_title]=Northland 2.0`, {method:'GET', 
  headers: {'Authorization': 'Basic ' + btoa(pcoAuth)}})
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      document.querySelector('#pcoDate').innerText = data.data[0].attributes.dates
      document.querySelector('#pcoSeriesTitle').innerText = data.data[0].attributes.series_title
      document.querySelector('#pcoPlanTitle').innerText = data.data[0].attributes.title
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

function pcoPlanItems(){
  fetch(`https://api.planningcenteronline.com/services/v2/service_types/285487/plans/62389948/items`, {method:'GET', 
  headers: {'Authorization': 'Basic ' + btoa(pcoAuth)}})
  .then(res => res.json()) // parse response as JSON
  .then(data => {
      console.log(data)
      let itemList = document.querySelector("#pco")
      for(title in data.data){
        console.log(title)
        let li = document.createElement("li");  
        li.textContent = data.data[title].attributes.title;        
        itemList.appendChild(li);
      }
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
}