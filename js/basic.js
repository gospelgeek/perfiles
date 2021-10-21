   /*jshint esversion: 6 */

   //Function that detects mobile devices to adjust the magazine
   function checkMobile() { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); }

   //addPage allows assigning the number, background image reads the json of the information that it will have on each of the pages
   function addPage(page, book) {
       var element = $('<div />', {});
       var date = 'Noviembre 2021'
       if (book.turn('addPage', element, page)) {
           if (page != 1 && page != 62) { element.append('<div class="gradient"><div class="pagesMagazine" id="pagesMagazine" onclick="goPage(' + 2 + ')"> <div class="datePage">' + date + '</div> <div class="spaceDate">|</div> <div class="numberPage">' + (page - 1) + '</div></div></div>') }
           element.css({ 'background-image': 'url("pages/' + page + '.png")' });
           $.getJSON('json/pages.json').done(function(data) {
               $.each(data, function(key, region) {
                   if (page == region.page) {
                       addContentPage(region.page, region, element);
                       if (!checkMobile()) {
                           $('.flipbook').turn('display', 'double');
                       } else {
                           $('.flipbook').turn('display', 'single');
                           $('.flipbook').turn('size', 1050, 1400);
                           stylesMobile();
                       }
                   }
               });
           });
       }
   }

   function structThumbnail(pages, i, clase, backgrounds, j) {
       $('#tbody-thum').append(
           $('<tr/>', { 'class': 'fila-thum' }).append(
               $('<td/>', { 'class': 'doublePageIzq' }).append(
                   $('<div/>', { 'class': 'pag' }).append(
                       $('<div/>', { 'class': 'ain', 'id': clase[i], 'onclick': 'goPage(' + pages[i - 1] + ')' }).append(
                           $('<img/>', { 'class': 'imgThumb', 'src': backgrounds[j - 1] }),
                           $('<div/>', { 'class': 'pag-number number-left' }).html(j - 1)
                       ),
                       $('<div/>', { 'class': 'afd', 'onclick': 'goPage(' + pages[i] + ')' }).append(
                           $('<img/>', { 'class': 'imgThumb', 'src': backgrounds[j] }),
                           $('<div/>', { 'class': 'pag-number number-right' }).html(j)
                       )
                   )
               ),
               $('<td/>', { 'class': 'spacePages' }),
               $('<td/>', { 'class': 'doublePageDer' }).append(
                   $('<div/>', { 'class': 'pag' }).append(
                       $('<div/>', { 'class': 'ain', 'onclick': 'goPage(' + pages[i + 1] + ')' }).append(
                           $('<img/>', { 'class': 'imgThumb', 'src': backgrounds[j + 1] }),
                           $('<div/>', { 'class': 'pag-number number-left' }).html(j + 1)
                       ),
                       $('<div/>', { 'class': 'afd', 'id': clase[j + 2], 'onclick': 'goPage(' + pages[i + 2] + ')' }).append(
                           $('<img/>', { 'class': 'imgThumb', 'src': backgrounds[j + 2] }),
                           $('<div/>', { 'class': 'pag-number number-right' }).html(j + 2)
                       )
                   )
               )
           )
       )
   }

   function thumbnail() {
       var backgrounds = [];
       var pages = [];
       var clase = []
       var pos = 0;
       $.getJSON('json/pages.json').done(function(data) {
           $.each(data, function(key, region) {
               pages[pos] = region.page
               backgrounds[pos] = region.background
               clase[pos] = region.id
               pos++
           })

           var j = 0
           for (let i = 0; i < pages.length; i = i + 4) {
               if (!checkMobile()) {
                   structThumbnail(pages, i, clase, backgrounds, j)
                   j = j + 4
               } else {
                   structThumbnail(pages, i, clase, backgrounds, j)
                   j = j + 4
                   stylesMobile()
               }

           }

       })


   }

   //addContentPage from json begins to load the information in each certain page
   function addContentPage(page, region, element) {
       element = createHtml(region.pageContent)
       if (page != 12 && page != 26) {
           for (let i = 0; i < element.length; i++) {
               $('.p' + page).append(element[i]);
           }
       } else {
           if (page == 12) {
               for (let i = 0; i < element.length; i++) {
                   $('.p' + page).append(element[i]);
                   var words = ['Magdalena', 'Gloria', 'Maria', 'Guadalupe', 'Carmen', 'Luz', 'Esperanza', 'Socorro', 'Estrella', 'Cielo', 'Eva', 'Marta', 'Loida', 'Sara', 'sonia']
                   createWordsGame(words)
               }

           } else if (page == 26) {
               var y = 0
               for (let i = 0; i < element.length; i++) {
                   $('.p' + page).append(element[i]);
               }
               crosswordGame();

           }
       }
       //Reset variables of audio
       if ($('.audioBtnLink').is(':hidden'))
           $('.audioBtnLink').css({ 'display': 'block' })

       if ($('.audioBtnLink').is(':visible'))
           $('.audioPage').css({ 'display': 'none' })
   }

   function mostrarAudio(audio, btnAudio) {
       $('#' + audio.id).css({ 'display': 'block' })
       $('#' + btnAudio.id).css({ 'display': 'none' })
       $('#' + audio.id)[0].play();

   }



   /*Content Table */
   function tableContent(id) {
       var ul = $('<ul/>', { 'class': 'ul-containerTable' });
       var tittles = [];
       var pages = [];
       var pos = 0;
       $.getJSON('json/pages.json').done(function(data) {
           $.each(data, function(key, region) {
               pages[pos] = region.page
               $.each(region.pageContent, function(key, region) {
                   tittles[pos] = region.tittle
                   pos++
               })
           })
           if (id == 2) {
               for (let i = 2; i < 30; i++) {
                   if (typeof tittles[i] != 'undefined' && !checkMobile()) {
                       ul.append('<li class="li-tablecontent" onclick="goPage(' + pages[i] + ')"><div class="containerTable">' + tittles[i] + '</div>' + '<div class="containerPage">' + (pages[i] - 1) + '</div></li>')
                   } else if (typeof tittles[i] != 'undefined') {
                       ul.append('<li class="li-tablecontent" onclick="goPage(' + pages[i] + ')"><div class="containerTable">' + tittles[i] + '</div>' + '<div class="containerPage">' + (pages[i] - 1) + '</div></li>')
                       stylesMobile()
                   }
               }
           } else if (id == 3) {
               for (let i = 30; i < 62; i++) {
                   if (typeof tittles[i] != 'undefined' && !checkMobile()) {
                       ul.append('<li class="li-tablecontent" onclick="goPage(' + pages[i] + ')"><div class="containerTable">' + tittles[i] + '</div>' + '<div  class="containerPage">' + (pages[i] - 1) + '</div></li>')
                   } else if (typeof tittles[i] != 'undefined') {
                       ul.append('<li class="li-tablecontent" onclick="goPage(' + pages[i] + ')"><div class="containerTable">' + tittles[i] + '</div>' + '<div class="containerPage">' + (pages[i] - 1) + '</div></li>')
                       stylesMobile()
                   }
               }
           }
       })
       return ul
   }

   /*Reload alphabet soup */
   function reloadGame() {
       var words = ['Magdalena', 'Gloria', 'Maria', 'Guadalupe', 'Carmen', 'Luz', 'Esperanza', 'Socorro', 'Estrella', 'Cielo', 'Eva', 'Marta', 'Loida', 'Sara', 'sonia']
       if (($('#flipbook').turn("page") == 12 || $('#flipbook').turn("page") == 13) && checkMobile()) {
           createWordsGame(words)
           stylesMobile()
       } else if ($('#flipbook').turn("page") == 12 || $('#flipbook').turn("page") == 13) {
           createWordsGame(words)
       }

       // if (($('#flipbook').turn("page") == 26 || $('#flipbook').turn("page") == 27) && checkMobile()) {
       //     crosswordGame();
       //     stylesMobile()
       // } else if ($('#flipbook').turn("page") == 26 || $('#flipbook').turn("page") == 27) {
       //     crosswordGame();
       // }



   }

   //createWordsGame allows create the alphabet soup
   function createWordsGame(words) {
       var gamePuzzle = wordfindgame.create(words, '#puzzle', '#words')
       var puzzle = wordfind.newPuzzle(words, { width: 18, height: 18, fillBlanks: false })
       wordfind.print(puzzle)

       $('#solve').click(function() { wordfindgame.solve(gamePuzzle, words) })
       $('#clean').click(function() { wordfindgame.clean() })
   }

   //Events to book's pagination
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
       reloadGame()
   }

   //Method to go to the previous page
   function goPrevPage() {
       $('#flipbook').turn("previous");
       hiddenBtn();
       reloadGame()
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
               reloadGame()
               e.preventDefault();

               break;
           case next:
               //right arrow
               $('#flipbook').turn('next');
               hiddenBtn();
               reloadGame()
               e.preventDefault();
               break;
       }
   });

   //Stop media

   function pausedMultimedia() {
       $('audio').on('play', '.audioContent', function() {
           // var current = this;
           // $('audio').each(function() {
           //     if (this !== current) {
           //         this.pause();
           //         $("#player")[0].src += "?autoplay=0";
           //         this.currentTime = 0;
           //     }
           // });

           console.log('hola');
           jQuery('iframe[src*="https://www.youtube.com/embed/"]').addClass("youtube-iframe");
           $('.youtube-iframe').each(function(index) {
               $(this).attr('src', $(this).attr('src'));
               return false;
           });
       });
   }

   /*Functions to stop the audios and page turning sounds */
   $(".flipbook").bind("turning", function(event, page, view) {

       //Reset variables of audio
       if ($('.audioBtnLink').is(':hidden'))
           $('.audioBtnLink').css({ 'display': 'block' })

       if ($('.audioBtnLink').is(':visible'))
           $('.audioPage').css({ 'display': 'none' })

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
   });

   $(document).on('click', '#closePlayer', function() {
       $('audio').each(function() {
           this.pause(); // Stop playing
           this.currentTime = 0; // Reset time
       });
   });

   /*Events that allow to hide the navegation bar */
   var btnNav = document.querySelector('.btn-nav');
   var menu = document.querySelector('.navigation');

   btnNav.addEventListener('click', () => {
       btnNav.classList.toggle('hidde-menu');
       menu.classList.toggle('hidde-menu');
       if (player) {
           player.destroy();
           $('#playermodal').hide();
           $('.blocker').css({
               display: 'none'
           });
       }
   });

   //Set width and height to PC
   function resizeViewport() {
       var width = $(window).width(),
           height = $(window).height(),
           options = $('.flipbook').turn('options')

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
               $('.flipbook').turn('size', bound.width, height);
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
       console.log('resize');
       if (!checkMobile()) {
           resizeViewport();

       }
   }).bind('orientationchange', function() {
       resizeViewport();
   });

   //Redirect page of the flipbook
   function goPage(page) {
       if (page == 12) {
           $("#hideThumb").modal('hide');
           $('#flipbook').turn('page', page);
           reloadGame()
       } else {
           $("#hideThumb").modal('hide');
           $('#flipbook').turn('page', page);
       }
   }

   //readCookie allows save the status of the magazine where the user left it
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

   //API to control videos
   var player;
   $(document).on('click', '#openPlayer', function() {
       $('#playermodal').modal({
           escapeClose: false,
           clickClose: false,
           showClose: false
       });

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
                   }
               }
           }
       });
   });

   //    $(document).on('click', '#closePlayer', function() {
   //        player.destroy();
   //    });

   //Search
   var formulario = document.querySelector('#form-search');
   var btnSearch = document.querySelector('#btn-form');
   var resultado = document.querySelector('#resultado');
   var search = document.querySelector('#contentSearch');

   function funcRecursiva(data, texto, page, elem) {
       data.forEach(element => {
           if (typeof(element) == 'object') {
               if (element.page != null) {
                   page = element.page;
               }
               elem = [element.tittle, element.textModal, element.textAudio, element.p]
               funcRecursiva(Object.values(element), texto, page, elem)
           } else {
               for (let i = 0; i < elem.length; i++) {
                   var textElement = JSON.stringify(elem[i])
                   if (textElement != null) {
                       textElement = textElement.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
                       if (textElement.indexOf(texto) !== -1) {
                           if (!checkMobile()) {
                               resultado.innerHTML += `<tbody><tr class='b-trSearch' onclick="goPage(${page})"><td><p class="p-search">Pág.${(page-1)}</p></td><td class='p-tdSearch'>${elem[i]}</td></tr></tbody>`
                           } else {
                               resultado.innerHTML += `
                             <tbody><tr class='b-trSearch' onclick="goPage(${page})"><td><p style='font-size:40px;'>Pág.${(page-1)}</p></td><td>${elem[i]}</td></tr></tbody>`
                           }
                       }
                   }
               }
               elem = []
           }
       });
   }

   const filter = () => {
       resultado.innerHTML = '';
       const texto = formulario.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

       if (texto === '') {
           if (!checkMobile()) {
               resultado.innerHTML += `<tbody> <tr><td style='font-size:16px'>Ingrese una palabra</td></tr> </tbody>`
           } else {
               resultado.innerHTML += `<tbody> <tr><td style='font-size:40px'>Ingrese una palabra</td></tr> </tbody>`
           }
       } else {
           $.getJSON('json/pages.json').done(function(data) {
               funcRecursiva(data, texto)

               if (resultado.innerHTML === '') {
                   if (!checkMobile()) { // not mobile
                       resultado.innerHTML += `<tbody><tr><td style='font-size:16px'>No encontrado</td></tr></tbody>`
                   } else {
                       resultado.innerHTML += `<tbody><tr><td style='font-size:40px'>No encontrado</td></tr></tbody>`
                   }
               }
           });
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

   function isChrome() {

       // Chrome's unsolved bug
       // http://code.google.com/p/chromium/issues/detail?id=128488

       return navigator.userAgent.indexOf('Chrome') != -1;

   }