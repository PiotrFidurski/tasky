export function isMobile(userAgent: string | null) {
  if (userAgent) {
    return /android|blackberry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(
      userAgent
    );
  }

  return false;
}
