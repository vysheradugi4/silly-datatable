import { Subject, Observable } from 'rxjs';

export class SearchService {

  private _request$: Subject<string> = new Subject<string>();

  constructor() { }

  public set request(string: string) {
    this._request$.next(string);
  }


  public get request$(): Observable<string> {
    return this._request$.asObservable();
  }
}
