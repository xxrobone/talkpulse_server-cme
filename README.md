# TALK PULSE - SERVER (reddit clone)

## This is a school project MERN stack assignment

## Frontend for this project
Frontend part of the project: https://github.com/xxrobone/talkpulse-cme
- You can see a preview & demo of the live project in the frontend part of the project

## Features included

### Reading posts no sign-in needed

### USER
- Sign up
- Sign in
- Auth using JsonWebTokens
- User email verification and reset password

### Posts (User signed in)
- User can create, update and delete own posts 
- "Real time" updates with React Router using loaders (reads) and actions (writes)

### Comment & Votes
- User can add comments and votes if user is signed in

## Features not included
- Additional features
- Libraries for realtime like socket.io, websockets or swr
- Subreddits

## ? Wanna try the project or use it as a start for something bigger or just play with the code feel free to do so ?

### Getting started

Clone the repo: (or fork it)

```sh
git clone https://github.com/xxrobone/talkpulse_server-cme.git
```
Install dependencies:

```sh
npm i
```
### You can use post man to try it out
To use auth and use the crud functionality to add posts, comment, vote - you need to be signed in

example of sign up
POST http://localhost:8000/signup
```sh
{
    "username": "yourname",
    "email": "your email",
    "password": "your password"
}
```
- You will then get a email for verification
- After verification is done you can sign in

example of sing in
POST http://localhost:8000/login
```sh
{
    "username": "yourname",
    "password": "your password"
}
```

- After you have and account and log in you will get a token in postman response
- Use the token in the Authorization tab choose - Bearer Token
- Next step is to create a post

example of creating a post
POST http://localhost:8000/posts
```sh
{
    "title": "Post title",
    "body": "post to body",
    "link": "https://example.com/" (optional)
    "image": "image is optional"
}

```
example of updating a post
PUT http://localhost:8000/posts/657ff161fe7794cf84a2f48c (just and example, the post id you got when you created the post)
```sh
{
    "title": "Update Post title",
    "body": "Update post to body",
    "link": "https://example.com/" (optional)
    "image": "image is optional"
}
```

DELETE http://localhost:8000/posts/657ff161fe7794cf84a2f48c (just and example, the post id you got when you created the post)
```sh
You dont need no body, only the post id in the params to delete the post
```
## Comments and Votes 
work similar way you need the bearer token and the endpoints
<br>

- You can find all routes in the routes folder in the files auth, comments, posts, votes, and users(not yet using it)

Then use the token in the Authorization tab choose - Bearer Token


### IF you want to try the project with the frontend
You can find the frontend here: https://github.com/xxrobone/talkpulse-cme

### There is docker compose file in this project you can use locally
To run docker:
 navigate to the folder that contains the docker-compose.yml file and run the command

 ```sh
docker-compose up -d 
``` 

Or create and account on the MongoDB follow there instructions on how to set it up
Here is a tutorial: https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial

To Start the server:    
```sh
npm run dev
```

- You need to set up your own .env file, check the file env.example to see which env variables are used in this project

## TECH USED IN THIS PROJECT:
- MongoDB – Database NoSql 
- NodeJs – Framework 
- Typescript
- Express - Server 
- Mongoose - As ODM handling data modelling
- JsonWebToken – Secure authentication 
- Bcrypt – For password hashing 
- Multer – For handling images 
- Nodemailer – Email verification and password reset
- Nodemon – for server restart on file change 
- Docker – for running mongoDB on local dev environment 

 - for images i choose to use base64 convertion and save it as a string (not the best way)


Folder file Structure (to follow, I might change it)

```
├── src
│   ├── controllers
│   │   ├── authController.ts
│   │   |── postController.ts
|   |   |── commentController.ts
|   |   |── userController.ts
|   |   |── votesController.ts
│   ├── middleware
│   │   └── authMiddleware.ts
│   ├── models
|   |   ├── user.model.ts
│   │   |── post.model.ts
|   |   |── comment.model.ts
|   |   |── user.model.ts
│   ├── routes
|   |   ├── authRoutes.ts
│   │   |── postRoutests
|   |   |── commentRoutes.ts
|   |   |── userRoutes.ts
│   ├── services
│   │   └── Emailverification.ts
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   └── bcrypt as utils.ts (all utils functions)
│   └── db.ts
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
│  
└── additional files and folers
```

<br>
 

 <br>

 ---

 


<p align="left">
<a href="https://www.linkedin.com/in/robert-w%C3%A4gar-1b4661139/" target="blank"><img align="center" src="https://github.com/xxrobone/dablog/blob/main/readmeimages/LinkedIN.png" alt="" height="30" /></a>
<a href="https://github.com/robonexx" target="blank"><img align="center" src="https://github.com/xxrobone/dablog/blob/main/readmeimages/Github.png" alt="" height="30" /></a>
<a href="https://codepen.io/robertwagar" target="blank"><img align="center" src="https://github.com/xxrobone/dablog/blob/main/readmeimages/Codeopen.png" alt="" height="30" /></a>
<img align="center" src="socials/Discord.png" alt="" height="30" />
</p>



### Have and Idea you want to bring to life?
- 💬 Reach out and lets have a chat?

#### You can reach me at:

✉️ robertwagar@gmail.com

<br>
<br>

 ---
## Future features

### TESTS and checks should be added for a  more robust backend, was not part of the assignment and not enough time to add it all
### I wish i could have mulitplied myself and have a fullstack perfect app, but due to reality and not living in a fictional world
### Sadly I did not have time to add it all. 
- [ ] 

### User

- [ ] User logout after token expires or refresh token activation

### SUBREDDITS

- [ ] ADD model
- [ ] ADD controllers
- [ ] ADD routing

### REPLIES

- [ ] ADD model
- [ ] ADD controllers
- [ ] ADD routing

### USER

- [ ] Profile page / settings page

<br> 
<br>
<br>
<br> 
<br>
<br>



#### Just my notes don't mind these...

## My TODO List

- [x] Verification - working on live site
- [x] Password reset - working on live site
- [x] Votes post & comments - working on live site

### IMAGES

- [x] Add images
- [x] Update images

### Add redirects / close functions to:

- [x] comments
- [x] posts
- [x] delete

### Styling fixes update forms

- [x] Styling fixes update forms

### Error and Success message handling
- [ ] Response messages