import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class GuessitApi {

  constructor(private http: Http) {
  }

  public search(filename: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('filename', filename);

    return this.http.get('http://localhost:5000', {search: params}).map((r) => r.json());
  }
}
