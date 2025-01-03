export function greetBasedOnTime() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning,";
  } else if (currentHour < 17) {
    return "Good afternoon,";
  } else if (currentHour < 19) {
    return "Good evening,";
  } else {
    return "Good night,";
  }
}
