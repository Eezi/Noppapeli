/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();


//addEventListener muodostaa eventin               type of event  Anonymus function tekee toiminnon
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
         //Tämä function toteutuu kun painetaan nappia

        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Tyhjentää ajemmat tulokset
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        

        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else if (dice === 6) {
            
        }else {
            nextPlaeyr();
        }
        
        
    }
   
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Lisätään tämän hetkinen tulos kokonaistuloksiin
        scores[activePlayer] += roundScore;
        //2. päivitetään UI + activeplayer tunnistaa kummalle pisteet menee scores from activeplayer
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //3. Tarkistetaan voittiko pelaaja pelin.
        input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            var winningScore = input;
        }else {
            winningScore = 100;
        }
        
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            //Hakee winner luokan css kansiosta ja muokaa voittajan panelin.
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;


        } else {
            nextPlaeyr();
        }
    }
    
    
});

function nextPlaeyr() {
     //next player
        // if statement ? = {}  ja : = else
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        //muutetaan current tulos nollaksi
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //Siirretään vuoropallo toiselle
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //documentFragment.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelectorAll('.player-1-player').classList.add('active');

        //Kun tulee toisen vuoro niin noppa häviää
        document.querySelector('.dice').style.display = 'none';
}
                                                        //init kutsuu function
document.querySelector('.btn-new').addEventListener('click', init);
   


function init() {
    scores = [0,0];
    roundScore  = 0;
    activePlayer = 0;
    gamePlaying = true;
    //Piilotetaan noppa ruudusta
    document.querySelector('.dice').style.display = 'none';
    //getElementById ottaa id elementit hmtl osuudesta
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


