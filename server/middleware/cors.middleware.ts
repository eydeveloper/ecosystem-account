import {Request, Response} from 'express';

const cors = (request: Request, response: Response, next: any) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export default cors;
