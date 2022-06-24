import { IProgramAdk } from './adk';

export enum MeetingDay {
  monday = 'Mondays',
  tuesday = 'Tuesdays',
  wednesday = 'Wednesdays',
  thursday = 'Thursdays',
  friday = 'Fridays'
}
export enum MeetingTime {
  at08amTo09am = '8am - 9am PST',
  at09amTo10am = '9am - 10am PST',
  at10amTo11am = '10am - 11am PST',
  at11amTo12pm = '11am - 12pm PST',
  at12pmTo01pm = '12pm - 1pm PST',
  at01pmTo02pm = '1pm - 2pm PST',
  at02pmTo03pm = '2pm - 3pm PST',
  at03pmTo04pm = '3pm - 4pm PST',
  at04pmTo05pm = '4pm - 5pm PST',
  at05pmTo06pm = '5pm - 6pm PST',
  at06pmTo07pm = '6pm - 7pm PST',
  at07pmTo08pm = '7pm - 8pm PST'
}
export enum MeetingCadence {
  every1Week = '1 Week',
  every2Week = '2 Weeks'
}

/**
 * Mobile adk object under `programDoc`. Store data for the mobile app.
 *
 * Modify this interface to add fields to Mobile adk.
 */
export interface IProgramAdkMobileInfo {
  discordEmployerChannel?: string;
  finalPresentation?: string;
  finalPresentationDate?: string;
  weeklyMeetingDay?: MeetingDay;
  weeklyMeetingTime?: MeetingTime;
  weeklyMeetingCadence?: MeetingCadence;
  weeklyConferenceLine?: string;
  agreementLink?: string;
  agreementInstructions?: string;
}
/**
 * Mobile adk object under `programDoc` as stored in the db under `programDoc.adks`.
 */
export interface IProgramAdkMobile extends IProgramAdk, IProgramAdkMobileInfo {
  name: 'mobile';
}
