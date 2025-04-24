// Glue

document.getElementById("cancel-button").addEventListener("click", () => {
  const ui = document.getElementById("ncrs-ui");
  ui.exportModal.hide();
});

const warning = document.getElementById("warning");
const acceptWarning = document.getElementById("accept-warning-button");

if (window.matchMedia("(max-width: 800px)").matches) {
  if (!localStorage.getItem("ncrs-ignore-warning")) {
    warning.classList.remove("hidden");
    warning.classList.add("flex");
  }
}

acceptWarning.addEventListener("click", () => {
  warning.classList.add('hidden');
  warning.classList.remove('flex');
  localStorage.setItem('ncrs-ignore-warning', true);
});