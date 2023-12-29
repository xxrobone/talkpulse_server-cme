# This is the backend / server for TalkPulse


Creating a mern stack app - reddit inspired

(Will change and clean this later, make it nicer)

TECH:
node
express
mongodb
mongoose
nodemon
postman
cors
dotenv
bcrypt
DOCKER

JWT (not yet added)



Structure (to follow, might change it)

```
├── src
│   ├── controllers
│   │   ├── authController.ts
│   │   |── postController.ts
|   |   |── commentController.ts
│   ├── middleware
│   │   └── authMiddleware.ts
│   ├── models
|   |   ├── user.model.ts
│   │   |── post.model.ts
|   |   |── comment.model.ts
│   ├── routes
|   |   ├── authRoutes.ts
│   │   |── postRoutests
|   |   |── commentRoutes.ts
│   ├── config
│   │   └── config.ts
│   ├── helpers
│   │   └── helpers.ts
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   └── bcrypt as utils.ts (all utils functions)
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
```


NEXT UP NODEMAILER!!!

TODO:
Verification [x] - working on live site
Password reset [x] - works on live site
Voting both comments and post [x] - works on live and local 

USER!
Password verification [x]
Password reset [x]

IMAGES! 
Add images []


SUBREDDITS!
ADD model:              []
ADD controllers:        []
ADD routing:            []


FUTURE ADDS REPLIES!
ADD model:              []
ADD controllers:        []
ADD routing:            []

ADDIONAL STYLING