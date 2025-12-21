import { format } from 'date-fns';
import { MapPin, Calendar, Clock, ExternalLink, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { weddingConfig } from '@/lib/wedding-config';
import fs from 'fs';
import path from 'path';
import GalleryGrid from '@/components/GalleryGrid';

// Helper to get all images from the gallery folder automatically
function getGalleryImages() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'assets', 'gallery');
    if (!fs.existsSync(galleryDir)) {
      return [];
    }
    const files = fs.readdirSync(galleryDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    
    return files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(file => `/assets/gallery/${file}`);
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return [];
  }
}

export default async function Home() {
  // Read config from local file
  const wedding = weddingConfig;
  
  // Auto-discover images
  const allImages = getGalleryImages();

  // Base path for production
  const isProd = process.env.NODE_ENV === 'production';
  const repoName = 'wedding-site'; // Must match next.config.mjs
  const basePath = isProd ? `/${repoName}` : '';

  // Prepend basePath to images if necessary
  const galleryImages = allImages.map(img => `${basePath}${img}`);

  // Defaults
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;
  const dateStr = wedding.date;
  const date = new Date(dateStr);
  
  const venueName = wedding.venue.name;
  const venueAddress = wedding.venue.address;
  const mapUrl = wedding.venue.mapUrl;
  const mapEmbed = wedding.venue.mapEmbedUrl;

  const heroTitle = wedding.hero.title;
  const heroImage = wedding.hero.image;
  const namesImage = wedding.hero.namesImage;
  const driveLink = wedding.driveLink;
  const contacts = wedding.contacts;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            {heroImage ? (
                 <Image
                    src={heroImage}
                    alt="Wedding Hero"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                 />
            ) : (
                <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-400">No Hero Image</span>
                </div>
            )}
            
            {/* Gradient Overlay: Fade from top (for text visibility) and bottom (for transition) */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-transparent to-stone-50/20" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-50 to-transparent" />
        </div>

        {/* Content - Positioned at Top Center */}
        <div className="absolute top-0 left-0 w-full pt-16 md:pt-24 pb-12 text-center space-y-8 px-4 z-10 animate-fade-in-up">
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-stone-600">{heroTitle}</h2>
            
            <div className="flex justify-center">
                {namesImage ? (
                    <Image 
                        src={namesImage} 
                        alt={`${groom} & ${bride}`} 
                        width={600} 
                        height={300}
                        className="w-full max-w-lg h-auto drop-shadow-sm"
                        priority
                    />
                ) : (
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800">
                        {groom} <span className="text-rose-400">&</span> {bride}
                    </h1>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-base md:text-lg font-medium tracking-wide text-white">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-white" />
                    <span>{format(date, 'EEEE, MMMM do, yyyy')}</span>
                </div>
                <div className="hidden md:block text-white/70">•</div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white" />
                    <span>{format(date, 'HH:mm')}</span>
                </div>
            </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section id="event-details" className="py-20 px-4 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
            <Heart className="w-10 h-10 mx-auto text-rose-400 mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">The Wedding Celebration</h2>
            <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
                We invite you to share in our joy as we exchange vows and celebrate our union.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                    <Clock />
                </div>
                <h3 className="text-xl font-semibold">Time</h3>
                <p className="text-lg text-stone-700">{format(date, 'HH:mm')}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                    <MapPin />
                </div>
                <h3 className="text-xl font-semibold">Venue</h3>
                <div>
                    <p className="text-lg text-stone-700 font-medium">{venueName}</p>
                    <p className="text-stone-500">{venueAddress}</p>
                </div>
                <a 
                    href={mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium text-sm mt-2"
                >
                    Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </div>

        {/* Map Embed */}
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-inner bg-stone-200">
             <iframe 
                src={mapEmbed} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Our Moments</h2>
                <p className="text-stone-500">A glimpse into our journey</p>
            </div>

            <GalleryGrid images={allImages} />
        </div>
      </section>

      {/* FOOTER / DRIVE LINK */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif">Captured Moments</h2>
            <p className="text-stone-600">
                After the big day, we will upload all the high-quality photos here. 
                Please check back later to view and download them!
            </p>
            <a 
                href={driveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-lg font-medium transition-colors shadow-lg shadow-rose-200"
            >
                View Wedding Photos on Drive <ExternalLink className="w-5 h-5" />
            </a>

            {contacts.length > 0 && (
                <div className="pt-12 border-t border-stone-100 mt-12">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">Assistance on the Day</h3>
                    <p className="text-stone-500 text-sm mb-8 max-w-2xl mx-auto">
                        Our wedding coordinator will be on-site to assist you upon arrival. Should you have any questions or cannot locate them, please feel free to contact Phuoc Tri or Kim Ngan directly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {contacts.map((contact, idx) => (
                            <div key={idx} className="text-center">
                                <p className="font-semibold text-stone-800">{contact.name}</p>
                                <p className="text-sm text-stone-500">{contact.role}</p>
                                <a href={`tel:${contact.phone}`} className="text-rose-500 hover:underline">{contact.phone}</a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-500 py-8 text-center text-sm">
        <p>© 2026 {groom} & {bride}. Built with love.</p>
      </footer>
    </main>
  );
}
