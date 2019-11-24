import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { BASE_API } from "./../../app.config";
import { from } from "rxjs";
import { map } from "rxjs/operators";

import {
  Http,
  RequestOptionsArgs,
  ResponseContentType,
  Headers
} from "@angular/http";

@Injectable()
export class HttpService {
  constructor(private http: Http, private storage: StorageService) {}

  doGet(url: string, requestParams: string): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      params: requestParams
    };

    const reqUrl: string = BASE_API + url;
    return this._mapResponseData(this.http.get(reqUrl, requestOptions));
  }

  doPost(url: string, bodyParams: any): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      headers: this._addAuthor()
    };

    const body: any = JSON.stringify(bodyParams);
    const reqUrl: string = BASE_API + url;
    return this._mapResponseData(this.http.post(reqUrl, body, requestOptions));
  }

  doPut(url: string, bodyParams: any): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      headers: this._addAuthor()
    };

    const body: any = JSON.stringify(bodyParams);
    const reqUrl: string = BASE_API + url;
    return this._mapResponseData(this.http.put(reqUrl, body, requestOptions));
  }

  doDelete(url: string, requestParams: string): Observable<any> {
    const requestOptions: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      params: requestParams,
      headers: this._addAuthor()
    };

    const reqUrl: string = BASE_API + url;
    return this._mapResponseData(this.http.delete(reqUrl, requestOptions));
  }

  private _mapResponseData(respon: Observable<any>): Observable<any> {
    return respon.pipe(
      map(res => {
        if (res.status === 200) {
          return res._body;
        } else {
          return null;
        }
      })
    );
  }

  private _addAuthor(): Headers {
    const token = "Bearer " + this.storage.getToken();
    const headers = new Headers();
    headers.append("Authorization", token);
    headers.append("Content-Type", "application/json; charset=utf-8");
    return headers;
  }
}
