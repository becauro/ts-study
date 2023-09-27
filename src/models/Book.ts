import {Pool, RowDataPacket, ResultSetHeader, OkPacket} from 'mysql2/promise';
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


	async getAll(): Promise<Book[] | any> {
	
		try {
		
			const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>('SELECT * FROM books');
			return rows;
		
		} catch (err) {
			
			return err;
		
		}
		
		
	}
	
	async create(book: Book): Promise<Book> {
	
	
		try {
		
			const { title, price, author, isbn } = book;
	
			const [{insertId}] = await this.connection.execute<ResultSetHeader>(
			'INSERT into books (title, price, author, isbn) VALUES (?, ?, ?, ?)', [title, price, author, isbn],);
		
			return { id: insertId, ...book };
		
		} catch (err) {
		
			return err as Book;
		}
	
	}
	
	
	async deleteById<T>(id: number):  Promise<T> {
	
		try {
		
			const result: any = await this.connection.execute<OkPacket>(
			'DELETE FROM books WHERE id = ? ', [id],
			); 
	
			return result;
		
		
		} catch (err) {
		
			return err as T;
		}
		 
	}

}


