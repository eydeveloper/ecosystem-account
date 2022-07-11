import {Request} from 'express';
import {Query} from 'express-serve-static-core';

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}
