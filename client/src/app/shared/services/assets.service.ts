import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {
    //private readonly assetsPath = '../../../assets/';
    // private readonly assetsPath = '../../../assets/';

    constructor(private _http: HttpClient) { }

    getFileContent(path: string): Observable<string> {
        return this._http.get(path, { responseType: 'text' });
    }

    // これらの処理はフォルダアクセスのためフロントエンドでは不可。バックエンドで実装必要
    // getAssetFolders(): Observable<string[]> {
    //     const folders =  this._http.get<string[]>(`${this.assetsPath}/`).pipe(
    //         map((response: string[]) => {
    //             return response.filter((path: string) => path.endsWith('/')).map((path: string) => path.slice(0, -1));
    //         })
    //     );
    //     return folders;
    // }

    getAssetFolders(): Observable<string[]> {
        return of(['1-delete-file-folder-vbs', '2-get-current-folder-vbs', '3-get-ini-data-vbs']);
    }

    // getFoldersInFolder(folderPath: string): Observable<string[]> {
    //     const folders = this._http.get<string[]>(`${this.assetsPath}/${folderPath}`).pipe(
    //         map((response: (string | undefined)[]) => {
    //             return response.filter((path: string | undefined): path is string => !!path)
    //                 .filter((path: string) => !path.includes('.'))
    //                 .map((path: string) => path.split('/').pop() ?? '');
    //         })
    //     );
    //     return folders;
    // }
}
