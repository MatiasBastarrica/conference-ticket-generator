const fileInput = document.querySelector("input[type='file']");

fileInput.style.opacity = "0";

const dropZone = document.querySelector(".drop-zone");
const uploadInfoOutput = document.querySelector(".avatar-photo-info");
const infoMsg = uploadInfoOutput.querySelector(".upload-err-msg");

dropZone.addEventListener("drop", dropHandler);

window.addEventListener("dragover", (e) => {
  e.preventDefault();
});

window.addEventListener("drop", (e) => {
  e.preventDefault();
});

function dropHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  let result = "";
  // Use DataTransferItemList interface to access the file(s)
  [...ev.dataTransfer.items].forEach((item, i) => {
    // If dropped items aren't files, reject them
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file.size > 500e3) {
        result += `File too large. Please upload a photo under 500KB.`;
        infoMsg.textContent = result;
        uploadInfoOutput.classList.add("error");
      }
    }
  });
}
