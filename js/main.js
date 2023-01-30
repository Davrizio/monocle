//document.querySelector('button').addEventListener('click', proPresenterActivePresentation)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationSlide)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationLook)
//document.querySelector('button').addEventListener('click', proPresenterActivePresentationStage)
//document.addEventListener('DOMContentLoaded', pcoPlan)
//document.addEventListener('DOMContentLoaded', pcoPlanItems)
document.addEventListener('DOMContentLoaded', nextWeekend)



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

const now = new Date()

let closestDate = ''

let closestDateId = ''

function nextWeekend(){
  for(i=0; i<6; i++){
    if(now.getDay() + i === 6 || now.getDay() === 6){
      closestDate = now + i
    }
  }
  console.log(closestDate)

  for(const property in localStorage){
    let value = localStorage[property]
    if(closestDate.substring(0,15) == value.substring(0,15)){
      closestDateId = Object.keys(localStorage[property])
      console.log(Object.keys(localStorage))
    }
  }
}
console.log(closestDateId)
async function pcoPlan() {
	const response = await fetch(
		'https://api.planningcenteronline.com/services/v2/service_types/285487/plans?order=-sort_date&per_page=52',
		{
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(pcoAuth)
			}
		}
	);
  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
  console.log(data)
  for(id in data.data){
    localStorage.setItem(data.data[id].id, new Date(data.data[id].attributes.sort_date))
  }

  document.querySelector('#pcoDate').innerText = data.data[0].attributes.dates
  document.querySelector('#pcoSeriesTitle').innerText = data.data[0].attributes.series_title
  document.querySelector('#pcoPlanTitle').innerText = data.data[0].attributes.title
  
}

/*async function pcoPlanItems() {
	const response = await fetch(
		`https://api.planningcenteronline.com/services/v2/service_types/285487/plans/${closestDateId}/items`,
		{
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(pcoAuth)
			}
		}
	);
  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
  let itemList = document.querySelector("#pco")
  for(title in data.data){
    let li = document.createElement("li");  
        li.textContent = data.data[title].attributes.title;
        li.className = data.data[title].attributes.item_type        
        itemList.appendChild(li);
  }
} */

//Future Load button so api call isn't so long. button would populat planDate object based on year chosen
/*async function pcoPlanLoad() {
	const response = await fetch(
		'https://api.planningcenteronline.com/services/v2/service_types/285487/plans?order=-sort_date&per_page=52',
		{
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(pcoAuth)
			}
		}
	);
  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
  console.log(data)

  for(i=1; i<6; i++){
    if(now.getDay() + i === 6 || now.getDay() === 6){
      closest = now + i
    }
  }
  
  for(id in data.data){
    planDate[data.data[id].id] = data.data[id].attributes.sort_date
  }

  console.log(planDate)
  
  
} */
