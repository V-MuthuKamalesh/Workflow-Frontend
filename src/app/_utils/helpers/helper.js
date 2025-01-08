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

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 6) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
