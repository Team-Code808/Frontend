export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
};

export const getRoleFromToken = (token) => {
  const payload = decodeToken(token);
  return payload?.role || null;
};

export const getEmailFromToken = (token) => {
  const payload = decodeToken(token);
  return payload?.sub || payload?.email || null;
};

export const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;

  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

export const validateToken = (token) => {
  if (!token) return false;

  try {
    const payload = decodeToken(token);
    if (!payload) return false;

    // 만료 확인
    if (isTokenExpired(token)) return false;

    return true;
  } catch {
    return false;
  }
};
