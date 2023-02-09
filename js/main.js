
document.addEventListener('DOMContentLoaded', proPresenterActivePresentation)
document.addEventListener('DOMContentLoaded', proPresenterActivePresentationSlide)
document.addEventListener('DOMContentLoaded', proPresenterActivePresentationLook)
document.addEventListener('DOMContentLoaded', proPresenterActivePresentationStage)
document.addEventListener('DOMContentLoaded', proPresenterCurrentTimer)
document.addEventListener('DOMContentLoaded', proPresenterActiveTimeline)
document.addEventListener('DOMContentLoaded', proPresenterActivePresentation2)
document.addEventListener('DOMContentLoaded', proPresenterActivePresentationSlide2)
document.addEventListener('DOMContentLoaded', proPresenterActiveTimeline2)

document.addEventListener('DOMContentLoaded', nextWeekend)
document.querySelector('#compBtn1').addEventListener('click', compButton1)

//npx tailwindcss -i ./css/style.css -o ./dist/output.css --watch

////// PROPRESENTER GFX1 ////////

//ADD a check to see if propresenter is connectable if not show error in dom 'are you on the same network as ProPresenter?'  | Handle NULL if no slide is selected | Add Black Slide when there is no next slide available
//add current media countdown
//add slide x of x instead of just slide num
let currentSlideUUID = ''
let currentSlideNum = ''

function proPresenterActivePresentation(){
  fetch(`http://192.168.0.125:1025/v1/presentation/active`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentPresentation').innerText = `Current Presentation ${data.presentation.id.name}`
      currentSlideUUID = data.presentation.id.uuid
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentation, 5000)
}

function proPresenterActivePresentationSlide(){
  fetch(`http://192.168.0.125:1025/v1/presentation/slide_index`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentSlide').innerText = `Slide Number ${data.presentation_index.index}`
      currentSlideNum = data.presentation_index.index
      document.querySelector('#currentSlideImage').src = `http://192.168.0.125:1025/v1/presentation/${currentSlideUUID}/thumbnail/${currentSlideNum}`
      document.querySelector('#nextSlideImage').src = `http://192.168.0.125:1025/v1/presentation/${currentSlideUUID}/thumbnail/${currentSlideNum + 1}`
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
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentStage').innerText = `Current Stage Layout ${data.name}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentationSlide, 10000)
}

function proPresenterCurrentTimer(){
  fetch(`http://192.168.0.125:1025/v1/timers/current`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentTimer').innerText = `Current Preservice Timer ${data[1].time}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterCurrentTimer, 1000)
}
// do the min/sec breakdown 
function proPresenterActiveTimeline(){
  fetch(`http://192.168.0.125:1025/v1/presentation/active/timeline`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#timeline').innerText = `Active Timeline ${Math.ceil(data.current_time)}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActiveTimeline, 1000)
}

////// PROPRESENTER GFX2 ////////

//ADD a check to see if propresenter is connectable if not show error in dom 'are you on the same network as ProPresenter?'  | Handle NULL if no slide is selected | Add Black Slide when there is no next slide available

let currentSlideUUID2 = ''
let currentSlideNum2 = ''

function proPresenterActivePresentation2(){
  fetch(`http://192.168.0.124:1030/v1/presentation/active`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentPresentation2').innerText = `Current Presentation | ${data.presentation.id.name}`
      currentSlideUUID2 = data.presentation.id.uuid
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentation2, 5000)
}

function proPresenterActivePresentationSlide2(){
  fetch(`http://192.168.0.124:1030/v1/presentation/slide_index`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#currentSlide2').innerText = `Slide Number ${data.presentation_index.index}`
      currentSlideNum2 = data.presentation_index.index
      document.querySelector('#currentSlideImage2').src = `http://192.168.0.124:1030/v1/presentation/${currentSlideUUID2}/thumbnail/${currentSlideNum2}`
      document.querySelector('#nextSlideImage2').src = `http://192.168.0.124:1030/v1/presentation/${currentSlideUUID2}/thumbnail/${currentSlideNum2 + 1}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActivePresentationSlide2, 3000)
  
}

// do the min/sec breakdown 
function proPresenterActiveTimeline2(){
  fetch(`http://192.168.0.124:1030/v1/presentation/active/timeline`)
  .then(res => res.json())
  .then(data => {
      document.querySelector('#timeline2').innerText = `Active Timeline ${Math.ceil(data.current_time)}`
    })
  .catch(err => {
      console.log(`error ${err}`)
  });
  setTimeout(proPresenterActiveTimeline2, 1000)
}

///// Planning Center Live ///////

const pcoAuth = 'd5ce11575a546bfd596581e14083607044349ebac03d15244cdd5b5d72422503:3c5e4d41c2ddc955299b63dd607dcf0648d02e5193fd1f03739cbabee8cf6f1c'

const now = new Date()

let closestDate = new Date(now)

let closestDateId = ''

function nextWeekend(){
  if(now.getDay() === 0){
    closestDate.setDate(closestDate.getDate() - 1)
  }else if(now.getDay() === 6){
    closestDate = now
  }else{
    for(i=1; i<7; i++){
      if(now.getDay() + i === 6){
      closestDate.setDate(closestDate.getDate() + i)
      }
    }
  }

  for(let i = 0; i < localStorage.length; i++){
    if(localStorage.getItem(localStorage.key(i)).substring(0,15) == closestDate.toString().substring(0,15)){
      closestDateId = localStorage.key(i)
    }
  }

  pcoPlan()

  pcoPlanItems()
}

async function pcoPlanItems() {
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
    let minutes = Math.floor(data.data[title].attributes.length / 60)
    let seconds = data.data[title].attributes.length - minutes * 60
    let secondsPad = String(seconds).padStart(2,'0')
    let tr = document.createElement("tr")
    let th = document.createElement("th")
    let td = document.createElement("td")

    if(minutes === 0 && seconds === 0){
      th.textContent = ''
    }else{
      th.textContent = `${minutes}:${secondsPad}`
    }
        td.textContent = data.data[title].attributes.title;
        tr.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        th.className = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        td.className = "px-6 py-4" // add if statement and color based on  item type data.data[title].attributes.item_type        
        tr.appendChild(th);
        tr.appendChild(td)
        itemList.appendChild(tr)
  }

}

async function pcoPlan() {
	const response = await fetch(
		`https://api.planningcenteronline.com/services/v2/service_types/285487/plans?where[id]=${closestDateId}`,
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
  
  document.querySelector('#pcoTitle').innerText = `${data.data[0].attributes.short_dates} ${data.data[0].attributes.series_title} ${innerText = data.data[0].attributes.title}`
  
}


// build on click refresh button
async function pcoPlanUpdate() {
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
}

//Companion HTTP Commands //

let companionAddress = '192.168.0.193:8000'

function compButton1(){
  fetch(`http://${companionAddress}/press/bank/1/26`)
  .then(data => {
      document.querySelector('#compBtn1').className = `btn btn-success`
      console.log(data.statusText)
    })
  .catch(err => {
      document.querySelector('#companionStatus').className = `btn btn-warning`
      console.log(`error ${err}`)
  });
  setTimeout(() => {
    document.querySelector('#compBtn1').className = 'btn'
  }, 2000);
}
