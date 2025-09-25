import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';



const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/chat', chatRouter);



// Global error handler to always return JSON
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Global Error Handler]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: err.stack || null,
  });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

export default app;
