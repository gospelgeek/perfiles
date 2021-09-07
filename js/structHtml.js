var jsonData;
var struct;
var pos;

function createHtml(pageContent) {
    struct = [];
    element = $('<div/>', { 'class': 'divMagazine' })
    pos = 0;
    $.each(pageContent, function(key, region) {
        for (var tag in region) {
            console.log(region)
            switch (tag) {
                case 'tittle':
                    struct[pos] = element.append(region.tittle)
                    break;

                case 'textResaltado':
                    jsonData = region.textResaltado
                    struct[pos] = element.append($('<p/>', { 'class': jsonData.class }).html(jsonData.p))
                    break;

                case 'textBiblico':
                    jsonData = region.textBiblico
                    struct[pos] = element.append($('<p/>', { 'class': jsonData.class }).html(jsonData.p))
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
                    struct[pos] = element.append($('<div/>', { 'class': jsonData.class }).append(
                        $('<em/>').text(jsonData.textAudio),
                        $('<audio/>', {
                            'controls': 'true',
                            'class': 'audio'
                        }).append(
                            $('<source/>', { 'src': jsonData.url }))))
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

                case 'wordsGame':
                    struct[pos] = element.append($('<div/>', { 'class': 'div-words' }).html("<div id='puzzle'> </div>" +
                        "<div id='words'></div>" +
                        "<div id='wordsButton'><button class='buttonsGame' id='solve'>Resolver el juego</button><button class='buttonsGame' id='clean'>Reiniciar juego</button></div>"))
                    break;

                case 'crossword':
                    break

                case 'imgs':
                    jsonData = region.imgs;
                    for (var i = 0; i < jsonData.length; i++) {
                        struct[pos] = element.append($('<div/>', { 'class': 'div-img' }).append(
                            $('<img/>', {
                                'id': jsonData[i].id,
                                'src': jsonData[i].url,
                                'class': jsonData[i].class
                            })))
                        pos++;
                    }
                    break;
            }
            pos++;
        }
    })
    return struct
}