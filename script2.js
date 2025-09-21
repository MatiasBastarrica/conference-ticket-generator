const fileInput = document.querySelector("input[type='file']");

const dropInstructions = document.querySelector(".drag-and-drop-instructions");

const thumbailDisplay = document.querySelector(".thumbail-display");

const removeBtn = document.querySelector(".remove-btn");
const changeBtn = document.querySelector(".change-btn");

const uploadInfoOutput = document.querySelector(".avatar-photo-info");
const infoMsg = uploadInfoOutput.querySelector(".upload-err-msg");

let counter = 0;

let dropbox;

dropbox = document.querySelector(".drop-zone");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragleave", dragleave, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
  counter++;
  dropbox.style.backgroundColor = "#373451a4";
}

function dragleave(e) {
  e.stopPropagation();
  e.preventDefault();
  counter--;
  if (counter === 0) {
    dropbox.style.backgroundColor = "#1a163985";
  }
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  counter = 0;
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  for (const file of files) {
    // if (!file.type.startsWith("image/")) {
    //   continue;
    // }

    let result = "";

    if (file.size > 500e3) {
      result += `File too large. Please upload a photo under 500KB.`;
      infoMsg.textContent = result;
      changeMsgColor(uploadInfoOutput);
    } else {
      resetMsg(uploadInfoOutput);
      dropInstructions.classList.add("hide");
      thumbailDisplay.classList.remove("hide");

      const img = document.querySelector(".thumbail-container img");

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

removeBtn.addEventListener("click", () => {
  dropInstructions.classList.remove("hide");
  thumbailDisplay.classList.add("hide");
});

fileInput.addEventListener("change", file, false);

function file() {
  handleFiles(this.files);
}

changeBtn.addEventListener("click", () => {
  fileInput.click();
});

function changeMsgColor(element) {
  element.classList.add("error");
}

function resetMsg(element) {
  element.classList.remove("error");
  infoMsg.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
}
