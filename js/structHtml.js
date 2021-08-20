var jsonData;
var struct;
var pos;

function createHtml(pageContent) {
    struct = [];
    pos = 0;
    $.each(pageContent, function(key, region) {
        for (var tag in region) {
            switch (tag) {
                case 'modal':
                    jsonData = region.modal;
                    struct[pos] = $('<div/>', {}).append($('<div/>', {
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
                        $('<p/>', { 'class': 'modal-p' }).text(jsonData.textModal)
                    ), $('<p/>', { 'class': jsonData.class }).append(
                        $('<a/>', {
                            'href': '#' + jsonData.id,
                            'rel': 'modal:open'
                        }).append(
                            $('<img/>', { 'src': '/pics/leermas.png' }))))
                    break;

                case 'audio':
                    jsonData = region.audio;
                    struct[pos] = $('<div/>', { 'class': jsonData.class }).append(
                        $('<em/>').text(jsonData.textAudio),
                        $('<audio/>', {
                            'controls': 'true',
                            'class': 'audio'
                        }).append(
                            $('<source/>', { 'src': jsonData.url })))
                    break;

                case 'video':
                    jsonData = region.video;
                    struct[pos] = $('<div/>', {}).append($('<div/>', {
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
                                'src': '/pics/Group 4.png'
                            }))))
                    break;


            }
            pos++;
        }
    })
    return struct

}