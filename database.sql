-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "groceries"
"id" serial primary key,
"name" varchar(80) not null,
"quantity" integer not null,
"unity" varchar(80),
"purchased" bool DEFAULT false
);

SELECT * FROM "groceries"
INSERT INTO "groceries" ("name," "quantity", "unit") VAULES('apples', 1, '5lbs')
INSERT INTO "groceries" ("name," "quantity", "unit") VAULES('bread', 2, '1 loaf')
INSERT INTO "groceries" ("name," "quantity", "unit") VAULES('Milk', 2, '1 gallon')
INSERT INTO "groceries" ("name," "quantity", "unit") VAULES('Sliced Almonds', 1, '5lbs')
INSERT INTO "groceries" ("name," "quantity", "unit") VAULES('apples', 1, '5lbs')