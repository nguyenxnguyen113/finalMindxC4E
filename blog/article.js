const body = document.body;
const post = document.getElementById("post");
const progress = document.getElementById("reading-progress");
let inViewport = false;

let observer = new IntersectionObserver(handler);

observer.observe(post);

function handler(entries, observer) {
    for (entry of entries) {
        if (entry.isIntersecting) {
            inViewport = true;
        } else {
            inViewport = false;
        }
    }
}

/* Get the percentage scrolled of an element. It does not change if its not in view.*/
function getScrollProgress(el) {
    let progressPercentage = 0;

    if (inViewport) {
        let coords = el.getBoundingClientRect();
        let height = coords.height;

        if (coords.top < 0) {
            progressPercentage = (Math.abs(coords.top) / height) * 100;
        }
    }

    return progressPercentage;
}

/* Set the reading progress using the value attribute*/
function showReadingProgress() {
    progress.setAttribute("value", getScrollProgress(post));
}

/* Use requestAnimationFrame*/
var timeout;

window.onscroll = function() {
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function() {
        // Run our scroll functions
        showReadingProgress();
    });
}