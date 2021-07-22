   /*jshint esversion: 6 */
   //Function that detects mobile devices to adjust the magazine
   function checkMobile() {
       return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   }

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
               if (!checkMobile()) {
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
                       $('<div/>', { 'class': 'close-modal' }).append(
                           $('<a/>', {
                               'id': 'closePlayer',
                               'href': '#',
                               'rel': 'modal:close'
                           }).append(
                               $('<i/>', { 'class': 'bx bx-x closeT' }))),
                       $('<div/>', { 'id': 'player' })
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
                       $('<div/>', { 'class': 'close-modal' }).append(
                           $('<a/>', {
                               'id': 'closePlayer',
                               'href': '#',
                               'rel': 'modal:close'
                           }).append(
                               $('<i/>', { 'class': 'bx bx-x closeT' }))),
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
                   $('<p/>', { 'class': 'btn-modal' }).append(
                       $('<a/>', {
                           'href': '#ex1',
                           'rel': 'modal:open'
                       }).append(
                           $('<img/>', { 'src': region.btn_modal_p3 }))),
                   $('<div/>', { 'class': 'column-2' }).append(
                       $('<div/>', { 'class': 'content-2' }).append(
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
           next = 39;

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
       if (!checkMobile()) {
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
   var resultado = document.querySelector('#resultado');
   var search = document.querySelector('#contentSearch');

   const filter = () => {
       resultado.innerHTML = '';
       const texto = formulario.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

       if (texto === '') {
           if (!checkMobile()) { // not mobile
               resultado.innerHTML += `<tbody> <tr><td style='font-size:16px'>Ingrese una palabra</td></tr> </tbody>`
           } else {
               resultado.innerHTML += `<tbody> <tr><td style='font-size:40px'>Ingrese una palabra</td></tr> </tbody>`
           }
       } else {
           for (let l = 1; l < $('#flipbook').turn("pages"); l++) {
               $.getJSON('json/page-' + l + '.json').done(function(data) {
                   $.each(data, function(key, region) {
                       var matriz = Object.values(region);
                       for (let i = 1; i < matriz.length; i++) {
                           if (matriz[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf('mp3') !== -1 || matriz[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf('png') !== -1 || matriz[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf('jpg') !== -1) {


                           } else
                           if (matriz[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(texto) !== -1) {
                               if (!checkMobile()) { // not mobile
                                   resultado.innerHTML += `
                             <tbody>
                                <tr class='b-trSearch' onclick="goPage(${l})">
                                    <td><p>Pág.${l}</p></td>
                                        <td class='p-tdSearch'>${matriz[i]}</td>
                                </tr>
                             </tbody>
                             `
                               } else {
                                   resultado.innerHTML += `
                             <tbody>
                                <tr class='b-trSearch' onclick="goPage(${l})">
                                    <td><p style='font-size:40px;'>Pág.${l}</p></td>
                                    <td>${matriz[i]}</td>
                                </tr>
                             </tbody>
                             `
                               }
                           }
                       }

                       if (resultado.innerHTML === '' && l == ($('#flipbook').turn("pages") - 1)) {

                           if (!checkMobile()) { // not mobile
                               resultado.innerHTML += `<tbody><tr><td style='font-size:16px'>No encontrado</td></tr></tbody>`
                           } else {
                               resultado.innerHTML += `<tbody><tr><td style='font-size:40px'>No encontrado</td></tr></tbody>`
                           }

                       }
                   });
               });
           }
       }
   };

   btnSearch.addEventListener('click', () => {
       if (search.classList.contains('contentSearch') || search.classList.contains('contentSearchMovile')) {
           filter();
       } else {
           filter();
           if (!checkMobile()) { // not mobile
               search.classList.toggle('contentSearch');

           } else {
               search.classList.toggle('contentSearchMovile');
           }
       }
   });

   $('.closeSearch').on('click', function() {
       formulario.value = '';
       resultado.innerHTML = '';
       search.classList.remove('contentSearch');
       search.classList.remove('contentSearchMovile');
   });