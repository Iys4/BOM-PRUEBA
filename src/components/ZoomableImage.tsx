import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Move,
  X,
} from 'lucide-react';

interface InlineZoomableImageProps {
  src: string;
  alt: string;
  darkBg?: boolean;
  onOpenPopup: () => void;
}

export function InlineZoomableImage({
  src,
  alt,
  darkBg = false,
  onOpenPopup,
}: InlineZoomableImageProps) {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  // Attach non-passive wheel listener so wheel zoom inside image doesn't scroll page when zoomed or holding Ctrl/scrolling over image
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Allow wheel zoom directly when cursor is over the image container
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setScale((prev) => {
        const next = Math.min(5, Math.max(1, Number((prev + delta).toFixed(2))));
        if (next === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return next;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(5, Number((prev + 0.5).toFixed(2))));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = Math.max(1, Number((prev - 0.5).toFixed(2)));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.25);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      className={`relative flex items-center justify-center overflow-hidden min-h-[300px] max-h-[520px] select-none ${
        darkBg ? 'bg-slate-900' : 'bg-white p-2 sm:p-4 border-b border-slate-200'
      } ${scale > 1 || isDragging ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 120ms ease-out',
        }}
        className="w-full h-auto max-h-[480px] object-contain pointer-events-none select-none"
      />

      {/* Floating Toolbar Bottom-Right */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-slate-900/80 text-white p-1.5 rounded-xl backdrop-blur-xs shadow-md"
      >
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className="p-1.5 rounded-lg hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Alejar (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-2 py-1 text-xs font-mono font-bold rounded-lg hover:bg-white/20 transition-colors"
          title="Restablecer zoom (100%)"
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={scale >= 5}
          className="p-1.5 rounded-lg hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Acercar (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-white/25 mx-0.5" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPopup();
          }}
          className="p-1.5 rounded-lg hover:bg-blue-500/80 transition-colors flex items-center gap-1 text-xs font-semibold pr-2"
          title="Abrir ventana flotante con zoom"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Pop-up</span>
        </button>
      </div>
    </div>
  );
}

interface FloatingZoomPopupProps {
  src: string;
  title: string;
  darkBg?: boolean;
  onClose: () => void;
}

export function FloatingZoomPopup({
  src,
  title,
  darkBg = false,
  onClose,
}: FloatingZoomPopupProps) {
  // Image zoom & pan inside the popup
  const [scale, setScale] = useState<number>(1.5);
  const [imgPos, setImgPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanningImg, setIsPanningImg] = useState<boolean>(false);
  const imgDragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Floating window position & dragging
  const [winPos, setWinPos] = useState<{ x: number; y: number }>({ x: 20, y: 64 });
  const [isDraggingWin, setIsDraggingWin] = useState<boolean>(false);
  const winDragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLargeWindow, setIsLargeWindow] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Reset image transform when src changes
  useEffect(() => {
    setScale(1.5);
    setImgPos({ x: 0, y: 0 });
  }, [src]);

  // Wheel zoom inside the popup canvas
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      setScale((prev) => {
        const next = Math.min(6, Math.max(0.75, Number((prev + delta).toFixed(2))));
        if (next === 1) setImgPos({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Dragging the popup window by its header
  const handleHeaderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDraggingWin(true);
    winDragStartRef.current = {
      x: e.clientX - winPos.x,
      y: e.clientY - winPos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleHeaderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingWin) return;
    const nextX = Math.max(
      8,
      Math.min(window.innerWidth - 260, e.clientX - winDragStartRef.current.x)
    );
    const nextY = Math.max(
      8,
      Math.min(window.innerHeight - 120, e.clientY - winDragStartRef.current.y)
    );
    setWinPos({ x: nextX, y: nextY });
  };

  const handleHeaderPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingWin) return;
    setIsDraggingWin(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Panning the image inside the popup
  const handleImgPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsPanningImg(true);
    imgDragStartRef.current = {
      x: e.clientX - imgPos.x,
      y: e.clientY - imgPos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleImgPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanningImg) return;
    setImgPos({
      x: e.clientX - imgDragStartRef.current.x,
      y: e.clientY - imgDragStartRef.current.y,
    });
  };

  const handleImgPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanningImg) return;
    setIsPanningImg(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      style={{
        left: isLargeWindow ? '50%' : `${winPos.x}px`,
        top: isLargeWindow ? '50%' : `${winPos.y}px`,
        transform: isLargeWindow ? 'translate(-50%, -50%)' : 'none',
      }}
      className={`fixed z-50 bg-white rounded-2xl shadow-2xl border-2 border-slate-300 flex flex-col overflow-hidden transition-shadow ${
        isLargeWindow
          ? 'w-[94vw] max-w-5xl h-[82vh]'
          : 'w-[92vw] sm:w-[540px] md:w-[640px] h-[420px] sm:h-[480px]'
      }`}
    >
      {/* Draggable Header Bar */}
      <div
        onPointerDown={handleHeaderPointerDown}
        onPointerMove={handleHeaderPointerMove}
        onPointerUp={handleHeaderPointerUp}
        onPointerCancel={handleHeaderPointerUp}
        className={`px-3.5 py-2.5 bg-slate-900 text-white flex items-center justify-between gap-2 select-none ${
          isLargeWindow
            ? 'cursor-default'
            : isDraggingWin
            ? 'cursor-grabbing'
            : 'cursor-grab'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Move className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold truncate">{title}</span>
        </div>

        {/* Zoom & Window Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() =>
              setScale((prev) => Math.max(0.75, Number((prev - 0.4).toFixed(2))))
            }
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title="Alejar (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setScale(1);
              setImgPos({ x: 0, y: 0 });
            }}
            className="px-2 py-1 text-xs font-mono font-bold rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Restablecer vista (100%)"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={() =>
              setScale((prev) => Math.min(6, Number((prev + 0.4).toFixed(2))))
            }
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title="Acercar (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setScale(1);
              setImgPos({ x: 0, y: 0 });
            }}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title="Centrar imagen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-white/20 mx-0.5" />

          <button
            type="button"
            onClick={() => setIsLargeWindow((prev) => !prev)}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            title={isLargeWindow ? 'Tamaño flotante' : 'Agrandar ventana'}
          >
            {isLargeWindow ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-colors ml-0.5"
            title="Cerrar pop-up"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Pan & Zoom Canvas */}
      <div
        ref={canvasRef}
        onPointerDown={handleImgPointerDown}
        onPointerMove={handleImgPointerMove}
        onPointerUp={handleImgPointerUp}
        onPointerCancel={handleImgPointerUp}
        onDoubleClick={() => {
          if (scale > 1.5) {
            setScale(1);
            setImgPos({ x: 0, y: 0 });
          } else {
            setScale(2.5);
          }
        }}
        className={`relative flex-1 overflow-hidden flex items-center justify-center select-none ${
          darkBg ? 'bg-slate-950' : 'bg-slate-50'
        } ${isPanningImg ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <img
          src={src}
          alt={title}
          draggable={false}
          style={{
            transform: `translate3d(${imgPos.x}px, ${imgPos.y}px, 0) scale(${scale})`,
            transition: isPanningImg ? 'none' : 'transform 100ms ease-out',
          }}
          className="max-w-full max-h-full object-contain pointer-events-none select-none"
        />

        <div className="absolute bottom-2 left-3 px-2.5 py-1 rounded-md bg-slate-900/70 text-white text-[11px] font-medium pointer-events-none">
          Rueda del mouse o botones para zoom · Arrastrá la imagen para moverla
        </div>
      </div>
    </div>
  );
}
