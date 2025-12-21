'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';

interface GalleryGridProps {
  images: string[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [displayCount, setDisplayCount] = useState(12);
  
  const displayedImages = images.slice(0, displayCount);
  const hasMore = displayCount < images.length;

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-stone-300 rounded-xl">
        <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-2" />
        <p className="text-stone-400">No photos uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {displayedImages.map((img, idx) => (
          <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <Image 
              src={img} 
              alt={`Gallery image ${idx + 1}`} 
              width={600} 
              height={800} 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-8">
          <button 
            onClick={loadMore}
            className="px-8 py-3 bg-white border border-stone-200 text-stone-600 rounded-full hover:bg-stone-50 hover:border-stone-300 transition-colors shadow-sm font-medium"
          >
            Load More Photos ({images.length - displayCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
