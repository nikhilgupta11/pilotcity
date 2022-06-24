import { ObjectId } from 'bson';
import { IProgramAdk } from './adk';

export enum ContactMethod {
  email = 'Email',
  text = 'Text',
  call = 'Call',
  schedulingApp = 'Scheduling App'
}

export enum ContactPreference {
  earlyMorning = 'Early Morning',
  lateMorning = 'Late Morning',
  earlyAfternoon = 'Early Afternoon',
  lateAfternoon = 'Late Afternoon',
  earlyEvening = 'Early Evening',
  lateEvening = 'Late Evening'
}

export interface DirectorySettings {
  userId: ObjectId;
  contactMethods: Array<ContactMethod>;
  schedulingLink?: string;
  contactPreferences: Array<ContactPreference>;
  hideEmail?: boolean;
  hidePhone?: boolean;
}

/**
 * Directory adk object under `programDoc`. Stores directory preferences of employers.
 *
 * Modify this interface to add fields to Directory adk.
 */
export interface IProgramAdkDirectoryInfo {
  directoryPreferences: Array<DirectorySettings>;
}
/**
 * Directory adk object under `programDoc` as stored in the db under `programDoc.adks`.
 */
export interface IProgramAdkDirectory extends IProgramAdk, IProgramAdkDirectoryInfo {
  name: 'directory';
}
