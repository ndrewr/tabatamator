export default function formatTime(seconds) {
  // d = Number(d);
  // var h = Math.floor(seconds / 3600);
  // var m = Math.floor(seconds % 3600 / 60);
  // var s = Math.floor(seconds % 3600 % 60);

  var m = Math.floor(seconds / 60);
  var s = Math.floor(seconds % 60);

  // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "00";
  let mDisplay = m > 0 ? (m > 9 ? m : '0' + m) : '00';
  let sDisplay = s > 0 ? (s > 9 ? s : '0' + s) : '00';
  // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "00";
  return mDisplay + ':' + sDisplay;
}
