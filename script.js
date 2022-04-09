let API_URL =  'https://api.github.com/users/'

let input = document.querySelector(".search-bar")

document.querySelector(".form").addEventListener("submit", (e)=>{
    e.preventDefault()
    let value = input.value

    if(value && value !== ""){

        getUser(value)
    }
})

async function getUser(value){

try{
    let response = await fetch(API_URL + value)
    let data = await response.json()
    console.log(data.status)
    if(data.name){
        input.value = ""
        document.querySelector(".box-card").innerHTML= `
        <div class="card-find">
            <div class="icon-img">
                <img src="${data.avatar_url}">
            </div>
            <div class="box-info">
                <div class="name">${data.name}</div>
                <div class="description">${data.bio}</div>
                <div class="social-info">
                    <div class="followers">${data.followers} Followes</div>
                    <div class="following">${data.following} Following</div>
                    <div class="repos">${data.public_repos} Repos</div>
                </div>
                <div class="tags"></div>
            </div>
        </div>`
    
        let responseRepo =  await fetch(API_URL + value + "/repos")
        let dataRepo = await responseRepo.json()
        let teenItens =  dataRepo.slice(0,10)
        teenItens.forEach(item => document.querySelector(".tags").innerHTML += `<div class="tag">${item.name}</div>`)
    }else{
        document.querySelector(".box-card").innerHTML= `<div class="name">This user is not available</div>`
    }

} catch(err){
    console.log(err.message)
}
}
