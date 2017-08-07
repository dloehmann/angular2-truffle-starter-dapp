import { Component } from '@angular/core';
import {RfaService} from "../rfa-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RfaService]
})
export class AppComponent {
  title = 'My First Angular App';
}
