const checkGrid = document.querySelector(".check-grid");
const addCheckForm = document.querySelector(".add-form");
const checkURLInput = document.querySelector("#check-url");
const checkNameInput = document.querySelector("#check-name");
const addCheckBtn = document.querySelector(".btn--add");

const checks = [{ "Python (built-in)": "https://www.python.org" }];

addCheckForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let checkURL = checkURLInput.value;
  let checkName = checkNameInput.value;

  // Add to checks array
  checks.push({ checkName: checkURL });

  // Add to check grid
  checkGrid.insertAdjacentHTML(
    "beforeend",
    `<div class="check-card" onclick="openModal('${checkURL}')">
        <div class="check-card--name">
            <p data-check-name="${checkName}">${checkName}</p>
        </div>
    </div>`
  );
});

function openModal(url) {
  const modalHTML = `
        <div class="modal-overlay" id="modal">
            <div class="modal">
                <button class="modal-close" onclick="closeModal()">✖</button>
                <iframe src="${url}"></iframe>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
  }
}
