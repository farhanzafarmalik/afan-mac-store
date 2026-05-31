"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import { whatsappLink } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WHATSAPP_MSG =
  "Hi Afan Mac Store! I'd like to order an Apple product. Can you help me?";
const SLIDE_DURATION = 4000;

// ---------------------------------------------------------------------------
// Slide data
// ---------------------------------------------------------------------------

interface SlideData {
  id: string;
  overline: string;
  headline: string;
  subcopy: string;
  dotLabel: string;
  bgGlow: string;
}

const SLIDES: SlideData[] = [
  {
    id: "macbook",
    overline: "Premium MacBooks",
    headline: "MacBooks, Verified and Ready to Use.",
    subcopy: "Clear specs, trusted condition, and fast WhatsApp support.",
    dotLabel: "Go to MacBook slide",
    bgGlow:
      "radial-gradient(ellipse 80% 80% at 50% 55%, rgba(0,113,227,0.07) 0%, transparent 100%)",
  },
  {
    id: "iphone",
    overline: "Trusted iPhones",
    headline: "Genuine iPhones, Simple Buying.",
    subcopy: "Get expert guidance before you buy.",
    dotLabel: "Go to iPhone slide",
    bgGlow:
      "radial-gradient(ellipse 70% 80% at 50% 52%, rgba(90,50,200,0.07) 0%, transparent 100%)",
  },
  {
    id: "ipad",
    overline: "iPad for Work and Study",
    headline: "iPads for Work, Study, and Creativity.",
    subcopy: "Find the right iPad with clear advice and support.",
    dotLabel: "Go to iPad slide",
    bgGlow:
      "radial-gradient(ellipse 75% 80% at 50% 54%, rgba(0,155,120,0.07) 0%, transparent 100%)",
  },
  {
    id: "mac-mini",
    overline: "Compact Power",
    headline: "Mac mini for Your Desk Setup.",
    subcopy: "Compact Apple performance for work, business, and home.",
    dotLabel: "Go to Mac mini slide",
    bgGlow:
      "radial-gradient(ellipse 70% 70% at 50% 58%, rgba(100,100,120,0.06) 0%, transparent 100%)",
  },
];

const TRUST_STATS = [
  { number: "10K+", label: "Happy Customers" },
  { number: "100%", label: "Genuine" },
  { number: "4.9 ★", label: "Rating" },
];

// ---------------------------------------------------------------------------
// WhatsApp icon
// ---------------------------------------------------------------------------

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// MacBook — dark cinematic screen, keyboard deck, strong ambient shadow
// ---------------------------------------------------------------------------

function MacBookFrame() {
  return (
    <div
      className="w-full mx-auto select-none flex flex-col"
      style={{
        maxWidth: "clamp(320px, 62vw, 780px)",
        filter:
          "drop-shadow(0 40px 90px rgba(0,0,0,0.13)) drop-shadow(0 10px 28px rgba(0,0,0,0.08))",
      }}
    >
      {/* ── Lid ── */}
      <div
        style={{
          aspectRatio: "16 / 10",
          background:
            "linear-gradient(162deg, #F0F0F3 0%, #E4E4E7 55%, #D6D6DA 100%)",
          borderRadius: "16px 16px 4px 4px",
          border: "1px solid #C2C2C6",
          padding: "20px 20px 0",
          position: "relative",
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.88), inset 0 -1px 0 rgba(0,0,0,0.05)",
        }}
      >
        {/* Lid edge highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "1px",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.95)",
          }}
        />
        {/* Camera */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "22px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#A8A8AC",
              boxShadow:
                "0 0 0 1.5px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.20)",
            }}
          />
        </div>
        {/* Screen bezel */}
        <div
          style={{
            height: "calc(100% - 20px)",
            borderRadius: "7px 7px 0 0",
            background: "#141416",
            padding: "3px 3px 0",
          }}
        >
          {/* Screen surface */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px 5px 0 0",
              background:
                "linear-gradient(148deg, #1C2E60 0%, #0E1A3C 40%, #080D1E 68%, #111520 100%)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Ambient glow center-left */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 38% 58%, rgba(0,113,227,0.48) 0%, transparent 60%)",
              }}
            />
            {/* Accent glow right */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 80% 26%, rgba(120,60,240,0.20) 0%, transparent 45%)",
              }}
            />
            {/* Screen top edge shine */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(255,255,255,0.16)",
              }}
            />
            {/* Menu bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "10%",
                background: "rgba(0,0,0,0.40)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "4%",
                gap: "2%",
              }}
            >
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    width: "6%",
                    height: "34%",
                    borderRadius: "2px",
                    background: "rgba(255,255,255,0.10)",
                  }}
                />
              ))}
            </div>
            {/* Left window panel */}
            <div
              style={{
                position: "absolute",
                left: "5%",
                top: "17%",
                width: "42%",
                bottom: "12%",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
            {/* Right panel top */}
            <div
              style={{
                position: "absolute",
                left: "51%",
                right: "5%",
                top: "17%",
                height: "27%",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            {/* Right panel bottom */}
            <div
              style={{
                position: "absolute",
                left: "51%",
                right: "5%",
                top: "50%",
                height: "15%",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Hinge ── */}
      <div
        style={{
          height: "9px",
          background: "linear-gradient(to bottom, #CECECE, #C0C0C4)",
          margin: "0 2%",
          borderLeft: "1px solid #BABABE",
          borderRight: "1px solid #BABABE",
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.08)",
        }}
      />

      {/* ── Keyboard deck ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #DADADE 0%, #CCCCCE 100%)",
          borderRadius: "0 0 14px 14px",
          border: "1px solid #BEBEC2",
          borderTop: "none",
          padding: "12px 16px 12px",
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.42), 0 2px 0 rgba(0,0,0,0.04)",
        }}
      >
        {/* Three key rows */}
        {[13, 14, 12].map((count, row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: "2px",
              marginBottom: row < 2 ? "3px" : "0",
            }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "8px",
                  borderRadius: "2px",
                  background: "rgba(0,0,0,0.10)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.55), 0 1px 0 rgba(0,0,0,0.07)",
                }}
              />
            ))}
          </div>
        ))}
        {/* Spacebar row */}
        <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
          {[1.3, 6, 1.3].map((flex, i) => (
            <div
              key={i}
              style={{
                flex,
                height: "8px",
                borderRadius: "2px",
                background: i === 1 ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.07)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.52), 0 1px 0 rgba(0,0,0,0.06)",
              }}
            />
          ))}
        </div>
        {/* Trackpad */}
        <div
          style={{
            width: "30%",
            height: "30px",
            borderRadius: "7px",
            background: "rgba(0,0,0,0.07)",
            boxShadow:
              "inset 0 1px 3px rgba(0,0,0,0.09), inset 0 0 0 1px rgba(0,0,0,0.08)",
            margin: "9px auto 0",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// iPhone — large vertical device, colorful screen, frosted dock
// ---------------------------------------------------------------------------

function IPhoneFrame() {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: "clamp(180px, 22vw, 270px)",
        aspectRatio: "9 / 19.5",
        borderRadius: "48px",
        border: "1.5px solid #36363A",
        background:
          "linear-gradient(158deg, #4E4E50 0%, #2E2E30 38%, #1A1A1C 100%)",
        padding: "18px 12px",
        boxShadow:
          "0 40px 90px rgba(0,0,0,0.10), 0 10px 28px rgba(0,0,0,0.07), inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.22)",
      }}
    >
      {/* Edge highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "48px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 48%)",
          pointerEvents: "none",
        }}
      />
      {/* Right: power */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "-3.5px",
          width: "3.5px",
          height: "13%",
          background: "#3E3E40",
          borderRadius: "0 2px 2px 0",
        }}
      />
      {/* Left: silent */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "-3.5px",
          width: "3.5px",
          height: "5%",
          background: "#3E3E40",
          borderRadius: "2px 0 0 2px",
        }}
      />
      {/* Left: vol up */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "-3.5px",
          width: "3.5px",
          height: "9%",
          background: "#3E3E40",
          borderRadius: "2px 0 0 2px",
        }}
      />
      {/* Left: vol down */}
      <div
        style={{
          position: "absolute",
          top: "37%",
          left: "-3.5px",
          width: "3.5px",
          height: "9%",
          background: "#3E3E40",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "36px",
          background:
            "linear-gradient(155deg, #ECF0FF 0%, #D4DCFC 32%, #BCCAF4 70%, #A8B4E2 100%)",
          overflow: "hidden",
          position: "relative",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.07)",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "10px",
              borderRadius: "6px",
              background: "#14141A",
            }}
          />
        </div>
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,113,227,0.22) 0%, transparent 60%)",
          }}
        />
        {/* App grid 4×4 */}
        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "8%",
            right: "8%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8%",
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const c = [
              "rgba(0,113,227,0.30)",
              "rgba(52,199,89,0.26)",
              "rgba(255,149,0,0.26)",
              "rgba(175,82,222,0.26)",
            ];
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: "22%",
                  background: c[i % 4],
                }}
              />
            );
          })}
        </div>
        {/* Frosted dock */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "7%",
            right: "7%",
            height: "11%",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "0 8%",
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              style={{
                width: "18%",
                aspectRatio: "1",
                borderRadius: "22%",
                background: "rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// iPad — large portrait tablet, app grid, frosted dock
// ---------------------------------------------------------------------------

function IPadFrame() {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: "clamp(210px, 30vw, 400px)",
        aspectRatio: "3 / 4",
        borderRadius: "26px",
        border: "1.5px solid #34343A",
        background:
          "linear-gradient(158deg, #4A4A4C 0%, #2C2C2E 40%, #1A1A1C 100%)",
        padding: "18px 14px",
        boxShadow:
          "0 40px 90px rgba(0,0,0,0.10), 0 10px 24px rgba(0,0,0,0.07), inset 0 1.5px 0 rgba(255,255,255,0.10)",
      }}
    >
      {/* Edge highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "26px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.11) 0%, transparent 46%)",
          pointerEvents: "none",
        }}
      />
      {/* Power */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          right: "-3.5px",
          width: "3.5px",
          height: "7%",
          background: "#3C3C3E",
          borderRadius: "0 2px 2px 0",
        }}
      />
      {/* Volume top */}
      {[26, 40].map((left, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "-3.5px",
            left: `${left}%`,
            width: "10%",
            height: "3.5px",
            background: "#3C3C3E",
            borderRadius: "2px 2px 0 0",
          }}
        />
      ))}

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          background:
            "linear-gradient(148deg, #EAF0FF 0%, #D8E2FA 38%, #C4D0F2 100%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Face ID */}
        <div
          style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}
        >
          <div
            style={{
              width: "26px",
              height: "8px",
              borderRadius: "4px",
              background: "#12121A",
            }}
          />
        </div>
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 32%, rgba(0,130,140,0.20) 0%, transparent 58%)",
          }}
        />
        {/* App grid 5×4 */}
        <div
          style={{
            position: "absolute",
            top: "13%",
            left: "6%",
            right: "6%",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "5%",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => {
            const c = [
              "rgba(0,113,227,0.26)",
              "rgba(52,199,89,0.22)",
              "rgba(255,149,0,0.22)",
              "rgba(175,82,222,0.22)",
              "rgba(220,55,55,0.20)",
            ];
            return (
              <div
                key={i}
                style={{ aspectRatio: "1", borderRadius: "22%", background: c[i % 5] }}
              />
            );
          })}
        </div>
        {/* Dock */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "10%",
            right: "10%",
            height: "9%",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              style={{
                width: "12%",
                aspectRatio: "1",
                borderRadius: "22%",
                background: "rgba(0,0,0,0.11)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mac mini — wide with 3-D perspective tilt, vents, ports, LED
// ---------------------------------------------------------------------------

function MacMiniFrame() {
  return (
    <div
      className="mx-auto select-none flex flex-col items-center"
      style={{ maxWidth: "clamp(300px, 52vw, 580px)", width: "100%" }}
    >
      {/* 3-D tilt wrapper */}
      <div
        style={{
          width: "100%",
          transform: "perspective(700px) rotateX(20deg)",
          transformOrigin: "center bottom",
          filter:
            "drop-shadow(0 40px 80px rgba(0,0,0,0.13)) drop-shadow(0 10px 24px rgba(0,0,0,0.08))",
        }}
      >
        {/* Top / main surface */}
        <div
          style={{
            width: "100%",
            height: "clamp(88px, 14vw, 168px)",
            borderRadius: "16px 16px 0 0",
            background:
              "linear-gradient(168deg, #F8F8F8 0%, #ECECEF 52%, #DCDCE0 100%)",
            border: "1px solid #C8C8CC",
            borderBottom: "none",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,0.92), inset 0 -2px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Top edge highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "6%",
              right: "6%",
              height: "1.5px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "99px",
            }}
          />
          {/* Vent slots */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              bottom: "20%",
              left: "10%",
              right: "10%",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 4px, rgba(0,0,0,0.07) 4px, rgba(0,0,0,0.07) 5.5px)",
            }}
          />
          {/* Surface sheen */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "4%",
              right: "4%",
              height: "34%",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.58) 0%, transparent 72%)",
            }}
          />
        </div>

        {/* Front face */}
        <div
          style={{
            width: "100%",
            height: "clamp(26px, 4.2vw, 46px)",
            borderRadius: "0 0 16px 16px",
            background: "linear-gradient(to bottom, #CCCCCE, #B6B6BA)",
            border: "1px solid #BABABE",
            borderTop: "1px solid #DCDCE0",
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px",
            paddingRight: "12px",
            position: "relative",
          }}
        >
          {/* Power LED */}
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(0,220,90,0.92)",
              boxShadow:
                "0 0 8px rgba(0,220,90,0.72), 0 0 18px rgba(0,220,90,0.36)",
              flexShrink: 0,
            }}
          />
          {/* Port cluster */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            {[1, 2].map((n) => (
              <div
                key={n}
                style={{
                  width: "7px",
                  height: "5px",
                  borderRadius: "1px",
                  background: "#AAAAAE",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.20)",
                }}
              />
            ))}
            <div
              style={{
                width: "10px",
                height: "5px",
                borderRadius: "1px",
                background: "#AAAAAE",
                boxShadow: "inset 0 1px 1px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Ground shadow pool beneath */}
      <div
        style={{
          width: "72%",
          height: "10px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.16) 0%, transparent 70%)",
          marginTop: "4px",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Device registry
// ---------------------------------------------------------------------------

type DeviceComponent = React.ComponentType;
const DEVICE_FRAMES: Record<string, DeviceComponent> = {
  macbook: MacBookFrame,
  iphone: IPhoneFrame,
  ipad: IPadFrame,
  "mac-mini": MacMiniFrame,
};

// ---------------------------------------------------------------------------
// CTA button styles — inline to avoid Tailwind v4 SSR edge-cases
// ---------------------------------------------------------------------------

const whatsappBtnStyle: React.CSSProperties = {
  background: "#25D366",
  minHeight: "44px",
  borderRadius: "9999px",
  paddingLeft: "22px",
  paddingRight: "22px",
  fontSize: "15px",
  fontWeight: 500,
  color: "#FFFFFF",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "background-color 0.18s ease",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap" as const,
};

const viewProductsBtnStyle: React.CSSProperties = {
  border: "1.5px solid #0071E3",
  color: "#0071E3",
  background: "transparent",
  minHeight: "44px",
  borderRadius: "9999px",
  paddingLeft: "22px",
  paddingRight: "22px",
  fontSize: "15px",
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.18s ease",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

// ---------------------------------------------------------------------------
// Hero — campaign-style product-first vertical stage
// ---------------------------------------------------------------------------

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (isPaused || prefersReduced) return;
    timerRef.current = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, isPaused, prefersReduced]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const rel = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(rel)) setIsPaused(false);
  }, []);

  const slide = SLIDES[currentIndex];
  const DeviceFrame = DEVICE_FRAMES[slide.id];
  const fadeDuration = prefersReduced ? 0 : 0.45;
  const scaleDuration = prefersReduced ? 0 : 0.84;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative w-full bg-[#F5F5F7] flex flex-col overflow-hidden"
        style={{ minHeight: "90vh" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={handleBlur}
        aria-label="Featured products"
      >
        {/* ----------------------------------------------------------------
            SLIDE AREA — flex-1, fills available height
        ---------------------------------------------------------------- */}
        <div className="flex-1 relative" style={{ minHeight: 520 }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeDuration, ease: "easeOut" }}
            >
              {/* Per-slide ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: slide.bgGlow }}
              />

              {/* ── TOP TEXT — overline + headline, centered ── */}
              <div
                className="relative z-10 w-full flex flex-col items-center text-center px-6"
                style={{ paddingTop: "clamp(28px, 5vh, 60px)", maxWidth: "740px" }}
              >
                <motion.p
                  className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#AEAEB2]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.08, ease: "easeOut" }}
                >
                  {slide.overline}
                </motion.p>

                <motion.h1
                  className="font-semibold text-[#1D1D1F] leading-[1.08] tracking-[-0.025em] mt-2"
                  style={{
                    fontSize: "clamp(1.75rem, 3.2vw + 0.5rem, 3.1rem)",
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: 0.16, ease: "easeOut" }}
                >
                  {slide.headline}
                </motion.h1>
              </div>

              {/* ── PRODUCT VISUAL — dominant center ── */}
              <div
                className="relative z-10 flex-1 flex items-center justify-center w-full px-4"
                style={{
                  paddingTop: "clamp(12px, 2.5vh, 32px)",
                  paddingBottom: "clamp(12px, 2.5vh, 32px)",
                  minHeight: 0,
                }}
              >
                <motion.div
                  className="flex items-center justify-center w-full"
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1.0 }}
                  transition={{ duration: scaleDuration, ease: "easeOut" }}
                >
                  <DeviceFrame />
                </motion.div>
              </div>

              {/* ── BOTTOM TEXT — subcopy + CTAs, centered ── */}
              <div
                className="relative z-10 w-full flex flex-col items-center text-center px-6 gap-4"
                style={{
                  paddingBottom: "clamp(24px, 4vh, 52px)",
                  maxWidth: "520px",
                }}
              >
                <motion.p
                  className="text-[#6E6E73] leading-relaxed"
                  style={{
                    fontSize: "clamp(0.9rem, 1.1vw + 0.05rem, 1.1rem)",
                    maxWidth: "40ch",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.26, ease: "easeOut" }}
                >
                  {slide.subcopy}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, delay: 0.34, ease: "easeOut" }}
                >
                  <a
                    href={whatsappLink(WHATSAPP_MSG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={whatsappBtnStyle}
                    className="w-full sm:w-auto focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#1DAE56")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#25D366")
                    }
                  >
                    <WhatsAppIcon size={18} />
                    Buy on WhatsApp
                  </a>

                  <Link
                    href="/products"
                    style={viewProductsBtnStyle}
                    className="w-full sm:w-auto focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(0,113,227,0.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    View Products
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ----------------------------------------------------------------
            TRUST STATS — always visible below slider
        ---------------------------------------------------------------- */}
        <div className="flex-none border-t border-[#E8E8ED] bg-[#F5F5F7] py-5 px-4 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-center">
              {TRUST_STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="mx-8 bg-[#E8E8ED]"
                      style={{ width: "1px", height: "32px" }}
                    />
                  )}
                  <div className="flex flex-col items-center gap-[3px]">
                    <span
                      className="font-semibold text-[#1D1D1F] leading-none"
                      style={{ fontSize: "22px" }}
                    >
                      {stat.number}
                    </span>
                    <span
                      className="font-medium text-[#6E6E73]"
                      style={{ fontSize: "12px" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile */}
            <div className="grid grid-cols-3 md:hidden">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-[3px] text-center"
                >
                  <span
                    className="font-semibold text-[#1D1D1F] leading-none"
                    style={{ fontSize: "18px" }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="font-medium text-[#6E6E73]"
                    style={{ fontSize: "11px" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------
            DOT INDICATORS
        ---------------------------------------------------------------- */}
        <div
          className="flex-none flex items-center justify-center gap-2 py-4 bg-[#F5F5F7]"
          role="tablist"
          aria-label="Slide navigation"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              onClick={() => goTo(i)}
              aria-label={s.dotLabel}
              aria-selected={i === currentIndex}
              className="flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <motion.div
                animate={{
                  width: i === currentIndex ? 16 : 8,
                  backgroundColor:
                    i === currentIndex ? "#1D1D1F" : "#D2D2D7",
                }}
                transition={{
                  duration: prefersReduced ? 0 : 0.2,
                  ease: "easeInOut",
                }}
                style={{ height: 8, borderRadius: 9999 }}
              />
            </button>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
