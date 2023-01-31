import axios from 'axios';

axios.get('http://localhost:3004/person').then((response) => {
  console.log(response);
});

axios.get('http://localhost:3004/person').then((response) => {
  createCards(response.data);
});

const storedCards: any = [];
console.log(storedCards);

interface Person {
  id: number;
  image: URL;
  name: string;
  genre: string;
  email: string;
  telephone: string;
  comments: string;
}

let isEditBtnCLicked = false;
let isSaveBtnClicked = false;
const isRemoveBtnClicked = false;

const createCards = (data: Person[]) => {
  const container = document.querySelector('.card-container');

  data.forEach((character) => {
    const card: HTMLDivElement = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', character.id.toString());

    card.innerHTML = `                
    <img class="image" src="${character.image}" alt="${character.name} PIC">
    <form class="cardtext">
      <h1>
        <span class="name">
          ${character.name}
        </span>
      </h1>
      <p>
        <span class="genre">
          ${character.genre}
        </span>
      </p>
      <p>
        <span class="email">
          ${character.email}
        </span>
      </p>
      <p>
        <span class="telephone">
          ${character.telephone}
        </span>
      </p>
      <p>
        <i>
          <span class="comments">
            ${character.comments}
          </span>
        </i>
      </p>
      <div class="button-container">
        <button class="btn-save" type="button">Save</button>
        <button class="btn-edit" type="button">Edit</button>
        <button class="btn-remove" type="button">Remove</button>
      </div>
    </form>`;

    container.appendChild(card);

    function createInput(event: any) {
      const closestCard = event.target.closest('.card');

      // Remove text for name
      closestCard.querySelector('.name').innerText = '';

      // Create input element for name
      const nameInput: HTMLInputElement = document.createElement('input');
      nameInput.placeholder = character.name;
      closestCard.querySelector('.name').appendChild(nameInput);

      // Remove text for genre
      closestCard.querySelector('.genre').innerText = '';

      // Create input element for genre
      const genreInput: HTMLInputElement = document.createElement('input');
      genreInput.placeholder = character.genre;
      closestCard.querySelector('.genre').appendChild(genreInput);

      // Remove text for email
      closestCard.querySelector('.email').innerText = '';

      // Create input element for email
      const emailInput: HTMLInputElement = document.createElement('input');
      emailInput.placeholder = character.email;
      closestCard.querySelector('.email').appendChild(emailInput);

      // Remove text for telephone
      closestCard.querySelector('.telephone').innerText = '';

      // Create input element for telephone
      const telephoneInput: HTMLInputElement = document.createElement('input');
      telephoneInput.placeholder = character.telephone;
      closestCard.querySelector('.telephone').appendChild(telephoneInput);

      // Remove text for comments
      closestCard.querySelector('.comments').innerText = '';

      // Create input element for comments
      const commentsInput: HTMLInputElement = document.createElement('input');
      commentsInput.placeholder = character.comments;
      closestCard.querySelector('.comments').appendChild(commentsInput);
    }

    const editBtnClicked = (event: any) => {
      const closestCard = event.target.closest('.card');
      isEditBtnCLicked = true;
      closestCard.querySelector('.btn-remove').innerHTML = 'Cancel';
      if (closestCard.querySelector('.btn-save').classList.contains('hidden')) {
        storedCards.push(card.innerHTML);
      }
      closestCard.querySelector('.btn-edit').classList.add('hidden');
      closestCard.querySelector('.btn-save').classList.remove('hidden');
      closestCard.querySelector('.btn-save').addEventListener('click', saveBtnClicked);

      const nameText = closestCard.querySelector('.name');
      const genreText = closestCard.querySelector('.genre');
      const emailText = closestCard.querySelector('.email');
      const commentsText = closestCard.querySelector('.comments');

      nameText.innerHTML = '';
      nameText.appendChild(createInput(event));
      genreText.innerHTML = '';
      genreText.appendChild(createInput(event));
      emailText.innerHTML = '';
      emailText.appendChild(createInput(event));
      commentsText.innerHTML = '';
      commentsText.appendChild(createInput(event));
    };

    const editBtns = document.querySelectorAll('.btn-edit');
    editBtns.forEach((editBtn) => {
      editBtn.addEventListener('click', editBtnClicked);
    });

    const saveBtnClicked = (event: any) => {
      const closestCard = event.target.closest('.card');
      isSaveBtnClicked = true;
      closestCard.querySelector('.btn-edit').classList.remove('hidden');
      closestCard.querySelector('.btn-save').classList.add('hidden');

      const inputName = closestCard.querySelector('.name input');
      const inputGenre = closestCard.querySelector('.genre input');
      const inputEmail = closestCard.querySelector('.email input');
      const inputTelephone = closestCard.querySelector('.telephone input');
      const inputComments = closestCard.querySelector('.comments input');

      if (inputName.value !== '') {
        character.name = inputName.value;
      }
      if (inputGenre.value !== '') {
        character.genre = inputGenre.value;
      }
      if (inputEmail.value !== '') {
        character.email = inputEmail.value;
      }
      if (inputTelephone.value !== '') {
        character.telephone = inputTelephone.value;
      }
      if (inputComments.value !== '') {
        character.comments = inputComments.value;
      }
      closestCard.innerHTML = `                
      <img class="image" src="${character.image}" alt="${character.name} PIC">
      <form class="cardtext">
        <h1>
          <span class="name">
            ${character.name}
          </span>
        </h1>
        <p>
          <span class="genre">
            ${character.genre}
          </span>
        </p>
        <p>
          <span class="email">
            ${character.email}
          </span>
        </p>
        <p>
          <span class="telephone">
            ${character.telephone}
          </span>
        </p>
        <p>
          <i>
            <span class="comments">
              ${character.comments} 
            </span>
          </i>
        </p>
        <div class="button-container">
          <button class="btn-save" type="button">Save</button>
          <button class="btn-edit" type="button">Edit</button>
          <button class="btn-remove" type="button">Remove</button>
        </div>
      </form>`;
      closestCard.querySelector('.btn-save').classList.add('hidden');
      closestCard.querySelector('.btn-edit').addEventListener('click', editBtnClicked);
      closestCard.querySelector('.btn-remove').addEventListener('click', removeBtnClicked);

      axios.put(`http://localhost:3004/person/${character.id}`, character).then((resopnse) => {
        storedCards.pop();
      });
    };

    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach((saveBtn) => {
      saveBtn.classList.add('hidden');
      saveBtn.addEventListener('click', saveBtnClicked);
    });

    const removeBtnClicked = (event: any) => {
      let closestCard = event.target.closest('.card');
      if (closestCard.querySelector('input')) {
        closestCard.innerHTML = `                
        <img class="image" src="${character.image}" alt="${character.name} PIC">
        <form class="cardtext">
          <h1>
            <span class="name">
              ${character.name}
            </span>
          </h1>
          <p>
            <span class="genre">
              ${character.genre}
            </span>
          </p>
          <p>
            <span class="email">
              ${character.email}
            </span>
          </p>
          <p>
            <span class="telephone">
              ${character.telephone}
            </span>
          </p>
          <p>
            <i>
              <span class="comments">
                ${character.comments} 
              </span>
            </i>
          </p>
          <div class="button-container">
            <button class="btn-save" type="button">Save</button>
            <button class="btn-edit" type="button">Edit</button>
            <button class="btn-remove" type="button">Remove</button>
          </div>
        </form>`;
        closestCard.querySelector('.btn-save').classList.add('hidden');
        closestCard.querySelector('.btn-edit').addEventListener('click', editBtnClicked);
        closestCard.querySelector('.btn-remove').addEventListener('click', removeBtnClicked);
        closestCard = [...storedCards[0]];
        storedCards.pop();
      }
    };

    const removeBtns = document.querySelectorAll('.btn-remove');
    removeBtns.forEach((removeBtn) => {
      removeBtn.addEventListener('click', removeBtnClicked);
    });

    const removeCardBtnClicked = (event: any) => {
      const closestCard = event.target.closest('.card');
      const cardId = closestCard.getAttribute('id');
      axios.delete(`http://localhost:3004/person/${cardId}`).then((response) => {
        closestCard.classList.add('hidden');
        storedCards.pop();
      });
    };
    const removeCardBtns = document.querySelectorAll('.btn-remove');
    removeCardBtns.forEach((removeBtn) => {
      removeBtn.addEventListener('click', removeCardBtnClicked);
    });
  });

  const addBtnClicked = () => {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    newCard.innerHTML = `                
    <img class="image" src="" alt="PIC">
    <form class="cardtext">
      <h1>
        <span class="name">
          <input placeholder="Name">
        </span>
      </h1>
      <p>
        <span class="genre">
          <input placeholder="Genre">
        </span>
      </p>
      <p>
      <span class="email">
        <input placeholder="E-mail">
      </span>
      </p>
      <p>
        <span class="telephone">
          <input placeholder="Telephone">
        </span>
      </p>
      <p>
        <i>
          <span class="comments">
            <input placeholder="Comments">
            </span>
        </i>
      </p>
      <div class="button-container">
        <button class="btn-save" type="button">Save</button>
        <button class="btn-edit" type="button">Edit</button>
        <button class="btn-remove" type="button">Remove</button>
      </div>
    </form>`;

    newCard.querySelector('.btn-edit').classList.add('hidden');

    container.appendChild(newCard);
    storedCards.push(newCard);

    const saveBtnClicked = () => {
      const saveBtn = newCard.querySelector('.btn-save');

      newCard.querySelector('.btn-save').classList.add('hidden');
      newCard.querySelector('.btn-edit').classList.remove('hidden');
      const nameText = newCard.querySelector('.name');
      const genreText = newCard.querySelector('.genre');
      const emailText = newCard.querySelector('.email');
      const telephoneText = newCard.querySelector('.telephone');
      const commentsText = newCard.querySelector('.comments');

      const inputName = newCard.querySelector('.name input');
      const inputGenre = newCard.querySelector('.genre input');
      const inputEmail = newCard.querySelector('.email input');
      const inputTelephone = newCard.querySelector('.telephone input');
      const inputComments = newCard.querySelector('.comments input');

      if (nameText && inputName) {
        nameText.innerHTML = inputName.value;
      }
      if (genreText && inputGenre) {
        genreText.innerHTML = inputGenre.value;
      }
      if (emailText && inputEmail) {
        emailText.innerHTML = inputEmail.value;
      }
      if (telephoneText && inputTelephone) {
        telephoneText.innerHTML = inputTelephone.value;
      }
      if (commentsText && inputComments) {
        commentsText.innerHTML = inputComments.value;
      }

      axios.post('http://localhost:3004/person', {
        name: inputName.value,
        genre: inputGenre.value,
        email: inputEmail.value,
        telephone: inputTelephone.value,
        comments: inputComments.value,
      })
        .then((response) => {
          newCard.setAttribute('id', response.data.id);
        });
    };

    storedCards.pop();

    newCard.querySelector('.btn-save').addEventListener('click', saveBtnClicked);

    newCard.querySelector('.btn-remove').addEventListener('click', () => {
      newCard.classList.add('hidden');
      const cardId = newCard.getAttribute('id');
      console.log(cardId);
      axios.delete(`http://localhost:3004/person/${cardId}`)
        .then((response) => {
          console.log(response);
        });
    });
  };

  const addBtn: HTMLButtonElement = document.querySelector('.btn-add');
  addBtn.addEventListener('click', addBtnClicked);
};
