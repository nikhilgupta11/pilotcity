export enum StudentStatus {
  notAutoApplied = 0,
  unlockingInterview,
  awaitingInterview,
  awaitingOffer,
  organizerShelvedStudent,
  organizerMadeOffer,
  studentDeclinedOffer,
  studentAcceptedOffer
}

export function getStudentStatus(studentDoc: any): StudentStatus {
  const interview = studentDoc.adks.find(adk => adk.name === 'interview');
  if (interview?.completed && !studentDoc.offerDetails) return StudentStatus.awaitingOffer;

  const offer = studentDoc?.adks?.find(adk => adk.name === 'offer');
  if (!offer) return StudentStatus.notAutoApplied;

  if (offer?.completed && offer.offerStatus && interview?.completed)
    return StudentStatus.studentAcceptedOffer;
  if (offer?.completed) return StudentStatus.studentDeclinedOffer;

  if (studentDoc.offerDetails && !offer?.completed) return StudentStatus.organizerMadeOffer;
  if (studentDoc.applicationStatus && !offer?.completed)
    return StudentStatus.organizerShelvedStudent;

  return StudentStatus.notAutoApplied;
}
