let slide = document.getElementById('slide');
let x = 0;
let id = sessionStorage.getItem('id');
async function loadData(url) {
  const res = await fetch('json/video.json');
  data = await res.json();
  loadVideo(data);
  slideShow(data);
  showFilmHot(data);
  test(id, data);
}

function loadVideo(data1) {
  let html = '';
  let pageBnt = '';
  let hang = document.getElementById('hang');
  let page = document.getElementById('page');
  count = 0;
  for (let i = 1; i < Math.floor(data1.length / 24) + 2; i++) {
    pageBnt += `<button onclick="nextBnt(${i})" class="nextButton">
    ${i}
    </button>`;
  }
  for (let i = 0; i < 4; i++) {
    html += '<div class="cot">';
    for (let x = 0; x < 6; x++) {
      if (count < data1.length) {
        html += `<div class="hop" onclick="press(${data1[count].id})">
        <img class ="cursor" src="${data1[count]['img']}">
        <div class ="overlay"></div>
        <div class ="name cursor">
        <p>${data1[count].name}</p>
        </div>
        </div>`;
        count++;
      }
      if (count > data1.length) {
        break;
      }
    }
    html += '</div>';
  }
  hang.innerHTML = html;
  page.innerHTML = pageBnt;
}
const searchBar = document.getElementById('search');
let data = [];
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = data.filter((data1) => {
    return data1.name.toLowerCase().includes(searchString);
  });
  loadVideo(filteredCharacters);
});

function slideShow() {
  let html = '';
  for (let x = 0; x < 10; x++) {
    html += `
    <div class="mySlides">
    <a href="#" onclick ="press(${data[x].id})">
    <img src="${data[x]['img']}" style="width:240px;height: 350px;">
    </a>
    </div>`;
  }
  html += `<a class="prev cursor" id="prev" onclick="plusSlide()">&#10094;</a>
            <a class="next cursor" id="next" onclick="plusSlides()">&#10095;</a>`;
  slide.innerHTML = html;
}

function plusSlides() {
  if (slide.scrollLeft > 1458) {
  } else {
    slide.scrollTo({
      left: (x += 784),
      behavior: 'smooth',
    });
  }
  console.log(slide.scrollLeft);
}

function plusSlide() {
  if (slide.scrollLeft < 784) {
  } else {
    slide.scrollTo({
      left: (x -= 784),
      behavior: 'smooth',
    });
  }
  console.log(slide.scrollLeft);
}

function showFilmHot() {
  const box = document.getElementById('box');
  let html = `<span class="title"><i class="fas fa-trophy"></i> Bảng Xếp Hạng Phim</span>`;
  for (let i = 0; i < 5; i++) {
    html += `<div class="video-hot">
    <a href="#" onclick="press(${data[i].id})">
    <img src="${data[i].img}">
    <div class="info">
    <p id ="nameVN">${data[i].nameVN}</p>
    <p id ="nameEng">${data[i].name}</p>
    </div>
    </a>`;
  }
  box.innerHTML = html;
}

function press(n) {
  const video = document.getElementById('video');
  const container = document.getElementById('container-content');
  let url = '';
  for (let x of data) {
    if (n === x['id']) url = x['link'];
  }
  let html = `<iframe width="900" height="506" src="${url}" frameborder="0"
   allow="accelerometer; autoplay; encrypted-media; gyroscope;
   picture-in-picture" allowfullscreen></iframe>`;
  video.innerHTML = html;
  container.style.display = 'flex';
}

function off() {
  const video = document.getElementById('video');
  const screen = document.getElementById('container-content');
  screen.style.display = 'none';
  video.innerHTML = '';
}
async function show() {
  console.log(await loadData('json/video.json'));
}

async function nextBnt(x) {
  let end = 24 * x;
  let start = end - 24;
  let data = await loadData('json/video.json');
  let hang = document.getElementById('hang');
  let html = '';
  hang.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    html += '<div class="cot">';
    for (let x = 0; x < 6; x++) {
      if (start >= end || start >= data.length) {
        break;
      } else {
        html += `<div class="hop" onclick="press(${data[start].id})">
        <img class ="cursor" src="${data[start]['img']}">
        <div class ="overlay"></div>
        <div class ="name cursor">
        <p>${data[start].name}</p>
        </div>
        </div>`;
      }
      start++;
      console.log(start);
    }
    html += '</div>';
    if (start >= end || start >= data.lengt) {
      break;
    }
  }
  hang.innerHTML = html;
}

function test(id, data) {
  const container = document.getElementById('container-content');
  if (id == -1) {
  } else {
    let html = `<iframe width="900" height="506" src="${
      data[id - 1].link
    }" frameborder="0"
   allow="accelerometer; autoplay; encrypted-media; gyroscope;
   picture-in-picture" allowfullscreen></iframe>`;
    video.innerHTML = html;
    container.style.display = 'flex';
  }
  sessionStorage.removeItem('id');
}

loadData();
