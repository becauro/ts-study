import dotenv from 'dotenv' ;
dotenv.config({ path: '../.env' });

import readline from 'node:readline/promises'; // Testing
import { stdin as input, stdout as output } from 'node:process'; // Testing
	
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
		
	
		console.log('\n\nRegister with previous values:');

		console.log(searchRes);	
		
		console.log('\nRegister with NEW values:');
			
		return console.log({ title, price, author, isbn });
	
	
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

async function floatHandler(value: string) {

// ESTAVA NESSA FUNCAO TESTANDO SE É FLOAT. Apenas com readline-sync não funciona, então importei umas funções nativas só pra lidar com float (achei isso aqui melhor https://bobbyhadz.com/blog/javascript-check-if-value-is-float)

// Obs.: Espaço é 0 e '' também
// NaN é considerado um tipo 'number' pelo typeof()
// O parseFloat() retorna NaN quando não consegue converter. 
// Se colocar virgula, por exemplo, o parseFloat retorna apenas o que veio antes da virgula logo vira um inteiro. 

	try {
		
		var hasInvalidChar = false;
		var counter = 0;  
		var hasAlreadyDot = false;
		var value_converted;
		var result;
		var charCodes: string = '';
		var lastChar: string = '';
		
		for (let char of value) {
		
			lastChar = `${value[value.length -1]} (ASCII: ${value.codePointAt(value.length -1)})`; // This store the last char as well as its ASCII code.
			
			if (char.codePointAt(0) as number < 48 || char.codePointAt(0) as number > 57) { // This check for valid float caracter based on ASCII Table
			
				if ( counter === 0 && char.codePointAt(0) as number === 46 ) { // This check whether user put dot (.) at the beginning of input (string)
				
					hasInvalidChar = true;
					//charCodes = (charCodes + char.codePointAt(1)as unknown as number).toString() + '.';
					charCodes = (char.codePointAt(0)as unknown as number).toString() + '.';
					break;

				} else if ( counter > 0 && char.codePointAt(0) as number === 46 && hasAlreadyDot === false ) { // This check register whether user input dot in some place of input
				
					hasInvalidChar = false;
					hasAlreadyDot = true;
					//counter += 1;
					charCodes = (charCodes + char.codePointAt(0)as unknown as number).toString() + '.';
					continue;
				}

				hasInvalidChar = true; // If code come to here that means the input is invalid, because it is outside the range to convert the entire input into float
				charCodes = (charCodes + char.codePointAt(0)as unknown as number).toString() + '.';
				break;
			};
			
			charCodes = (charCodes + char.codePointAt(0)as unknown as number).toString() + '.';
			counter += 1; // This marks which position of input the instruction. So it is Help to control the first string char, which cannot be dot (.)
		}	


		if (hasInvalidChar === false) {
		
		
			value_converted = parseFloat(value);
			value_converted = value_converted.toFixed(2) as unknown as number;
			
			result = {hasInvalidChar, value, charCodes, value_converted, lastChar};
		
		
		} else {
		
		
			result = {hasInvalidChar, value, charCodes, value_converted: null, lastChar};
		
		}

		
		
		
		
		//console.log('\nTem invalido char ?');
		//console.log(hasInvalidChar);
		
		//console.log('\nValor digitado:');
		//console.log(answer);
		
		//console.log('\nCharCode of typed value');
		//console.log(answer.codePointAt(0));
		
		//console.log('\nResultado de typeof no Valor digitado:');
		//console.log(typeof(answer));
		
		//console.log('\nIs integer:');
		//console.log(Number.isInteger(answer_converted));
				
		//console.log(res);
		
		//rl.close();
		
		//console.log('\nresultado do parseFloat():');
		//console.log(answer_converted);
		
		return result;
	
	} 
	
	catch (err) {
	
		console.error(`This is the error: ${err}`);
	
	}

}


async function test() {

	const rl = readline.createInterface({ input, output });
	const answer = await rl.question('Type something:');
	
	const result: any = await floatHandler(answer);
	
	
	if (result.hasInvalidChar === true ) {
	
		console.log(`\nEntrada inválida. Vc digitou isso ${result.value}.\n The char ASCII Code(s) was(were) just PARTIALLY calculated (Sorry): ${result.charCodes}`);
		console.log(`\n Ultimo char foi: ${result.lastChar}`);
	} else {
	
		console.log(`\nEntrada Correta. Vc digitou isso ${result.value}.\n The char ASCII Code(s) is(are): ${result.charCodes}`);
		console.log(`\n Ultimo char foi: ${result.lastChar}`);
	}
	
	rl.close();

}


const main = async () => {


	const options = ['Get All Books', 'Get a book', 'Register a book', 'Update a book', 'Delete a book', 'FOR TEST'];
	
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
			await deleteBook();
			break;
			
		case 5 :
		
			await test();
			break;
			
	};


	process.exit();
	
}

	main();
