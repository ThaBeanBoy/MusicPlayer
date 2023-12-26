import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import adminRoutes from './routes/admin';

enum appConfig {
  defaultPort = 3000,
}

const app = express();
const port = process.env.PORT || appConfig.defaultPort;

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
