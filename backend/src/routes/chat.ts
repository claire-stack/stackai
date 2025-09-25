import express from 'express';
import { callOpenRouterStream } from '../services/openrouter';
import modelMap from '../config/modelMap';

const router = express.Router();

// POST /chat/:llm → 改成 SSE 串流
router.post('/:llm', async (req, res, next) => {
  const { llm } = req.params;
  const { messages } = req.body;
  const model = modelMap[llm];

  console.log('[Chat Trigger]', llm, messages);

  if (!model || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid model or messages format' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await callOpenRouterStream(model, messages);

    stream.on('data', (chunk: Buffer) => {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const json = line.replace(/^data:\s*/, '');
          if (json === '[DONE]') {
            res.write(`event: done\ndata: [DONE]\n\n`);
            res.end();
          } else {
            res.write(`data: ${json}\n\n`);
          }
        }
      }
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (err: any) => {
      console.error('[Stream Error]', err);
      res.write(`event: error\ndata: ${err.message}\n\n`);
      res.end();
    });
  } catch (err) {
    next(err);
  }
});

export default router;


