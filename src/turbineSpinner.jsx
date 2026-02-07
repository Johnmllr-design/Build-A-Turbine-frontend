// TurbineSpinner.jsx
import React from "react";

export default function TurbineSpinner({
  size = 160,
  speed = 1.2,          // seconds per rotation
  className = "",
  label = "",
}) {
  const px = typeof size === "number" ? `${size}px` : size;

  return (
    <div className={`turbine-wrap ${className}`} aria-label={label} role="status">
      <svg
        width={px}
        height={px}
        viewBox="0 0 200 200"
        className="turbine-svg"
      >

        {/* tower */}
        <path
          d="M95 188 L105 188 L118 92 L82 92 Z"
          className="turbine-tower"
        />
        {/* nacelle */}
        <rect x="92" y="78" width="40" height="18" rx="9" className="turbine-nacelle" />
        <circle cx="100" cy="87" r="10" className="turbine-hub" />

        {/* blades group (rotates) */}
        <g
          className="turbine-blades"
          style={{ animationDuration: `${speed}s` }}
          transform="translate(100 87)"
        >
          {/* blade 1 */}
          <path d="M0 0 C 14 -6 54 -10 78 -4 C 58 10 26 12 0 6 Z" className="turbine-blade" />
          {/* blade 2 */}
          <g transform="rotate(120)">
            <path d="M0 0 C 14 -6 54 -10 78 -4 C 58 10 26 12 0 6 Z" className="turbine-blade" />
          </g>
          {/* blade 3 */}
          <g transform="rotate(240)">
            <path d="M0 0 C 14 -6 54 -10 78 -4 C 58 10 26 12 0 6 Z" className="turbine-blade" />
          </g>

          {/* hub cap */}
          <circle cx="0" cy="0" r="7" className="turbine-hubcap" />
        </g>
      </svg>

      <div className="turbine-label">{label}</div>

      <style>{`
        .turbine-wrap {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .turbine-svg { overflow: visible; }

        .turbine-ring {
          fill: none;
          stroke: #22d3ee;
          stroke-width: 2;
        }

        .turbine-tower {
          fill: rgba(34, 211, 238, 0.5);
        }

        .turbine-nacelle {
          fill: rgba(34, 211, 238, 0.6);
        }

        .turbine-hub {
          fill: rgba(34, 211, 238, 0.7);
        }

        .turbine-blade {
          fill: #22d3ee;
        }

        .turbine-hubcap {
          fill: rgba(5, 8, 13, 0.5);
        }

        .turbine-blades {
          transform-origin: 0px 0px;
          animation-name: turbine-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
        }

        @keyframes turbine-spin {
          from { transform: translate(100px, 87px) rotate(0deg); }
          to   { transform: translate(100px, 87px) rotate(360deg); }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .turbine-blades { animation: none; }
        }

        .turbine-label {
          font: 500 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
