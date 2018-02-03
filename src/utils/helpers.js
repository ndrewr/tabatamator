export function calculateTotalWorkoutTime(workout) {
  const { intervalTime, restTime, targetIntervals, targetSets } = workout;

  const setCompletionTime =
    targetIntervals * intervalTime + (targetIntervals - 1) * restTime;

  return targetSets * setCompletionTime;
}
