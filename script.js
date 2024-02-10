const addNewBookBtn = document.querySelector(".new-book-btn");
const form = document.querySelector(".book-form");
const cardContainer = document.querySelector(".card-container");

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const myLibrary = [
	{
		title: "Crime and Punishment",
		author: "Fyodor Dostoevsky",
		pages: 400,
		read: "Yes",
	},
	{
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		pages: 180,
		read: "Yes",
	},
	{
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		pages: 281,
		read: "No",
	},
];

function displayBooks() {
	cardContainer.innerHTML = "";
	myLibrary.forEach((book) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `
		<h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>Have you read: ${book.read} </p>
            <div class="btn-container">
                <button class="remove-btn">Remove</button>
				<button class="read-btn">Read</button>
            </div>
		`;

		const removeBtn = card.querySelector(".remove-btn");
		removeBtn.addEventListener("click", () => {
			myLibrary.splice(myLibrary.indexOf(book), 1);
			displayBooks();
		});

		const readBtn = card.querySelector(".read-btn");
		readBtn.addEventListener("click", () => {
			if (book.read === "Yes") {
				book.read = "No";
			} else {
				book.read = "Yes";
			}
			displayBooks();
		});

		cardContainer.appendChild(card);
	});
}

function addBookToLibrary(book) {
	myLibrary.push(book);
	displayBooks();
}

addNewBookBtn.addEventListener("click", () => {
	form.style.display = "block";
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const pages = document.querySelector("#pages").value;
	const readRadioButtons = document.querySelectorAll('input[name="read"]');
	let read = null;
	readRadioButtons.forEach((radio) => {
		if (radio.checked) {
			read = radio.value;
		}
	});

	const newBook = new Book(title, author, pages, read);
	addBookToLibrary(newBook);
	form.reset();
});

displayBooks();
