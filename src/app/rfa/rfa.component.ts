import {Component, OnInit, Input} from '@angular/core';
import {Rfa} from "../domain/rfa";
import {RFAs} from "../mocks/mocks";
import {RfaService} from "../rfa-service";

@Component({
  selector: 'rfa',
  templateUrl: './rfa.component.html',
  styleUrls: ['./rfa.component.css'],
  providers: [RfaService]
})



export class RfaComponent implements OnInit {

  rfaService : RfaService;

  rfas : Rfa[];

  @Input() selectedRfa;
  @Input() displayedRfa;
  @Input() displayModal;

  showRfa(rfa: Rfa) {
    this.selectedRfa = rfa;
    this.displayedRfa = this.selectedRfa;
    this.displayModal = true;
  }

  abortRfa(rfa: Rfa) {
    //ToDo: set line color gray
    this.rfaService.abortRfa(rfa.id);
  }

  onRfaChanged(rfaId: number) {
    //ToDo: rfa changed: reload line or whole table
  }


  editRfa(rfa: Rfa) {
    this.displayModal = !this.displayModal;
  }

  newRfa() {
    // this.selectedRfa = rfa;
    // this.selectedRfa = rfa;
    this.displayModal = !this.displayModal;
    this.displayedRfa = undefined;
  }
  constructor(rfaService: RfaService) {
    rfaService.getRfas().then(rfas => this.rfas = rfas)
    .then(rfas => console.log('RFA:>',rfas));
  }

  ngOnInit() {
  }

}
