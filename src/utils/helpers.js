export function calculateTotalWorkoutTime(workout) {
  // const { intervalTime, restTime, targetIntervals, targetSets } = workout;
  const {
    intervalTime,
    restTime,
    targetIntervals,
    targetSets,
    setRestTime,
    warmupTime
  } = workout;

  const setCompletionTime =
    targetIntervals * intervalTime + (targetIntervals - 1) * restTime;

  const totalSetRestTime = (targetSets - 1) * setRestTime;

  return targetSets * setCompletionTime + totalSetRestTime + warmupTime;
}
