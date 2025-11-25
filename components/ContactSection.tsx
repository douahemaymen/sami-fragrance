import React from 'react';
import { Instagram, Facebook, MapPin, Phone, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, STORE_LOCATION } from '../constants';

// Custom TikTok Icon as it's not in default lucide set sometimes, or use a placeholder SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const ContactSection: React.FC = () => {
  // Construct the Google Maps Embed URL using the specific coordinates
  const mapSrc = `https://maps.google.com/maps?q=${STORE_LOCATION.lat},${STORE_LOCATION.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row h-auto md:h-[600px]">

        {/* Contact Info (Left Side) */}
        <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-gray-800">
          <h2 className="font-serif text-4xl mb-2 text-white">Visitez-nous</h2>
          <p className="text-gray-300 mb-10 uppercase tracking-widest text-sm">Sami Fragrance Boutique</p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="text-white mt-1 shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-white">Adresse</h3>
                <p className="text-gray-200">Tunis, Tunisie</p>
                <p className="text-xs text-gray-400 mt-1">({STORE_LOCATION.lat}, {STORE_LOCATION.lng})</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold-400 text-sm mt-2 flex items-center hover:underline hover:text-gold-300"
                >
                  Ouvrir dans Google Maps <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="text-white mt-1 shrink-0" />
              <div>
                <h3 className="font-bold mb-1 text-white">Téléphone</h3>
                <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-gray-200 hover:text-white transition-colors">
                  {SOCIAL_LINKS.phone}
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-600">
              <h3 className="font-bold mb-4 text-white">Suivez-nous</h3>
              <div className="flex space-x-6">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 transition-all duration-300 group">
                  <Instagram className="group-hover:text-white text-gray-300" />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300 group">
                  <Facebook className="group-hover:text-white text-gray-300" />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-black hover:border hover:border-white transition-colors duration-300 group border border-transparent">
                  <TikTokIcon className="group-hover:text-white text-gray-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map (Right Side) */}
        <div className="w-full md:w-1/2 h-[400px] md:h-full relative bg-gray-900">
          <iframe
            width="100%"
            height="100%"
            src={mapSrc}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            title="Sami Fragrance Location"
            className="filter grayscale hover:grayscale-0 transition-all duration-700"
            style={{ minHeight: '400px' }}
          ></iframe>

          {/* Custom Marker overlay hint if needed, though iframe handles the map content */}
          <div className="absolute bottom-4 right-4 bg-gray-900/90 p-2 text-xs text-white pointer-events-none border border-gold-400">
            📍 Boutique
          </div>
        </div>
      </div>
    </section>
  );
};