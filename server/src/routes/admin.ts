import { Router } from 'express';
import httpStatus from 'http-status';

const adminRoutes = Router();

adminRoutes.get('/', (req, res) => {
  console.log(req.query);
  //   res.status(httpStatus.NO_CONTENT);
  res.send('hello admin');
});

export default adminRoutes;
