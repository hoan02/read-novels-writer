import moment from "moment";

export default function formatTimeAgo(dateTime: string) {
  const now = moment();
  const postTime = moment(dateTime);
  const diffSeconds = now.diff(postTime, "seconds");
  const diffMinutes = now.diff(postTime, "minutes");
  const diffHours = now.diff(postTime, "hours");
  const diffDays = now.diff(postTime, "days");
  const diffYears = now.diff(postTime, "years");

  if (diffYears >= 1) {
    return moment(dateTime).format("DD/MM/YYYY");
  } else if (diffDays >= 1) {
    return `${diffDays} ngày trước`;
  } else if (diffHours >= 1) {
    return `${diffHours} giờ trước`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes} phút trước`;
  } else {
    return `${diffSeconds} giây trước`;
  }
}
