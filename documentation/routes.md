# Routes

[Back to README](../README.md)

## Routes

### /signup

#### POST

* Status code: 201
* Inputs:
  * username: `STRING`, `required = true`
  * password: `STRING`, `required = true`
  * roles: `salesPerson || accountManager`
* JSON response:
  * Returns a newly created `user` record
  * Token: `STRING`
  * Capabilities: `ENUM 
    * accountManger: ['read','update']
    * salesPerson: ['read', 'create','update','delete']
  * username: `STRING`
  * password: `STRING`
  * createdAt: `STRING`
  * updatedAt: `STRING`

```JSON
{
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s",
    "capabilities": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "id": 1,
    "username": "EXAMPLE NAME",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "salesPerson",
    "updatedAt": "2021-06-24T00:01:35.450Z",
    "createdAt": "2021-06-24T00:01:35.450Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s"
}
```
---
### /signin

#### POST

* Status code: 200
* Inputs:
  * authorization header
  * `username` and `password` encoded in base64
* JSON response:
  * Returns a previously created `user` record
  * Token: `STRING`
  * username: `STRING`
  * password: `STRING`
  * createdAt: `STRING`
  * updatedAt: `STRING`

```JSON
{
  "user": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s",
    "capabilities": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "id": 1,
    "username": "EXAMPLE NAME",
    "password": "$2b$10$bgWWIUj9FzVTGSNjTj9Cce87HgeJO6I/IlKxb9XZriEhtpddOyXBq",
    "role": "salesPerson",
    "updatedAt": "2021-06-24T00:01:35.450Z",
    "createdAt": "2021-06-24T00:01:35.450Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluLWJhc2ljIiwiaWF0IjoxNjI0NDkyODk1fQ.822_6y_gUA7wlTUW-BCcsqFZAr9vip5GoxBT4xzKq0s"
}
```
---
### /users

#### GET

* Status code: 200
* Inputs: ()
  * Bearer Token
  * Delete permissions
* response:
  * List of `usernames` as an `Array`

```JSON
[
  "admin-basic",
  "averageUser"
]
```

---

## Resource Routes


### /api/v2/notes

#### GET

* status code: 200
  * Inputs: ()
    * Bearer Token
    * Read permissions
  * response
    * A list of all notes records as an `Array`

```JSON
[
  {
    "id": 1,
    "customerId": 2,
    "text": "Phone call - discussed PQR",
    "createdAt": "2021-06-24T00:42:01.687Z",
    "updatedAt": "2021-06-24T00:42:01.687Z"
  },
  {
    "id": 2,
    "customerId": 3,
    "text": "Meeting - product pitch and Q&A",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  }
]
```

---

### /api/v2/customers/:id

#### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* returns a list of all customers associated with a salesPerson
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
[
  {
    "id": 2,
    "salesPerson": 2,
    "name": "connie long",
    "email": "con@aol.com",
    "phone": "(505) 557-4793",
    "title": "Regional Assistant to the Vice Assistant",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  },
    {
    "id": 1,
    "salesPerson": 2,
    "name": "potential mark",
    "email": "mark@aol.com",
    "phone": "(432) 432-4322",
    "title": "Regional Assistant to the Vice Assistant",
    "createdAt": "2021-06-24T01:19:35.626Z",
    "updatedAt": "2021-06-24T01:19:35.626Z"
  },
]
```
---
### POST

* Status code: 201
* Inputs:
  * Create permissions
  * JSON:
    * id: `INTEGER`
    * salesPerson: `INTEGER`
    * name: `STRING`
    * email: `INTEGER`
    * phone: `STRING`
    * title: `STRING`
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`

```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
},
```
---
### PUT

* Status code: 203
* Inputs:
  * Create permissions
  * JSON:
    * id: `INTEGER`
    * salesPerson: `INTEGER`
    * name: `STRING`
    * email: `INTEGER`
    * phone: `STRING`
    * title: `STRING`
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`


```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z"
},
```
---
### DELETE

* Status code: 204
* Inputs:
  * Delete permissions
  * id: `INTEGER`

### /api/v2/customers/:salespersonid/customerid

---
### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* returns a single customer with all notes associated with them
* JSON response:
  * id: `INTEGER`
  * salesPerson: `INTEGER`
  * name: `STRING`
  * email: `INTEGER`
  * phone: `STRING`
  * title: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`


```JSON
{
  "id": 2,
  "salesPerson": 2,
  "name": "connie long",
  "email": "scam@aol.com",
  "phone": "(505) 557-4793",
  "title": "Regional Assistant to the Vice Assistant",
  "createdAt": "2021-06-24T01:19:35.626Z",
  "updatedAt": "2021-06-24T01:19:35.626Z",
  "notes": [{
    "customerId": 2,
    "text": "Connie is very long"
    }
  ]
}
```
---

## Customer Notes Routes


### /api/v2/notes

#### POST

* Status Code: 201
* Inputs:
  * Create permissions
  * JSON:
    * customerId: `INTEGER`
    * text: `STRING`
  * JSON response:
    * id: `INTEGER`
    * customerId: `INTEGER`
    * createdAt: `STRING`
    * updatedAT: `STRING`



```JSON
{
  "id": 2,
  "customerId": 2,
  "text": "Test note",
  "updatedAt": "2021-07-12T22:21:27.807Z",
  "createdAt": "2021-07-12T22:21:27.807Z"
}
```

#### GET

* Status code: 200
* Inputs:
  * Read permissions
  * Id: `INTEGER`
* returns a list of all notes
* JSON response:
  * id: `INTEGER`
  * customerId: `INTEGER`
  * text: `STRING`
  * createdAt: `STRING`
  * updatedAT: `STRING`


```JSON
[
  {
    "id": 1,
    "customerId": 2,
    "text": "Test note",
    "createdAt": "2021-07-12T20:59:55.860Z",
    "updatedAt": "2021-07-12T20:59:55.860Z"
  },
  {
    "id": 2,
    "customerId": 2,
    "text": "This is another test note",
    "createdAt": "2021-07-12T22:21:27.807Z",
    "updatedAt": "2021-07-12T22:21:27.807Z"
  }
]
```