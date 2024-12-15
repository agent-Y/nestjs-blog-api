import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    // 認証失敗でもエラーをスローしない
    if (err || !user) {
      return null;  // 認証されていない場合は null を返す
    }
    return user;  // 認証成功時にユーザー情報を返す
  }
}