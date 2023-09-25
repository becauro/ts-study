import dotenv from 'dotenv' ;
dotenv.config({ path: '../.env' });

import readLine from 'readline-sync';
// import { poolcreator as connection } from './models/connection'; // testando
import BookModel, { Book } from './models/Book'; 

const main = async () => {

	const bookModel = new BookModel();

	/*
	const title = readLine.question('Digite o título do livro: ');
	const price = readLine.question('Digite o preço do livro: ');
	const author = readLine.question('Digite o autor do livro: ');
	const isbn = readLine.question('Digite o isbn do livro: ');

	const newBook: Book = { title, price, author, isbn }; 
	
	//const createdBook = await bookModel.create(newBook);
	//console.log(createdBook);
	*/
	
	
	const result = await bookModel.getAll();
	console.log(result);	
		
	
	/*
	const result = await connection.execute('SELECT * FROM books'); // testando
  	const [rows] = result;
  	console.log(rows);
  	*/
}

	main();
