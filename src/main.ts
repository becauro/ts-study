import dotenv from 'dotenv' ;
dotenv.config({ path: '../.env' });
import readLine from 'readline-sync';
import BookModel, { Book } from './models/Book'; 

const bookModel = new BookModel();


async function getAll() {

	try {
	
		const result = await bookModel.getAll<Book>();
		console.log(result);		
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
	
	}

}


async function getById() {

	try {
	
		const typedId: number = readLine.questionInt('Type the book id: ');
			
		const result = await bookModel.getById<Book>(typedId);
		
		if (result === false) return console.log(`The id ${typedId} does not exist` );
		
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


async function updateBook(){


	try {
	
		const typedId: number = readLine.questionInt('Type the book id: ');
		
	// Check whether register exists:
		
		const searchRes = await bookModel.getById<Book>(typedId);
		
		if (searchRes === false) return console.log(`The id ${typedId} does not exist` );
		
		let { title, price, author, isbn } = searchRes;
		
 	// Ask user for NEW values for every data of the register:
		
		const typed_title = readLine.question('Type the NEW book TITLE [Enter(or only space) for no change]: ');
		const typed_price = readLine.question('Type the NEW book PRICE [Enter(or only space) for no change]: ');
		const typed_author = readLine.question('Type the NEW book AUTHOR [Enter(or only space) for no change]: ');
		const typed_isbn = readLine.question('Type the NEW book ISBN [Enter(or only space) for no change]: ');
		
	// Only the values user typed are overwritten:
			
		title = typed_title !== '' ? typed_title : title;
		price = typed_price !== '' ? typed_price : price;
		author = typed_author !== '' ? typed_author : author;
		isbn = typed_isbn !== '' ? typed_isbn : isbn;
		
		if (typed_title === '' && typed_price === '' && typed_author === '' && typed_isbn === '' ) return console.log('\nHey! You perfomed NO changes! \nBYE :-)\n');
			
	
	// The following code update the register:

		const result = await bookModel.update(typedId, { title, price, author, isbn });
				
		
	// Changes report:
	
	/*
	
		console.log('\n\nRegister with previous values:');

		console.log(searchRes);	
		
		console.log('\nRegister with NEW values:');
			
		return console.log({ title, price, author, isbn });
	
	*/
	
	// TO-do Display field(s) updated
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
		
	}


} 


async function deleteBook() {


	try {
	
		const typedId: number = readLine.questionInt('Type the book id: ');
			
		const result = await bookModel.deleteById(typedId);
		
		if (result === 0) return console.log(`The id ${typedId} does not exist` );
		
		console.log(`The id ${typedId} register was deleted` );
	
	} catch (err) {
	
		console.error(`This is the error: ${err}`);
		
	}

}


const main = async () => {


	const options = ['Get All Books', 'Get a book', 'Register a book', 'Update a book', 'Delete a book'];
	
	const answer: number = readLine.keyInSelect(options, 'Please, choose an option');
	
	switch(answer) {
	
		case 0 :
			await getAll();
			break;
			
		case 1 :
			await getById();
			break;
			
		case 2 :
			await create();
			break;
			
		case 3 :
			await updateBook();
			break;
			
		case 4 :
			await deleteBook()
			break
			
	};


	process.exit();
	
}

	main();
