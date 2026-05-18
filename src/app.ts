import express, { type Application, type Request, type Response } from "express"
import { userRouter } from "./modules/users/users.route";
import { profileRote } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
const app: Application = express()



app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))
app.use(logger)


app.use('/api/users',userRouter)
app.use('/api/profile',profileRote)
app.use('/api/auth',authRouter)



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Express server",
        "author": "Harun"
    });
});


export default app;





