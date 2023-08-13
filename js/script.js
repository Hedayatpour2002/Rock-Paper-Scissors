const $ = document;

const choiceElements = $.querySelectorAll(".choice__btn");
const userScoreElem = $.querySelector(".human-score");
const aiScoreElem = $.querySelector(".ai-score");

const options = ["rock", "paper", "scissors"];
const scores = { user: 0, ai: 0 };

window.onload = () => {
  let local = JSON.parse(localStorage.getItem("scores"));
  if (local) {
    scores.user = local.user;
    scores.ai = local.ai;
    updateResultElements();
  }
};

choiceElements.forEach((item) => {
  item.addEventListener("click", () => {
    let userChoice = item.dataset.choice;
    let aiChoice = aiSelection();

    handAction(userChoice, aiChoice);

    // result(userChoice, aiChoice);

    setTimeout(() => {
      result(userChoice, aiChoice);
    }, 1000);
  });
});

function handAction(userChoice, aiChoice) {
  // dom update !! //todo
  console.log("User : " + userChoice);
  console.log("AI : " + aiChoice);
}

function aiSelection() {
  let choice = Math.floor(Math.random() * 3);
  return options[choice];
}

function result(user, ai) {
  if (user === ai) {
    // dom update !! //todo
    console.log("drow");
  } else if (
    (user === "rock" && ai === "scissors") ||
    (user === "paper" && ai === "rock") ||
    (user === "scissors" && ai === "paper")
  ) {
    // dom update !! //todo
    scores.user++;
    console.warn("user win");
  } else {
    // dom update !! //todo
    scores.ai++;
    console.error("ai win");
  }

  updateResultElements();
  updateLocalStorage();
}
function updateResultElements() {
  userScoreElem.innerHTML = scores.user;
  aiScoreElem.innerHTML = scores.ai;
}
function updateLocalStorage() {
  localStorage.setItem("scores", JSON.stringify(scores));
}
