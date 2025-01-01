export async function fetchUserInfo(tokenType, accessToken) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    const userInfo = await response.json();
    console.log(userInfo);
  } else {
    console.error("Failed to fetch user info:", await response.text());
  }
}
