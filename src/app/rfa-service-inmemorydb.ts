import { Injectable } from '@angular/core';
import {Rfa} from "./domain/rfa";
// import {RFAs, NEWRFAs, VERIFICATION, AIRCRAFTS, ADNOTES, REFTYPES} from "./mocks/mocks";
import {NewRfa} from "./domain/newRfa";
import {Verification} from "./verification/verification";
import {AcType} from "./domain/ac-type";
import {AdNote} from "./domain/ad-note";
import {RefTypes} from "./domain/refTypes";
import { Headers, Http } from '@angular/http';
// import { acTypesFile } from  './../assets/acSeries.json';  // URL to web api
// const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');


import 'rxjs/add/operator/toPromise';
import {Assignment} from "./domain/assignment";
import {Observable} from "rxjs";
import * as data from './../assets/acSeries.json';

// import {require} from "@angular/core";
// const testUrl = require('acSeries.json');  // URL to web api


@Injectable()

export class RfaService {

  private acTypeUrl = 'api/AIRCRAFTS';  // URL to web api
  private refTypeUrl = 'api/REFTYPES';  // URL to web api
  private adNotesUrl = 'api/ADNOTES';  // URL to web api
  private newRfasUrl = 'api/NEWRFAs';  // URL to web api
  private rfasUrl = 'api/RFAs';  // URL to web api
  private verificationsUrl = 'api/VERIFICATION';  // URL to web api
  public assignmentList: Assignment[] = [];

  constructor(private http: Http) {
    console.log(data);
  }



  getRfas(): Promise<Rfa[]> {
    return this.http.get(this.rfasUrl)
      .toPromise()
      .then(response => response.json().data as AcType[])
      .catch(this.handleError);
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
