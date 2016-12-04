import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class GuessitApi {

  constructor(private http: Http) {
  }

  public search(filename: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('filename', filename);

    return this.http.get('http://v2.api.guessit.io', {search: params}).map((r) => r.json());
  }
}
