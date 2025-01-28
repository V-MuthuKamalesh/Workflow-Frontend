export const fetchUserInfo = async (tokenType, accessToken) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};
