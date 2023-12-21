function formatDate(targetDate) {
  const timeInfo = `${targetDate.getFullYear()}-${
    targetDate.getMonth() + 1
  }-${targetDate.getDate()} ${targetDate.getHours()}:${targetDate.getMinutes()}`;

  return timeInfo;
}

function getCurrentTimeInfo() {
  const date = new Date();
  const timeInfo = formatDate(date);
  const timestamp = date.getTime();

  return { date, timeInfo, timestamp };
}

function getDeletionScheduledTimeInfo() {
  const DELETION_AFTER_DAYS = 14;
  const ONE_DAY_MILISECONDS = 24 * 60 * 60 * 1000;

  const { date, timeInfo } = getCurrentTimeInfo();

  const deletionSheduledDate = new Date(
    date.getTime() + DELETION_AFTER_DAYS * ONE_DAY_MILISECONDS,
  );
  const deletionSheduledTimeStamp = deletionSheduledDate.getTime();
  const deletionSheduledTimeInfo = formatDate(deletionSheduledDate);

  return {
    timeInfo,
    deletionSheduledTimeStamp,
    deletionSheduledTimeInfo,
  };
}

export { getCurrentTimeInfo, getDeletionScheduledTimeInfo };
