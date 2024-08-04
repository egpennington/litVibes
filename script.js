import { booksData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios');
const getBookBtn = document.getElementById('get-book-btn');
const bookModalInner = document.getElementById('book-modal-inner');
const bookModal = document.getElementById('book-modal');
const bookModalCloseBtn = document.getElementById('book-modal-close-btn');

emotionRadios.addEventListener('change', highlightCheckedOption);
getBookBtn.addEventListener('click', renderBook);
bookModalCloseBtn.addEventListener('click', closeModal);

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios) {
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function closeModal() {
    bookModal.style.display = 'none';
}

function renderBook() {
    const bookObject = getSingleBookObject();
    bookModalInner.innerHTML = `
        <h2>${bookObject.title}</h2>
        <h3>by ${bookObject.author}</h3>
        <p>${bookObject.description}</p>
        <img class="book-cover" src="${bookObject.cover}" alt="${bookObject.title}">
    `;
    bookModal.style.display = 'block';
}

function getSingleBookObject() {
    const bookArray = getMatchingBooksArray();
    if (bookArray.length === 1) {
        return bookArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * bookArray.length);
        return bookArray[randomNumber];
    }
}

function getMatchingBooksArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const matchingBooksArray = booksData.filter(function (book) {
            return book.emotionTags.includes(selectedEmotion);
        }).flatMap(book => book.books);
        return matchingBooksArray;
    }
    return [];
}

function getEmotionsArray(books) {
    const emotionsArray = [];
    for (let item of books) {
        for (let emotion of item.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(books) {
    let radioItems = '';
    const emotions = getEmotionsArray(books);
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>`;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(booksData);