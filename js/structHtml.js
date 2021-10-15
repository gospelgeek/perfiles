var jsonData;
var struct;
var pos;

function createHtml(pageContent) {
    struct = [];
    element = $('<div/>', { 'class': 'divMagazine' })
    pos = 0;
    $.each(pageContent, function(key, region) {
        for (var tag in region) {
            switch (tag) {
                case 'tittle':
                    struct[pos] = element.append(region.tittle)
                    break;

                case 'tableContent':
                    struct[pos] = element.append(tableContent(region.idPage))
                    break

                case 'textResaltado':
                    jsonData = region.textResaltado
                    struct[pos] = element.append($('<p/>', { 'class': jsonData.class }).html(jsonData.p))
                    break;

                case 'textBiblico':
                    jsonData = region.textBiblico
                    struct[pos] = element.append($('<p/>', { 'class': jsonData.class }).html(jsonData.p))
                    break;

                case 'author':
                    jsonData = region.author;
                    struct[pos] = element.append(
                        $('<a/>', { 'href': '#', 'class': 'tooltip' }).append(
                            $('<div/>', { 'class': 'containerTooltip' }).append(
                                $('<p/>', {}).html('<span>Escrito por: </span>' + jsonData.name),
                                $('<img/>', { 'src': jsonData.photo, 'class': 'photo' }),
                                $('<span/>', { 'id': jsonData.id, 'class': 'tooltiptext' }).append(
                                    $('<div/>', { 'class': 'contentPhoto' }).append($('<img/>', { 'src': jsonData.profilePhoto, 'class': 'profilePhoto' })),
                                    $('<p/>', { 'class': 'textAuthor' }).html(jsonData.name + '<br>' + jsonData.charge)))))
                    break;

                case 'section':
                    struct[pos] = element.append($('<div/>', { 'class': 'div-section' }).append(
                        $('<i/>', { 'class': 'bx bx-book-reader' }),
                        $('<div/>', { 'class': 'name-section' }).html('<h3>' + region.section + '</h3>')))
                    break;

                case 'modal':
                    jsonData = region.modal;
                    struct[pos] = element.append($('<div/>', {
                        'id': jsonData.id,
                        'class': 'modal'
                    }).append(
                        $('<div/>', { 'class': 'close-modal' }).append(
                            $('<a/>', {
                                'id': 'closePlayer',
                                'href': '#',
                                'rel': 'modal:close'
                            }).append(
                                $('<i/>', { 'class': 'bx bx-x closeT' }))),
                        $('<h2/>').text(jsonData.tittle),
                        $('<p/>', { 'class': 'modal-p' }).html(jsonData.textModal)
                    ), $('<p/>', { 'class': jsonData.class }).append(
                        $('<a/>', {
                            'href': '#' + jsonData.id,
                            'rel': 'modal:open'
                        }).append(
                            $('<img/>', { 'src': './pics/leermas.png' }))))
                    break;

                case 'audio':
                    jsonData = region.audio;

                    console.log(jsonData.id + ' ' + jsonData.idBtn);
                    struct[pos] = element.append(
                        $('<a/>', {
                            'href': '#',
                            'onclick': 'mostrarAudio(' + jsonData.id + ',' + jsonData.idBtn + ')',
                            'id': jsonData.idBtn,
                            'class': 'audioBtnLink'
                        }).append(
                            $('<img/>', { 'class': 'imgAudio', 'src': './pics/escucharAudio.png' })),
                        $('<audio/>', {
                            'id': jsonData.id,
                            'controls': 'true',
                            'class': 'audioPage'
                        }).append(
                            $('<source/>', { 'src': jsonData.url }))
                    )
                    break;

                case 'video':
                    jsonData = region.video;
                    struct[pos] = element.append($('<div/>', {
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
                            $('<div/>', { 'id': jsonData.id })),
                        $('<div/>', { 'class': jsonData.class }).append($('<a/>', {
                            'id': 'openPlayer',
                            'class': 'video',
                            'href': '#playermodal',
                            'rel': "modal:open"
                        }).append(
                            $('<img/>', {
                                'class': 'imgVideo',
                                'src': './pics/Group 4.png'
                            }))))
                    break;

                case 'videoPrueba':
                    jsonData = region.videoPrueba;
                    struct[pos] = element.append(
                        $('<iframe/>', {
                            width: '560',
                            height: '315',
                            src: 'https://www.youtube.com/embed/' + jsonData.idSrc,
                            title: 'YouTube video player',
                            frameborder: '0',
                            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                            allowfullscreen: true
                        })
                    )
                    break

                case 'wordsGame':
                    struct[pos] = element.append($('<div/>', { 'class': 'div-words' }).html("<div id='puzzle'> </div>" +
                        "<div id='words'></div>" +
                        "<div id='wordsButton'><button class='buttonsGame' id='solve'>Resolver el juego</button><button class='buttonsGame' id='clean'>Reiniciar juego</button></div>"))
                    break;

                case 'crossword':
                    struct[pos] = element.append('<div id="puzzle-wrapper"></div>')
                    console.log('primero se ejecuto el structHtml');
                    break

                case 'imgs':
                    jsonData = region.imgs;
                    $.each(jsonData, function(key, region) {
                        struct[pos] = element.append($('<div/>', {
                                'id': region.id,
                                'class': 'modal imgShow'
                            }).append(
                                $('<div/>', { 'class': ' closeImgs' }).append(
                                    $('<a/>', {
                                        'id': 'closePlayer',
                                        'href': '#',
                                        'rel': 'modal:close'
                                    }).append(
                                        $('<i/>', { 'class': 'bx bx-x closeIcon' }))),
                                $('<img/>', { 'class': region.class, 'src': region.url }),
                                $('<p/>', { 'class': 'piedePagina' }).html(region.piedeImagen)
                            ),
                            $('<a/>', {
                                'href': '#' + region.id,
                                'rel': 'modal:open'
                            }).append(
                                $('<img/>', { 'class': region.class, 'src': region.url })))
                        pos++;
                    })
                    break;
            }
            pos++;
        }
    })
    return struct
}