const infoContainer = document.querySelector(".information"),
  dateTitle = infoContainer.querySelector("#date"),
  clockTitle = infoContainer.querySelector("#clock");  

function getTime() {
  const now = new Date();
  let options = { weekday: 'long'};
  const dayTxt = new Intl.DateTimeFormat('en-US', options).format(now);
  const month = now.getMonth();
  const date = now.getDate();
  const dateTxt = `${now.getFullYear()}/${month<10 ? `0${month}` : month}/${date<10 ? `0${date}` : date} ${dayTxt}`;
  
  dateTitle.innerText = dateTxt;
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const seconds = now.getSeconds();
  clockTitle.innerText = `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`
}

function init() {
  getTime()
  setInterval(getTime, 1000);
}

init()
