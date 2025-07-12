import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./connectDb.js";
import User from "./Models/userSchema.js";
import playlistRoute from "./Routes/playlist.js";
import homeRoutes from "./Routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";
import MongoStore from "connect-mongo";

config();
const app = express();
const port = process.env.PORT;
console.log("MONGO_URI:", process.env.MONGO_URI);

const sessionOptions = {
  secret: process.env.SESSION_CODE,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native", 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
};

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

// Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session(sessionOptions));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/playlist", playlistRoute);
app.use("/", homeRoutes);

app.use(errorMiddleware);

// DB + Server Start
await connectDB();

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
