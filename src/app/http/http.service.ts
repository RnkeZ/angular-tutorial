import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable } from 'rxjs/Observable';
import { Http, Request, Headers, RequestOptions, RequestOptionsArgs, Response, XHRBackend, RequestMethod } from '@angular/http';

@Injectable()
export class HttpService extends Http {
  headers: Headers;

  constructor(private http: Http, backend: XHRBackend, options: RequestOptions, private configurationService: ConfigurationService) {
    super(backend, options);
  }

  request(url: Request, requestOptions?: RequestOptions): Observable<Response> {
    // this.showLoader();
    const urlInfo = url.url;
    if (!url.url.includes('http')) {
      url.url = this.configurationService.server + url.url;
    }
    url.withCredentials = false;
    return super.request(url).finally(() => {
      // this.onEnd();
    }).catch(this.handleError);
  }

  handleError = (error: any) => {
    // RequestAspect.handleError(error);
    return Observable.throw(error);
  }

}
