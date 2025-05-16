let top_zombie_count = 3;
let top_man_count = 3;

let down_zombie_count = 0;
let down_man_count = 0;

let boat_zombie_count = 0;
let boat_man_count = 0;
let boat_position = "top";

const items = document.querySelectorAll(".item");
const top_container = document.querySelector(".top-container");
const down_container = document.querySelector(".down-container");
const boat = document.querySelector("#boat");
const boat_img = document.querySelector(".boat-image");

function check_lose() {
  if (boat_position === "top") {
    if (
      top_zombie_count + boat_zombie_count > top_man_count + boat_man_count &&
      top_man_count + boat_man_count !== 0
    )
      return true;
    if (down_zombie_count > down_man_count && down_man_count !== 0) return true;
  } else {
    if (
      down_zombie_count + boat_zombie_count > down_man_count + boat_man_count &&
      down_man_count + boat_man_count !== 0
    )
      return true;
    if (top_zombie_count > top_man_count && top_man_count !== 0) return true;
  }
  return false;
}

function check_win() {
  if (down_man_count == 3 && down_zombie_count == 0 && top_zombie_count == 3)
    return true;
  return false;
}

items.forEach(function (element) {
  element.addEventListener("click", function () {
    if (element.classList.contains("inside")) {
      if (boat_position === "top") {
        top_container.append(element);
        element.classList.remove("inside");
        element.classList.add("top");
        if (element.classList.contains("zombie")) {
          boat_zombie_count--;
          top_zombie_count++;
        } else {
          boat_man_count--;
          top_man_count++;
        }
        if (check_win()) {
          alert("شما برنده شدید!");
          location.reload();
        }
      } else {
        down_container.append(element);
        element.classList.remove("inside");
        element.classList.add("down");
        if (element.classList.contains("zombie")) {
          boat_zombie_count--;
          down_zombie_count++;
        } else {
          boat_man_count--;
          down_man_count++;
        }
      }
    } else {
      if (boat_zombie_count + boat_man_count < 2) {
        if (boat_position === "top") {
          if (element.classList.contains("top")) {
            boat.append(element);
            element.classList.add("inside");
            element.classList.remove("top");
            if (element.classList.contains("zombie")) {
              top_zombie_count--;
              boat_zombie_count++;
            } else {
              top_man_count--;
              boat_man_count++;
            }
          }
        } else {
          if (element.classList.contains("down")) {
            boat.append(element);
            element.classList.add("inside");
            element.classList.remove("down");
            if (element.classList.contains("zombie")) {
              down_zombie_count--;
              boat_zombie_count++;
            } else {
              down_man_count--;
              boat_man_count++;
            }
          }
        }
      } else {
        alert("قایق پر است");
      }
    }
  });
});
boat_img.addEventListener("dblclick", function () {
  if (boat_zombie_count + boat_man_count > 0) {
    if (boat_position === "top") {
      boat.style.marginTop = "90px";
      boat_position = "down";
    } else {
      boat.style.marginTop = "0px";
      boat_position = "top";
    }

    if (check_lose()) {
      
      alert("باختید!");
      location.reload();
    }
  }
});
