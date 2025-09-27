// ### VARIABLES ###
const fileInput = document.querySelector("input[type='file']");
const removeBtn = document.querySelector(".remove-btn");
const changeBtn = document.querySelector(".change-btn");
let dropbox;
dropbox = document.querySelector(".drop-zone");

let counter = 0;

const dropInstructions = document.querySelector(".drag-and-drop-instructions");
const thumbailDisplay = document.querySelector(".thumbail-display");

const uploadInfoOutput = document.querySelector(".drop-zone ~ .validation-msg");
const infoMsg = uploadInfoOutput.querySelector(".validation-text");

const emailInput = document.querySelector("#email");
const emailErrContainer = document.querySelector("#email ~ .validation-msg");
const emailErrMsg = emailErrContainer.querySelector(".validation-text");

const inputsWrapper = document.querySelectorAll(".input-wrapper");
const form = document.querySelector("form");
const submitBtn = form.querySelector("button[type='submit']");

const fullNameInput = document.querySelector("#full-name");
const gitHubInput = document.querySelector("#github-username");

const dialog = document.querySelector(".success-modal");

const formStatus = {
  avatarUpload: false,
  fullName: false,
  email: false,
  gitHubUsername: false,
};

// ### FUNCTIONS ###

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

function file() {
  handleFiles(this.files);
}

function changeMsgColor(element) {
  element.classList.add("error");
}

function resetMsg(element) {
  element.classList.remove("error");
  infoMsg.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
}

function handleFiles(files) {
  for (const file of files) {
    const allowedFileTypes = ["image/png", "image/jpg"];
    if (!allowedFileTypes.includes(file.type)) {
      infoMsg.textContent = `Wrong image format. Please upload a JPG or PNG.`;
      changeMsgColor(uploadInfoOutput);
      formStatus.avatarUpload = false;
    } else if (file.size > 500e3) {
      infoMsg.textContent = `File too large. Please upload a photo under 500KB.`;
      changeMsgColor(uploadInfoOutput);
      formStatus.avatarUpload = false;
    } else {
      resetMsg(uploadInfoOutput);
      formStatus.avatarUpload = true;
      dropInstructions.classList.add("hide");
      thumbailDisplay.classList.remove("hide");

      const img = document.querySelector(".thumbail-container img");

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);

      if (files.length) {
        const newDt = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          newDt.items.add(file);
        }
        fileInput.files = newDt.files;
      }
    }
  }
}

// ### EVENT LISTENERS ###

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragleave", dragleave, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

removeBtn.addEventListener("click", () => {
  dropInstructions.classList.remove("hide");
  thumbailDisplay.classList.add("hide");
  formStatus.avatarUpload = false;
});

changeBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", file, false);

emailInput.addEventListener("input", (e) => {
  if (emailInput.validity.typeMismatch) {
    emailErrContainer.classList.remove("hide");
    emailErrMsg.textContent = "Plese enter a valid email address.";
    emailInput.style.outline = "2px solid #b88894";
    formStatus.email = false;
  } else {
    emailErrContainer.classList.add("hide");
    emailInput.style.outline = "unset";
    formStatus.email = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputsWrapper.forEach((inputWrapper) => {
    const input = inputWrapper.querySelector("input");

    if (input !== fileInput && !input.validity.valueMissing) {
      setFormStatus(input, true);
    }

    if (getFormStatus()) {
      dialog.show();
    }
  });
});

inputsWrapper.forEach((inputWrapper) => {
  const input = inputWrapper.querySelector("input");
  const validationMsg = inputWrapper.querySelector(".validation-msg");
  const validationText = validationMsg.querySelector(".validation-text");

  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    if (input.validity.valueMissing) {
      validationMsg.classList.add("error");
      validationMsg.classList.remove("hide");
      validationText.textContent = "This field should be completed.";
      input.style.outline = "2px solid #b88894";
      setFormStatus(input, false);
    }
  });

  if (input !== fileInput && !input.validity.valueMissing) {
    setFormStatus(input, true);
  }
});

function setFormStatus(input, status) {
  switch (input) {
    case fileInput:
      formStatus.avatarUpload = status;
      break;
    case fullNameInput:
      formStatus.fullName = status;
      break;
    case emailInput:
      formStatus.email = status;
      break;
    case gitHubInput:
      formStatus.gitHubUsername = status;
      break;
    default:
      break;
  }
}

function getFormStatus() {
  for (const input in formStatus) {
    if (!Object.hasOwn(formStatus, input)) continue;

    const status = formStatus[input];

    if (!status) {
      return false;
    }
  }

  return true;
}
