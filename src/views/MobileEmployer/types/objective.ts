import { IProgramAdk } from './adk';

/**
 * Objective adk object under `programDoc`. Stores primary objective and key results of employers.
 *
 * Modify this interface to add fields to Objective adk.
 */
export interface IProgramAdkObjectiveInfo {
  primaryObjective?: string;
  keyResults: Array<string>;
  // textFieldLength?: number;
}
/**
 * Objective adk object under `programDoc` as stored in the db under `programDoc.adks`.
 */
export interface IProgramAdkObjective extends IProgramAdk, IProgramAdkObjectiveInfo {
  name: 'objective';
}
