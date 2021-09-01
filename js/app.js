const searchText = document.getElementById('input-field');
const searchButton = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');

const searchBooks = () =>{
    const search = searchText.value;

    // clear 
    searchText.value='';
    searchResult.textContent='';
    const url = `http://openlibrary.org/search.json?q=${search}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data.docs));
}

const displayBooks = books => {
    console.log(books);
    books.forEach (book => {
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card col-lg-12" >
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p>Author: ${book.author_name}</p>
                <p>Publish Date: ${book.publish_date}</p> 
                <p>Publisher: ${book.publisher}</p> 
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        
    });
    
}