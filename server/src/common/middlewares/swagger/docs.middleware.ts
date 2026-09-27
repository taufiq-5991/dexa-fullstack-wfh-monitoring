import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DocsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = { password: process.env.DOC_TOKEN }; // change this to your desired username and password

    // Parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // Verify username and password
    if (password && password === auth.password) {
      // Access granted
      return next();
    }

    // Access denied
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this to your desired realm
    res.status(401).send('Authentication required.');
  }
}
