const imageProfile = document.querySelector("#img-profile");
const githubName = document.querySelector("#github-name");
const githubUsername = document.querySelector("#github-username");
const githubBio = document.querySelector("#github-bio");
const githubJoined = document.querySelector("#github-joined");
const githubRepos = document.querySelector("#github-repos");
const githubFollowers = document.querySelector("#github-followers");
const githubFollowing = document.querySelector("#github-following");
const githubLocation = document.querySelector("#github-location");
const githubUrl=document.querySelector("#github-url")

//action button  input 
const githubActionSearch = document.querySelector("#github-action-search");
const githubInputSearch = document.querySelector("#github-search");


githubActionSearch.onclick = ()=>{
    const username = githubInputSearch.value;
    githubInputSearch.value = "";
    //aca nos falta validar si el input esta vacio
    if(username === ""){
        Swal.fire({
            title:"Error",
            text: "debe llenar el campo usuario",
            icon:"error"
        });
    return;
    }
    //ojooooo  solo llega a ejecutar la fucion si el username no esta vacio 
    //recuerde que el return termina la ejecucion
    //q funcion debo llamar ??
    obtenerDatosGithub(username); 
}

githubInputSearch.addEventListener("keyup",function(event){
    if(event.key ==="Enter"){
        obtenerDatosGithub(event.target.value)
    }
});

// el valor guillermosifu solo sera validoc uando username este vacio 
const obtenerDatosGithub = async (username = "jorgelga2707")=>{
    //ejecita fetch con la url y una vez que acabe la ejeucion  recien sde ejeciutar la sgt funcion

    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    //data meassega error .. solo no exista el usuario
    //su valor not found
    if(data.message === "Not Found"){
        Swal.fire({
            title : "Error",
            text : "no existe usuario",
            icon:"error"
        });
        return;
    }
   
    setDataUSer(data)
   console.log(data);
};


const formatDate =(fecha)=>{
    let date = new Date(fecha);
    return date.toISOString().split("T")[0];
}

// es la insercion al documento..
const setDataUSer =(data)=>{
    imageProfile.src = data.avatar_url;
    githubName.textContent = data.login;
    githubBio.textContent= data.bio;
    githubJoined.textContent = formatDate(data.created_at);
    githubUrl.innerHTML=data.html_url;
    githubLocation.innerHTML=data.location;
    githubFollowers.textContent = data.followers;
    githubFollowing.textContent = data.following;
    githubRepos.textContent = data.public_repos;
}

//llama funcion peticion
 obtenerDatosGithub()


