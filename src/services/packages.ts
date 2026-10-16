export const contact = {
  phone: "084 763 5834",
  phoneHref: "tel:+27847635834",
  whatsapp: "072 480 4210",
};

export function enquiryLink(subject = "a photography session") {
  return `https://wa.me/27724804210?text=${encodeURIComponent(`Hello M.E.C Empire, I'd like to enquire about ${subject}. Please confirm availability and pricing.`)}`;
}

export const packages = [
  {
    id: "weddings", title: "Your forever moments", label: "Wedding photography & film",
    description: "From a quiet glance to the biggest celebration. Choose how you want to remember your day.",
    image: "wedding-packages", width: 904, height: 1280,
    alt: "M.E.C Empire wedding brochure featuring wedding photographs and three photography and film packages",
    options: [
      { name: "Package 1", price: 3000, detail: "Photography" },
      { name: "Package 2", price: 4500, detail: "Photography + highlights with drone" },
      { name: "Package 3", price: 5500, detail: "Photography + full video with drone" },
    ],
    note: "Pictures and video delivered on a USB drive. Google Drive if required.",
  },
  {
    id: "matric", title: "Make your entrance", label: "Matric dance 2026",
    description: "The outfit, the excitement, the occasion. Give this chapter the photographs it deserves.",
    image: "matric-dance-2026", width: 940, height: 788,
    alt: "M.E.C Empire 2026 matric dance poster showing three session packages",
    options: [
      { name: "Package 1 · 45 minutes", price: 1000, detail: "Unlimited pictures · 20 skin-tone edited images · delivery by email/link" },
      { name: "Package 2 · 1 hour", price: 1700, detail: "Unlimited pictures · 35 skin-tone edited images · matric dance reel with drone · delivery by email/link" },
      { name: "Package 3 · Whole day", price: 2500, detail: "From home to the matric dance venue · unlimited pictures · 45 skin-tone edited images · matric dance reel with drone" },
    ],
    note: "Enquire about your date and confirm session arrangements with the studio.",
  },
  {
    id: "canvas", title: "Memories you can hold", label: "Premium canvas printing",
    description: "Bring your favourite photograph off the screen and into your home. A personal moment, made part of your everyday.",
    image: "canvas-prices", width: 904, height: 1280,
    alt: "MEC Empire black and gold canvas printing price list for A3, A2, A1 and A0 prints",
    options: [
      { name: "A3 canvas", price: 250, detail: "Canvas print" },
      { name: "A2 canvas", price: 450, detail: "Canvas print" },
      { name: "A1 canvas", price: 750, detail: "Canvas print" },
      { name: "A0 canvas", price: 1000, detail: "Canvas print" },
    ],
    note: "Contact the studio to discuss your image and print size.",
  },
  {
    id: "memorial", title: "Honouring a life", label: "Funeral & memorial coverage",
    description: "Respectful photography and film to preserve memories of a loved one, handled with dignity and care.",
    image: "memorial-packages", width: 852, height: 1280,
    alt: "M.E.C Empire funeral coverage brochure with four photography, video, drone and sound packages",
    options: [
      { name: "Package 1", price: 2500, detail: "Video & photography" },
      { name: "Package 2", price: 3500, detail: "Video, photography & drone" },
      { name: "Package 3", price: 4500, detail: "Video, photography, drone & sound" },
      { name: "Package 4", price: 5500, detail: "Video, photography, drone, display screens & sound" },
    ],
    note: "Pictures and video delivered on a USB drive. Google Drive if required.",
  },
] as const;

export function formatPrice(value: number) {
  return `R${value.toLocaleString("en-ZA").replace(/\s/g, " ")}`;
}
