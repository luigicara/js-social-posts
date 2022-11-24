const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const wrapper = document.getElementById("container");

const likeCounters = [];

const likesArray = [];

for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let img = `<img class="profile-pic" src=${post.author.image} alt="${post.author.name}">`

    if(post.author.image === null) {
        img = `<div class="profile-pic-default"><span>${getFirstLetters(post.author.name)}</span></div>`;
    }

    post.created = italianDate(post.created);

    let postHtml = document.createElement("div");

    postHtml.classList.add("post");

    postHtml.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${img}               
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${post.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src=${post.media} alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div> 
        </div>`
    ;

    wrapper.appendChild(postHtml);
    
    likeBtn = document.querySelector(`[data-postid="${post.id}"]`);

    likeCounters.push(document.getElementById(`like-counter-${post.id}`));

    let likeCounter = likeCounters[i];

    likeBtn.addEventListener('click',
        function(event) {
            event.preventDefault();

            const like = post.id;

            const index = likesArray.indexOf(like);

            if(!this.classList.contains("like-button--liked")) {

                changeClass(this, likeCounter, 1, "like-button--liked", i);

                likesArray.push(like)

            } else {

                changeClass(this, likeCounter, -1, "like-button", i);

                likesArray.splice(index, 1);

            }
        }
    )   
}


function getFirstLetters(str) {
    const firstLetters = str
        .split(' ')
        .map(word => word[0])
        .join('');
  
    return firstLetters;
}

function changeClass(element, counter, operator, classString, index) {
    element.classList = `${classString}  js-like-button`;

    posts[index].likes = posts[index].likes + operator; 

    counter.innerHTML = posts[index].likes;
} 

function italianDate (element) {
    let year = element.slice(0, 4);

    let month = element.slice(5, 7);

    let day = element.slice(8, 10);

    element = `${day}-${month}-${year}`;

    return element
}