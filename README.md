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

JWT



Structure (to follow, might change it)

```
├── src
│   ├── controllers
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── middleware
│   │   └── authMiddleware.ts
│   ├── models
│   │   └── User.ts
│   ├── routes
│   │   └── authRoutes.ts
│   ├── config
│   │   └── config.ts
│   ├── utils
│   │   <!-- └── bcrypt as util? .ts -->
│   (├── server.ts)
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
```