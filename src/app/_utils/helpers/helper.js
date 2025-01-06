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

export function convertFromCamelCasetoNormalText(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}
