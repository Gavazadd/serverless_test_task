require('dotenv').config()
import express, {Express} from 'express';
import serverless from 'serverless-http';
import cors from "cors"
import cookieParser from "cookie-parser"
import {PORT} from "./config/config";
import routes from './routes';

const app: Express = express()
app.use(cookieParser());
app.use(cors())

app.use(express.json());

app.use('/', routes);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send();
});


app.listen(PORT, async () => {
    console.log("Server is listening port: 5000");
});

export const handler: serverless.Handler = serverless(app);