import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private _http: HttpClient) { }

  getFileContent(path: string): Observable<string> {
    return this._http.get(path, { responseType: 'text' });
  }
}
