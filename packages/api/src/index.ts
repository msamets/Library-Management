import * as dotenv from 'dotenv';
import app from './app';
import { AppDataSource } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connection is success");
    })
    .catch((e) => console.error(e));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
