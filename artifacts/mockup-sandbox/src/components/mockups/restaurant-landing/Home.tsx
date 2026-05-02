import React from 'react';
import { ChefHat, Flame, Leaf, Clock, MapPin, Star } from 'lucide-react';

export function Home() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#1A1208', color: '#F5EDD6', minHeight: '100vh', overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        
        @keyframes floatUp { 0%,100% { transform: translateY(0px) translateZ(20px) rotateX(5deg); } 50% { transform: translateY(-20px) translateZ(40px) rotateX(-5deg); } }
        @keyframes slowRotate { 0% { transform: rotateY(0deg) rotateX(5deg); } 100% { transform: rotateY(360deg) rotateX(5deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes slideInLeft { from { opacity:0; transform: translateX(-60px) translateZ(-20px); } to { opacity:1; transform: translateX(0) translateZ(0); } }
        @keyframes pulse3d { 0%,100% { transform: scale(1) translateZ(0); } 50% { transform: scale(1.03) translateZ(10px); } }

        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
        
        /* Shimmer Overlay */
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(200, 135, 58, 0) 0%, rgba(200, 135, 58, 0.05) 50%, rgba(200, 135, 58, 0) 100%);
          background-size: 200% auto;
          animation: shimmer 8s infinite linear;
        }
      `}} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(circle at center, #2A1D0D 0%, #1A1208 70%)'
        }}></div>
        <div className="absolute inset-0 shimmer-bg z-0 pointer-events-none"></div>

        {/* Floating ingredients */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(200,135,58,0.2)]" 
               style={{ background: 'linear-gradient(135deg, #2A1D0D, #1A1208)', animation: 'floatUp 6s ease-in-out infinite' }}>
            <Leaf className="w-8 h-8" style={{ color: '#8B4513' }} />
          </div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,135,58,0.1)]" 
               style={{ background: 'radial-gradient(circle, #2A1D0D, #1A1208)', animation: 'floatUp 8s ease-in-out infinite 1s' }}>
            <Flame className="w-10 h-10" style={{ color: '#C8873A' }} />
          </div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 rounded flex items-center justify-center shadow-[0_0_10px_rgba(200,135,58,0.15)]" 
               style={{ background: 'linear-gradient(45deg, #1A1208, #2A1D0D)', animation: 'floatUp 7s ease-in-out infinite 2s' }}>
            <Star className="w-6 h-6" style={{ color: '#E8C84A' }} />
          </div>
        </div>

        <div className="relative z-20 text-center flex flex-col items-center max-w-5xl px-6">
          <div className="mb-8 font-cormorant italic text-2xl tracking-widest" style={{ color: '#C8873A' }}>
            Ember & Sage
          </div>
          
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight" 
              style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)', animation: 'pulse3d 4s infinite ease-in-out' }}>
            Where <span style={{ color: '#C8873A' }}>Fire</span> Meets <span style={{ color: '#E8C84A' }}>Flavor</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light opacity-90 leading-relaxed">
            Handcrafted seasonal menus, sourced within 50 miles. Farm-to-table fine dining redefined.
          </p>

          <button className="px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'transparent',
                    border: '1px solid #C8873A',
                    color: '#C8873A',
                    boxShadow: '0 0 20px rgba(200, 135, 58, 0.2), inset 0 0 20px rgba(200, 135, 58, 0.1)'
                  }}>
            Reserve a Table
          </button>
        </div>

        {/* 3D Dish Hero Image */}
        <div className="absolute right-[-10%] md:right-10 top-1/2 transform -translate-y-1/2 w-96 h-96 rounded-full mix-blend-screen opacity-40 z-10 pointer-events-none"
             style={{
               background: 'radial-gradient(circle, rgba(200,135,58,0.4) 0%, transparent 70%)',
             }}></div>
        <div className="absolute right-[-20%] md:right-[-5%] top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
             style={{ animation: 'slowRotate 20s linear infinite', transformStyle: 'preserve-3d' }}>
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
               style={{ 
                 background: 'radial-gradient(circle at 30% 30%, #3A2A18, #1A1208)',
                 border: '2px solid rgba(200, 135, 58, 0.3)'
               }}>
            <ChefHat className="w-32 h-32 md:w-48 md:h-48 opacity-20" style={{ color: '#F5EDD6' }} />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center" style={{ animation: 'slideInLeft 1s ease-out forwards' }}>
          <Flame className="w-12 h-12 mx-auto mb-6" style={{ color: '#8B4513' }} />
          <h2 className="font-playfair text-4xl md:text-5xl mb-8">Born from the land, cooked with fire.</h2>
          <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed font-cormorant italic">
            At Ember & Sage, we believe that the best ingredients speak for themselves. 
            By honoring traditional wood-fired techniques and partnering with local artisans, 
            we bring out the primal, complex flavors hidden within nature's simplest offerings.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-6 relative z-20" style={{ background: 'linear-gradient(to bottom, #1A1208, #2A1D0D)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl mb-4" style={{ color: '#E8C84A' }}>Signature Dishes</h2>
            <div className="w-24 h-px mx-auto" style={{ background: '#C8873A' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {[
              { name: 'Smoked Duck Confit', price: '₹1,850', desc: 'Cherry wood smoked, cherry reduction, parsnip purée.' },
              { name: 'Truffle Risotto', price: '₹2,100', desc: 'Wild mushrooms, aged parmesan, shaved black truffle.' },
              { name: 'Seared Sea Bass', price: '₹2,400', desc: 'Pan-seared, saffron broth, charred fennel, micro-greens.' },
              { name: 'Heritage Tomato Tart', price: '₹1,200', desc: 'Wood-fired crust, whipped ricotta, balsamic glaze.' }
            ].map((dish, i) => (
              <div key={i} className="group h-[400px] w-full cursor-pointer" style={{ perspective: '1000px' }}>
                <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden rounded-xl flex flex-col items-center justify-center p-6 border border-opacity-20"
                       style={{ background: '#1F160C', borderColor: '#C8873A' }}>
                    <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                         style={{ background: 'radial-gradient(circle at top left, #3A2A18, #1A1208)' }}>
                      <span className="text-4xl">🍽️</span>
                    </div>
                    <h3 className="font-playfair text-xl text-center" style={{ color: '#F5EDD6' }}>{dish.name}</h3>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden rounded-xl rotate-y-180 p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_40px_rgba(200,135,58,0.1)]"
                       style={{ background: '#2A1D0D', border: '1px solid #8B4513' }}>
                    <h3 className="font-playfair text-2xl mb-4" style={{ color: '#E8C84A' }}>{dish.name}</h3>
                    <p className="font-cormorant italic text-lg mb-6 opacity-90">{dish.desc}</p>
                    <div className="font-bold tracking-widest text-xl" style={{ color: '#C8873A' }}>{dish.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[60vh] perspective-1000">
        <div className="absolute inset-0 z-0" 
             style={{ 
               background: 'linear-gradient(rgba(26, 18, 8, 0.8), rgba(26, 18, 8, 0.9)), repeating-radial-gradient(circle at 0 0, transparent 0, #1A1208 40px), repeating-linear-gradient(#2A1D0D55, #2A1D0D55)',
               backgroundSize: 'cover, 100px 100px, 10px 10px'
             }}>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl" style={{ animation: 'pulse3d 6s ease-in-out infinite' }}>
          <Star className="w-8 h-8 mx-auto mb-8 opacity-50" style={{ color: '#E8C84A' }} />
          <blockquote className="font-playfair text-4xl md:text-6xl leading-tight mb-8" style={{ color: '#F5EDD6' }}>
            "Every plate is a story of the season."
          </blockquote>
          <Star className="w-8 h-8 mx-auto opacity-50" style={{ color: '#E8C84A' }} />
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-2xl mx-auto bg-opacity-50 p-8 md:p-12 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-opacity-10 backdrop-blur-sm"
             style={{ background: '#1F160C', borderColor: '#C8873A' }}>
          
          <div className="text-center mb-10">
            <h2 className="font-playfair text-4xl mb-3">Reserve a Table</h2>
            <p className="font-cormorant italic text-lg opacity-80">Join us for an unforgettable evening.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm tracking-wider uppercase opacity-70">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-opacity-30 py-2 focus:outline-none focus:border-opacity-100 transition-colors"
                       style={{ borderColor: '#C8873A', color: '#F5EDD6' }} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-wider uppercase opacity-70">Party Size</label>
                <select className="w-full bg-transparent border-b border-opacity-30 py-2 focus:outline-none focus:border-opacity-100 transition-colors appearance-none"
                        style={{ borderColor: '#C8873A', color: '#F5EDD6' }}>
                  <option value="2" style={{ background: '#1A1208' }}>2 Guests</option>
                  <option value="3" style={{ background: '#1A1208' }}>3 Guests</option>
                  <option value="4" style={{ background: '#1A1208' }}>4 Guests</option>
                  <option value="5+" style={{ background: '#1A1208' }}>5+ Guests</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-wider uppercase opacity-70">Date</label>
                <input type="date" className="w-full bg-transparent border-b border-opacity-30 py-2 focus:outline-none focus:border-opacity-100 transition-colors"
                       style={{ borderColor: '#C8873A', color: '#F5EDD6' }} />
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-wider uppercase opacity-70">Time</label>
                <input type="time" className="w-full bg-transparent border-b border-opacity-30 py-2 focus:outline-none focus:border-opacity-100 transition-colors"
                       style={{ borderColor: '#C8873A', color: '#F5EDD6' }} />
              </div>
            </div>
            
            <button type="button" className="w-full py-4 mt-8 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,135,58,0.4)]"
                    style={{ background: '#C8873A', color: '#1A1208' }}>
              Confirm Reservation
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-opacity-10 text-center" style={{ borderColor: '#C8873A' }}>
        <div className="flex justify-center gap-6 mb-6 opacity-70">
          <MapPin className="w-5 h-5 cursor-pointer hover:opacity-100 transition-opacity" />
          <Clock className="w-5 h-5 cursor-pointer hover:opacity-100 transition-opacity" />
        </div>
        <p className="font-cormorant italic opacity-50">&copy; 2024 Ember & Sage. All rights reserved.</p>
      </footer>
    </div>
  );
}
