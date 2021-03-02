let addToy = false;
const toyForm = document.querySelector('.add-toy-form')
let toyCollection = document.querySelector('#toy-collection');
const addBtn = document.querySelector('#new-toy-btn');
let container = document.querySelector('.container')
container.style.display = 'none'
document.addEventListener('DOMContentLoaded', function () {
  getToys();
});
function getToys() {
  let toys = "http://localhost:3000/toys"
  fetch(toys)
  .then(resp => resp.json())
  .then(json => addToys(json))
  
}

function addToys(json) {
  json.forEach(element => {
    let toyDiv = document.createElement('div')
    toyDiv.classList.add('card');
    let toyName = document.createElement('h2')
    let toyImg = document.createElement('img')
    toyImg.classList.add('toy-avatar');
    let p = document.createElement('p')
    let btn = document.createElement('button')
    btn.classList.add('like-btn');
    btn.innerText = "like";
    btn.addEventListener('click', function (event){
      
      likes(event)
    })
    
    
    toyName.innerHTML = element.name 
    toyImg.src = element.image
    p.innerText = `${element.likes} likes`
    btn.id = element.id
    
    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImg)
    toyDiv.appendChild(btn)
    toyDiv.appendChild(p)
    toyCollection.appendChild(toyDiv)
  });
}

function postToy(name, image) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
        
      name,
      image,
      likes : 0
    } )
  })
  .then(res => res.json())
  .then((data) => renderNewToy(data))
}

function renderNewToy(json) {
    let toyDiv = document.createElement('div')
    toyDiv.classList.add('card');
    let toyName = document.createElement('h2')
    let toyImg = document.createElement('img')
    toyImg.classList.add('toy-avatar');
    let p = document.createElement('p')
    let btn = document.createElement('button')
    btn.classList.add('like-btn');
    btn.innerText = "like";
    btn.addEventListener('click', function (event){
      console.log(event.target.dataset)
      likes(event)
    })
    
    toyDiv == json
    toyName.innerHTML = json.name 
    toyImg.src = json.image
    p.innerText = `${json.likes} likes`
    btn.id = json.id
    
    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImg)
    toyDiv.appendChild(btn)
    toyDiv.appendChild(p)
    toyCollection.appendChild(toyDiv)
}
addBtn.addEventListener('click', function (event) {
  
  
  if(container.style.display === 'none'){
    container.style.display = 'block'
  } else {
    container.style.display = 'none'
  }
})
let submitBtn = document.querySelector('.submit')
toyForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  let toyName = e.target.elements[0].value;
  let toyImage = e.target.elements[1].value;
  postToy(toyName, toyImage);
  container.style.display = 'none'
})
function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.nextElementSibling.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.nextElementSibling.innerText = `${more} likes`;
    }))
}