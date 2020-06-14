let slidershow = document.getElementsByClassName('slider-defult__img-vertical');
let img = document.querySelector('.img');
let columnImg = document.getElementsByClassName('column-img');
let imgsmall = document.getElementsByClassName('img-small');
const resultSearch = document.querySelector('.result-search');
const subslide = document.querySelector('.slider-defult__small-img');
let indexImgSmall = 4;

//========= di chuột chuyển slider ===========
function changeslides(a, index) {
  indexImgSmall = index;

  for (let i of columnImg) {
    i.style.border = '4px solid black';
  }
  img.setAttribute('src', a);
  img.setAttribute('onclick', move(index + 1));
  columnImg[index].style.border = '4px solid #e74c3c';
}
//============= slider auto=======
let interval = window.setInterval(() => {
  if (indexImgSmall > 4) {
    indexImgSmall = 0;
  }
  let getAttribute = imgsmall[indexImgSmall].getAttribute('src');
  changeslides(getAttribute, indexImgSmall);
  indexImgSmall++;
}, 3000);
function loadSubSlide(data) {
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += `<div class="column-img">
     <a href="videoIndex.html" onclick="move(${data[i].id})" >
       <img class="img-small" src="${data[i].img2}" onmouseover="changeslides('${data[i].img2}',${i})">
     </a>
   </div>`;
  }
  subslide.innerHTML = html;
}
// search
let dataVideo, dataMusic;
const search = document.getElementById('search');

let sortArray = (data, valueInput) => {
  return data
    .filter((element) => {
      if (element.nameVN === undefined) {
        return element.name.toLowerCase().includes(valueInput);
      } else
        return (
          element.name.toLowerCase().includes(valueInput) ||
          element.nameVN.toLowerCase().includes(valueInput)
        );
    })
    .sort((a, b) => {
      return (
        alphabet(b.name.toLowerCase(), valueInput) -
        alphabet(a.name.toLowerCase(), valueInput)
      );
    });
};

search.addEventListener('input', (e) => {
  clear();
  let valueInput = e.target.value.toLowerCase();
  let arrayVideo = sortArray(dataVideo, valueInput);
  let arrayMusic = sortArray(dataMusic, valueInput);
  showResultSearch(arrayVideo, valueInput, 'video');
  showResultSearch(arrayMusic, valueInput, 'Music');
  if (arrayMusic.length === 0 && arrayVideo.length === 0) {
    resultSearch.innerHTML += `<li>Không Tìm Thấy Kết Quả</li>`;
  }
});

let showResultSearch = (array, valueInput, type) => {
  let a = array.length;
  if (type === 'video') {
    if (valueInput.length > 0) {
      resultSearch.style.background = 'white';
      resultSearch.style.boxShadow = '0 5px 15px 0 rgba(51, 51, 51, 0.1);';
      if (a > 3) {
        for (let s = 0; s < 3; s++) {
          resultSearch.innerHTML += `<li><a href="videoIndex.html" onclick="move(${array[s].id})" ><i class="fas fa-film"></i> ${array[s].name}</a></li>`;
        }
      } else if (a > 0) {
        for (let s = 0; s < a; s++) {
          resultSearch.innerHTML += `<li><a href="videoIndex.html" onclick="move(${array[s].id})" > <i class="fas fa-film"></i>${array[s].name}</a></li>`;
        }
      }
    } else {
      clear();
    }
  } else {
    if (valueInput.length > 0) {
      resultSearch.style.background = 'white';
      resultSearch.style.boxShadow = '0 5px 15px 0 rgba(51, 51, 51, 0.1);';
      if (a > 3) {
        for (let s = 0; s < 3; s++) {
          resultSearch.innerHTML += `<li><a href="./music/index.html" onclick="move(${array[s].id})" ><i class="fas fa-music"></i> ${array[s].name}</a></li>`;
        }
      } else if (a > 0) {
        for (let s = 0; s < a; s++) {
          console.log(array[s].name);

          resultSearch.innerHTML += `<li><a href="./music/index.html" onclick="move(${array[s].id})" ><i class="fas fa-music"></i> ${array[s].name}</a></li>`;
        }
      }
    } else {
      clear();
    }
  }
};

function alphabet(a, b) {
  if (a === b) {
    return 2;
  } else if (a.startsWith(b)) {
    return 1;
  } else return 0;
}
window.onclick = function (event) {
  if (event.target != search) {
    resultSearch.style.background = 'none';
    resultSearch.style.boxShadow = 'none';
    clear();
  }
};
function clear() {
  resultSearch.innerHTML = '';
}

const loadData = async () => {
  let listVideo = document.getElementById('list-video');
  let listMusic = document.getElementById('list-music');
  const getDataVideo = await (await fetch('./json/video.json')).json();
  const getDataMusic = await (await fetch('./music/json/music.json')).json();
  dataVideo = getDataVideo;
  dataMusic = getDataMusic;
  loadSubSlide(dataVideo);
  listContent(dataVideo, listVideo, 'videoIndex.html');
  listContent(dataMusic, listMusic, './music/index.html');
};
function move(index) {
  sessionStorage.setItem('id', index);
}

function listContent(data, listData, src) {
  for (let i = 0; i < 10; i++) {
    listData.innerHTML += `<li>
    <div class="box-play">
      <a class="reletive" href="${src}" onclick="move(${data[i].id})">
        <img src="${data[i].img}" alt="">
        <div class="overlay">
          <i class="far fa-play-circle"></i>
        </div>
      </a>

    </div>
    <div class="info-box">
      <a href="videoIndex.html" onclick="${move(data[i].id)}"><h3>${
      data[i].name
    }</h3></a>
    </div>
  </li>`;
  }
}
loadData();
