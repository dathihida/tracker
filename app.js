import express from 'express';
import {PORT} from './config/env.js';
import useRouter from './routes/use.routes.js';
import trackRouter from './routes/track.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();



app.use('/api/v1/user', useRouter);
app.use('/api/v1/track', trackRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World CONFIG');
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})

export default app;