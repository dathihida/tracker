import express from 'express';
import {PORT} from './config/env.js';
import useRouter from './routes/use.routes.js';
import trackRouter from './routes/track.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/api/v1/user', useRouter);
app.use('/api/v1/track', trackRouter);
app.use('/api/v1/auth', authRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World CONFIG');
})

app.listen(PORT, async() => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectDatabase();
})

export default app;