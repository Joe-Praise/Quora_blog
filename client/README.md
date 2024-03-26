# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] or [https://my-quora-remake.onrender.com] to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### About Project
This project was a challenge gotten from reworkacademy.co in regards my development as a Full stack developer as this is my first full stack project.
This project is made up of 13 pages which consist of:
-Sign up & Sign in page(embedded)
-Home page
-Profile page
-Single post page
-Single post edit page
-Space page (post category)
-Filtered space page
-Admin sign in page
-Admin Dashboard
-Admin Posts page(CRUD)
-Admin Users page(CRUD)
-Admin profile page
-Admin Create user page

Note: its responsive over various screen sizes(mobile, tablets, laptops)

### Sign in & Sign up
The created users using the sign up form are stored in the database and their information is displayed in grid format via the Admin users page.

The Sign in form confirms the identity and existence of a user by cross-examining the password input value againt the users database. It retruns true or false using bycrpt to hash the password. if true it generates a cookie for the user and grants access to the home page.

### Home page
This page displays the following:
-To the left of the page, available spaces are displayed which on click of any, redirects the user to a filtered space page of that space.
- At the middle, the following can be found:
    - create post can be found directly beneath the nav bar. here you create a post by space(category) and image uploads are available(bottom of the modal beside "A")
    -Posts are displayed in card form and for each post. you can click on the image or content to go to the single post page, while also click to... follow, like, dislike and comment on each post.
-To the left, the provided card will be used for advertisment.

### Single post page
Single post is fetched from the endpoint. It's ID is passed from the post card(on whatever page its found it redirects you to the single product page) to the single post page. using Loader(a react router feature) we get the information from the endpoint before navigating to the page and displaying the appropriate details to the user.
Note: if the signed in user views a post that was created by that user, he gets the "edit" & "delete" buttons. otherwise they get the "back to homepage" button

### Single post edit page
THis page displays a form with details of the currently viewd post. Here we are able to edit the post i.e image, content and space(category).
on submit it navigates back to the home page.

### Space page (post category)
Here cards of the available space are displayed and on click the navigate the user to the filtered space page which dipslays posts according to their space(category).

### Filtered space page
The page displays all post based off their space and on click of each card you get navigated to the single post page of that post


### Admin Sign in
This is verified by the backend, To have access use:
-Email: joepraise1@gmail.com
-Pwd: AdminJoe1@12345 

To access the Admin Sign in Page:
-Click the display picture on the Nav bar
-Click on "Admin" above "Logout"
-Input the Email and Password attached to the paragraph above and submit.

### Admin dashboard page
This view contains:
- A table for registered users
-Total no. of posts 
-Total no. of users,
-Total no. of likes,
-Total no. of dislikes
- A preview of random posts in a card

### Admin profile Page
This page contains info about the signed in admin and also has the logout button

### Admin user Page
users are fetched from the endpoint and displayed in the user page in grid format. Here the following operations can be made:
-Delete user
-Edit user

### Admin Post Page
Posts are fetched from the endpoint and displayed in the post page in grid format. Here the following operations can be made:
-Delete post
-Edit post
-Delete comments associated with post

### Admin create user Page
This page contains a form that can be used to create a normal user(not an admin).


### Difficulties faced
-implementing the "following" feature
-converting the post card to being a reuseable component after completing the project
-using bootstrap extensively on a project was somewhat forign(with more practice i'd get acquainted)

### Deployed Link
[https://my-quora-remake.onrender.com]

### GitHub Username
[https://github.com/Joe-Praise]
