/*
 * Basic sample
 */

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


const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
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

}

/*Loader */

$(window).on('load', function() {
    setTimeout(function() {
        $(".loader-page").css({ visibility: "hidden", opacity: "0" })
    }, 1500);

});