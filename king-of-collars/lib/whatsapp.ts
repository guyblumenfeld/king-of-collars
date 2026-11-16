// One place for the WhatsApp number and the prefilled message (wa.me/<n>?text=...).
export const WA = "https://wa.me/972553186689";
export const waLink = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;
export const WA_GENERIC = waLink("היי אלוף :), אשמח לשאול על..");
