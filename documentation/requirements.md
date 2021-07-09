# Software Requirements

## Vision
- What is the vision of this product?

Building on an earlier project, ChatMuch is cloud-integrated RESTful API that allows salespeople to keep in touch with their sales team and clients in real-time. It allows you to stay on top of the sales process without context switching between communication platforms, data entry, and systems; everything is integrated and scalable to boot. Being on the cloud automates system administration and speeds up the development process. ChatMuch is an agile cloud-based customer relationship manager application. 

- What pain point does this project solve?

As with any CRM, chatMuch aims to keep salespeople organized with its contact management functionality. Whether that is storing customer information, adding notes, follow-up dates, and reminders. 

The value proposition of our product vs. our competitors is that we incorporate Real-Time Chat Protocol™ which allows employees to discuss prospects in real-time, rather than depend on an external service such as Slack.

- Why should we care about your product?

Kills two birds with one stone -- CRM and messaging service.

---
## Scope

- IN - What will your product do

chatMuch will allow the employees of a business to create accounts with varying roles. At a high level, salespeople arrive at their dashboard and see their reminders/tasks/alerts for the day, alongside a chat box so they can instantly message their teammates. 

Salespeople can then view, create, update, and delete accounts that are associated with them specifically. They can also add notes and reminders that will show up on their dashboard.


- OUT - What will your product not do

We will not have analytics on the contacts listed in our database. 


--- 
## MVP

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
## Functional Requirements

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
## Data Flow

> Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

A user arrives at a login/signup page. Once they sign in, they are assigned a role. They arrive at a dashboard where they are greeted by a chatroom and any alerts/reminders that they previously set up. If they click `Accounts` on the dashboard, they are redirected to a list of their accounts, along with the ability to write notes and add alerts/reminders.

![wireframe](../assets/wire-frame.png)

---
## Non-Functional Requirements

- Testability

Test Driven Development - 80% test coverage or better through unit testing. This will require part of our team to be consistently dedicated to writing tests and and reporting any bugs. Our own QA department. 

- Security

We are incorporating BasicAuth for security purposes. Admins will determine which permissions are given to new users.