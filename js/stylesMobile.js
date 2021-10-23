/*Styles that will be applied on mobile screens*/
function stylesMobile() {

    /*Flipbook*/
    $('.flipbook').css({ top: '-688px', left: '0px' });
    $('.flipbook-viewport').css({ position: 'unset' })
    $('.flipbook-viewport .container').css({ top: '50%', transform: 'translate(-50%, -50%)' })

    /*Buttons Pagination*/
    $('.next-button').css({ width: '123px', height: '211px', 'z-index': 5, top: '50%', 'background-color': 'rgba(0, 0, 0, 0.1)' });
    $('.bxs-chevron-right').css({ 'font-size': '70px' });
    $('.previous-button').css({ width: '123px', height: '211px', 'z-index': 5, top: '50%', 'background-color': 'rgba(0, 0, 0, 0.2)' });
    $('.bxs-chevron-left').css({ 'font-size': '70px' });

    /*Tittles and text of each page*/
    $('h1').css({ 'font-size': '50px' })
    $('.textResaltado').css({ 'font-size': '2em', padding: '16px 90px' })
    $('.p51 .textResaltado').css({ width: '54%', padding: '0 0 0 18px' })
    $('.textBiblico').css({ 'font-size': '2em', padding: '16px 100px' })
    $('.p50 .textBiblico').css({ width: '72%', top: '35vh', padding: '15px 29px 15px 36px' })
    $('.quotesTop img').css({ width: '5.5vw' })
    $('.quotesBottom img').css({ width: '5.5vw' })

    /*Modal content*/
    $('.modal h2').css({ 'padding-top': '30px', 'font-size': '50px' })
    $('.modal').css({ height: '62vh' });
    $('.modal-p').css({ 'overflow-y': 'auto', height: '1000px', 'padding-top': '30px' })
    $('.modal').attr('style', function(i, s) { return s + 'max-width: unset !important;' });

    /*Pictures Modal*/
    $('.imgShow').css({ 'max-width': '100%' });
    $('.piedePagina').css({ 'font-size': '40px' });
    $('.closeImgs').css({ width: '100%', height: '100px' })
    $('.closeIcon').css({ 'font-size': '80px', color: '#fff' });

    /*Navigation Bar*/
    $('.btn-nav').css({ display: 'none' });
    $('.navigation').css({ width: '70%', height: '120px', transform: 'translate(0,0)', 'border-radius': '100px', 'z-index': 5 });
    $('.bar').css({ height: '230px' });
    $('.options').css({ 'font-size': '70px', 'margin-right': '15%' });
    $('.options:last-child').css({ 'margin-right': '0' });
    $('#icon').css({ 'font-size': '70px' });

    /*Option Thumbnail (Navgation Bar)*/
    $('.imgThumb').css({ width: '200px', height: '250px', });
    $('.gallery').css({ 'max-height': '960px' });
    $('.thumbnails-head').css({ height: '100px' });
    $('fila-thumb td').css({ height: '100px' })
    $('.tittle').css({ 'font-size': '50px', });
    $('.closeT').css({ 'font-size': '70px' });

    /*Button video*/
    $('.imgVideo').css({ width: '360px', height: '140px' });

    /*Option Instructions (Navigation Bar)*/
    $('.instructions li').css({ 'font-size': '44px', padding: '17px' })
    $('.head-modal').css({ height: '127px' })

    /*Option Search (Navigation Bar)*/
    $('.search-head').css({ margin: '25px' })
    $('.search-head .tittle').css({ 'margin-right': '24px' })
    $('#contentSearch').css({ 'font-size': '33px' })
    $('.pag-number').css({ 'font-size': '33px' })
    $('.modalSearch').css({ left: '29%' });
    $('.input-search input').css({ width: '416px', height: '108px', 'font-size': '44px' });
    $('.input a .lupa').css({ 'font-size': '70px' });
    $('.input-search .input').css({ 'margin-right': '27px' });

    /*Games*/
    $('#puzzle').css({ margin: '0px 30px 0 30px' })
    $('#words li').css({ 'font-size': '3vw' })
    $('.puzzleSquare').css({ height: '70px', font: '2em sans-serif' })
    $('#words').css({ padding: '20px 83px', margin: '0 0', 'colum-gap': '13%', })
    $('#solve').css({ 'font-size': '33px', padding: '3%' })
    $('#clean').css({ 'font-size': '33px', padding: '3%' })
    $('.buttonsGame').css({ width: '34vw' })
    $('#puzzle-clues li').css({ 'font-size': '3.9vw' })
    $('.textClaves').css({ height: '300px', padding: '0 20px' })
    $('.claves h2').css({ 'font-size': '50px' })

    /*Page numbering*/
    $('.pagesMagazine').css({ 'font-size': '35px', padding: '30px 50px', right: 0 })
    $('.even .pagesMagazine').css({ left: 'unset' })
    $('.even .spaceDate').css({ margin: '0 20px' })
    $('.odd .spaceDate').css({ margin: '0 20px' })

    /*Table content*/
    $('.li-tablecontent').css({ 'line-height': '5.3vw' })
    $('.containerTable h1').css({ 'font-size': '3vw' })
    $('.containerPage').css({ 'font-size': '3vw' })
    $('.ul-containerTable').css({ padding: '70px 80px' })

    /*Tooltip*/
    $('.tooltip div p').css({ 'font-size': '2.4em', bottom: '5%' })
    $('.photo').css({ width: '90px', height: '90px', 'padding-left': '26px' })
    $('.profilePhoto').css({ width: '650px', height: '650px' })
    $('.tooltiptext').css({ bottom: '-1178%', left: '50%', 'margin-left': '-9px' })

    /*Section to each page*/
    $('.name-section h3').css({ 'font-size': '2em', padding: '14px 20px 10px 20px' })
    $('.iconSection').css({ width: '16vw' })

    /*Button LeerMas*/
    $('.LeerMas img').css({ width: '12.5vw', 'border-radius': '65px' })
    $('.LeerMas p').css({ 'font-size': '2.8vw' })

    /*Button Audio*/
    $('.imgAudio').css({ width: '12.5vw', 'border-radius': '65px' })
    $('.audioBtnLink p').css({ 'font-size': '2.8vw' })

    /*Interactive Map*/
    $('.mapaImg').css({ height: '62vh' })
}