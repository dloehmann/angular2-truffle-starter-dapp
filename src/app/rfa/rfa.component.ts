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

  rfas = RFAs;
  @Input() selectedRfa;
  @Input() displayedRfa;
  @Input() displayModal;

  showRfa(rfa: Rfa) {
    this.selectedRfa = rfa;
    this.displayedRfa = this.selectedRfa;
    this.displayModal = true;

  }

  toggle(rfa: Rfa) {
    // this.selectedRfa = rfa;
    this.displayModal = !this.displayModal;
    this.displayedRfa = undefined;
  }


  constructor(rfaService:RfaService ) {
    rfaService.getRfas().then(rfas => this.rfas= rfas)

  }

  ngOnInit() {
  }





}
