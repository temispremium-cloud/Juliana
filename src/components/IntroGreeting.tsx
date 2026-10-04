import React from 'react';

interface IntroGreetingProps {
  onEnter: () => void;
}

export const IntroGreeting: React.FC<IntroGreetingProps> = ({ onEnter }) => {
  const bgImage = 'https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg';

  return (
    <div
      id="intro-screen"
      className="intro-container fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-4 overflow-hidden h-[100dvh]"
      style={{ backgroundColor: '#000000', color: '#f0fdfa' }}
    >
      {/* Background Sunflower Image with elegant dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url("${bgImage}")`,
          filter: 'brightness(0.42) contrast(1.1)',
        }}
      />

      {/* Dark gradient vignettes for contrast & neon popping */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      {/* Content wrapper with backdrop enhancement */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto py-8 px-6 rounded-3xl backdrop-blur-[2px]">
        {/* Neon glowing letters: Hola! */}
        <div className="intro-greetings mb-6">
          <span>H</span>
          <span>o</span>
          <span>l</span>
          <span>a</span>
          <span>!</span>
        </div>

        {/* Description */}
        <div className="intro-description mb-8 flex flex-col items-center gap-2 px-3 max-w-sm sm:max-w-md text-center">
          <span className="text-amber-300/90 text-xs sm:text-sm font-medium tracking-wide uppercase leading-snug">
            ¿Creíste que te ibas a quedar sin tus flores amarillas? 🌻
          </span>
          <span className="text-white/95 font-bold tracking-wider text-sm sm:text-base leading-snug">
            ESTE DETALLE ES PARA TI :)
          </span>
        </div>

        {/* Interactive Button */}
        <div className="button">
          <button
            onClick={onEnter}
            id="intro-click-btn"
            className="intro-button-link cursor-pointer border-none outline-none"
          >
            CLICK AQUÍ 💛
          </button>
        </div>
      </div>
    </div>
  );
};
