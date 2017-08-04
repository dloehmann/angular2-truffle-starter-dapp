import {Component, OnInit, Input} from '@angular/core';
import {NewRfa} from "../domain/newRfa";
import {Rfa} from "../domain/rfa";
import {NEWRFAs} from "../mocks/mocks";
import {RfaService} from "../rfa-service";


@Component({
  selector: 'new-rfa',
  templateUrl: './new-rfa.component.html',
  styleUrls: ['./new-rfa.component.css'],
  providers: [RfaService]
})
export class NewRfaComponent implements OnInit {

  newrfas : NewRfa[];
  @Input() rfa: Rfa;

  constructor(rfaService:RfaService
  ) {
    rfaService.getNewRfas().then(newrfas => this.newrfas= newrfas)

  }

  ngOnInit() {
  }

}
