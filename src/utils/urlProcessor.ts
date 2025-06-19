
export const trackingParams = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'msclkid', 'twclid', 'igshid',
  'mc_eid', 'mc_cid', '_ga', 'ref', 'referrer'
];

export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    
    // Remove tracking parameters
    trackingParams.forEach(param => {
      searchParams.delete(param);
    });
    
    // Clean up fragment identifiers that look like tracking
    urlObj.hash = '';
    
    urlObj.search = searchParams.toString();
    return urlObj.toString();
  } catch (error) {
    console.error('Invalid URL:', error);
    return url;
  }
};

export const generateShortUrl = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `clean.li/${result}`;
};
