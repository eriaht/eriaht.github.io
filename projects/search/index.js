const numItems = 10;
let item = 10;
let wait = 1000;
let linDone = false,
  binDone = false;
const startBtn = document.querySelector(".start-btn");
const linearItemContainer = document.querySelector(
  ".item-container.linear-items"
);
const binaryItemContainer = document.querySelector(
  ".item-container.binary-items"
);
let linearItems, binaryItems;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const clearItems = () => {
  linearItemContainer.innerHTML = "";
  binaryItemContainer.innerHTML = "";
};

const createItems = () => {
  // Create items
  for (let i = 0; i < numItems; i++) {
    let linearItem = document.createElement("div");
    let binaryItem = document.createElement("div");

    linearItem.appendChild(document.createTextNode(`${i + 1}`));
    linearItem.classList.add("item", "linear-item");
    linearItemContainer.appendChild(linearItem);

    binaryItem.appendChild(document.createTextNode(`${i + 1}`));
    binaryItem.classList.add("item", "binary-item");
    binaryItemContainer.appendChild(binaryItem);
  }

  linearItems = document.querySelectorAll(".linear-item");
  binaryItems = document.querySelectorAll(".binary-item");
};

const linearSearch = async () => {
  for (let i = 0; i < numItems; i++) {
    linearItems[i].classList.add("selected");
    if (+linearItems[i].innerText === item) {
      linearItems[i].classList.add("found");
      break;
    }

    await sleep(wait);
    linearItems[i].classList.remove("selected");
  }
  linDone = true;
};

const binarySearch = async () => {
  let start = 0;
  let end = binaryItems.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    binaryItems[mid].classList.add("selected");

    let oldStart = start,
      oldEnd = end;
    binaryItems[start].classList.add("l-red");
    binaryItems[end].classList.add("r-red");

    if (+binaryItems[mid].innerText === item) {
      binaryItems[mid].classList.add("found");
      break;
    } else if (+binaryItems[mid].innerText > item) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    await sleep(wait);
    binaryItems[mid].classList.remove("selected");
    binaryItems[oldStart].classList.remove("l-red");
    binaryItems[oldEnd].classList.remove("r-red");
    // binaryItems[start].classList.add("l-black");
    // binaryItems[end].classList.add("r-black");
  }
  binDone = true;
};

const main = () => {
  createItems();
  startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    clearItems();
    createItems();
    binarySearch();
    linearSearch().then(() => {
      if (linDone && binDone) startBtn.disabled = false;
    });
  });
};

main();
