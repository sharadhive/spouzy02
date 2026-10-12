import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Leaf,
  UsersRound,
  HeartCrack,
  ShieldCheck,
  Heart,
  LockKeyhole,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

interface CylinderCardItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// 8 concerns arranged around the cylinder:
// Card 0 ("I want to focus on my wellbeing") is front-center at initial angle 0°.
// Order matches reference:
// Right: +1 Family, +2 Separation, +3 Work
// Left: -1 Married soon, -2 Same argument, -3 Feeling distant
// Back: Intimacy concern (180°)
const CYLINDER_CARDS: CylinderCardItem[] = [
  { label: "I want to focus on my wellbeing", href: "/wellness", icon: Leaf },
  { label: "Things are difficult with family", href: "/marriage/post-marriage", icon: UsersRound },
  { label: "I\u2019m thinking about separation", href: "/marriage/divorce", icon: HeartCrack },
  { label: "I need help at work", href: "/sexual-harassment/for-individuals", icon: ShieldCheck },
  { label: "I have an intimacy concern", href: "/intimacy/problems", icon: Heart },
  { label: "We\u2019re feeling distant", href: "/intimacy/bedroom-tips", icon: LockKeyhole },
  {
    label: "We keep having the same argument",
    href: "/marriage/relationships",
    icon: MessagesSquare,
  },
  { label: "We\u2019re getting married soon", href: "/marriage/pre-marriage", icon: Heart },
];

const CARD_COUNT = CYLINDER_CARDS.length;
const ANGLE_STEP = 360 / CARD_COUNT; // 45°

interface DeviceLayout {
  mode: "small-mobile" | "mobile" | "tablet" | "desktop";
  cardWidth: number;
  cardHeight: number;
  stageHeight: number;
  perspective: number;
  ringWidth: number;
  ringHeight: number;
  cardPadding: number;
  fontSize: number;
  iconSize: number;
  arrowSize: number;
}

function getDeviceLayout(w: number): DeviceLayout {
  if (w < 375) {
    return {
      mode: "small-mobile",
      cardWidth: 190,
      cardHeight: 225,
      stageHeight: 285,
      perspective: 900,
      ringWidth: 320,
      ringHeight: 75,
      cardPadding: 16,
      fontSize: 13.5,
      iconSize: 26,
      arrowSize: 16,
    };
  }
  if (w < 640) {
    return {
      mode: "mobile",
      cardWidth: 205,
      cardHeight: 235,
      stageHeight: 300,
      perspective: 1000,
      ringWidth: 370,
      ringHeight: 85,
      cardPadding: 18,
      fontSize: 14,
      iconSize: 28,
      arrowSize: 17,
    };
  }
  if (w < 1024) {
    return {
      mode: "tablet",
      cardWidth: 185,
      cardHeight: 220,
      stageHeight: 315,
      perspective: 1300,
      ringWidth: 640,
      ringHeight: 120,
      cardPadding: 18,
      fontSize: 14.5,
      iconSize: 28,
      arrowSize: 17,
    };
  }
  return {
    mode: "desktop",
    cardWidth: 195,
    cardHeight: 225,
    stageHeight: 345,
    perspective: 1800,
    ringWidth: 1040,
    ringHeight: 175,
    cardPadding: 20,
    fontSize: 15,
    iconSize: 30,
    arrowSize: 18,
  };
}

export function CylinderCarousel() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [layout, setLayout] = useState<DeviceLayout>(() =>
    typeof window !== "undefined" ? getDeviceLayout(window.innerWidth) : getDeviceLayout(1200),
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Animation refs for direct 60fps DOM updates
  const currentAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const snapStartTimeRef = useRef<number>(0);
  const snapStartAngleRef = useRef<number>(0);
  const snapDurationRef = useRef<number>(550);

  // Interaction refs
  const isHoveredRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const isUserSelectedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const dragStartTimeRef = useRef<number>(0);
  const totalDragDistanceRef = useRef<number>(0);
  const wasDragRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);
  const layoutRef = useRef(layout);

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    isUserSelectedRef.current = isUserSelected;
  }, [isUserSelected]);

  // Responsive resize handler
  useEffect(() => {
    const handleResize = () => {
      setLayout(getDeviceLayout(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setIsPaused(true);
      isPausedRef.current = true;
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setIsPaused(true);
        isPausedRef.current = true;
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Return index of card closest to front (0°)
  const getClosestCardIndex = (angle: number) => {
    let closestIndex = 0;
    let minDiff = 360;
    for (let i = 0; i < CARD_COUNT; i++) {
      const cardAngle = i * ANGLE_STEP;
      const visual = (cardAngle + angle) % 360;
      const phi = ((((visual + 180) % 360) + 360) % 360) - 180;
      const diff = Math.abs(phi);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  // Direct 60fps card transforms calculation
  const updateCardPositions = useCallback((angle: number) => {
    const curLayout = layoutRef.current;
    const mode = curLayout.mode;

    for (let i = 0; i < CARD_COUNT; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      const cardAngle = i * ANGLE_STEP;
      const visual = (cardAngle + angle) % 360;
      const phi = ((((visual + 180) % 360) + 360) % 360) - 180;
      const absPhi = Math.abs(phi);
      const sign = phi < 0 ? -1 : 1;

      let x = 0;
      let z = 0;
      let rotY = 0;
      let scale = 1.0;
      let opacity = 1.0;
      let visible = true;

      if (mode === "small-mobile" || mode === "mobile") {
        // MOBILE: 3-card front stage (Active Center + Left Peek + Right Peek)
        const spreadX = mode === "small-mobile" ? 126 : 140;

        if (absPhi <= 45) {
          const t = absPhi / 45;
          x = sign * spreadX * t;
          z = -40 * t;
          rotY = -sign * 32 * t;
          scale = 1.0 - 0.12 * t;
          opacity = 1.0 - 0.22 * t;
        } else if (absPhi <= 75) {
          const u = (absPhi - 45) / 30;
          x = sign * (spreadX + 42 * u);
          z = -40 - 45 * u;
          rotY = -sign * (32 + 25 * u);
          scale = 0.88 - 0.15 * u;
          opacity = Math.max(0, 0.78 * (1 - u));
        } else {
          visible = false;
          opacity = 0;
        }
      } else if (mode === "tablet") {
        // TABLET: 5-card panoramic curve (2 Left + Active Center + 2 Right)
        if (absPhi <= 45) {
          const t = absPhi / 45;
          x = sign * 200 * t;
          z = -35 * t;
          rotY = -sign * 28 * t;
          scale = 1.0 - 0.07 * t;
          opacity = 1.0 - 0.1 * t;
        } else if (absPhi <= 90) {
          const u = (absPhi - 45) / 45;
          x = sign * (200 + 135 * u);
          z = -35 - 50 * u;
          rotY = -sign * (28 + 28 * u);
          scale = 0.93 - 0.11 * u;
          opacity = 0.9 - 0.3 * u;
        } else if (absPhi <= 115) {
          const v = (absPhi - 90) / 25;
          x = sign * (335 + 30 * v);
          z = -85 - 30 * v;
          rotY = -sign * (56 + 15 * v);
          scale = 0.82 - 0.1 * v;
          opacity = Math.max(0, 0.6 * (1 - v));
        } else {
          visible = false;
          opacity = 0;
        }
      } else {
        // DESKTOP: Full 7-card cylinder ribbon matching reference
        if (absPhi <= 45) {
          const t = absPhi / 45;
          x = sign * 260 * t;
          z = -45 * t;
          rotY = -sign * 26 * t;
          scale = 1.0 - 0.04 * t;
          opacity = 1.0 - 0.04 * t;
        } else if (absPhi <= 90) {
          const u = (absPhi - 45) / 45;
          x = sign * (260 + 185 * u);
          z = -45 - 75 * u;
          rotY = -sign * (26 + 26 * u);
          scale = 0.96 - 0.08 * u;
          opacity = 0.96 - 0.14 * u;
        } else if (absPhi <= 135) {
          const v = (absPhi - 90) / 45;
          x = sign * (445 + 100 * v);
          z = -120 - 60 * v;
          rotY = -sign * (52 + 20 * v);
          scale = 0.88 - 0.08 * v;
          opacity = 0.82 - 0.27 * v;
        } else if (absPhi <= 160) {
          const w_fac = (absPhi - 135) / 25;
          x = sign * (545 + 20 * w_fac);
          z = -180 - 20 * w_fac;
          rotY = -sign * (72 + 10 * w_fac);
          scale = 0.8 - 0.1 * w_fac;
          opacity = Math.max(0, 0.55 * (1 - w_fac));
        } else {
          visible = false;
          opacity = 0;
        }
      }

      if (!visible || opacity <= 0.005) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      } else {
        el.style.visibility = "visible";
        el.style.opacity = opacity.toFixed(2);
        el.style.pointerEvents = opacity < 0.2 ? "none" : "auto";
        el.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.zIndex = Math.round(1000 + z).toString();
      }
    }
  }, []);

  // Smooth cubic-ease snap animation
  const snapToAngle = useCallback((targetAngle: number, duration: number = 550) => {
    isSnappingRef.current = true;
    snapStartTimeRef.current = performance.now();
    snapStartAngleRef.current = currentAngleRef.current;
    targetAngleRef.current = targetAngle;
    snapDurationRef.current = duration;
  }, []);

  // Snap directly to a card index
  const snapToCard = useCallback(
    (cardIndex: number, manualSelect: boolean = true) => {
      if (manualSelect) {
        setIsUserSelected(true);
        isUserSelectedRef.current = true;
        setIsPaused(true);
        isPausedRef.current = true;
      }
      const cardAngle = cardIndex * ANGLE_STEP;
      const current = currentAngleRef.current;
      const diff = ((((-cardAngle - current) % 360) + 540) % 360) - 180;
      snapToAngle(current + diff, 550);
      setActiveIndex(cardIndex);
      activeIndexRef.current = cardIndex;
    },
    [snapToAngle],
  );

  // Main animation frame loop
  useEffect(() => {
    let raf: number;
    let lastTime = performance.now();
    const SPEED = 5.0; // degrees per second when auto-rotating

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isSnappingRef.current) {
        const elapsed = (now - snapStartTimeRef.current) / snapDurationRef.current;
        if (elapsed >= 1) {
          currentAngleRef.current = targetAngleRef.current;
          isSnappingRef.current = false;
        } else {
          const ease = 1 - Math.pow(1 - elapsed, 3);
          currentAngleRef.current =
            snapStartAngleRef.current + (targetAngleRef.current - snapStartAngleRef.current) * ease;
        }
      } else if (
        !isPausedRef.current &&
        !isHoveredRef.current &&
        !isUserSelectedRef.current &&
        !isDraggingRef.current
      ) {
        currentAngleRef.current = (currentAngleRef.current - SPEED * dt) % 360;
      }

      updateCardPositions(currentAngleRef.current);

      const frontIndex = getClosestCardIndex(currentAngleRef.current);
      if (frontIndex !== activeIndexRef.current) {
        activeIndexRef.current = frontIndex;
        setActiveIndex(frontIndex);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [updateCardPositions]);

  // Initial and on-resize positioning
  useEffect(() => {
    updateCardPositions(currentAngleRef.current);
  }, [layout, updateCardPositions]);

  // Pointer & Drag handling with velocity flick
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDraggingRef.current = true;
    wasDragRef.current = false;
    isSnappingRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    dragStartAngleRef.current = currentAngleRef.current;
    dragStartTimeRef.current = performance.now();
    totalDragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    totalDragDistanceRef.current = Math.sqrt(dx * dx + dy * dy);

    if (totalDragDistanceRef.current > 7) {
      wasDragRef.current = true;
    }

    const sensitivity = layoutRef.current.mode.includes("mobile") ? 0.36 : 0.22;
    currentAngleRef.current = dragStartAngleRef.current + dx * sensitivity;
    updateCardPositions(currentAngleRef.current);

    const front = getClosestCardIndex(currentAngleRef.current);
    if (front !== activeIndexRef.current) {
      activeIndexRef.current = front;
      setActiveIndex(front);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (wasDragRef.current) {
      const dx = e.clientX - startXRef.current;
      const dt = Math.max(1, performance.now() - dragStartTimeRef.current);
      const vx = dx / dt; // velocity in px/ms
      const currentFront = getClosestCardIndex(currentAngleRef.current);

      // Flick gesture handling
      if (Math.abs(vx) > 0.35 || Math.abs(dx) > 45) {
        if (dx < 0) {
          // Swiped left -> advance to next card
          snapToCard((currentFront + 1) % CARD_COUNT, true);
        } else {
          // Swiped right -> go to previous card
          snapToCard((currentFront - 1 + CARD_COUNT) % CARD_COUNT, true);
        }
      } else {
        snapToCard(currentFront, true);
      }
    }
  };

  // Card click / tap handler:
  // If active center card -> navigate!
  // If side card -> smoothly rotate to front!
  const handleCardClick = (card: CylinderCardItem, index: number) => {
    if (wasDragRef.current) {
      wasDragRef.current = false;
      return;
    }

    if (index === activeIndexRef.current) {
      navigate({ to: card.href });
    } else {
      snapToCard(index, true);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      snapToCard((activeIndex - 1 + CARD_COUNT) % CARD_COUNT, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      snapToCard((activeIndex + 1) % CARD_COUNT, true);
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setIsPaused((p) => !p);
      isPausedRef.current = !isPausedRef.current;
    } else if (e.key === "Enter") {
      const c = CYLINDER_CARDS[activeIndex];
      if (c) navigate({ to: c.href });
    }
  };

  return (
    <div
      className="relative w-full select-none outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        setIsPaused(true);
        isPausedRef.current = true;
      }}
      onBlur={() => {
        if (!isUserSelectedRef.current && !reducedMotion) {
          setIsPaused(false);
          isPausedRef.current = false;
        }
      }}
      aria-label="What's on your mind? 3D carousel. Drag, swipe or use arrow keys to navigate."
    >
      {/* 3D Stage Container */}
      <div
        ref={containerRef}
        className="relative mx-auto flex items-center justify-center overflow-visible touch-pan-y cursor-grab active:cursor-grabbing"
        style={{
          perspective: `${layout.perspective}px`,
          perspectiveOrigin: "50% 40%",
          height: `${layout.stageHeight}px`,
          maxWidth: "100%",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ground Pedestal Elliptical Ring & Radial Glow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: layout.mode.includes("mobile") ? "12px" : "18px",
            width: `${layout.ringWidth}px`,
            height: `${layout.ringHeight}px`,
          }}
          aria-hidden="true"
        >
          {/* Subtle perimeter ring */}
          <div
            className="absolute inset-0 rounded-[50%]"
            style={{ border: "1px solid rgba(215, 185, 168, 0.45)" }}
          />
          {/* Warm ambient radial glow centered under the front active card */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
            style={{
              width: `${Math.min(340, layout.ringWidth * 0.4)}px`,
              height: `${Math.min(95, layout.ringHeight * 0.6)}px`,
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(220, 110, 70, 0.38) 0%, rgba(220, 110, 70, 0.12) 45%, transparent 75%)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* 3D Cylinder Cards */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CYLINDER_CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute pointer-events-auto will-change-transform"
                style={{
                  width: `${layout.cardWidth}px`,
                  height: `${layout.cardHeight}px`,
                  transformStyle: "preserve-3d",
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${layout.cardWidth / 2}px`,
                  marginTop: `-${layout.cardHeight / 2}px`,
                }}
              >
                {/* Button wrapper for clean native tap/click navigation */}
                <button
                  type="button"
                  onClick={() => handleCardClick(card, index)}
                  className="group relative block h-full w-full rounded-[22px] outline-none border-none bg-transparent p-0 cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${card.label} – ${isActive ? "Click to open" : "Click to view"}`}
                >
                  {/* FRONT FACE */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-between rounded-[22px] bg-white transition-all duration-300 ${
                      isActive
                        ? "border-2 border-[#C45F40] shadow-[0_14px_34px_-4px_rgba(196,95,64,0.30),0_0_20px_rgba(196,95,64,0.16)] z-20"
                        : "border border-[#E7DCD3] shadow-[0_4px_18px_rgba(35,23,19,0.05)] hover:border-[#C45F40]/60"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      padding: `${layout.cardPadding}px`,
                    }}
                  >
                    {/* Top Icon */}
                    <div className="flex items-start justify-start">
                      <div
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-[#C45F40] scale-105"
                            : "text-[#8F4A38] group-hover:text-[#C45F40] group-hover:scale-105"
                        }`}
                      >
                        <Icon size={layout.iconSize} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Bottom Title & Arrow */}
                    <div className="flex items-end justify-between gap-2.5">
                      <h3
                        className="font-semibold text-[#231713] text-left leading-[1.3] tracking-tight transition-colors duration-200"
                        style={{
                          fontSize: `${layout.fontSize}px`,
                          wordBreak: "break-word",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {card.label}
                      </h3>
                      <div
                        className={`shrink-0 mb-0.5 flex items-center justify-center transition-transform duration-300 ${
                          isActive
                            ? "text-[#C45F40]"
                            : "text-[#8F4A38] group-hover:text-[#C45F40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        }`}
                      >
                        <ArrowUpRight size={layout.arrowSize} strokeWidth={1.8} />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Subtle backing when rotating) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-[22px] border border-[#E7DCD3]/60 bg-[#FCFBFA]/90 backdrop-blur-sm"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      boxShadow: "0 4px 12px rgba(35, 23, 19, 0.03)",
                    }}
                    aria-hidden="true"
                  >
                    <div className="flex size-9 items-center justify-center rounded-full opacity-15">
                      <Icon className="text-[#C45F40]" size={20} strokeWidth={1.2} />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div
        className="mt-4 flex items-center justify-center gap-1.5 sm:mt-6"
        aria-label="Carousel pagination"
      >
        {CYLINDER_CARDS.map((card, i) => (
          <button
            key={card.label}
            type="button"
            onClick={() => snapToCard(i, true)}
            aria-label={`Go to ${card.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C45F40] ${
              i === activeIndex ? "w-6 bg-[#C45F40]" : "w-1.5 bg-[#DECBC0] hover:bg-[#C45F40]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
