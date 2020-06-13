//Animation for the text 
const type=" TIC TAC TOE";
let index=0;
let letter ="";
(function run(){
    letter=type.slice(0,++index);
    document.getElementById('headText').textContent=letter;
    if(index===type.length)
    {
        index=0;
    }    
    setTimeout(run,300);
})();

const XClass='x';
const OClass='o';
let OTurn;

//winning combinations
const winningCombinations=[
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
 
//get the cell elements
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const winningMessage=document.querySelector('[data-winning-text]');
const winningMessageElement=document.getElementById('winner');
const restart=document.getElementById('restart');

startGame()

restart.addEventListener('click',startGame);

function startGame(){
    OTurn=false;
    //each cell can be clicked only once
    cellElements.forEach(cell=>{
        cell.classList.remove(XClass);
        cell.classList.remove(OClass);
        cell.addEventListener('click',handleClick,{once:true});
})
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}
function handleClick(e){
    //place Mark
    const cell=e.target;
    const currentClass = OTurn ? OClass : XClass;
    placeMark(cell,currentClass);

    //Result
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        //swap Turns
        swapTurns() ;
        //to resume the hover effect whenever page reloads
        setBoardHoverClass();
    }  
}

//Result
function endGame(draw){
    if(draw){
        winningMessage.textContent='Draw!';
    }
    else{
        winningMessage.textContent=`${OTurn ? "O " :"X "}Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    OTurn = !OTurn;
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(XClass)||
        cell.classList.contains(OClass);
    })
}

function setBoardHoverClass(){
     board.classList.remove(XClass);
     board.classList.remove(OClass);
     if(OTurn){
         board.classList.add(OClass);
     }
     else{
         board.classList.add(XClass);
     }
}

function checkWin(currentClass){
    return winningCombinations.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
