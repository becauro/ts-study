import dotenv from 'dotenv' ;
dotenv.config({ path: '../.env' });

import readLine from 'readline-sync';
// import { poolcreator as connection } from './models/connection'; // testando
import BookModel, { Book } from './models/Book'; 

const bookModel = new BookModel();


async function getAll() {

	const result = await bookModel.getAll();
	console.log(result);
	

}


async function create() {

	const title = readLine.question('Digite o título do livro: ');
	const price = readLine.question('Digite o preço do livro: ');
	const author = readLine.question('Digite o autor do livro: ');
	const isbn = readLine.question('Digite o isbn do livro: ');

	const newBook: Book = { title, price, author, isbn }; 
	
	const createdBook = await bookModel.create(newBook);
	console.log(createdBook);

}

const main = async () => {


	const options = ['Get All Books', 'Register a book'];
	
	const answer: number = readLine.keyInSelect(options, 'Please, choose an option');
	
	switch(answer) {
	
		case 0 :
		
			await getAll();
			break;
			
		case 1 :
			
			await create()
			break;
			
	};


	process.exit();
	
}

	main();
