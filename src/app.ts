import express, { type Application, type Request, type Response } from "express"
import { userRouter } from "./modules/users/users.route";
const app: Application = express()



app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))


app.use('/api/users',userRouter)



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Express server",
        "author": "Harun"
    });
});


export default app;





