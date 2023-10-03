# ts-study

That is just a small cli CRUD software project for TypeScript pratice skills.
This lack a lot of thing (like put interfaces and fix "any" types), dockerfile etc.

I mean, it's a working in progress.


## How to build it

1 - This project is based in a mysql database structure like what is inside the file.
So, just execute the mysql script on command in src/models/datasql file.
For exeample ypu can use some options like:

* [mysqlsh](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-commands.html)

	After execute it (e.g mysqlsh), you just:
	a) change the mode to sql by type: \sql 
	b) Pass the path to script file, like this: source src/models/data.sql

* Or you may get, manually, the commands inside src/models/data.sql in another way (e.g. workbench , whatever). It's up to you 

2 - type: npm install

3 - Once the yout mysql datatabase is running , move into the "compiled" folder

4 - type: npx tsc

5 - type: node main.js