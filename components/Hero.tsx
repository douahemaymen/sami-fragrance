import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2574&auto=format&fit=crop"
          alt="Parfum Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay sombre pour faire ressortir le texte blanc */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white font-bold inline-block px-4 py-1 border border-white/50 backdrop-blur-sm bg-white/20 shadow-2xl">
          Parfumerie de Luxe en Tunisie
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}>
          L'Art du <span className="text-white italic">Parfum</span>
        </h1>
        <p className="text-white text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-2xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}>
          Découvrez notre collection exclusive de fragrances. Une signature olfactive unique pour chaque personnalité.
        </p>
        <a
          href="#collection"
          className="inline-block bg-white text-black px-12 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 border-2 border-white shadow-xl hover:shadow-2xl"
        >
          Voir la Collection
        </a>
      </div>
    </section>
  );
};