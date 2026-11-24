/** Contact NAP — kept separate so layout/footer do not pull siteData. */
export const CONTACT_INFO = {
  email: "hola@invends.com",
  phone: "+57 310 622 4236",
  phoneTel: "+573106224236",
  whatsapp: "+57 310 622 4236",
  whatsappTel: "573106224236",
  whatsappUrl: "https://wa.me/573106224236?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios",
  whatsappUrlEn: "https://wa.me/573106224236?text=Hello%2C%20I%20would%20like%20more%20information%20about%20your%20services",
  locations: [
    {
      city: "Bogotá, Colombia",
      address: "Atención por agenda\nBogotá / LATAM",
      mapsUrl: "mailto:hola@invends.com",
    },
  ],
  social: [
    { name: "Linkedin", url: "https://www.linkedin.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "Behance", url: "https://www.behance.net/" },
  ],
} as const;
