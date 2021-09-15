// Search Books
const toggleResult = displayStyle => {
    document.getElementById('display-result').style.display=displayStyle;
}
//  inputfield & datafetch
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

// count results
const displayBooks = books => {
    const searchResult = document.getElementById('search-result');
    document.getElementById('result-found').innerText = books.numFound;
    
    // display toggleResult
    toggleResult('block');

    // clear search result on new search
    searchResult.textContent='';
    

    // Throw errors
    if (books.docs.length === 0) {
        toggleResult('none')
        searchResult.innerHTML = `
        <div class="col-md-12 text-center">
            <div class="error-template ">
                <h1 >
                    Oops!
                </h1>
                <h3 class="text-danger">
                    No Data Found!
                </h3>
            </div>
        </div>
        `;
    }
    
    // get single book  & dynamic data
    books.docs.slice(0,20).forEach(book => {
        // console.log(book);
        

        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card ">
            <div class="row">
                <div class="col-md-4 p-2">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" style="height: 200px;" alt="...">
                </div>
                <div class="card-body col-md-6">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-danger fst-italic"> <span class="text-dark">Author : </span>${book.author_name}</p>
                    <p class="card-text"><small class="text-muted">Published Year : ${book.first_publish_year}</small></p>
                    <p class="card-text"><small class="text-muted">Publisher : ${book.publisher[0]}</small></p>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        
    });
   
    
}
