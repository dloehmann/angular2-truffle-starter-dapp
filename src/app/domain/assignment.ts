import {AdNote} from "./ad-note";
import {RefTypes} from "./refTypes";
import {AcType} from "./ac-type";
export class Assignment {
  id: number;
  no: string;
  date: string;
  acType: AcType;
  refType: RefTypes;
  adNote: AdNote;
  hitrate: number;
}
