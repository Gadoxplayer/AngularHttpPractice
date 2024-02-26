import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("reques is on its way");
    // console.log(req.url);

    const modifiedReq = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });
    return next.handle(modifiedReq);
    // .pipe(
    //     tap(event => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //         console.log('response arrived, body data: ', event.body);

    //     }
    // })
    // );
  }
}
