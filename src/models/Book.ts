import {Pool, RowDataPacket, ResultSetHeader} from 'mysql2/promise';
import { poolcreator as connection } from './connection';

export interface Book {

	id?: number;
	title: string;
	price: string;
	author: string;
	isbn: string;

}


export default class BookModel { 

	connection: Pool;

	constructor() {
	this.connection = connection;	
	}


	async getAll(): Promise<Book[]> {
		
		const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>('SELECT * FROM books');
		return rows;
	}
	
	async create(book: Book): Promise<Book> {
	
		const { title, price, author, isbn } = book;
	
		const [{insertId}] = await this.connection.execute<ResultSetHeader>(
		'INSERT into books (title, price, author, isbn) VALUES (?, ?, ?, ?)', [title, price, author, isbn],
		);
		
		return { id: insertId, ...book };
	
	}

}


