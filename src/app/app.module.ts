import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from "ng2-bootstrap/ng2-bootstrap";
import {AppComponent} from "./app.component";
import {GuessitInputComponent} from "./guessit-input/guessit-input.module";
import {GuessitApi} from "./guessit-service/guessit-api.service";

Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS3;

@NgModule({
  declarations: [
    AppComponent,
    GuessitInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [GuessitApi],
  bootstrap: [AppComponent]
})
export class AppModule {
}
