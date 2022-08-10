// delete books
const list = document.querySelector('#books-list ul');
list.addEventListener('click', e => {
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        list.removeChild(li);
        // Remove from local storage
        removeFromLocalStorage(li);
    };
});

// add books
const addForm = document.forms['add-book'];
addForm.addEventListener('submit', e => {
    const value = addForm.querySelector('input[type = "text"]').value;

    // create elements
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBook = document.createElement('span');

    // append elements
    li.appendChild(bookName);
    li.appendChild(deleteBook);
    list.appendChild(li);

    // add content
    bookName.textContent = value;
    deleteBook.textContent = 'delete';

    // add class
    bookName.classList.add('name');
    deleteBook.classList.add('delete');

    // add to local storage
    addToLocalStorage(value);

    // Clear value
    value = '';

    e.preventDefault();
});

// Display books from local storage
document.addEventListener('DOMContentLoaded', () => {
    let mangas;
    if(localStorage.getItem('mangas') === null){
        mangas = [];
    } else {
        mangas = JSON.parse(localStorage.getItem('mangas'));
    }

    mangas.forEach((manga) => {
        // create elements
        const li = document.createElement('li');
        const bookName = document.createElement('span');
        const deleteBook = document.createElement('span');

        // append elements
        li.appendChild(bookName);
        li.appendChild(deleteBook);
        list.appendChild(li);

        // add content
        bookName.textContent = manga;
        deleteBook.textContent = 'delete';

        // add class
        bookName.classList.add('name');
        deleteBook.classList.add('delete');
    })
})

// hide elements
const hide = document.querySelector('#hide');
hide.addEventListener('change', e => {
    if(hide.checked){
        list.style.display = 'none';
    } else{
        list.style.display = 'block';
    };
});

// filter books
const searchBox = document.forms['search-books'].querySelector('input');
searchBox.addEventListener('keyup', e => {
    const terms = e.target.value.toLowerCase();
    const books = list.querySelectorAll('li');
    books.forEach(book => {
        const title = book.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(terms) != -1){
            book.style.display = 'block';
        } else{
            book.style.display = 'none';
        }
    })
})

// local storage
function addToLocalStorage(manga){
    let mangas;
    if(localStorage.getItem('mangas') === null){
        mangas = [];
    } else {
        mangas = JSON.parse(localStorage.getItem('mangas'));
    }
    mangas.push(manga);
    localStorage.setItem('mangas', JSON.stringify(mangas));
}

// removeFromLocalStorage
function removeFromLocalStorage(mangaItem){
    let mangas;
    if(localStorage.getItem('mangas') === null){
        mangas = [];
    } else {
        mangas = JSON.parse(localStorage.getItem('mangas'));
    }

    mangas.forEach((manga, index) => {
        if(mangaItem.firstChild.textContent === manga){
            mangas.splice(index, 1);
        }
    })

    localStorage.setItem('mangas', JSON.stringify(mangas));
}

// // tabbed content
// const tabs = document.querySelector('#tab');
// const panels = document.querySelectorAll('.panel');
// tabs.addEventListener('click', e => {
//     if(e.target.tagName == 'A'){
//         const targetPanel = document.querySelector(e.target.dataset.target)
//         panels.forEach(panel => {
//             if(panel == targetPanel){
//                 panel.classList.add('active')
//             } else{
//                 panel.classList.remove('active')
//             }
//         })
//     }
// })