# Domain Modeling

## `Users`

* id: INTEGER, unique
* username: STRING, unique
* password: STRING
* name: STRING
* role: ['salesPerson', 'admin', 'accountManager', 'intern']
* capabilities: [read, write, update, delete]
* customers: [ ]

## `Customers`

* id: INTEGER, unique
* salesPerson: INTEGER, foreign key
* name: STRING
* email: STRING
* phone: STRING
* title: STRING
* notes: [ ]

## `Notes`

* id: INTEGER, foreign key
* customerId: INTEGER, unique
* text: STRING

## Schema Diagram

![Schema diagram](../assets/UML2.JPG)
