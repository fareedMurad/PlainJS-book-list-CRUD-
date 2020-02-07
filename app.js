
//  Book Class      
class Book{
    constructor(t,a,i){
        this.title = t;
        this.author = a;
        this.isbn = i;
    }
}

// UI Class
class UI{
    static displayBooks(){
        // const StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'Jhon Doe',
        //         isbn: '12345'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Jane Doe',
        //         isbn: '5455'
        //     }
        // ]

        const books = Store.getBook();    
        
        books.forEach((book) => UI.addBookToList(book));

    }
    
    static addBookToList(book){
        
        const list = document.querySelector(`#book-list`);

        const row = document.createElement(`tr`);

        row.innerHTML = `
            <td class = "text-success">${book.title}</td>
            <td class = "text-warning author">${book.author}</td>
            <td class = "text-primary">${book.isbn}</td>
            <td><button class = "btn btn-danger btn-sm delete">X</button></td>`

        list.appendChild(row);
    }
    
    // Show Alert Message
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const alert = document.querySelector('.alert');
        alert.appendChild(div);

        // Vanish alert message in 3 seconds
        setTimeout(() => div.remove(),3000);
    }
    // clear fields method definition
    static clearFields(){
        document.querySelector(`#title`).value = '';
        document.querySelector(`#author`).value = '';
        document.querySelector(`#isbn`).value = '';
    }
}
class Store{

    // Get Book from localStorage
     static getBook = () =>{
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
     }

     // Add Book to localStorage
     static addBook = (book) =>{
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
     }

     // Remove Book From localStorage
     static removeBook = (isbn) =>{
         const books = Store.getBook();

         books.forEach((book, index) => {
             if(book.isbn === isbn)
             books.splice(index, 1);
         });

         localStorage.setItem('books', JSON.stringify(books));
     }
     
}
// Events that Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks());

// Events for Add Books
document.querySelector('#book-form').addEventListener('submit',(e) => {

    // prevent actual submit
    e.preventDefault();

    // Get Form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

   
    // validation   
    if(title === ''||author === '' ||isbn === ''){
        UI.showAlert('Please Fill out All Fields','danger');
    }else
    {

        // Instatiate Book Class object
        const book = new Book(title,author,isbn);
       
        // Add book to UI
        UI.addBookToList(book);
        Store.addBook(book);

    // succes alert
    UI.showAlert(`Book Added`,'success')
 
    // clear Fields
    UI.clearFields();
    }
});
    
// delete book

const del = document.querySelectorAll('#book-list');

    del.forEach((del) =>{   
        del.addEventListener('click',(e) => {
             if(e.target.classList.contains('delete'))
             {console.log(e)
                e.target.parentElement.parentElement.remove();
                Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
                UI.showAlert(`Book Deleted`,'success'); 
             }
})});

     