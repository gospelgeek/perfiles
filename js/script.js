// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL 
function crosswordGame() {

    (function($) {
        $(function() {
            // provide crossword entries in an array of objects like the following example
            // Position refers to the numerical order of an entry. Each position can have 
            // two entries: an across entry and a down entry
            var puzzleData = [{
                    clue: "Primera jueza de Israel. Libró al pueblo de mano de Sísara",
                    answer: "debora",
                    position: 1,
                    orientation: "across",
                    startx: 2,
                    starty: 2
                },
                {
                    clue: "Esposa de Nabal, salvó de la destrucción su casa, gracias a su sabiduría.",
                    answer: "abigail",
                    position: 2,
                    orientation: "across",
                    startx: 1,
                    starty: 4
                },
                {
                    clue: "Reina Persa, pero de origen judío. Salvó al pueblo de Israel de una masacre",
                    answer: "esther",
                    position: 3,
                    orientation: "across",
                    startx: 1,
                    starty: 6
                },
                {
                    clue: "Madre de los sacerdotes Moisés, Aaron y Myriam",
                    answer: "jocabed",
                    position: 4,
                    orientation: "down",
                    startx: 5,
                    starty: 1
                }
            ]

            $('#puzzle-wrapper').crossword(puzzleData);

        })

    })(jQuery)

}