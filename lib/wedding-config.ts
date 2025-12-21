export const weddingConfig = {
  couple: {
    groom: 'Phuoc Tri',
    bride: 'Kim Ngan',
  },
  date: '2026-01-25T18:00:00', // YYYY-MM-DDTHH:mm:ss
  venue: {
    name: 'Gala Center',
    address: '415 Đ. Hoàng Văn Thụ, Phường 2, Tân Bình',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gala+Center+Wedding+%26+Convention+415+%C4%90.+Ho%C3%A0ng+V%C4%83n+Th%E1%BB%A5',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Gala+Center+Wedding+%26+Convention+415+Hoang+Van+Thu&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  hero: {
    title: 'Save The Date',
    video: null, // Set to null since we are using an image
    image: '/assets/hero/hero.jpg', // Main hero image
    namesImage: '/assets/hero/name.png', // The names PNG
  },
  driveLink: '#', // Replace with your actual Google Drive link
  contacts: [
    { name: 'Phuoc Tri', phone: '0909000000', role: 'Groom' },
    { name: 'Kim Ngan', phone: '0909000000', role: 'Bride' },
  ]
};
