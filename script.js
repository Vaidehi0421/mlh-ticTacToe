const status=document.querySelector(".game-status")
let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""]
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningState = ()=>`Player ${currentPlayer} has won!`
const drawState = ()=> `It is a draw!!`
const currentTurn = ()=> `Player ${currentPlayer}'s turn`
status.innerHTML= currentTurn();
function handleCellPlayed(clickedCell,clickedCellIndex)
{
    gameState[clickedCellIndex]=currentPlayer
    clickedCell.innerHTML=currentPlayer
}
function handleResultValidation(){
    let won=false
    for(let i=0;i<8;i++){
        const currCond=winningConditions[i]
        let a=gameState[currCond[0]]
        let b=gameState[currCond[1]]
        let c=gameState[currCond[2]]
        if(a===""||b===""||c==="")
        continue
        if(a===b && b===c) 
        {   
            status.innerHTML=winningState()
            document.querySelectorAll(".cell").forEach(cell=>{
                if(cell.getAttribute('data-index')==currCond[0])
                cell.style.backgroundColor="red"
                if(cell.getAttribute('data-index')==currCond[1])
                cell.style.backgroundColor="red"
                if(cell.getAttribute('data-index')==currCond[2])
                cell.style.backgroundColor="red"
            })
            won=true 
            break
        }
    }
    if(won)
    {
        gameActive=false
        return
    }
    let draw=gameState.includes("")
    if(!draw)
    {
        status.innerHTML=drawState()
        gameActive=false
        return
    }
    //Current Player Change
    currentPlayer= currentPlayer==="X"? "O":"X"
    status.innerHTML=currentTurn()
}
document.querySelectorAll(".cell").forEach(cell=>{
    cell.addEventListener('click',(clickedEvent)=>{
        const clickedCell=clickedEvent.target
        const clickedCellIndex=parseInt(clickedCell.getAttribute('data-index'))
        if(gameState[clickedCellIndex]!=="" || !gameActive)
            return
        handleCellPlayed(clickedCell,clickedCellIndex)
        handleResultValidation()
    })
})
document.querySelector(".game-restart").addEventListener('click',()=>{
    gameActive=true
    currentPlayer="X"
    gameState=["","","","","","","","",""]
    status.innerHTML=currentTurn()
    document.querySelectorAll(".cell").forEach(cell=>{
        cell.innerHTML=""
        cell.style.backgroundColor="green"
    }
    )
})