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



async function noEmptyInputQuestion(field: string): Promise<string | number> {

	let answer: string | number = '';

	if (field === 'title' || field === 'author') {
	
		answer = '';
	
		do {
		
			answer = readLine.question(`Type the book ${field} [no empty]: `);
			//if (answer !== '') return answer;
	
		} while (answer === '');
	
	} else if (field === 'isbn') {
	
		answer = 0;
	
		do {
		
			answer = readLine.questionInt(`Type the book ${field} [no empty]: `);
			//if (answer !== 0) return answer;
		
		} while (answer === 0);
	
	}


	return answer;
	

}


async function create() {


	try {
	
		//const title = readLine.question('Type the book title: ');
		const title: any = await noEmptyInputQuestion('title');
		
		const typed_price = await priceQuestion('create'); // This is my "question func" to fit my needs
		
		//const author = readLine.question('Type the book author: ');
		const author: any = await noEmptyInputQuestion('author');
		
		//const isbn = readLine.question('Type the book isbn: ');
		const isbn: any = await noEmptyInputQuestion('isbn');
		
		const newBook: Book = { title, price: typed_price.value_converted, author, isbn }; 
		
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
		const typed_price = await priceQuestion('update'); // This is my "question func" to fit my needs
		const typed_author = readLine.question('Type the NEW book AUTHOR [Enter(or only space) for no change]: ');
		const typed_isbn = readLine.question('Type the NEW book ISBN [Enter(or only space) for no change]: ');
		
	// Only the values user typed are overwritten:

		title = typed_title !== '' ? typed_title : title;
		price = typed_price.value_converted !== '' ? typed_price.value_converted : price;
		author = typed_author !== '' ? typed_author : author;
		isbn = typed_isbn !== '' ? typed_isbn : isbn;
		
		if (typed_title === '' && typed_price.value_converted === '' && typed_author === '' && typed_isbn === '' ) return console.log('\nHey! You performed NO changes! \nBYE :-)\n');
			
	
	// The following code update the register:

		const result = await bookModel.update(typedId, { title, price, author, isbn });
				
		
	// Changes report:
		
	
		console.log('\n\nRegister with OLD values:');

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
		
		
			result = {hasInvalidChar, value, charCodes, value_converted: '', lastChar};
		
		}
		
		
		return result;
	
	} 
	
	catch (err) {
	
		console.error(`This is the error: ${err}`);
	
	}

}


async function priceQuestion(mode: string): Promise<any> {
	
	var answer1: string = '';
	var answer2: boolean = true;

	
	if (mode === 'update') {

		do {
		
			answer1 = readLine.question('Type the NEW book PRICE [Enter(or only space) for no change]: ');
			
			if (answer1 !== '') {
			
				const updateResult: any = await floatHandler(answer1);
				
				if (updateResult.hasInvalidChar === true ) {
		
					console.log(`\nInvalid input. You typed this -->> ${updateResult.value} <<--\n`);
					let answer3 = readLine.questionInt('Do you like keeping updating price [1(YES), 2(NO CHANGE)]\n');
				
					answer2 = answer3 === 1 ? true : false;
				
				} else {
			
					answer2 = false;
				
					return updateResult;
				
				}
			
			} else {
			
				return {hasInvalidChar: false, value: '', charCodes: null, value_converted: '', lastChar: ''};
			}
			
		
		} while (answer2 === true || answer1 !== '');
		
	
	} else if (mode === 'create') {
	
		var createResult: any;
		
		do {
		
			answer1 = readLine.question('Type the NEW book PRICE [empty is not allowed]: ');
			
			if (answer1 !== '') {
			
				createResult = await floatHandler(answer1);
				
				if (createResult.hasInvalidChar === true ) {
		
					console.log(`\nInvalid input. You typed this -->> ${createResult.value} <<--\n`);
						
									
				} else {
			
					
				
					return createResult;
				
				}
			
			} else {
			
				
				console.log('Sorry. You typed no value!')
			}
			
		
		} while (answer1 === '' || createResult.hasInvalidChar === true );
	
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
			await deleteBook();
			break;
			
	};


	process.exit();
	
}

	main();
