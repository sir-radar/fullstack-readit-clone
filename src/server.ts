import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from "morgan";
import dotenv  from "dotenv";
import cookieParser  from "cookie-parser"

dotenv.config();

//routes
import authRoutes from './routes/auth';

//midlewares
import trim from './middleware/trim';

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/', (req, res) => res.send("Hello world"));
app.use('/api/auth', authRoutes)

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)

    try{
        await createConnection()
        console.log('Database connected')
    }catch(err){
        console.log(err)
    }
})


