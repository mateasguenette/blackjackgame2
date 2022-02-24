
/*----- constants -----*/
/*----- app's state (variables) -----*/
let dealerCards = []
let playerCards = []

let player = {
    total: 0,
    stand: false,
    hits: [],
    wins: 0
}


let dealer = {
    total: 0,
    stand: false,
    draws: [],
    wins: 0
}

/*----- cached element references -----*/
let playerDiv = document.querySelector('player')

let hitButton = document.getElementById('hit')
let standButton = document.getElementById('stand')
let resetButton = document.getElementById('reset')
let newGameButton = document.getElementById('new-game')
let newGameModalButton = document.getElementById('new-game-modal')

let newCardSpot = document.getElementById('player')
let dealerNewCardSpot = document.getElementById('dealer')

let playerTotalDiv = document.getElementById('playerTotal')
let dealerTotalDiv = document.getElementById('dealerTotal')

let playerWins = document.getElementById('playerWins')
let dealerWins = document.getElementById('dealerWins')

let but = document.getElementById('button')
let x = document.querySelector('.close')
let popUp = document.getElementById('whoWon')

/*----- event listeners -----*/



hitButton.addEventListener('click', handlehit)
standButton.addEventListener('click', handlestand)
resetButton.addEventListener('click', reset)
newGameButton.addEventListener('click', newgame)
newGameModalButton.addEventListener('click', newgame)

but.addEventListener('click', openWindow)
x.addEventListener('click', closeWindow)

/*----- functions -----*/
reset()


function handlehit(e){
    e.preventDefault()
    // add a card 
    newCard(player)
        
    
    
}





function newCard(who){
    if(who == player){
    let n = Math.floor(Math.random() * 13) 
    let y = Math.floor(Math.random() * 4) 
    
    let cardNum = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
    let type = ['c', 'd', 's', 'h']
            
    let newCard2 = document.createElement('div')
    newCard2.className = 'card medium ' + type[y] + cardNum[n];
    newCard2.classList.add('new-card')
    playerCards.push(newCard2)
    newCardSpot.appendChild(newCard2)
    


    // add to total
    if (parseInt(cardNum[n]) || cardNum[n] == 'A'){
        player.total += cardNum.indexOf(cardNum[n])+1
    
    }else {
        player.total += 10
    }

    over21()

    render()

    }

    if(who == dealer){
        let n = Math.floor(Math.random() * 13) 
    let y = Math.floor(Math.random() * 4) 
    
    let cardNum = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
    let type = ['c', 'd', 's', 'h']
            
    let newCard3 = document.createElement('div')
    newCard3.className = 'card medium ' + type[y] + cardNum[n];
    newCard3.classList.add('new-card')
    dealerCards.push(newCard3)
    dealerNewCardSpot.appendChild(newCard3)

    // add total
    if (parseInt(cardNum[n]) || cardNum[n] == 'A'){
        dealer.total += cardNum.indexOf(cardNum[n])+1
    
    }else {
        dealer.total += 10
    }
    
    over21()

    render()
    }


    

}

function reset(){
    
    player.wins = 0
    dealer.wins = 0
    hitButton.disabled = false
    standButton.disabled = false
    player.total = 0
    dealer.total = 0

    

    //delete old game
    playerCards.forEach(function(card){
        newCardSpot.removeChild(card)
    })

    dealerCards.forEach(function(card){
        dealerNewCardSpot.removeChild(card)
    })

    playerCards = []
    dealerCards = []

    // draw one to dealer
    newCard(dealer)

    
    // draw 2 cards for player
    for(let i = 0; i < 2; i++){
        newCard(player)
    }

}

function newgame(e){
    e.preventDefault()

    hitButton.disabled = false
    standButton.disabled = false
    player.total = 0
    dealer.total = 0

    //delete old game
    playerCards.forEach(function(card){
        newCardSpot.removeChild(card)
    })

    dealerCards.forEach(function(card){
        dealerNewCardSpot.removeChild(card)
    })

    playerCards = []
    dealerCards = []

    // draw one to dealer
    newCard(dealer)

    
    // draw 2 cards for player
    for(let i = 0; i < 2; i++){
        newCard(player)
    }
    closeWindow()
}

function render(){
    playerTotalDiv.innerText = `total:  ${player.total}`
    dealerTotalDiv.innerText = `total:  ${dealer.total}`
    playerWins.innerText = `wins: ${player.wins}`
    dealerWins.innerText = `wins: ${dealer.wins}`

    

}


function handlestand(e) {
    e.preventDefault()
    //stop accepting hits
        // disable hit when player 
        hitButton.disabled = true
        standButton.disabled = true
    // draw card for dealer
    newCard(dealer)
    //check winner
    setTimeout(winner, 1500)
}

function over21 (){
    if(dealer.total > 21){
        console.log('you win')
        player.wins += 1
        openWindow(player)
        console.log(`player: ${player.wins}`)
    }
    if(player.total > 21){
        
        console.log('you loose')
        dealer.wins += 1
        openWindow(dealer)
        console.log(`dealer: ${dealer.wins}`)
    }
}

function winner(){
    
    console.log('inside winner')
   
    console.log(player.total)
    console.log(dealer.total)

    if(dealer.total > 21){
        
        
        player.wins += 1
        openWindow(player)
    }
    if(player.total > 21){
        
        
        dealer.wins += 1
        openWindow(dealer)
    }

    if(player.total < 21 && dealer.total < 21){
        if(player.total > dealer.total){
            
            player.wins += 1
            openWindow(player)
        }else{
            
            dealer.wins += 1
            
            openWindow(dealer)
        }
    }


}

function openWindow(who){
    if(who == player){
        popUp.innerText = `you win!`

    }
    if(who == dealer){
        popUp.innerText = `you loose!`
    }
    document.querySelector('.bg-modal').style.display = 'flex';
    
}

function closeWindow(){
    document.querySelector('.bg-modal').style.display = 'none'
}