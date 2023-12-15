import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return this.handleTokenExpiredError(request, response);
      }

      response.send(error.message);
      return false;
    }
  }

  private handleTokenExpiredError(request, response): boolean {
    const refreshToken = request.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const accessToken = jwt.sign(
        { id: payload['id'], email: payload['email'] },
        process.env.JWT_SECRET,
        { expiresIn: '1m' },
      );

      response.cookie('accessToken', accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      });

      return true;
    } catch (error) {
      response.status(401).send(error.message);
      return false;
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
