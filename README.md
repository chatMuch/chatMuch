# chatMuch

![David DM](https://david-dm.org/chatMuch/chatMuch.svg) 
![Last Commit](https://img.shields.io/github/last-commit/chatMuch/chatMuch)

chatMuch is a full-function CRM with chat capabilities. It runs on Node.js with Express, and supports role-based access control. Access control lists are backed up by basic and bearer auth. 

---
## Contributors

[Cullen Sharp](https://www.linkedin.com/in/cullensharp/) -
[Tyler Johnson](https://www.linkedin.com/in/tyler-a-johnson-wa/) -
[Dion Johnson](https://www.linkedin.com/in/dionjwa/) - 
[Sunny Lee](https://www.linkedin.com/in/sunnylee3/) - 
[Tim Egorov](https://www.linkedin.com/in/timegorov/)

---
## Table of Contents


[Installation and Startup](#🚀-getting-started)

[Routes](#🛣-routes)

[Software Requirements](#✔-software-requirements)

[Domain Modeling](#📇-domain-modeling)

[Testing](#🧪-testing)

[Team Agreement](#🤝-team-agreement)

[Other Wireframes](#👨‍🏫-other-wireframes)

---
## 🚀 Getting Started 

To install chatMuch, follow these steps:

1. Clone the repo from GitHub ([link here](https://github.com/chatMuch/chatMuch))

2. Install dependencies in your terminal with `npm i`

3. Start up the server in your terminal with `npm start` 


---
## 🛣 Routes

[Back to Top](#chatmuch)

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

---

## ✔ Software Requirements

[Back to Top](#chatmuch)

### Vision
- What is the vision of this product?

Building on an earlier project, ChatMuch is cloud-integrated RESTful API that allows salespeople to keep in touch with their sales team and clients in real-time. It allows you to stay on top of the sales process without context switching between communication platforms, data entry, and systems; everything is integrated and scalable to boot. Being on the cloud automates system administration and speeds up the development process. ChatMuch is an agile cloud-based customer relationship manager application. 

- What pain point does this project solve?

As with any CRM, chatMuch aims to keep salespeople organized with its contact management functionality. Whether that is storing customer information, adding notes, follow-up dates, and reminders. 

The value proposition of our product vs. our competitors is that we incorporate Real-Time Chat Protocol™ which allows employees to discuss prospects in real-time, rather than depend on an external service such as Slack.

- Why should we care about your product?

Kills two birds with one stone -- CRM and messaging service.

---
### Scope

- IN - What will your product do

chatMuch will allow the employees of a business to create accounts with varying roles. At a high level, salespeople arrive at their dashboard and see their reminders/tasks/alerts for the day, alongside a chat box so they can instantly message their teammates. 

Salespeople can then view, create, update, and delete accounts that are associated with them specifically. They can also add notes and reminders that will show up on their dashboard.


- OUT - What will your product not do

We will not have analytics on the contacts listed in our database. 


--- 
### MVP

- What will your MVP functionality be?

As an MVP, chatMuch will enable users to perform the full suite of CRUD operations on a cloud-based database (Mongo Atlas?) accessed via a simple front-end React app. 

Socket.io-based chat functionality will be integrated directly into the user's dashboard.

Authentication will be comprised of basicAuth and role-based permissions. When signing up for an account, a user defaults to the minimum number of permissions, and an Admin grants them the CRUD access as they see fit.


- What are your stretch goals?

1. AWS full-cloud integration (entire tech stack lives on AWS)
2. Further authentication with Auth0, Bearer, etc.
3. Session-based notifications
4. Phone alerts??
5. Role assignment based on 


--- 
### Functional Requirements

> List the functionality of your product. This will consist of tasks such as the following:

Roles are:

1. Admin
2. SalesPerson
3. AccountManager
4. Intern

- An Admin can assign roles to new accounts (whether that's SalesPerson, AccountManager, or Intern roles)
- A SalesPerson has full CRUD access to **their** accounts
- An AccountManager can Read and Update **their** accounts
- An Intern can only click a button that asks the chatroom if they want coffee

--- 
### Data Flow

> Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

A user arrives at a login/signup page. Once they sign in, they are assigned a role. They arrive at a dashboard where they are greeted by a chatroom and any alerts/reminders that they previously set up. If they click `Accounts` on the dashboard, they are redirected to a list of their accounts, along with the ability to write notes and add alerts/reminders.

![wireframe](./assets/wire-frame.png)

---
### Non-Functional Requirements

- Testability

Test Driven Development - 80% test coverage or better through unit testing. This will require part of our team to be consistently dedicated to writing tests and and reporting any bugs. Our own QA department. 

- Security

We are incorporating BasicAuth for security purposes. Admins will determine which permissions are given to new users.

---

## 📇 Domain Modeling

[Back to Top](#chatmuch)

### `Users`

* id: INTEGER, unique
* username: STRING, unique
* password: STRING
* name: STRING
* role: ['salesPerson', 'admin', 'accountManager', 'intern']
* capabilities: [read, write, update, delete]
* customers: [ ]

### `Customers`

* id: INTEGER, unique
* salesPerson: INTEGER, foreign key
* name: STRING
* email: STRING
* phone: STRING
* title: STRING
* notes: [ ]

### `Notes`

* id: INTEGER, foreign key
* customerId: INTEGER, unique
* text: STRING

### Schema Diagram

![Schema diagram](./assets/UML2.JPG)

---
## 🧪 Testing

[Back to Top](#chatmuch)

Here is information about our testing.

--- 

## 🤝 Team Agreement

[Back to Top](#chatmuch)

### Cooperation Plan

- What are the key strengths of each person on the team?

Dion - Back squat: 285 x 20. Suave with analytics. Project management, big picture person.

Cullen - Flexibility, injury prevention, yoga mastery, drinks also? Lotz of heart. DSA wunderkind. Great documentation skills.

Tyler - Great father, first of all. Excellent choice of shirts. Scalable. Humble. Jack of all trades. 

Sunny - Sick freakin computer. Great choice of keyboard switch. Super into 4wheelers. Anime lover. Preacher curls, big time bicep guy. Great adaptability with regards to code/elements.

Tim - Great hamstrings. Good taste in bubbly mineral water. Communication skills are second-to-none. Holistic approach. 

- How can you best utilize these strengths in the execution of your project?

We really fit together like puzzle pieces -- all having pretty good JS skills and understanding, and individual skills that complement each other. 

- In which professional competencies do you each want to develop greater strength?

Dion - public speaking

Cullen - getting down to business

Tyler - communication

Sunny - researching

Tim - business acumen 

- Knowing that every person in your team needs to understand all aspects of the project, how do you plan to approach the day-to-day work?

We plan on meeting up every day at 9am and having a team standup. We will update each other every step along the way, but those meetings will serve as the foundation of our organization. We will also use Trello for project management to ensure that the workload is evenly distributed. We will also be available on Slack for any potential assistance requests. 

### Conflict Plan


- What will be your group’s process to resolve conflict, when it arises?

Our conflict resolution process will be to discuss any issues that come up as a team, and meet up as a whole team if the issue persists. We will ask Jacob Knaack to intervene should the issue spiral out of control. 

- What will your team do if one person is taking over the project and not letting the other members contribute?

This will be addressed as part of our conflict resolution plan.

- How will you approach each other and the challenges of the project knowing that it is impossible for all members to be at the exact same place in understanding and skill level?

Trust the process, and be kind to one another (see: Mr. Roger). Keep cool and care. 

- How will you raise concerns to members who are not adequately contributing?

Ask if that team member needs help. Have them be a part of pair programming. 

- How and when will you escalate the conflict if your resolution attempts are unsuccessful?

We will escalate any major issues to Jacob Knaack.


### Communication Plan


- What hours will you be available to communicate?

9-5 for quick responses, with some major leeway for the evening.

- What platforms will you use to communicate (ie. Slack, phone …)?

Slack.

- How often will you take breaks?

Every hour or so.

- What is your plan if you start to fall behind?

Scale back our stretch goals, evaluate, and adjust.

- How will you communicate after hours and on the weekend?

Slack, turn on push notifications.

- What is your strategy for ensuring everyone’s voice is heard?

We will have a communication manager. Tim Egorov will be communication manager.

- How will you ensure that you are creating a safe environment where everyone feels comfortable speaking up?

Communication manager will ensure that everyone gets a chance to speak during standups. 


### Work Plan


- How you will identify tasks, assign tasks, know when they are complete, and manage work in general?

Trello will serve as our project management tool. 

- What project management tool will be used?

Trello.


### Git Process


- What components of your project will live on GitHub?

All of them.

- How will you share the repository with your teammates?

We created an organization where all of us are members.

- What is your Git flow?

ACP but every new feature will live on a different branch. Dev branch and production branch. We will have code reviews before approving merges, we'll need at least 2 approvals so no one can merge single-handedly.

- Will you be using a PR review workflow? If so, consider:
  - How many people must review a PR?

    Two.

  - Who merges PRs?

    Non-authors.


  - How often will you merge?

    ACP by end of day, or whenever a major feature is implemented. 

  - How will you communicate that it’s time to merge?

    We will slack each other when a major feature is ready to be merged, and we will have a review at the end of each day.

---
## 👨‍🏫 Other Wireframes

[Back to Top](#chatmuch)

#### Stretch render of our Accounts page
![wireframe1](./assets/chatMuchWireframe.jpg)

#### MVP render of our Accounts page
![wireframe1](./assets/chatMuchWireframe2.jpg)