const calculateProgramCompletion = (studentAdks, teamAdks) => {
  const completedAdks =
    studentAdks?.filter(adk => adk?.isComplete || adk?.completed)?.length +
    teamAdks?.filter(adk => adk?.isComplete || adk?.completed)?.length +
    1; // add one to account for start adk being done

  return (completedAdks / 14) * 100;
};

export default calculateProgramCompletion;
