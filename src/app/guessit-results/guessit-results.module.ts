import {Component, Input} from "@angular/core";
import {GuessitResult} from "../guessit-service/guessit-api.service";

export class GuessitPropertyResult {
  name: string;
  value: string;
}

@Component({
  selector: 'guessit-results',
  templateUrl: './guessit-results.component.html',
  styleUrls: ['./guessit-results.component.scss']
})
export class GuessitResultsComponent {
  @Input() result: GuessitResult;

  setResult(result: any) {
    console.log(result);
  }
}
