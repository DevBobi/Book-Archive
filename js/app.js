// Search Books
const searchBooks = () =>{
    const inputText = document.getElementById('input-field');
    const search = inputText.value;
    // clear input field
    inputText.value='';
    
    const url = `https://openlibrary.org/search.json?q=${search}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data));
}

// count result 
const displayBooks = books => {
    const searchResult = document.getElementById('search-result');
    document.getElementById('result-found').innerText = books.numFound;
    
    // clear search result on new search
    searchResult.textContent='';

    // Throw errors
    if (books.docs.length === 0) {
        searchResult.innerHTML = `
        <div class="col-md-12 text-center">
            <div class="error-template text-danger">
                <h1>
                    Oops!
                    
                </h1>
                <h2>
                    404 Not Found
                </h2>
                <div class="error-details">
                    Sorry, The page you requested was not found!
                </div>
            </div>
        </div>
        `;
    }
    
    // get single book 
    books.docs.forEach(book => {
        // console.log(book);

        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <div class="row gx-md-4 " >
                <div class="col-md-4 p-2">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 200px;" alt="...">
                </div>
                <div class="card-body col-md-6">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-danger fst-italic">By: ${book.author_name}</p>
                    <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year}</small></p>
                    <p class="card-text"><small class="text-muted">Publisher : ${book.publisher}</small></p>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        
    });
   
    
}