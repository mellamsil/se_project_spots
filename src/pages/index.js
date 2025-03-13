import { data } from "autoprefixer";
import {
  enableValidation,
  validationconfig,
  resetValidation,
  settings,
  disabledButton,
} from "../scripts/validation.js";

import "./index.css"; // add import of the main stylesheets file
import Api from "../utils/Api.js";

// const initialcards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e08ba333-182c-4c7b-8c1d-58a385da92c1",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
  })

  .catch(console.error);

api.getAppInfo().then((cards) => {
  console.log(cards);
});

const numbers = [2, 3, 5];

// Arrow function. How will Internet Explorer cope with it?
const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // 4, 6, 10

// Profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// edit form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.querySelector("#edit-profile-form");
const editModalCloseButton = editModal.querySelector(".modal__close");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
// card form elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
const cardModalCloseButton = cardModal.querySelector(".modal__close");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

// preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = document.querySelector(
  ".modal__close_type_preview"
);

//card related elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(event) {
  if (event.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function closeModalOverlay(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal, settings);
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  event.target.reset();
  disabledButton(cardSubmitButton, settings);
  closeModal(cardModal);
}

// Select an element
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", (evt) => {
    cardElement.remove();
  });

  cardLinkEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

// Set an event listener
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  //OPTIONAL
  resetValidation(
    editModal,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

enableValidation(validationconfig);

// function renderCard(item, method = "append") {
//   const cardElement = getCardElement(item);
//   cardsList[append](cardElement);
// }
