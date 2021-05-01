const elBody = document.querySelector("body");
const BG_CLASS = "bgImage";

function getRandomImage() {
  fetch(
    "https://source.unsplash.com/featured/?"    
  ).then((res) => {    
    // elBody.style.backgroundImage = `url('${res.url}')`;
    let img = new Image();
    img.src = res.url;
    img.classList.add(BG_CLASS);
    elBody.prepend(img);
  });
}

function init() {
  getRandomImage();
}

init();
