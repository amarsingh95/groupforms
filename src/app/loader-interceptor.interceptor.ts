import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { delay, finalize } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private service:ServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service.setLoading(request.url,true)
    return next.handle(request).pipe(
      finalize(() =>  this.service.setLoading(request.url,false)),
    );
  }
}
