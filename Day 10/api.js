fetch("https://jsonplaceholder.typicode.com/posts")
.then(res => res.json())
.then(data => {
    data.slice(0,10).forEach(element => {
       let divCont = document.getElementById("text");
       divCont.innerHTML += `<p>${element.title}.</p>`; 
    });
});

