const form = document.querySelector('form');
const mainVideo = document.querySelector('.result');
const list = document.querySelector('.listResult');
let responseVideo;

form.onsubmit = function(event) {
    event.preventDefault();

    const inputFiend = form.querySelector('[name="search"]');
    const searchPhrase = inputFiend.value;
    const youTubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBrmaj7j0yIJGWcGPYH3THz_Rh8BYAtlQs&q=${searchPhrase}&type=video`;
    
    fetch(youTubeApi)
    .then(response => response.json())
    .then(function (response) {
        const {items: responseVideo} = response;
        renderHTML(responseVideo);
    })
}

function renderHTML(responseVideo, j = 0) {
    mainVideo.innerHTML = '';
    list.innerHTML = '';

    const tagIframe = document.createElement('iframe');
    tagIframe.src = `https://www.youtube.com/embed/${responseVideo[j].id.videoId}`;
    tagIframe.frameborder = 0;
    tagIframe.allow = 'autoplay; encrypted-media';
    tagIframe.allowfullscreen;
    mainVideo.appendChild(tagIframe);

    for (let i = 0; i < responseVideo.length; i++) {
        const createdTag = createVideo(responseVideo[i], responseVideo);
        list.appendChild(createdTag);
    }
}

function createVideo(video, responseVideo) {
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('video-item');
    const tagPreviewImg = document.createElement('img');
    tagPreviewImg.classList.add('video-item-img');
    tagPreviewImg.src = `${video.snippet.thumbnails.high.url}`;
    tagDiv.appendChild(tagPreviewImg);

    tagPreviewImg.onclick = function() {
        renderHTML(responseVideo, j = responseVideo.indexOf(video));
    }

    return tagDiv;
}
