function addPage(page, book) {

    var id, pages = book.turn('pages');

    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {

        // Add the initial HTML
        // It will contain a loader indicator and a gradient
        element.html('<div class="gradient"></div><div class="loader"></div>');

        // Load the page
        loadPage(page, element);
    }

}

function loadPage(page, pageElement) {

    // Create an image element

    var img = $('<img />');

    img.mousedown(function(e) {
        e.preventDefault();
    });

    img.load(function() {

        // Set the size
        $(this).css({ width: '100%', height: '100%' });

        // Add the image to the page after loaded

        $(this).appendTo(pageElement);

        // Remove the loader indicator

        pageElement.find('.loader').remove();
    });

    // Load the page

    img.attr('src', 'pages/' + page + '.jpg');

}


function loadLargePage(page, pageElement) {

    var img = $('<img />');

    img.load(function() {

        var prevImg = pageElement.find('img');
        $(this).css({ width: '100%', height: '100%' });
        $(this).appendTo(pageElement);
        prevImg.remove();

    });

    // Loadnew page

    img.attr('src', 'pages/' + page + '-large.jpg');
}


function loadSmallPage(page, pageElement) {

    var img = pageElement.find('img');

    img.css({ width: '100%', height: '100%' });

    img.unbind('load');
    // Loadnew page

    img.attr('src', 'pages/' + page + '.jpg');
}

// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

    return navigator.userAgent.indexOf('Chrome') != -1;

}


/*Events to book's pagination*/

const prevBtn = document.querySelector("#previous-button");
const nextBtn = document.querySelector("#next-button");
const book = document.querySelector("#flipbook");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
book.addEventListener("click", hiddenBtn);
book.addEventListener("mouseover", hiddenBtn);


//Method to go to the next page
function goNextPage() {
    $('#flipbook').turn("next");
    hiddenBtn();
}

//Method to go to the previous page
function goPrevPage() {
    $('#flipbook').turn("previous");
    hiddenBtn();
}

//Method to hide the button at the beginning and end of the book

function hiddenBtn() {

    if ($('#flipbook').turn("page") > 1) {
        prevBtn.style.visibility = "visible";
    } else {
        prevBtn.style.visibility = "hidden";
    }

    if ($('#flipbook').turn("page") == $('#flipbook').turn("pages")) {
        nextBtn.style.visibility = "hidden";
    } else {
        nextBtn.style.visibility = "visible";
    }

} // Using arrow keys to turn the page

$(document).keydown(function(e) {

    var previous = 37,
        next = 39,
        esc = 27;

    switch (e.keyCode) {
        case previous:

            // left arrow
            $('#flipbook').turn('previous');
            hiddenBtn();
            e.preventDefault();

            break;
        case next:

            //right arrow
            $('#flipbook').turn('next');
            hiddenBtn();
            e.preventDefault();

            break;
    }
});

/*Loader */

$(window).on('load', function() {
    setTimeout(function() {
        $(".loader-page").css({
            visibility: "hidden",
            opacity: "0"
        });
    }, 1500);

});

//Stop media
function pausedMultimedia() {

    $('audio').on('play', function() {
        // var current = this;
        // $('audio').each(function() {
        //     if (this !== current) {
        //         this.pause();
        //         $("#player")[0].src += "?autoplay=0";
        //         this.currentTime = 0;
        //     }
        // });

        jQuery('iframe[src*="https://www.youtube.com/embed/"]').addClass("youtube-iframe");
        $('.youtube-iframe').each(function(index) {
            $(this).attr('src', $(this).attr('src'));
            return false;
        });
    });
}

/*Functions to stop the audios and page turning sounds */
$(".flipbook").bind("turning", function(event, page, view) {
    // stop audios
    $('audio').each(function() {
        this.pause(); // Stop playing
        this.currentTime = 0; // Reset time
    });

    // stop Youtube videos
    jQuery('iframe[src*="https://www.youtube.com/embed/"]').addClass("youtube-iframe");
    $('.youtube-iframe').each(function(index) {
        $(this).attr('src', $(this).attr('src'));
        return false;
    });

    // Page turning sounds
    var audio = new Audio('audio/changepage.mp3');
    audio.volume = 0.5;
    audio.play();
});


/*Navegation */

var btnNav = document.querySelector('.btn-nav');
var menu = document.querySelector('.navigation');

btnNav.addEventListener('click', () => {
    btnNav.classList.toggle('hidde-menu');
    menu.classList.toggle('hidde-menu');
});

/*Set width and height to PC */
function resizeViewport() {

    var width = $(window).width(),
        height = $(window).height(),
        options = $('.flipbook').turn('options');

    $('.flipbook-viewport').css({
        width: width,
        height: height
    });


    if ($('.flipbook').turn('zoom') == 1) {
        var bound = calculateBound({
            width: options.width,
            height: options.height,
            boundWidth: Math.min(options.width, width),
            boundHeight: Math.min(options.height, height)
        });

        if (bound.width % 2 !== 0)
            bound.width -= 1;


        if (bound.width != $('.flipbook').width() || bound.height != $('.flipbook').height()) {

            $('.flipbook').turn('size', bound.width, bound.height);

            if ($('.flipbook').turn('page') == 1)
                $('.flipbook').turn('peel', 'br');
        }

        $('.flipbook').css({ top: -bound.height / 2, left: -bound.width / 2 });
    }
}


function calculateBound(d) {

    var bound = { width: d.width, height: d.height };

    if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
        var rel = bound.width / bound.height;
        if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

            bound.width = Math.round(d.boundHeight * rel);
            bound.height = d.boundHeight;

        } else {
            bound.width = d.boundWidth;
            bound.height = Math.round(d.boundWidth / rel);
        }
    }
    return bound;
}

$(window).resize(function() {

    //Function that detects mobile devices to adjust the magazine
    function checkMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    if (!checkMobile()) { // not mobile
        resizeViewport();

    }
}).bind('orientationchange', function() {
    resizeViewport();
});

/*Redirect page of the flipbook*/
function goPage(page) {
    $("#hideThumb").modal('hide');
    $('#flipbook').turn('page', page);
}