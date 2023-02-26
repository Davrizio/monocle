document.addEventListener('DOMContentLoaded', gfx1Data)
document.addEventListener('DOMContentLoaded', gfx2Data)
document.addEventListener('DOMContentLoaded', nextWeekend)
document.querySelector('#settingSave').addEventListener('click', saveSettings)
document.querySelector('#compBtn1').addEventListener('click', compButton1)

//npx tailwindcss -i ./css/style.css -o ./dist/output.css --watch

function saveSettings(){
  localStorage.setItem()
  gfx1IpAddress = ''
  gfx2IpAddress = ''
  companionAddress = ''
}

////// PROPRESENTER GFX1 ////////

//ADD a check to see if propresenter is connectable if not show error in dom 'are you on the same network as ProPresenter?'
let gfx1IpAddress = ''
let currentSlideUUID = ''
let currentSlideNum = ''
let indexSum = 0

function timeConvert(sec){
  let minutes = Math.floor(sec / 60)
  let seconds = sec - minutes * 60
  let secondsPad = String(seconds).padStart(2,'0')
  return `${minutes}:${secondsPad}`
}

async function gfx1Data(){
  const uuid = await proPresenterActivePresentationUUID()
  const slideIndex = await proPresenterActivePresentationSlideIndex()
  proPresenterActivePresentation()
  proPresenterActivePresentationSlide()
  proPresenterActiveTimeline()
  proPresenterActivePresentationLook()
  proPresenterActivePresentationStage()
  proPresenterCurrentTimer()
  proPresenterActivePresentationTotalIndex()
  setTimeout(gfx1Data, 1000)
}

async function proPresenterActivePresentationUUID() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/active`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  currentSlideUUID = data.presentation.id.uuid
}

async function proPresenterActivePresentationSlideIndex() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/slide_index`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#currentSlide').innerText = `Slide Number ${data.presentation_index.index + 1}`
  currentSlideNum = data.presentation_index.index + 1
}

async function proPresenterActivePresentationTotalIndex() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/${currentSlideUUID}`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  let groupTotal = []
  for(i=0; i<data.presentation.groups.length; i++){
    groupTotal.push(data.presentation.groups[i].slides.length)
  }
  document.querySelector('#currentSlideTotal').innerText = `${indexSum}`
  indexSum = groupTotal.reduce((a,b)=>a+b)
}

async function proPresenterActivePresentation() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/active`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  document.querySelector('#currentPresentation').innerText = `Current Presentation - ${data.presentation.id.name}`
  currentSlideUUID2 = data.presentation.id.uuid
}

async function proPresenterActivePresentationSlide() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/slide_index`)
  if (!response.ok) {
		throw new Error(`Error!`)
	}
	const data = await response.json()
  if(indexSum === 0 || indexSum == currentSlideNum){
    document.querySelector('#nextSlideImage').src = `images/gfx1blank.png`
  }else{
    document.querySelector('#nextSlideImage').src = `http://192.168.0.125:1025/v1/presentation/${currentSlideUUID}/thumbnail/${currentSlideNum}`
    document.querySelector('#currentSlideImage').src = `http://192.168.0.125:1025/v1/presentation/${currentSlideUUID}/thumbnail/${currentSlideNum - 1}`
  }
}

async function proPresenterActiveTimeline() {
	const response = await fetch(`http://192.168.0.125:1025/v1/presentation/active/timeline`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#timeline').innerText = `Active Timeline Elapsed Time: ${timeConvert(Math.ceil(data.current_time))}`
}

async function proPresenterActivePresentationLook() {
	const response = await fetch(`http://192.168.0.125:1025/v1/look/current`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#currentLook').innerText = `Current Look - ${data.id.name}`
}

async function proPresenterActivePresentationStage() {
	const response = await fetch(`http://192.168.0.125:1025/v1/stage/screen/0/layout`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#currentStage').innerText = `Current Stage Layout - ${data.name}`
}

async function proPresenterCurrentTimer() {
	const response = await fetch(`http://192.168.0.125:1025/v1/timers/current`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#currentTimer').innerText = `Current Preservice Timer: ${data[1].time}`
}

////// PROPRESENTER GFX2 ////////

//ADD a check to see if propresenter is connectable if not show error in dom 'are you on the same network as ProPresenter?'
let gfx2IpAddress = ''
let currentSlideUUID2 = ''
let currentSlideNum2 = ''
let indexSum2 = 0

async function gfx2Data(){
  const uuid = await proPresenterActivePresentationUUID2()
  const slideIndex = await proPresenterActivePresentationSlideIndex2()
  proPresenterActivePresentation2()
  proPresenterActivePresentationSlide2()
  proPresenterActiveTimeline2()
  proPresenterActivePresentationTotalIndex2()
  setTimeout(gfx2Data, 1000)
}

async function proPresenterActivePresentationUUID2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/active`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  currentSlideUUID2 = data.presentation.id.uuid
}

async function proPresenterActivePresentationSlideIndex2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/slide_index`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  if(data.presentation_index === null){
    document.querySelector('#currentSlideImage2').src = `images/gfx2blank.png`
  }else{
    document.querySelector('#currentSlide2').innerText = `Slide Number ${data.presentation_index.index + 1}`
    currentSlideNum2 = data.presentation_index.index + 1
  }
}

async function proPresenterActivePresentationTotalIndex2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/${currentSlideUUID}`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  let groupTotal = []
  for(i=0; i<data.presentation.groups.length; i++){
    groupTotal.push(data.presentation.groups[i].slides.length)
  }
  document.querySelector('#currentSlideTotal2').innerText = `${indexSum2}`
  indexSum2 = groupTotal.reduce((a,b)=>a+b)
}

async function proPresenterActivePresentation2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/active`);
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json();
  document.querySelector('#currentPresentation2').innerText = `Current Presentation - ${data.presentation.id.name}`
  currentSlideUUID2 = data.presentation.id.uuid
}

async function proPresenterActivePresentationSlide2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/slide_index`)
  if (!response.ok) {
		throw new Error(`Error!`)
	}
	const data = await response.json()
  if(indexSum2 === 0 || indexSum2 == currentSlideNum2){
    document.querySelector('#nextSlideImage2').src = `images/gfx2blank.png`
  }else{
    document.querySelector('#nextSlideImage2').src = `http://192.168.0.124:1030/v1/presentation/${currentSlideUUID2}/thumbnail/${currentSlideNum2}`
    document.querySelector('#currentSlideImage2').src = `http://192.168.0.124:1030/v1/presentation/${currentSlideUUID2}/thumbnail/${currentSlideNum2 - 1}`
  }
}

async function proPresenterActiveTimeline2() {
	const response = await fetch(`http://192.168.0.124:1030/v1/presentation/active/timeline`)
  if (!response.ok) {
		throw new Error(`Error!`);
	}
	const data = await response.json()
  document.querySelector('#timeline2').innerText = `Active Timeline Elapsed Time: ${timeConvert(Math.ceil(data.current_time))}`
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
    let tr = document.createElement("tr")
    let th = document.createElement("th")
    let td = document.createElement("td")

    let time = timeConvert(data.data[title].attributes.length)

    if(time == '0:00'){
      th.textContent = ''
    }else{
      th.textContent = time
    }

    td.textContent = data.data[title].attributes.title;
    tr.className = "bg-accent"
    th.className = "px-6 py-4 font-medium text-base-content whitespace-nowrap bg-base-200"
    td.className = "px-6 py-4 text-base-content bg-base-300" // add if statement and color based on  item type data.data[title].attributes.item_type        
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

  document.querySelector('#pcoSeries').innerText = `${data.data[0].attributes.series_title}`
  document.querySelector('#pcoTitle').innerText = `${innerText = data.data[0].attributes.title}`
  document.querySelector('#pcoDate').innerText = `${data.data[0].attributes.short_dates}`
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
