let flippedCards = [];
let matchedCards = 0;
let lockBoard = false;

const cards = document.querySelectorAll('.card');
const statusMessage = document.getElementById('statusMessage');



shuffleCards();

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flip') || flippedCards.length === 2) return;

    card.classList.add('flip');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });
});

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.letter === card2.dataset.letter;

  if (isMatch) {
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === 16) {
      statusMessage.textContent = "🎉 You win! All pairs matched!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function shuffleCards() {
  const board = document.getElementById('gameBoard');
  const shuffled = Array.from(cards);
  shuffled.sort(() => Math.random() - 0.5);
  shuffled.forEach(card => board.appendChild(card));
}
