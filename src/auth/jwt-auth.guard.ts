import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      console.error('Authentication error:', err || 'No user found');
      return null;  // Return null if authentication fails
    }
    return user;  // Return the user if authentication succeeds
  }
}