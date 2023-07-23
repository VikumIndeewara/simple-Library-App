const modal = document.getElementById("modal");
const btn = document.getElementById("addbook");
const span = document.getElementById("close");

btn.onclick = function (){
    modal.style.display = "block";
}

span.onclick = function (){
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

const submitForm = document.getElementById("submit");
submitForm.addEventListener("submit", store);

let myLibrary = [];

function book(title, author, pages , status ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function displayBooks() {
  const container = document.getElementById("cont");
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const newbook = document.createElement("section");
    newbook.classList.add("newAddBooks");

    const newtitle = document.createElement("div");
    newtitle.textContent = book.title;
    newbook.appendChild(newtitle);

    const authorPara = document.createElement("div");
    authorPara.textContent = book.author;
    newbook.appendChild(authorPara);

    const pagesPara = document.createElement("div");
    pagesPara.textContent = book.pages;
    newbook.appendChild(pagesPara);

    const readStatusPara = document.createElement("button");
    readStatusPara.classList.add("statusButton");
    readStatusPara.setAttribute("data-index", index);
    readStatusPara.addEventListener("click",toggleStatus);

    if (book.status){
      readStatusPara.textContent = "Read";
      readStatusPara.classList.add("green");
    }else{
      readStatusPara.textContent = "Not Read";
      readStatusPara.classList.add("red");
    }
    newbook.appendChild(readStatusPara);

    const removeDiv = document.createElement("div");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove" ;
    removeButton.setAttribute("data-index", index);
    removeButton.classList.add("removeButton");
    removeButton.addEventListener("click",removeBook);
    removeDiv.appendChild(removeButton);
    newbook.appendChild(removeDiv);

    container.appendChild(newbook);
  });
}

function removeBook(event){
  const index = event.target.getAttribute("data-index");
  myLibrary.splice(index,1);
  displayBooks();
}

function toggleStatus(event){
  const index = event.target.getAttribute("data-index");
  myLibrary[index].status = !myLibrary[index].status;
  displayBooks();
}

function addBookToLibrary(title, author, pages, status) {
  var bookNew = new book(title, author, pages, status);
  myLibrary.push(bookNew);
  displayBooks();
}



function store(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").checked;

  addBookToLibrary(title, author, parseInt(pages), status);

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("status").checked = false;
}
if (myLibrary.length == 0){
  const container = document.getElementById("cont");
  container.innerHTML = "";
  const nothing = document.createElement("p");
  nothing.classList.add("nothingText");
  nothing.textContent = "Nothing to show here!";
  container.appendChild(nothing)
}else{

}