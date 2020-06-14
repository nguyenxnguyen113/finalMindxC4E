let slidershow = document.getElementsByClassName('slider-defult__img-vertical');
let img = document.querySelector('.img');
let columnImg = document.querySelectorAll('.column-img');
let imgsmall = document.querySelectorAll('.img-small');
let indexImgSmall = 0;
//========= di chuột chuyển slider ===========
function changeslides(a, index) {
  indexImgSmall = index;
  for (let i of columnImg) {
    i.style.border = '5px solid black';
  }
  img.setAttribute('src', a);
  columnImg[index].style.border = '4px solid #e74c3c';
}
//============= slider auto=======
window.setInterval(() => {
  if (indexImgSmall > 4) {
    indexImgSmall = 0;
  }
  let getAttribute = imgsmall[indexImgSmall].getAttribute('src');
  changeslides(getAttribute, indexImgSmall);
  indexImgSmall++;
}, 3000);
