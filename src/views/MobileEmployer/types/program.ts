import { ObjectId } from 'bson';
import { AdkName, IProgramAdk } from './adk';
import { IProgramAdkMobile } from './mobile';
import { IProgramAdkDirectory } from './directory';
import { IProgramAdkObjective } from './objective';

type Concrete<T> = { [K in keyof T]-?: T[K] };

type AbstractAdkState = {
  [key in AdkName]?: IProgramAdk;
};

export interface AdkState extends AbstractAdkState {
  mobile?: IProgramAdkMobile;
  directory?: IProgramAdkDirectory;
  objective?: IProgramAdkObjective;
}

/**
 * ProgramDoc interface with mobile adk.
 */
export interface IProgramDoc {
  _id: ObjectId;
  programName: string;
  organizers: Array<ObjectId>;
  adks: AdkState;
}
export const defaultAdkState: Concrete<AdkState> = {
  mobile: {
    name: 'mobile'
  },
  directory: {
    name: 'directory',
    directoryPreferences: []
  },
  objective: {
    name: 'objective',
    keyResults: []
  }
};
