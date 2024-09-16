const searchButton = document.getElementById('searchButton');
const categoriesButton = document.getElementById('categoriesButton');
const categoryInput = document.getElementById('category');
const results = document.getElementById('results');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const closePopup = document.getElementById('closePopup');
const overlay = document.getElementById('overlay');
const categories = [
  "fantasy",
  "science_fiction",
  "romance",
  "history",
  "biography",
  "mystery",
  "horror",
  "children",
  "young_adult",
  "poetry",
  "comics",
  "drama"
];

function displayCategories() {
  try {
    results.innerHTML = '';
    const card = document.createElement('div');
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.addEventListener('click', () => {
        categoryInput.value = category;
        searchBooks();
      });
      card.appendChild(button);
      results.appendChild(card);
    });
  } catch (error) {
    console.error('Errore durante la visualizzazione delle categorie:', error);
    alert('C’è stato un errore durante la visualizzazione delle categorie.');
  }
}
async function searchBooks() {
  try {
    if (!categoryInput.value) {
      alert("NON SAI QUALE CATEGORIA CERCARE? PROVA QUESTE!");
      displayCategories();
      return;
    }
    
    const response = await fetch(`https://openlibrary.org/subjects/${categoryInput.value}.json`);
    
    if (!response.ok) {
      throw new Error(`Errore nel recuperare i dati: ${response.status} ${response.statusText}`);
    }
    
    const booksData = await response.json();
    const books = booksData.works;

    results.innerHTML = '';
    popup.style.display = 'none';
    overlay.style.display = 'none';

    books.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('card');

      const coverImage = document.createElement('img');
      const coverId = book.cover_id;
      const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'https://via.placeholder.com/200x300?text=Nessuna+Immagine';
      coverImage.src = coverUrl;
      card.appendChild(coverImage);

      const title = document.createElement('h2');
      title.textContent = book.title;
      card.appendChild(title);

      const author = document.createElement('p');
      author.textContent = book.authors[0].name;
      card.appendChild(author);

      coverImage.style.cursor = 'pointer';
      coverImage.addEventListener('click', () => getBookDescription(book.key, book.title));
      results.appendChild(card);
    });
  } catch (error) {
    console.error('Errore durante la ricerca dei libri:', error);
    alert('C’è stato un errore durante la ricerca dei libri. Per favore, riprova.');
  }
}
async function getBookDescription(bookKey, bookTitle) {
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);
    
    if (!response.ok) {
      throw new Error(`Errore nel recuperare i dettagli del libro: ${response.status} ${response.statusText}`);
    }

    const bookData = await response.json();
    const description = bookData.description?.value || bookData.description || 'Nessuna descrizione disponibile';
    
    popupTitle.textContent = bookTitle;
    popupDescription.textContent = description;
    popup.style.display = 'block';
    overlay.style.display = 'block';
  } catch (error) {
    console.error('Errore durante il recupero della descrizione del libro:', error);
    alert(`Non siamo riusciti a caricare la descrizione per il libro "${bookTitle}". Per favore, riprova.`);
  }
}

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
  categoriesPopup.style.display = 'none';
});

searchButton.addEventListener('click', searchBooks);
categoriesButton.addEventListener('click', displayCategories);
