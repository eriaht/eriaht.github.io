const input = document.querySelector(".to-do-input");
const addButton = document.querySelector(".to-do-button");
const appForm = document.querySelector(".app-form");
const toDoContainer = document.querySelector(".to-do-container");
const clearAllButton = document.querySelector(".clear");

// Audio
const myAudio = document.querySelector("#app-audio");
const audioButton = document.querySelector(".audio-button i");

audioButton.addEventListener("click", () => {
  play_pause();
});

function play_pause() {
  if (myAudio.paused) {
    audioButton.classList.remove("ri-play-circle-fill");
    audioButton.classList.add("ri-pause-circle-fill");
    myAudio.play();
  } else {
    audioButton.classList.add("ri-play-circle-fill");
    audioButton.classList.remove("ri-pause-circle-fill");
    myAudio.pause();
  }
}

// Check if there is an existing keyState in local storage
// if there is no keyState create one
if (!localStorage.getItem("keyState")) {
  localStorage.setItem("keyState", 0);
}

// Render to-do items from local storage
renderToDoItems();

// Listen for click on checkbox icon
toDoContainer.addEventListener("click", (e) => {
  const itemKey = e.target.closest(".to-do-item").dataset.key;
  const toDoText = e.target
    .closest(".to-do-item")
    .querySelector(".to-do-item__text");

  if (e.target.classList.contains("ri-checkbox-blank-circle-line")) {
    // Set done to true in local storage
    localStorage.setItem(
      itemKey,
      `${
        toDoText.innerText.split(",2501b7bb-9d0b-4004-b22d-5a7d9797c16e")[0]
      },2501b7bb-9d0b-4004-b22d-5a7d9797c16etrue`
    );

    e.target.classList.remove("ri-checkbox-blank-circle-line");
    e.target.classList.add("ri-checkbox-circle-fill");
    toDoText.classList.toggle("line-through");
  } else if (e.target.classList.contains("ri-checkbox-circle-fill")) {
    // Set done to false in local storage
    localStorage.setItem(
      itemKey,
      `${
        toDoText.innerText.split(",2501b7bb-9d0b-4004-b22d-5a7d9797c16e")[0]
      },2501b7bb-9d0b-4004-b22d-5a7d9797c16efalse`
    );

    e.target.classList.add("ri-checkbox-blank-circle-line");
    e.target.classList.remove("ri-checkbox-circle-fill");
    toDoText.classList.toggle("line-through");
  }
});

// Listen for click on trash icon
toDoContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("ri-delete-bin-2-fill")) {
    const itemKey = e.target.closest(".to-do-item").dataset.key;

    // Remove to-do item from local storage
    localStorage.removeItem(itemKey);

    // Render to-do items from localStorage
    renderToDoItems();
  }
});

// Listen for form submission
appForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting to action

  if (input.value === "") return;

  // Add to-do item to local storage
  window.localStorage.setItem(
    `item${localStorage.getItem("keyState")}`,
    input.value
  );

  const item = `<div class="to-do-item" data-key="item${localStorage.getItem(
    "keyState"
  )}">
          <i class="checkbox ri-checkbox-blank-circle-line"></i>
          <p class="to-do-item__text">${localStorage.getItem(
            `item${localStorage.getItem("keyState")}`
          )}</p>
          <span class="to-do-item__controls">
            <i class="ri-delete-bin-2-fill"></i>
          </span>
        </div>`;

  toDoContainer.insertAdjacentHTML("afterbegin", item);

  // Increment keyState
  localStorage.setItem(
    "keyState",
    JSON.parse(localStorage.getItem("keyState")) + 1
  );

  // Clear input
  input.value = "";
});

// Listen for clear all button
clearAllButton.addEventListener("click", (e) => {
  localStorage.clear();

  localStorage.setItem("keyState", 0);

  renderToDoItems();
});

function renderToDoItems() {
  // Clear to-do items
  toDoContainer.innerHTML = "";

  if (localStorage.length < 1) return;

  // Populate to-do items from localStorage
  for (let key of orderLocalStorageKeys()) {
    if (key === "keyState") continue;

    const toDoItem = localStorage.getItem(key);

    let done;
    let toDoText = toDoItem;
    if (toDoItem.includes(",")) {
      [toDoText, done] = toDoItem.split(
        ",2501b7bb-9d0b-4004-b22d-5a7d9797c16e"
      );
    }

    let doneIcon;
    let lineThrough = "";
    // Check if done exists
    if (done) {
      if (JSON.parse(done)) {
        doneIcon = "ri-checkbox-circle-fill";
        lineThrough = "line-through";
      } else {
        doneIcon = "ri-checkbox-blank-circle-line";
      }
    } else {
      doneIcon = "ri-checkbox-blank-circle-line";
    }

    const item = `<div class="to-do-item" data-key="${key}">
      <i class="checkbox ${doneIcon}"></i>
        <p class="to-do-item__text ${lineThrough}">${toDoText}</p>
        <span class="to-do-item__controls">
          <i class="ri-delete-bin-2-fill"></i>
        </span>
      </div>`;

    toDoContainer.insertAdjacentHTML("afterbegin", item);
  }
}

function orderLocalStorageKeys() {
  const keys = [];
  for (let key = 0; key < localStorage.length; key++) {
    keys.push(localStorage.key(key));
  }

  return keys.sort();
}
