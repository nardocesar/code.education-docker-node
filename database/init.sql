GRANT ALL PRIVILEGES ON nodedb.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON nodedb.* TO 'root'@'localhost';

USE nodedb;

CREATE TABLE people(id int not null auto_increment, name (varchar(255), primary key(id)));