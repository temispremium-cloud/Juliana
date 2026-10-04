// =========================================================================
// 🌻 DETALLE ESPECIAL: FLORES AMARILLAS PARA JULIANA 💛
// Todo este código fue creado y pensado con dedicación, línea por línea.
// Cada animación, cada canción y cada flor fueron preparadas exclusivamente para ti.
// =========================================================================

import React, { useState, useEffect } from 'react';
import { SunflowerGarden } from './components/SunflowerGarden';
import { IntroGreeting } from './components/IntroGreeting';
import { DedicatedMusicPlayer } from './components/DedicatedMusicPlayer';

export default function App() {
  // Estados para controlar la experiencia interactiva:
  const [hasEntered, setHasEntered] = useState(false); // Controla si ya entró desde la portada
  const [isOpen, setIsOpen] = useState(false); // Abre o cierra el sobrecito con la carta
  const [isHovered, setIsHovered] = useState(false); // Animación suave al pasar el dedo o cursor
  const [showGarden, setShowGarden] = useState(false); // Muestra el jardín de girasoles floreciendo
  const [showMusicPlayer, setShowMusicPlayer] = useState(false); // Reproductor de música dedicado
  const [recipientName, setRecipientName] = useState('Juliana'); // El nombre de la persona especial ❤️
  const [isEditingName, setIsEditingName] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); // Para leer la carta en pantalla completa

  // Imagen de respaldo por si el lazo coquette necesita dibujarse con código
  const [bowError, setBowError] = useState(false);

  // Navegación fluida y botón "Atrás" de Android adaptado a su teléfono móvil
  useEffect(() => {
    // Definimos el estado inicial de la aplicación
    if (!window.history.state || !window.history.state.appScreen) {
      window.history.replaceState({ appScreen: 'cover' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (isCardModalOpen) {
        setIsCardModalOpen(false);
        return;
      }
      if (!state || state.appScreen === 'cover') {
        setShowGarden(false);
        setShowMusicPlayer(false);
        setHasEntered(false);
        setIsOpen(false);
      } else if (state.appScreen === 'letter') {
        setShowGarden(false);
        setShowMusicPlayer(false);
        setHasEntered(true);
      } else if (state.appScreen === 'garden') {
        setShowGarden(true);
        setShowMusicPlayer(false);
        setHasEntered(true);
      } else if (state.appScreen === 'music') {
        setShowMusicPlayer(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isCardModalOpen]);

  // Soporte para tecla Escape o volver atrás de manera limpia
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (isCardModalOpen) {
          e.preventDefault();
          setIsCardModalOpen(false);
        } else if (showMusicPlayer) {
          e.preventDefault();
          window.history.back();
        } else if (showGarden) {
          e.preventDefault();
          window.history.back();
        } else if (hasEntered) {
          e.preventDefault();
          window.history.back();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCardModalOpen, showMusicPlayer, showGarden, hasEntered]);

  const handleEnterFromCover = () => {
    window.history.pushState({ appScreen: 'letter' }, '');
    setHasEntered(true);
  };

  const handleReturnToCover = () => {
    if (window.history.state?.appScreen === 'letter') {
      window.history.back();
    } else {
      window.history.pushState({ appScreen: 'cover' }, '');
      setHasEntered(false);
    }
  };

  const handleOpenGarden = () => {
    window.history.pushState({ appScreen: 'garden' }, '');
    setShowGarden(true);
  };

  const handleCloseGarden = () => {
    if (window.history.state?.appScreen === 'garden') {
      window.history.back();
    } else {
      setShowGarden(false);
    }
  };

  const handleToggleMusic = () => {
    if (!showMusicPlayer) {
      window.history.pushState({ appScreen: 'music' }, '');
      setShowMusicPlayer(true);
    } else {
      if (window.history.state?.appScreen === 'music') {
        window.history.back();
      } else {
        setShowMusicPlayer(false);
      }
    }
  };

  const cardIsUp = isOpen || isHovered;

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(false);
    }
  };

  return (
    <div
      id="main-app-wrapper"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between py-5 sm:py-6 px-3 sm:px-4 select-none overflow-hidden"
      style={{
        backgroundColor: '#fae1dd',
      }}
    >
      {/* 1. Pantalla de Bienvenida con dedicatoria ("Hola! ESTE DETALLE ES PARA TI :)") */}
      {!hasEntered && (
        <IntroGreeting onEnter={handleEnterFromCover} />
      )}

      {/* 2. Jardín Nocturno de Girasoles con cielo estrellado y estrellas fugaces animadas */}
      {showGarden && (
        <SunflowerGarden
          recipientName={recipientName}
          onBack={handleCloseGarden}
        />
      )}

      {/* Detalles flotantes sutiles en el fondo: Girasoles dorados y corazones */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <span className="absolute top-12 left-10 text-xl animate-bounce" style={{ animationDuration: '4s' }}>🌻</span>
        <span className="absolute bottom-20 left-16 text-xl animate-bounce" style={{ animationDuration: '6s' }}>❤️</span>
        <span className="absolute bottom-32 right-20 text-lg animate-bounce" style={{ animationDuration: '4.5s' }}>🌻</span>
      </div>

      {/* Cabecera superior con dedicatoria personalizada para Juliana */}
      <header className="relative w-full max-w-xl mx-auto flex justify-between items-center z-10 pt-1 sm:pt-2">
        <button
          onClick={handleReturnToCover}
          className="text-xs font-semibold text-rose-950/80 hover:text-rose-950 transition-colors px-3 py-1.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-rose-200 shadow-sm active:scale-95 touch-manipulation min-h-[34px] flex items-center gap-1"
          title="Volver a la portada de inicio"
        >
          ← Portada
        </button>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/80 hover:bg-white/95 transition-all border border-amber-200 px-3 sm:px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <span className="text-amber-500 text-xs sm:text-sm">🌻</span>
          {isEditingName ? (
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingName(false);
              }}
              autoFocus
              className="bg-transparent border-b border-amber-400 text-xs font-semibold text-amber-950 outline-none text-center w-24"
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="text-xs font-semibold text-amber-950 cursor-pointer hover:underline touch-manipulation"
              title="Haz clic para cambiar el nombre"
            >
              Para: {recipientName} ✎
            </span>
          )}
          <span className="text-[10px] sm:text-[11px] text-amber-900/80 font-medium border-l border-amber-200 pl-1.5 sm:pl-2">
            Tus flores ✨
          </span>
        </div>

        {/* Espacio reservado para mantener el equilibrio visual */}
        <div className="w-8"></div>
      </header>

      {/* Reproductor de música flotante con las canciones dedicadas */}
      {showMusicPlayer && (
        <div
          id="music-player-modal-container"
          className="fixed inset-x-3 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 flex justify-center animate-fade-in filter drop-shadow-2xl"
        >
          <DedicatedMusicPlayer onClose={handleToggleMusic} autoPlay={true} />
        </div>
      )}

      {/* El sobre interactivo de terciopelo con lazo y girasoles decorativos */}
      <div
        id="valentines-container"
        className="valentines-container relative my-auto py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleCard}
        role="button"
        tabIndex={0}
        aria-label="Abrir carta de detalle"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCard();
          }
        }}
      >
        {/* Lazo coquette en rojo vino */}
        <div id="lazo-coquette" className="Lazocoquette">
          {!bowError ? (
            <img
              src="https://images.vexels.com/media/users/3/294490/isolated/preview/ba9667f4cb79773875f50a235080d9a9-pajarita-verde-brillante.png"
              alt="Lazo"
              referrerPolicy="no-referrer"
              onError={() => setBowError(true)}
              style={{ filter: 'hue-rotate(250deg) saturate(1.8) brightness(0.8)' }}
            />
          ) : (
            <svg
              viewBox="0 0 100 70"
              className="w-12 h-auto"
              style={{ marginTop: '95px', animation: 'valentines-up 3s linear infinite' }}
            >
              <ellipse cx="50" cy="35" rx="8" ry="12" fill="#4a0404" />
              <polygon points="50,35 15,15 15,55" fill="#a31621" stroke="#330000" strokeWidth="2" />
              <polygon points="50,35 85,15 85,55" fill="#a31621" stroke="#330000" strokeWidth="2" />
              <ellipse cx="50" cy="35" rx="9" ry="10" fill="#e63946" stroke="#330000" strokeWidth="2" />
            </svg>
          )}
        </div>

        {/* Girasol decorativo izquierdo animado */}
        <div id="sunflower-left" className="Tulipan1">
          <div
            className="flex flex-col items-center"
            style={{
              animation: 'valentines-up 3s linear infinite',
              marginTop: '10px',
            }}
          >
            <span className="text-4xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform -rotate-12 hover:scale-110 transition-transform">
              🌻
            </span>
          </div>
        </div>

        {/* Girasol decorativo derecho animado */}
        <div id="sunflower-right" className="Tulipan2">
          <div
            className="flex flex-col items-center"
            style={{
              animation: 'valentines-up 3s linear infinite',
              marginTop: '10px',
            }}
          >
            <span className="text-4xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform rotate-12 hover:scale-110 transition-transform">
              🌻
            </span>
          </div>
        </div>

        {/* Estructura del Sobre de terciopelo */}
        <div id="valentines-envelope" className="valentines">
          <div id="envelope-back" className="envelope"></div>

          {/* Ranura que resguarda la cartita para que deslice suavemente */}
          <div className="card-slot">
            {/* La cartita deslizable con el mensaje especial */}
            <div
              id="valentine-card"
              className={`card ${cardIsUp ? 'open' : ''}`}
            >
              <div className="card-inner">
                {/* Encabezado: Dedicatoria para Juliana */}
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-900 tracking-wider uppercase pt-0.5">
                  <span className="text-xs">🌻</span>
                  <span>Para ti, {recipientName}</span>
                  <span className="text-xs">💛</span>
                </div>

                {/* Mensaje principal escrito con cariño */}
                <div
                  id="card-message"
                  className="text py-0.5 px-0.5 cursor-pointer w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCardModalOpen(true);
                  }}
                  title="Haz clic para leer en pantalla completa"
                >
                  <p
                    className="m-0 text-[#2b0e07] leading-tight font-bold"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: '15px' }}
                  >
                    Sé que ya pasó la fecha de las flores amarillas...
                  </p>
                  <p
                    className="m-0 text-[#5a2a18] leading-tight font-semibold mt-0.5"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: '13.5px' }}
                  >
                    pero no quería quedarme sin darte este detalle.
                  </p>
                  <p
                    className="m-0 text-[#b45309] leading-tight font-bold mt-0.5"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: '13.5px' }}
                  >
                    Aquí tienes tus flores amarillas, con mucho cariño 🌻💛
                  </p>
                </div>

                {/* Botones de acción dentro de la carta */}
                <div className="w-full flex items-center justify-center gap-2 pb-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGarden(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-bold shadow-xs transition-transform cursor-pointer min-h-[30px] touch-manipulation"
                    title="Ver jardín floreciendo"
                  >
                    <span>🌻</span>
                    <span>Ver jardín</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCardModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/95 hover:bg-white active:scale-95 text-rose-950 text-xs font-semibold border border-rose-200/80 shadow-xs transition-transform cursor-pointer min-h-[30px] touch-manipulation"
                    title="Ampliar carta completa"
                  >
                    <span>📜</span>
                    <span>Ampliar</span>
                  </button>
                </div>
              </div>

              {/* Lluvia de corazones que flotan al abrir la carta */}
              <div id="floating-hearts-cluster" className="hearts">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
                <div className="five"></div>
              </div>
            </div>
          </div>

          <div id="envelope-front" className="front"></div>
        </div>

        {/* Sombra realista del sobre */}
        <div id="envelope-shadow" className="shadow"></div>
      </div>

      {/* Ventana modal de lectura ampliada para leer la carta cómodamente */}
      {isCardModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsCardModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-[#fdfbf7] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300/80 flex flex-col items-center text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'radial-gradient(circle at top right, rgba(251, 191, 36, 0.12), transparent 70%)',
            }}
          >
            {/* Botón táctil para cerrar */}
            <button
              onClick={() => setIsCardModalOpen(false)}
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-950 flex items-center justify-center text-sm font-bold transition-transform shadow-sm touch-manipulation"
              aria-label="Cerrar cartita"
            >
              ✕
            </button>

            {/* Sello decorativo con su nombre */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-semibold mb-4 shadow-xs">
              <span>🌻</span>
              <span>Para {recipientName}</span>
              <span>💛</span>
            </div>

            {/* Título */}
            <h3
              className="text-2xl sm:text-3xl font-bold text-amber-950 mb-3"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Tus Flores Amarillas 🌻
            </h3>

            {/* Contenido completo de la carta */}
            <div
              className="space-y-3.5 text-stone-800 leading-relaxed max-w-sm px-2 text-xl sm:text-2xl"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              <p className="font-bold text-[#2b0e07]">
                Sé que ya pasó la fecha tradicional de las flores amarillas...
              </p>
              <p className="text-[#5a2a18] font-medium">
                pero no me iba a quedar con las ganas de darte este lindo detalle.
              </p>
              <p className="font-bold text-[#b45309]">
                Aquí tienes tus flores amarillas, con mucho cariño. Ningún día es tarde cuando el detalle viene del corazón. 🌻💛
              </p>
            </div>

            {/* Botones de acción en la carta ampliada */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={() => {
                  setIsCardModalOpen(false);
                  setShowGarden(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 text-sm font-bold shadow-md transition-transform min-h-[44px] touch-manipulation"
              >
                <span>🌻</span>
                <span>Ver flores floreciendo</span>
              </button>

              <button
                onClick={() => {
                  setIsCardModalOpen(false);
                  handleToggleMusic();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-stone-50 active:scale-95 border border-stone-200 text-stone-800 text-sm font-semibold shadow-xs transition-transform min-h-[44px] touch-manipulation"
              >
                <span>🎵</span>
                <span>{showMusicPlayer ? 'Ocultar música' : 'Poner música'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botones de interacción bajo el sobre */}
      <div className="mt-1 sm:mt-3 mb-2 sm:mb-4 flex flex-col items-center gap-2 z-10 px-3 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={handleOpenGarden}
            id="see-sunflowers-btn"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#b45309] via-[#92400e] to-[#78350f] hover:from-[#d97706] hover:to-[#92400e] active:scale-95 text-amber-50 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_20px_rgba(180,83,9,0.45)] transition-transform border border-amber-400/30 min-h-[44px] touch-manipulation cursor-pointer"
          >
            <span className="text-base group-hover:rotate-45 transition-transform duration-500">
              🌻
            </span>
            <span>Ver tus flores amarillas floreciendo</span>
          </button>

          <button
            onClick={handleToggleMusic}
            id="see-music-btn"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/85 hover:bg-white active:scale-95 text-rose-950 text-xs sm:text-sm font-semibold tracking-wide border border-rose-200 shadow-md transition-transform backdrop-blur-md min-h-[44px] touch-manipulation cursor-pointer"
          >
            <span>🎵</span>
            <span>{showMusicPlayer ? 'Ocultar música' : 'Poner música'}</span>
          </button>
        </div>

        <p
          id="interaction-hint"
          className="text-xs tracking-wider text-rose-900/85 font-medium cursor-pointer hover:text-rose-950 transition-colors py-1 touch-manipulation"
          onClick={toggleCard}
        >
          {cardIsUp
            ? '♡ Toca la cartita para leerla completa o guardarla ♡'
            : '♡ Toca el sobre para abrir tu cartita 🌻 ♡'}
        </p>
      </div>
    </div>
  );
}
