//DOM Elements //
const content = document.querySelector('.main-content');
const newBookBtn = document.querySelector('.new-book');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('.close-btn');
const addBtn = document.querySelector('.add-btn');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageNumber = document.getElementById('page');
const radioBtns = document.querySelectorAll('input[type="radio"]');
const labels = Array.from(document.querySelectorAll('label'));


//Label for buttons//
let labelText = "";
//Library array//
const myLibrary = [];

//Function for finding label on radio button//
radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener('change', () => {
      const labelForRadio = labels.find(label => label.htmlFor === radioBtn.id);
      
      if (labelForRadio) {
        labelText = labelForRadio.textContent;
    }
});
  });



//Function constructor for book//
// function Book (title, author, pages, read) {
//  this.author = author
//  this.title = title
//  this.pages = pages
//  this.read = read
// }

class Book {
    constructor (title,author,pages, read){
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read

    }
}




   
//Event listener for new book button//
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

//Event listener for close button//
closeBtn.addEventListener('click', (e) => {
 e.preventDefault ();   
 dialog.close();
 titleInput.value = "";
authorInput.value = "";
pageNumber.value = "";
document.querySelector('#read').checked = false;
document.querySelector('#not-read').checked = false;

});




//Event listener for add button//
addBtn.addEventListener('click', (e) => {
    e.preventDefault ();
    let titleValue = titleInput.value;
    let authorValue = authorInput.value;
    let pageValue = pageNumber.value;
    if (titleValue == "" || authorValue == "" || pageValue == "" || 
    document.querySelector('#read').checked === false && document.querySelector('#not-read').checked === false)  
    {
        alert("Please fill out fields")
    } else {
        //Function to add books to myLibrary array as new instances//
        function addBooktoLibrary () {
            const newBook = new Book (titleValue,authorValue,pageValue,labelText)
            myLibrary.push(newBook);
            const bookIndex = myLibrary.length - 1;
            displayBookInfo(bookIndex); 
            
            
            //Function to display book using DOM//
            function displayBookInfo (bookIndex) {
                const newDiv = document.createElement('div')
                newDiv.classList.add('card');
                content.appendChild(newDiv)
                const title = document.createElement('p');
                title.textContent = `Title: ${newBook.title}`;
                const author = document.createElement('p');
                author.textContent = `Author: ${newBook.author}`;
                const page = document.createElement('p');
                page.textContent = `Pages: ${newBook.pages}`;
    
                newDiv.appendChild(title)
                newDiv.appendChild(author)
                newDiv.appendChild(page)
                const readDivContainer = document.createElement('div');
                newDiv.appendChild(readDivContainer)
                const notReadDivCont = document.createElement('div');
                newDiv.appendChild(notReadDivCont)
                const removeBtnContainer = document.createElement('div')
                newDiv.appendChild(removeBtnContainer)
                removeBtnContainer.style.paddingTop = '10px';
    
                
    
                if (labelText === 'Not read') {
                    const notReadBtn = document.createElement('button');
                    notReadBtn.textContent = 'Not Read';
                    notReadBtn.classList.add('not-read-btn');
                    notReadDivCont.appendChild(notReadBtn)
                    notReadBtn.addEventListener ('click', ()=> {
                        notReadBtn.classList.remove('not-read-btn')
                        notReadBtn.classList.toggle('read-btn')
                        if (notReadBtn.classList.contains('read-btn')) {
                            notReadBtn.textContent = 'Read'
                            
                        } else {
                            notReadBtn.classList.add('not-read-btn')
                            notReadBtn.textContent = 'Not Read'
                        }
                    })
    
                } else {
                    const readBtn = document.createElement('button');
                    readBtn.textContent = 'Read'
                    readBtn.classList.add('read-btn');
                    readDivContainer.appendChild(readBtn)
                    readBtn.addEventListener('click', ()=> {
                        readBtn.classList.toggle('not-read-btn')
                        if (readBtn.classList.contains('not-read-btn')) {
                            readBtn.textContent = 'Not Read';
                        } else {
                            readBtn.textContent = 'Read';
                        }
                    })
                }
    
    
                
    
                
                //Functionality for remove button//
                const removeBookBtn = document.createElement('button');
                removeBookBtn.textContent = "Remove Book"
                removeBtnContainer.appendChild(removeBookBtn)
                removeBookBtn.setAttribute('data-index', bookIndex);
                removeBookBtn.classList.add('remove-btn')
                removeBookBtn.addEventListener('click', (e)=> {
                    const cards = document.querySelectorAll('.card');
                    const dataIndex = parseInt(removeBookBtn.getAttribute('data-index'))
                    let cardToRemove = cards[dataIndex];
                    cardToRemove.remove();
                    myLibrary.splice(dataIndex, 1)
                    updateDataIndex();
                });
                
            }
    
        
            
        }
    
        addBooktoLibrary ();
            
            titleInput.value = "";
            authorInput.value = "";
            pageNumber.value = "";
            document.querySelector('#read').checked = false;
            document.querySelector('#not-read').checked = false;
    
        dialog.close();
        
    
    
    }
    
    });
    

    
    
    



//Function to update remove button indexes after one is removed//
function updateDataIndex () {
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((button,dataIndex) => {
        button.setAttribute('data-index',dataIndex)
        
    });
}   



