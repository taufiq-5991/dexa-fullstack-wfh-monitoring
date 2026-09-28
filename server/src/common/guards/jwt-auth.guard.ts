import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from "jsonwebtoken";

// Extend the Request interface to include the 'user' property
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token not found or invalid');
    }

    console.log({authHeader})
    const token = authHeader.slice(7); // Extract the token
    const secret = process.env.JWT_SECRET;
    console.log({token})
    console.log({secret})
    if (!secret) {
        throw new UnauthorizedException('Invalid or expired token');
    }
    try {
      // Verify the token and attach the payload to the request
      const payload = jwt.verify(token, secret);
      console.log({payload})
      request['user'] = payload; // Attach the payload to the request object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}