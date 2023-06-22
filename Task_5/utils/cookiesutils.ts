async function getCookieValue(context, cookieName) {
  const cookiesAll = await context.cookies();
  const userCookie = cookiesAll.find((c) => c.name === cookieName);
  return userCookie ? userCookie.value : null;
}

export { getCookieValue };
