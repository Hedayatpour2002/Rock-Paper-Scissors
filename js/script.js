const $ = document;
const body = $.body;

const userScoreElem = $.querySelector(".human-score");
const aiScoreElem = $.querySelector(".ai-score");
const choiceElements = $.querySelectorAll(".choice__btn");

const actionElements = $.querySelectorAll(".action");
const aiActionElem = $.querySelector(".ai__action");
const humanActionElem = $.querySelector(".human__action");

const outcomeTitleElem = $.querySelector(".outcome__title");
const nextElem = $.querySelector(".outcome__next");
const restartElem = $.querySelector(".outcome__restart");

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

    setTimeout(() => {
      result(userChoice, aiChoice);
    }, 2000);
  });
});

function handAction(userChoice, aiChoice) {
  // dom update !! //todo
  $.body.classList.add("processing");

  console.log("User : " + userChoice);
  console.log("AI : " + aiChoice);
}

function aiSelection() {
  let choice = Math.floor(Math.random() * 3);
  return options[choice];
}

function result(user, ai) {
  resultAnimation(user, ai);

  if (user === ai) {
    outcomeTitleElem.innerHTML = "it's a drow";
  } else if (
    (user === "rock" && ai === "scissors") ||
    (user === "paper" && ai === "rock") ||
    (user === "scissors" && ai === "paper")
  ) {
    outcomeTitleElem.innerHTML = "you win!";
    scores.user++;
  } else {
    outcomeTitleElem.innerHTML = "you loose!";
    scores.ai++;
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

function resultAnimation(user, ai) {
  body.classList.replace("processing", "result");

  actionElements.forEach((item) => {
    item.classList.add("action--animationPaused");
  });

  aiActionElem.classList.add(`ai__action--${ai}`);
  console.log(user);
  humanActionElem.classList.add(`human__action--${user}`);
}

nextElem.addEventListener("click", () => {
  body.classList.remove("result");
  removeActionElementsClass();
});
restartElem.addEventListener("click", () => {
  body.classList.remove("result");
  scores.user = scores.ai = 0;
  removeActionElementsClass();
  updateResultElements();
  updateLocalStorage();
});

function removeActionElementsClass() {
  let humanCalss = humanActionElem.classList;
  let aiCalss = aiActionElem.classList;
  humanCalss.remove(humanCalss[humanCalss.length - 1]);
  aiCalss.remove(aiCalss[aiCalss.length - 1]);
}
