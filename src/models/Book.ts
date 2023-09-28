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
			//const [rows] = await this.connection.execute<RowDataPacket[]>('SELECT * FROM books');
			return rows as T;
		
		} catch (err) {
			
			return err as T;
		
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


