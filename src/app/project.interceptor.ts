import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

    constructor(private _snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = window.sessionStorage.getItem('fse-auth-token')?.toString();
        const authReq = req.clone({
            headers: req.headers.set('auth-token', token ? token : '')
        });
        return next.handle(authReq).pipe(tap((httpEvent) => {
            if (httpEvent instanceof HttpResponse) {
                if (httpEvent.headers.has('auth-token')) {
                    const token = httpEvent.headers.get('auth-token');
                    if (token) {
                        window.sessionStorage.setItem('fse-auth-token', token);
                    }
                }
            }
        }));
    }
}

function httpEvent(httpEvent: any): import("rxjs").OperatorFunction<import("@angular/common/http").HttpEvent<any>, import("@angular/common/http").HttpEvent<any>> {
    throw new Error('Function not implemented.');
}
