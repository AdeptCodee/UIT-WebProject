// Lặp qua tất cả các nút có class "drum"
var drumButtons = document.querySelectorAll(".drum");

for (var i = 0; i < drumButtons.length; i++) {
  drumButtons[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

// Lắng nghe khi nhấn phím
document.addEventListener("keypress", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

// Hàm phát âm thanh
function makeSound(key) {
  switch (key) {
    case "a":
      new Audio("sounds/do.mp3").play();
      break;
    case "s":
      new Audio("sounds/re.mp3").play();
      break;
    case "d":
      new Audio("sounds/mi.mp3").play();
      break;
    case "f":
      new Audio("sounds/fa.mp3").play();
      break;
    case "g":
      new Audio("sounds/sol.mp3").play();
      break;
    case "h":
      new Audio("sounds/la.mp3").play();
      break;
    case "j":
      new Audio("sounds/si.mp3").play();
      break;
    default:
      console.log(key);
  }
}

// Hiệu ứng nhấn nút
function buttonAnimation(currentKey) {
  var activeButton = document.getElementById(currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(function () {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}
