const gameArea = document.querySelectorAll('td');
const display = document.querySelector('.msg');
const reset = document.querySelector('button');

const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

let firstCheck = [];
let secondCheck = [];

const winConditions = [
    [0,1,2],
    [1,4,7],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// Player factory function

const playerObj = () => {
    const player1 = {
        marker: 'X',
        isFirst: true,
        positions: ['', '', '', '', '', '', '', '', ''],
        score: 0,
    }

    const player2 = {
        marker: 'O',
        isFirst: false,
        positions: ['', '', '', '', '', '', '', '', ''],
        score: 0,
    }

    return { player1, player2 };
}

const first = playerObj().player1;
const second = playerObj().player2;





const gameFunctions = () => {

// Loop through table

gameArea.forEach((btn) => {
    btn.addEventListener('click', function(){
      addElement(btn); 
    })


})


// Reset game event

reset.addEventListener('click', resetGame);


// Fill the position & add elem. to array

const addElement = (space) => {


    if(first.isFirst && !space.classList.contains('taken')){
        let pos = space.innerText;
        space.classList.add('taken');
        space.innerText = first.marker;
        space.style.color = 'red';
        space.style.fontSize = '2em';
        space.style.fontWeight = '700';
        first.positions[pos] = first.marker;
        first.isFirst = false; 
        checkWin(first.positions, firstCheck, first.marker);
    }

    else  if (!space.classList.contains('taken')) {
        space.classList.add('taken');
        let pos = space.innerText;
        space.innerText = second.marker;
        space.style.color = '#00FF00';
        space.style.fontSize = '2em';
        second.positions[pos] = second.marker;
        first.isFirst = true;
        checkWin(second.positions, secondCheck, second.marker);
    }

  }

}

// Build dynamic array and veirfy game win

const checkWin = (pos, curCheck, mark) => {

        let buildArray = (pos, arr, marker) => {

            let checker = pos.indexOf(marker);
            arr.push(checker);
            if(arr.includes(-1))
            arr.pop();
            delete pos[checker];
            }
    
        buildArray(pos, curCheck, mark);

        winConditions.forEach((el, index) => {
            const compare = el.every(val => curCheck.includes(val));
            
            if(compare){
                if(mark == first.marker){
                display.innerText = `${mark} wins`;
                display.style.color = 'red';
            }

                else {
                display.innerText = `${mark} wins`;
                display.style.color = '#00FF00';
                }
                gameArea.forEach((el) => {
                    el.classList.add('taken');

                })

                if(mark == 'X'){
                first.score++;
                score1.innerText = first.score;
                } else {
                    second.score++;
                    score2.innerText = second.score;
                }
            }

            if(curCheck.length >= 5 && !compare){
                display.innerText = 'Draw';
            }
            
        })

    }

    // Reset

    let resetGame = () => {
        first.positions = ['', '', '', '', '', '', '', '', ''];
        first.isFirst = true;
        second.positions = ['', '', '', '', '', '', '', '', ''];
        firstCheck = [];
        secondCheck = [];
        display.innerText = '';
        let i = 0;
        gameArea.forEach((el) => {
            el.classList.remove('taken');
            el.innerText = i;
            el.style.color = 'transparent';
            i++;
        })
    }

gameFunctions();