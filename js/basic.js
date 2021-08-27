   /*jshint esversion: 6 */
   //Function that detects mobile devices to adjust the magazine
   function checkMobile() {
       return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   }

   function addPage(page, book) {
       var element = $('<div />', {});

       if (book.turn('addPage', element, page)) {
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

   function addContentPage(page, region, element) {
       switch (page) {
           case 1:
               break;
           case 2:
               element = createHtml(region.pageContent)
               for (let i = 0; i < element.length; i++) {
                   $('.p2').append(element[i]);
               }
               showImg();
               break;
           case 3:
               element = createHtml(region.pageContent)
               for (let i = 0; i < element.length; i++) {
                   $('.p3').append(element[i]);
               }
               var words = ['Magdalena', 'Maria', 'Guadalupe', 'Carme', 'Luz', 'Esperanza', 'Socorro', 'Estrella', 'Cielo', 'Eva', 'Marta', 'Loida', 'Sara', 'sonia']
               createWordsGame(words)

               break
           case 4:
               break;
           case 5:
               element = createHtml(region.pageContent)
               for (let i = 0; i < element.length; i++) {
                   $('.p5').append(element[i]);
               }
               break;
           case 6:
               break;

       }
   }

   function createWordsGame(words) {
       var gamePuzzle = wordfindgame.create(words, '#puzzle', '#words')
       var puzzle = wordfind.newPuzzle(words, { width: 18, height: 18, fillBlanks: false })
       wordfind.print(puzzle)

       $('#solve').click(function() { wordfindgame.solve(gamePuzzle, words) })
   }

   /*Imgs */
   var pictures, pictureSLight, containerLight;


   function showImg() {

       pictures = document.querySelectorAll('.img-gallery')
       pictureSLight = document.querySelector('.add-imgs')
       containerLight = document.querySelector('.img-light')
       pictures.forEach(imagen => {
           imagen.addEventListener('click', () => {
               console.log(imagen.getAttribute('src'))
               showImgs(imagen.getAttribute('src'))
           })
       })

       containerLight.addEventListener('click', (e) => {
           if (e.target !== pictureSLight) {
               containerLight.classList.toggle('show')
               pictureSLight.classList.toggle('showImage')
           }
       })
   }



   const showImgs = (imagen) => {
       pictureSLight.src = imagen
       containerLight.classList.toggle('show')
       pictureSLight.classList.toggle('showImage')
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


   });

   /*Navegation bar*/
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

   /*Set width and height to PC */
   function resizeViewport() {
       var width = $(window).width(),
           height = $(window).height(),
           options = $('.flipbook').turn('options'),
           ancho = height * (8.5 / 11);

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

   $(document).on('click', '#closePlayer', function() {
       player.destroy();
   });


   /*Search*/
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
               elem = [element.tittle, element.textModal, element.textAudio]
               funcRecursiva(Object.values(element), texto, page, elem)

           } else {
               for (let i = 0; i < elem.length; i++) {
                   var textElement = JSON.stringify(elem[i])
                   if (textElement != null) {
                       textElement = textElement.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
                       if (textElement.indexOf(texto) !== -1) {
                           if (!checkMobile()) {
                               resultado.innerHTML += `
                             <tbody>
                                <tr class='b-trSearch' onclick="goPage(${page})">
                                    <td><p>Pág.${page}</p></td>
                                        <td class='p-tdSearch'>${elem[i]}</td>
                                </tr>
                             </tbody>
                             `
                           } else {
                               resultado.innerHTML += `
                             <tbody>
                                <tr class='b-trSearch' onclick="goPage(${page})">
                                    <td><p style='font-size:40px;'>Pág.${page}</p></td>
                                    <td>${elem[i]}</td>
                                </tr>
                             </tbody>
                             `
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
       const texto = formulario.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

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