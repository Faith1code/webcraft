let slides = document.querySelectorAll(".slide");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let index = 0;
let autoSlide;
let resumeTimeout;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

function startAuto(){
  autoSlide = setInterval(()=>{
    index++;
    if(index >= slides.length) index = 0;
    showSlide(index);
  }, 3000);
}

function stopAutoAndResumeLater(){
  clearInterval(autoSlide);
  clearTimeout(resumeTimeout);
  // resume after 10 seconds
  resumeTimeout = setTimeout(()=>{
    startAuto();
  }, 7000);
}

next.addEventListener("click", ()=>{
  index++;
  if(index >= slides.length) index = 0;
  showSlide(index);
  stopAutoAndResumeLater();
});

prev.addEventListener("click", ()=>{
  index--;
  if(index < 0) index = slides.length -1;
  showSlide(index);
  stopAutoAndResumeLater();
});

// init
showSlide(0);
startAuto();