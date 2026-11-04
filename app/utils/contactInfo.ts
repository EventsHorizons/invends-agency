/** Contact NAP — kept separate so layout/footer do not pull siteData. */
export const CONTACT_INFO = {
  email: "hola@invends.com",
  phone: "+57 300 000 0000",
  phoneTel: "+573000000000",
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
