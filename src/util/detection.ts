export const isMobileUserAgent = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};
