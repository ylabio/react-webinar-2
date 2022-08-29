export default function nestLimiter(level) {
  if (level > 10) {
    return 10;
  } else {
    return level;
  }
}
