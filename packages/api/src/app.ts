import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express =  express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

app.get('/hello-world', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World' });
});


export default app;
