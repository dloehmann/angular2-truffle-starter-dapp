import { Injectable } from '@angular/core';
import {Rfa} from "./domain/rfa";
// import {RFAs, NEWRFAs, VERIFICATION, AIRCRAFTS, ADNOTES, REFTYPES} from "./mocks/mocks";
import {NewRfa} from "./domain/newRfa";
import {Verification} from "./verification/verification";
import {AcType} from "./domain/ac-type";
import {AdNote} from "./domain/ad-note";
import {RefTypes} from "./domain/refTypes";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Assignment} from "./domain/assignment";
import {Observable} from "rxjs";
import * as data from './../assets/acSeries.json';
import * as adReviewApiFactory from './adReviewApi.js';

import * as metaincoinArtifacts from '../../build/contracts/MetaCoin.json';
import * as adReviewArtifacts from '../../build/contracts/ADReview.json';
import * as Web3 from 'web3';
import * as contract  from "truffle-contract";


// import {require} from "@angular/core";
// const testUrl = require('acSeries.json');  // URL to web api

@Injectable()
export class RfaService {
  MetaCoin = contract(metaincoinArtifacts);
  ADReview = contract(adReviewArtifacts);
  adReviewApi = adReviewApiFactory(this.ADReview).initEventListeners({
      onRfaChanged: (rfaId: number) => {
          //ToDo
          //        var id = rfaId;
          //        var pos = this.rfas.findIndex((e,i) => e.id == id);
          //        if (pos >=0) this.rfas.splice(pos,1);
          console.log("NOT_IMPLEMENTED: onRfaChanged");
      },
      onNewADNote: (adNoteId: number) => {
          //ToDo
          console.log("NOT_IMPLEMENTED: onNewADNote");
      },
      onNewAssignmentAnnonce: (sender: string, rfaId: number, assAnnId: number) => {
          //ToDo
          console.log("NOT_IMPLEMENTED: onNewAssignmentAnnonce");
      },
      onNewAssignment: (rfaId: number, assId: number) => {
          //ToDo
          console.log("NOT_IMPLEMENTED: onNewAssignment");
      },
      onAssignmentDepositClaimed: (rfaId: number, assignmentId: number) => {
          //ToDo
          console.log("NOT_IMPLEMENTED: onAssignmentDepositClaimed");
      },
      onCorrectAssignmentDetermined: (rfaId: number) => {
          //ToDo
          console.log("NOT_IMPLEMENTED: onCorrectAssignmentDetermined");
      }
  });

  // TODO add proper types these variables
  web3: any;
  account: any;
  accounts: any;

  private acTypeUrl = 'api/AIRCRAFTS';  // URL to web api
  private refTypeUrl = 'api/REFTYPES';  // URL to web api
  private adNotesUrl = 'api/ADNOTES';  // URL to web api
  private newRfasUrl = 'api/NEWRFAs';  // URL to web api
  private rfasUrl = 'api/RFAs';  // URL to web api
  private verificationsUrl = 'api/VERIFICATION';  // URL to web api
  public assignmentList: Assignment[] = [];

  constructor(private http: Http) {
    // http.request('assets/acSeries.json')
    //   .subscribe(res => console.log(res));
    // this.assignmentList = [];
    // http.get('/assets/acSeries.json')
    //   .subscribe(res => console.log(res.json()));
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

getRfas(): Promise<Rfa[]> {
  return this.adReviewApi.promiseRfas()
    .then(rfas => rfas.map((e,i)=>({
        id:              i,
        fromDate:        e[3],
        toDate:          e[4],
        noOfAc:          "8",
        noOfAssignments: "772",
    })))
    .catch(this.handleError);
}

abortRfa(id) {
  return this.adReviewApi.abortRfa(id)
    .catch(this.handleError);
}

getAircrafts(): Promise<Rfa[]> {
  return this.adReviewApi.promiseRfas()
    .then(rfas => rfas.map((e,i)=>({id:e[1], msn:e[2]})))
    .catch(this.handleError);
}

checkAndInstantiateWeb3 = () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof this.web3 !== 'undefined') {
    console.warn("Using this.web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    this.web3 = new Web3(this.web3.currentProvider);
  } else {
    console.warn("No this.web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
}

onReady = () => {
  // Bootstrap the MetaCoin abstraction for Use.
  this.MetaCoin.setProvider(this.web3.currentProvider);
  this.ADReview.setProvider(this.web3.currentProvider);
}

  getNewRfas(): Promise<NewRfa[]> {
    return this.http.get(this.newRfasUrl)
      .toPromise()
      .then(response => response.json().data as NewRfa[])
      .catch(this.handleError);
  }

  getVerifications(): Promise<Verification[]> {
    return this.http.get(this.verificationsUrl)
      .toPromise()
      .then(response => response.json().data as Verification[])
      .catch(this.handleError);
  }

  getAcTypes(): Promise<AcType[]> {
    return this.http.get(this.acTypeUrl)
      .toPromise()
      .then(response => response.json().data as AcType[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getRefTypes(): Promise<RefTypes[]> {
    return this.http.get(this.refTypeUrl)
      .toPromise()
      .then(response => response.json().data as RefTypes[])
      .catch(this.handleError);
  }

  getAdNotes(): Promise<AdNote[]> {
    return this.http.get(this.adNotesUrl)
      .toPromise()
      .then(response => response.json().data as AdNote[])
      .catch(this.handleError);
  }

}
