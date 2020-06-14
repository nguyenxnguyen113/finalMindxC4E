const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}

$(document).ready(function() {

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    /** click event on toggle menu */
    $toggleCollapse.click(function() {
        $nav.toggleClass('collapse');
    })

    // owl-crousel for blog
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: true,
        navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
        responsive: responsive
    });


    // click to scroll top
    $('.move-up span').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    })

    // AOS Instance
    AOS.init();

});

const bloglist = [{
        name: "A new Ice Age: How you can become a subzero cool peep and lead an exclusive lifestyle",
        nameVN: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corrupti ipsum, tempora magnam incidunt aperiam tenetur a nobis, voluptate, numquam architecto fugit. Eligendi quidem ipsam ducimus minus magni illum similique veniam tempore unde?",
        img: "./assets/Blog-post/blog1.png",
        link: "./article.html",

    },
    {
        name: "Why should boys have all the fun? it's the women who are making india an alcohol-loving contry",
        nameVN: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corrupti ipsum, tempora magnam incidunt aperiam tenetur a nobis, voluptate, numquam architecto fugit. Eligendi quidem ipsam ducimus minus magni illum similique veniam tempore unde?",
        img: "./assets/Blog-post/blog2.png",
        link: "./article.html",

    },
    {
        name: "New data recording system to better analyse road accidents",
        nameVN: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corrupti ipsum, tempora magnam incidunt aperiam tenetur a nobis, voluptate, numquam architecto fugit. Eligendi quidem ipsam ducimus minus magni illum similique veniam tempore unde?",
        img: "./assets/Blog-post/blog3.png",
        link: "./article.html",

    },
    {
        name: "New data recording system to better analyse road accidents",
        nameVN: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corrupti ipsum, tempora magnam incidunt aperiam tenetur a nobis, voluptate, numquam architecto fugit. Eligendi quidem ipsam ducimus minus magni illum similique veniam tempore unde?",
        img: "./assets/Blog-post/blog4.png",
        link: "./article.html",

    }
]

const blog = document.querySelector('.container .site-content .posts')
console.log(blog)

function render() {
    for (const item of bloglist) {
        blog.innerHTML += `
            <div class="post-content" data-aos="zoom-in" data-aos-delay="200">
            <div class="post-image">
                <div>
                    <img src="${item.img}" class="img" alt="blog1">
                </div>
                <div class="post-info flex-row">
                    <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                </div>
            </div>
            <div class="post-title">
                <a href="${item.link}">${item.name}</a>
                <p>${item.nameVN}
                </p>
            </div>
        </div>`
    }
}
render();