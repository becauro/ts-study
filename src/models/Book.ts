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


	async getAll<T>(): Promise<T> {
	
		try {
		
			const [rows] = await this.connection.execute<(T & RowDataPacket)[]>('SELECT * FROM books');
			return rows as T;
		
		} catch (err) {
			
			return err as T;
		
		}
		
		
	}
	
	
	async getById<T>(id: number): Promise<T | boolean | any> {
	
		try {
					
			let res;
			
			// The following code return array of arrays ([ [ foo ], [ foo ], ...]) That is why it needs a destructuring.
			
			const [rows] = await this.connection.execute<(T & RowDataPacket)[]>('SELECT * FROM books WHERE id = ?', [id]);
			
			if (rows.length === 0) { // This check if the "rows" array returned empty;
			
				res = false;
				return res;
			};
			
			[res] = rows;
			
			return res;
		
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
	
	
	async update<T>(id: number, book: Book): Promise<T | boolean | any> {
	
		try {
		
			const { title, price, author, isbn } = book;
		
			const res = await this.connection.execute<ResultSetHeader>(
			'UPDATE books SET title = title, price = price, author = author, isbn = isbn WHERE id = ? ', [id],
			); 
	
			return res ;
		
		
		} catch (err) {
		
			return err;
		}
	
	}
	
	
	async deleteById(id: number):  Promise<number | any> {
	
		try {
		
			const [{affectedRows}] = await this.connection.execute<ResultSetHeader>(
			'DELETE FROM books WHERE id = ? ', [id],
			); 
	
			return affectedRows ;
		
		
		} catch (err) {
		
			return err;
		}
		 
	}

}


