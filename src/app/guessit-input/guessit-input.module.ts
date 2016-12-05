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

  constructor(api: GuessitApi) {
    this.api = api;
    this.filenameSubject.debounceTime(this.debounce).subscribe(this.executeQuery.bind(this))
  }

  executeQuery(filename: string) {
    this.api.search(filename).forEach((r) => this.result.emit(r));
  }

  /**
   * Handle filename value change.
   * @param filename
   */
  handleFilename(filename: string) {
    this.filenameSubject.next(filename);
  }
}
