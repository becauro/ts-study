import dotenv from 'dotenv' ;
dotenv.config({ path: '../.env' });

import readLine from 'readline-sync';
// import { poolcreator as connection } from './models/connection'; // testando
import BookModel, { Book } from './models/Book'; 

const bookModel = new BookModel();


async function getAll() {

	try {
	
		const result = await bookModel.getAll();
		console.log(result);		
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
	
	}

	
	

}


async function create() {


	try {
	
		const title = readLine.question('Type the book title: ');
		const price = readLine.question('Type the book price: ');
		const author = readLine.question('Type the book author: ');
		const isbn = readLine.question('Type the book isbn: ');

		const newBook: Book = { title, price, author, isbn }; 
		
		const createdBook = await bookModel.create(newBook);
		console.log(createdBook);
	
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
		
	}

	

}

async function deleteBook() {


	try {
	
		const typedId: number = readLine.questionInt('Type the book id: ');
			
		const result = await bookModel.deleteById<Book>(typedId);
		console.log(result);
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
		
	}

}

const main = async () => {


	const options = ['Get All Books', 'Register a book', 'Delete a book'];
	
	const answer: number = readLine.keyInSelect(options, 'Please, choose an option');
	
	switch(answer) {
	
		case 0 :
		
			await getAll();
			break;
			
		case 1 :
			
			await create()
			break;
			
		case 2 :
			
			await deleteBook()
			break
			
	};


	process.exit();
	
}

	main();
