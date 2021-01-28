-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "groceries" ( 
    "id" serial primary key,  
    "name" varchar(80) not null,  
    "quantity" decimal not null, 
    "unit" varchar(80), 
    "purchased" bool DEFAULT false
);

SELECT * FROM "groceries";

INSERT INTO "groceries" ("name", "quantity", "unit") VALUES('apples', 1, '5lbs');
INSERT INTO "groceries" ("name", "quantity", "unit") VALUES('bread', 2, '1 loaf');
INSERT INTO "groceries" ("name", "quantity", "unit") VALUES('Milk', 2, '1 gallon');
INSERT INTO "groceries" ("name", "quantity", "unit") VALUES('Sliced Almonds', 2, '2 cups');
INSERT INTO "groceries" ("name", "quantity", "unit", "purchased") VALUES('Bananas', 3, '1 bunch', true);
