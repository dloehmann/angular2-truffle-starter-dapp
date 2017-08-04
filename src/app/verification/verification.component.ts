import {Component, OnInit} from '@angular/core';
import {Verification} from "./verification";
import {RfaService} from "../rfa-service";
import {Assignment} from "../domain/assignment";


@Component({
  selector: 'verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  providers: [RfaService]
})


export class VerificationComponent implements OnInit {

  verifications : Verification[];
  rfaService:RfaService;
  assignments: Assignment[];

  constructor(rfaService:RfaService ) {
    this.rfaService = rfaService;
    rfaService.getVerifications().then(verifications => this.verifications= verifications)
  }

  loadAssignments() {
    this.assignments = this.rfaService.assignmentList;
    console.log(this.rfaService.assignmentList)
  }

  ngOnInit() {
  }

}
