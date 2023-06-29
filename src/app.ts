require('dotenv').config()
import express, {Express} from 'express';
import serverless from 'serverless-http';
const cors = require('cors')
const cookieParser = require('cookie-parser')

import routes from './routes';

const PORT: string | 5000 = process.env.PORT || 5000

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