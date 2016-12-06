import {Component, Input, Output, EventEmitter} from "@angular/core";
import {GuessitApi} from "../guessit-service/guessit-api.service";
import {Subject} from "rxjs";

@Component({
  selector: 'guessit-input',
  templateUrl: './guessit-input.component.html',
  styleUrls: ['./guessit-input.component.scss']
})
export class GuessitInputComponent {
  private filenameSubject: Subject<string> = new Subject<string>();
  private api: GuessitApi;

  @Input() debounce: number = 500;
  @Output() result: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  private res: any;
  private err: any;

  constructor(api: GuessitApi) {
    this.api = api;
    this.filenameSubject.debounceTime(this.debounce).filter((filename) => !!filename).subscribe(this.executeQuery.bind(this));
    this.filenameSubject.subscribe(() => {
      this.result.emit(null);
      this.error.emit(null);
    });

    // TODO: Is this the only way to bind component output EventEmitter into it's own component template ?
    this.error.forEach((err) => {
      this.err = err;
    });

    this.result.forEach((result) => {
      this.res = result;
    });
  }

  executeQuery(filename: string) {
    this.api.search(filename).forEach((r) => this.result.emit(r)).catch((err) => this.error.emit(err));
  }

  /**
   * Handle filename value change.
   * @param filename
   */
  handleFilename(filename: string) {
    this.filenameSubject.next(filename);
  }
}
