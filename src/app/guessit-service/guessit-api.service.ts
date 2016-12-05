import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {isString} from "util";

export class GuessitPropertyValue {
  constructor(public name: string, public value: any) {
  }
}

export class GuessitAdvancedPropertyValue extends GuessitPropertyValue {
  constructor(name: string, value: any, public raw: string, public start: number, public end: number) {
    super(name, value);
  }
}

export class GuessitAdvancedApiValue {
  constructor(public value: string, public raw: string, public start: number, public end: number) {
  }
}

export class GuessitResult {
  filename: string;
  json: any;
  properties: GuessitPropertyValue[];

  constructor(filename: string, properties?: GuessitPropertyValue[]) {
    this.filename = filename;
    this.properties = properties;
  }

  public static fromApiResponse(filename: string, jsonMatch: any) {
    let result = new GuessitResult(filename);
    result.json = jsonMatch;

    let properties = [];

    for (let key in jsonMatch) {
      let value = jsonMatch[key];

      let property: GuessitPropertyValue;
      if (value instanceof GuessitAdvancedApiValue) {
        property = new GuessitAdvancedPropertyValue(key, value.value, value.raw, value.start, value.end);
      } else {
        property = new GuessitPropertyValue(key, value);
      }

      properties.push(property);
    }

    result.properties = properties.sort((p1, p2) => {
      let v1 = 0;
      let v2 = 0;

      if (p1 instanceof GuessitAdvancedPropertyValue) {
        v1 = p1.start;
      }
      if (p2 instanceof GuessitAdvancedPropertyValue) {
        v2 = p2.start;
      }

      return v2 - v1;
    });

    return result;
  }
}

@Injectable()
export class GuessitApi {

  constructor(private http: Http) {
  }

  public search(filename: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('filename', filename);

    return this.http.get('http://v2.api.guessit.io', {search: params}).map((r) => GuessitResult.fromApiResponse(filename, r.json()));
  }
}
