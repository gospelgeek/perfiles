function addPage(page, book) {

    var element = $('<div />', {});

    if (book.turn('addPage', element, page)) {
        element.css({ 'background-image': 'url("pages/' + page + '.png")' });

        loadContentPage(page, element);
    }
}

function loadContentPage(page, element) {
    $.getJSON('json/page-' + page + '.json').done(function(data) {
        $.each(data, function(key, region) {
            addContentPage(page, region, element);
            //Function that detects mobile devices to adjust the magazine
            function checkMobile() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            }
            if (!checkMobile()) { // not mobile
                $('.flipbook').turn('display', 'double');

            } else {
                $('.flipbook').turn('display', 'single');
                $('.flipbook').turn('size', 1050, 1400);
                stylesMobile();
            }
        });
    });
}

function addContentPage(page, region, element) {

    switch (page) {
        case 1:
            break;
        case 2:
            $('.p2').append(
                $('<div/>', {
                    'id': 'playermodal',
                    'class': 'modal'
                }).append(
                    $('<div/>', {
                        'class': 'close-modal'
                    }).append(
                        $('<a/>', {
                            'id': 'closePlayer',
                            'href': '#',
                            'rel': 'modal:close'
                        }).append(
                            $('<i/>', {
                                'class': 'bx bx-x closeT'
                            })
                        )
                    ),
                    $('<div/>', {
                        'id': 'player'
                    })
                ),
                $('<a/>', {
                    'id': 'openPlayer',
                    'class': 'video',
                    'href': '#playermodal',
                    'rel': "modal:open"
                }).append(
                    $('<img/>', {
                        'class': 'imgVideo',
                        'src': region.btn_video_p2
                    }))
            );

            break;
        case 3:
            $('.p3').append(
                $('<div/>', {
                    'id': 'ex1',
                    'class': 'modal'
                }).append(
                    $('<h2/>').text(region.tittle_modal_p3),
                    $('<h4/>').text(region.subtittle1_modal_p3),
                    $('<p/>').text(region.parrafo1_modal_p3),
                    $('<h4/>').text(region.subtittle2_modal_p3),
                    $('<p/>').text(region.parrafo2_modal_p3),
                    $('<h4/>').text(region.subtittle3_modal_p3),
                    $('<p/>').text(region.parrafo3_modal_p3),
                    $('<h4/>').text(region.subtittle4_modal_p3),
                    $('<p/>').text(region.parrafo4_modal_p3),
                    $('<h4/>').text(region.subtittle5_modal_p3),
                    $('<p/>').text(region.parrafo5_modal_p3),
                    $('<p/>').text(region.parrafo6_modal_p3)
                ),

                $('<p/>', {
                    'class': 'btn-modal'
                }).append(
                    $('<a/>', {
                        'href': '#ex1',
                        'rel': 'modal:open'
                    }).append(
                        $('<img/>', { 'src': region.btn_modal_p3 })
                    )
                ),

                $('<div/>', {
                    'class': 'column-2'
                }).append(
                    $('<div/>', {
                        'class': 'content-2'
                    }).append(
                        $('<em/>').text(region.text_audio_p3),
                        $('<audio/>', {
                            'controls': 'true',
                            'class': 'audio'
                        }).append(
                            $('<source/>', {
                                'src': region.audio_p3,
                                'type': 'audio/mpeg'
                            })
                        )
                    )
                )
            );
            break;
    }
}

// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {
    return navigator.userAgent.indexOf('Chrome') != -1;
}


/*Events to book's pagination*/
var prevBtn = document.querySelector("#previous-button");
var nextBtn = document.querySelector("#next-button");
var book = document.querySelector("#flipbook");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
book.addEventListener("click", hiddenBtn);
window.addEventListener("mouseover", hiddenBtn);


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

// Using arrow keys to turn the page
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
// $(window).on('load', function() {
//     setTimeout(function() {
//         $(".fondo").css({
//             display: 'block'
//         });
//         $(".loader-page").css({
//             visibility: "hidden",
//             opacity: "0"
//         });

//     }, 1000);
// });

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


/*Navegation bar*/
var btnNav = document.querySelector('.btn-nav');
var menu = document.querySelector('.navigation');

btnNav.addEventListener('click', () => {
    btnNav.classList.toggle('hidde-menu');
    menu.classList.toggle('hidde-menu');

    if (YT.PlayerState.PLAYING || YT.PlayerState.PAUSED || YT.PlayerState.ENDED) {
        player.destroy();
        $('#playermodal').hide();
        $('.blocker').css({
            display: 'none'
        });
    }

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

function readCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

/*API to control videos*/

var player;
$(document).on('click', '#openPlayer', function() {
    console.log('holaaa video');
    player = new YT.Player('player', {
        height: '360',
        width: '100%',
        videoId: '_U70aUAI_CY',
        events: {
            'onReady': function(event) {
                event.target.playVideo();
            },
            'onStateChange': function(event) {

                if (event.data == YT.PlayerState.PLAYING) {
                    $('audio').each(function() {
                        this.pause();
                        this.currentTime = 0;
                    });
                    $('#playermodal').modal({
                        escapeClose: false,
                        clickClose: false,
                        showClose: false
                    });
                }

            }
        }
    });
});

$(document).on('click', '#closePlayer', function() {
    player.destroy();
});

/*Search*/

var formulario = document.querySelector('#form-search');
var btnSearch = document.querySelector('#btn-form');

var filter = () => {
    console.log(formulario.value);
    formulario.value = "";

};

btnSearch.addEventListener('click', filter);