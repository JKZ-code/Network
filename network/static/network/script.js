function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length == 2) return parts.pop().split(';').shift();
}

function submitHandler(id){
    const textareaValue = document.getElementById(`textarea_${id}`).value;
    const content = document.getElementById(`content_${id}`);
    fetch(`/edit/${id}`,{
        method: "POST",
        headers: {"Content-type": "application/json", "X-CSRFToken" : getCookie("csrftoken")},
        body: JSON.stringify({
            content: textareaValue
        })
    }) 
    .then(response => response.json())
    .then(result => {
        content.innerHTML = result.data;
    })    
}

function likeHandler(id, whoLiked){

    const btn = document.getElementById(id);

    const liked = whoLiked.indexOf(id) >= 0 ? true : false;
    
    if(liked) {
        fetch(`/remove_like/${id}`)
        .then(response => response.json())
        .then(result => {
            btn.classList.toggle('bi-heart');
            window.location.reload()
            
        })
    } else {
        fetch(`/add_like/${id}`)
        .then(response => response.json())
        .then(result => {
            btn.classList.toggle('bi-heart-fill');
            window.location.reload()    
        })
    }

}