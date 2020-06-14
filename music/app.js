let slide2 = document.getElementById('slide');
let x = 0;
let id = sessionStorage.getItem('id');
async function loadData(url) {
  const res = await fetch('json/music.json');
  data = await res.json();
  loadVideo(data);
  test(id, data);
}

function loadVideo(data1) {
  let html = '';
  let pageBnt = '';
  let hang = document.querySelector('.row');
  let page = document.querySelector('#page');
  count = 0;
  for (let i = 1; i < Math.floor(data1.length / 24) + 2; i++) {
    pageBnt += `<button onclick="nextBnt(${i})" class="nextButton">
    ${i}
    </button>`;
  }
  for (let i = 0; i < 4; i++) {
    html += '<div class="cot">';
    for (let x = 0; x < 4; x++) {
      if (count < data1.length) {
        html += `
        <div class="col-md-3" onclick="press(${data1[count].id})">
        <a href="javascript:void();" class="album-poster" data-switch="0">
            <img src="${data1[count]['img']}"
                alt="">
        </a>
        <h4>${data1[count].name}</h4>
        <p>lorem ipsum - 2010</p>
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

function press(n) {
  const video = document.getElementById('video');
  const container = document.getElementById('container-content');
  let url = '';
  for (let x of data) {
    if (n === x['id']) url = x['link'];
  }
  let html = `<iframe scrolling="no" width=640 height=180 src=${url} frameborder="0" allowfullscreen="true" />`;
  video.innerHTML = html;
  container.style.display = 'flex';
}

function test(id, data) {
  console.log(id);

  if (id == -1) {
  } else {
    const video = document.getElementById('video');
    const container = document.getElementById('container-content');
    let html = `<iframe scrolling="no" width=640 height=180 src=${
      data[id - 1].link
    } frameborder="0" allowfullscreen="true" />`;
    video.innerHTML = html;
    container.style.display = 'flex';
  }
  sessionStorage.removeItem('id');
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

function nextBnt(x) {
  let end = 24 * x;
  let start = end - 24;

  let hang = document.querySelector('.row');
  let html = '';
  hang.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    html += '<div class="cot">';
    for (let x = 0; x < 4; x++) {
      if (start >= end || start >= data.length) {
        break;
      } else {
        html += `<div class="col-md-3" onclick="press(${data[start].id})">
                <a href="javascript:void();" class="album-poster" data-switch="0">
                    <img src="${data[start]['img']}"
                        alt="">
                </a>
                <h4>${data[start].name}</h4>
                <p>lorem ipsum - 2010</p>
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
loadData();
