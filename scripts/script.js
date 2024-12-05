const cardValues = {
  "6x": 6,"6b": 6,"6p": 6,"6c": 6,
  "7x": 7,"7b": 7,"7p": 7,"7c": 7,
  "8x": 8,"8b": 8,"8p": 8,"8c": 8,
  "9x": 9,"9b": 9,"9p": 9,"9c": 9,
  "10x": 10,"10b": 10,"10p": 10,"10c": 10,
  'Jx': 2,'Jb': 2,'Jp': 2,'Jc': 2,
  'Qx': 3,'Qb': 3,'Qp': 3,'Qc': 3,
  'Kx': 4,'Kb': 4,'Kp': 4,'Kc': 4,
  'Ax': 11,'Ab': 11,'Ap': 11,'Ac': 11
};
const userImg = document.getElementById("UserCard");
const computerImg = document.getElementById("ComputerCard");
const cards = Object.keys(cardValues);

userImg.src="Resources/cardB.jpg";
computerImg.src="Resources/cardB.jpg";

let userScore = 0;
let computerScore = 0;
let round = 0;

function startGame() {
  const username = document.getElementById('username').value.trim();
  if (username === "") {
      alert("Будь ласка, введіть ваше ім'я!");
      return;
  }

  document.getElementById('playerName').innerText = username;

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function AddUserCard(){
  const userCard = getRandomCard();
  userImg.src="Resources/" + userCard + ".jpg";
  userScore += cardValues[userCard];
  document.getElementById('userScore').innerText = userScore;
}

function AddComputerCard(){
  const computerCard = getRandomCard();
  computerImg.src="Resources/" + computerCard + ".jpg";
  computerScore += cardValues[computerCard];
  document.getElementById('computerScore').innerText = computerScore;
}

function CheckEnd(){
  if (round === 3) {
    let result;

    if(userScore <= 21 && computerScore > 21){
      result = "Ви виграли!";
    } else if (computerScore <= 21 && userScore > 21){
      result = "Виграв комп'ютер!";
    } else if (computerScore > 21 && userScore > 21){
      result = "Нічия"
    } else if((userScore == 21) || (userScore > computerScore && userScore < 21) && computerScore != 21){
      result = "Ви виграли!";
    } else if((computerScore == 21) || (computerScore > userScore && computerScore < 21) && userScore != 21){
      result = "Виграв комп'ютер!";
    } else if(userScore === computerScore){
      result = "Нічия"
    }
    
    alert(result);
  }
}

function playRound() {
  if (round >= 3) {
      alert("Гра закінчена! Натисніть на кнопку перезавантаження для нової гри.");
      return;
  }
  round++;

  AddUserCard();
  if(computerScore < 18 && computerScore < userScore && userScore <= 21){
    AddComputerCard();
  }

  CheckEnd();
}

function restartGame() {
  userScore = 0;
  computerScore = 0;
  round = 0;

  document.getElementById('userScore').innerText = '0';
  document.getElementById('computerScore').innerText = '0';

  userImg.src="Resources/cardB.jpg";
  computerImg.src="Resources/cardB.jpg";

  document.getElementById('username').value = '';
}

function stopGame(){
  if (round >= 3) {
    alert("Гра закінчена! Натисніть на кнопку перезавантаження для нової гри.");
    return;
  }else if (round != 0){
    if(computerScore < 18 && computerScore < userScore && userScore <= 21){
      AddComputerCard();
    }

    round++;
    CheckEnd();
  }
}