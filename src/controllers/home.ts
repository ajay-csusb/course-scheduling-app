import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export let index = (_req: Request, res: Response) => {
  res.render('home', {
    title: 'CSUSB',
  });
};
