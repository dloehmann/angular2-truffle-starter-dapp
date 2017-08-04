import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Rfa} from "./domain/rfa";
import {AcType} from "./domain/ac-type";
import {AdNote} from "./domain/ad-note";
import {RefTypes} from "./domain/refTypes";
import {NewRfa} from "./domain/newRfa";
import {Verification} from "./verification/verification";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const RFAs: Rfa[] = [
      {
        "id": "1",
        "fromDate": "2017-06-01",
        "toDate": "2017-06-08",
        "noOfAc": "8",
        "noOfAssignments": "772",
      },
    ];
    const AIRCRAFTS: AcType[] = [
      {"id":"11","series":"737-800", "msn":"25"},
      {"id":"12","series":"737-800BBJ", "msn":"26"},
      {"id":"13","series":"737-900", "msn":"27"},
      {"id":"14","series":"747-300", "msn":"28"},
      {"id":"15","series":"747-400", "msn":"29"},
    ];
    const ADNOTES: AdNote[] = [
      {"id":"22","no":"2014-0257R1", "date":"18/07/2017"},
      {"id":"23","no":"2015-0009", "date":"18/07/2017"}
    ];

     const REFTYPES: RefTypes[] = [
      {"code":"applicable", "name":"Applicable"},
      {"code":"na_other_ac_type","name":"n/a Other AC Type"},
      {"code":"na_other_msn","name":"n/a Other MSN"},
      {"code":"na_other_details","name":"n/a Other Details"},
      {"code":"na_revised","name":"n/a Revised"},
      {"code":"na_canceled","name":"n/a Canceled"}
    ];

     const NEWRFAs: NewRfa[] = [
      {
        "id": "1",
        "rfaId": "1",
        "acType": "737-800",
        "adsSince": "2017-06-08",
        "msn": "8",
      },
    ];

     const VERIFICATION: Verification[] = [
      {
        "id": "1",
        "acType": "A320-223F",
        "msn": "49",
        "adRefNo": "2015-740A",
        "refType": "20",
        "hitRate": "96%"
      },
      {
        "id": "2",
        "acType": "A320-223F",
        "msn": "49",
        "adRefNo": "2015-740A",
        "refType": "307",
        "hitRate": "97%"
      }
      ]
      // return {aircrafts};
      return {RFAs, AIRCRAFTS, ADNOTES, REFTYPES, NEWRFAs, VERIFICATION};
  }
}
