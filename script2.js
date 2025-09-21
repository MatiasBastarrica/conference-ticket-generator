const fileInput = document.querySelector("input[type='file']");

const dropInstructions = document.querySelector(".drag-and-drop-instructions");

const thumbailDisplay = document.querySelector(".thumbail-display");

let dropbox;

dropbox = document.querySelector(".drop-zone");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      continue;
    }
    dropInstructions.classList.toggle("hide");
    thumbailDisplay.classList.toggle("hide");

    const img = document.querySelector(".thumbail-container img");

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
