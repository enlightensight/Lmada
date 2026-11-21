'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SegmentItem {
  id: number;
  label: string;
  color: string;
  angle: number; // in degrees, 0 is top
  side: 'left' | 'right';
  labelX: number;
  labelY: number;
  elbowX: number;
  elbowY: number;
}

const ITEMS: SegmentItem[] = [
  // RIGHT SIDE (Top to Bottom)
  {
    id: 1,
    label: 'Analytical Methods –\nDevelopment & Validation',
    color: '#00a0e9',
    angle: 30,
    side: 'right',
    labelX: 620,
    labelY: 140,
    elbowX: 570,
    elbowY: 140,
  },
  {
    id: 2,
    label: 'High-Resolution Mass\nSpectrometry for Characterization',
    color: '#fbb03b',
    angle: 60,
    side: 'right',
    labelX: 680,
    labelY: 220,
    elbowX: 620,
    elbowY: 220,
  },
  {
    id: 3,
    label: 'In Vitro Cell-Based\nBio-Assays',
    color: '#f37021',
    angle: 90,
    side: 'right',
    labelX: 710,
    labelY: 305,
    elbowX: 635,
    elbowY: 305,
  },
  {
    id: 4,
    label: 'Microbiological\nassays and testing',
    color: '#65cbf0',
    angle: 120,
    side: 'right',
    labelX: 710,
    labelY: 395,
    elbowX: 635,
    elbowY: 395,
  },
  {
    id: 5,
    label: 'Analytical Tools for PK/PD &\nImmunogenicity (ADAs & NAbs)',
    color: '#1a4e8a',
    angle: 150,
    side: 'right',
    labelX: 670,
    labelY: 485,
    elbowX: 620,
    elbowY: 485,
  },
  {
    id: 6,
    label: 'In Vitro Risk Assessment for\nImmunogenicity',
    color: '#00a0e9',
    angle: 170,
    side: 'right',
    labelX: 610,
    labelY: 570,
    elbowX: 550,
    elbowY: 570,
  },

  // LEFT SIDE (Top to Bottom)
  {
    id: 7,
    label: 'Cell Line Engineering &\nProduct Development',
    color: '#65cbf0',
    angle: 330,
    side: 'left',
    labelX: 340,
    labelY: 140,
    elbowX: 390,
    elbowY: 140,
  },
  {
    id: 8,
    label: 'Mammalian cell culture process\ndevelopment & characterization',
    color: '#1a4e8a',
    angle: 300,
    side: 'left',
    labelX: 280,
    labelY: 220,
    elbowX: 340,
    elbowY: 220,
  },
  {
    id: 9,
    label: 'Protein purification\nprocess development &\ncharacterization',
    color: '#0d3268',
    angle: 270,
    side: 'left',
    labelX: 250,
    labelY: 305,
    elbowX: 325,
    elbowY: 305,
  },
  {
    id: 10,
    label: 'Drug product development\n& stability testing',
    color: '#00a0e9',
    angle: 240,
    side: 'left',
    labelX: 250,
    labelY: 400,
    elbowX: 325,
    elbowY: 400,
  },
  {
    id: 11,
    label: 'Process Characterization\nand Validation',
    color: '#fbb03b',
    angle: 210,
    side: 'left',
    labelX: 290,
    labelY: 490,
    elbowX: 340,
    elbowY: 490,
  },
  {
    id: 12,
    label: 'cGMP manufacturing of biologics\nfor Phase 1/2 Clinical Trials',
    color: '#f37021',
    angle: 190,
    side: 'left',
    labelX: 350,
    labelY: 570,
    elbowX: 410,
    elbowY: 570,
  },
];

// Helper to convert polar to cartesian coordinates
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Generate an SVG path for a donut arc segment
function describeArc(x: number, y: number, innerR: number, outerR: number, startAngle: number, endAngle: number) {
  const startOuter = polarToCartesian(x, y, outerR, endAngle);
  const endOuter = polarToCartesian(x, y, outerR, startAngle);
  const startInner = polarToCartesian(x, y, innerR, startAngle);
  const endInner = polarToCartesian(x, y, innerR, endAngle);

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', startOuter.x, startOuter.y,
    'A', outerR, outerR, 0, arcSweep, 0, endOuter.x, endOuter.y,
    'L', startInner.x, startInner.y,
    'A', innerR, innerR, 0, arcSweep, 1, endInner.x, endInner.y,
    'Z'
  ].join(' ');
}

export default function BiologicsCircularGraphic() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const CX = 480;
  const CY = 350;
  const INNER_R = 145;
  const OUTER_R = 162;

  // 12 segments of 27.5 deg with 2.5 deg gap
  const SEGMENTS = Array.from({ length: 12 }, (_, i) => {
    const startAngle = i * 30 + 1.5;
    const endAngle = startAngle + 27;
    // Find corresponding item
    const midAngle = (startAngle + endAngle) / 2;
    const matchedItem = ITEMS.find(it => Math.abs(it.angle - midAngle) < 16) || ITEMS[i % ITEMS.length];
    return {
      index: i,
      startAngle,
      endAngle,
      midAngle,
      color: matchedItem.color,
      item: matchedItem
    };
  });

  return (
    <div className="w-full flex items-center justify-center select-none py-2">
      {/* DESKTOP / TABLET SVG INFOGRAPHIC */}
      <div className="w-full max-w-[960px] aspect-[960/700] hidden sm:block">
        <svg
          viewBox="0 0 960 700"
          className="w-full h-full overflow-visible font-sans"
        >
          {/* DEFINITIONS / FILTERS */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND CIRCLE GUIDE */}
          <circle
            cx={CX}
            cy={CY}
            r={INNER_R - 5}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="1.5"
          />

          {/* CENTER TEXT */}
          <g className="text-center pointer-events-none select-none">
            <text
              x={CX}
              y={CY - 40}
              textAnchor="middle"
              className="fill-neutral-900 font-bold text-[25px] tracking-tight"
            >
              Biologics
            </text>
            <text
              x={CX}
              y={CY - 10}
              textAnchor="middle"
              className="fill-neutral-900 font-bold text-[25px] tracking-tight"
            >
              Development &amp;
            </text>
            <text
              x={CX}
              y={CY + 20}
              textAnchor="middle"
              className="fill-neutral-900 font-bold text-[25px] tracking-tight"
            >
              Manufacturing
            </text>
            <text
              x={CX}
              y={CY + 52}
              textAnchor="middle"
              className="fill-[#00a0e9] font-semibold text-[17px] tracking-normal"
            >
              From Gene to Clinic
            </text>
          </g>

          {/* 12 DONUT SEGMENTS */}
          {SEGMENTS.map((seg) => {
            const isHovered = hoveredId === seg.item.id;
            const pathData = describeArc(CX, CY, INNER_R, OUTER_R, seg.startAngle, seg.endAngle);

            return (
              <path
                key={`seg-${seg.index}`}
                d={pathData}
                fill={seg.color}
                opacity={hoveredId === null || isHovered ? 1 : 0.45}
                filter={isHovered ? 'url(#glow)' : undefined}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredId(seg.item.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}

          {/* CONNECTING LINES & CALLOUT LABELS */}
          {ITEMS.map((item) => {
            const isHovered = hoveredId === item.id;
            // Point on the outer ring for this item's angle
            const circlePt = polarToCartesian(CX, CY, OUTER_R + 2, item.angle);

            // Path from label to elbow to circle
            const pathD = `M ${item.labelX} ${item.labelY} L ${item.elbowX} ${item.elbowY} L ${circlePt.x} ${circlePt.y}`;

            const labelLines = item.label.split('\n');

            return (
              <g
                key={`callout-${item.id}`}
                className="cursor-pointer transition-all duration-300 group"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Connecting Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? item.color : '#cbd5e1'}
                  strokeWidth={isHovered ? 2.5 : 1.3}
                  className="transition-all duration-300"
                />

                {/* Connection Dot on Circle */}
                <circle
                  cx={circlePt.x}
                  cy={circlePt.y}
                  r={isHovered ? 5 : 3.5}
                  fill={item.color}
                  className="transition-transform duration-300"
                />

                {/* Connection Dot near Label */}
                <circle
                  cx={item.labelX}
                  cy={item.labelY}
                  r={isHovered ? 3.5 : 2.5}
                  fill={item.color}
                  className="transition-transform duration-300"
                />

                {/* Multi-line Label Text */}
                <text
                  x={item.side === 'left' ? item.labelX - 12 : item.labelX + 12}
                  y={item.labelY - (labelLines.length - 1) * 7 + 4}
                  textAnchor={item.side === 'left' ? 'end' : 'start'}
                  className={`text-[13.5px] tracking-tight leading-tight transition-all duration-300 ${
                    isHovered
                      ? 'fill-[#00a0e9] font-bold'
                      : 'fill-neutral-700 font-medium'
                  }`}
                >
                  {labelLines.map((line, lIdx) => (
                    <tspan
                      key={lIdx}
                      x={item.side === 'left' ? item.labelX - 12 : item.labelX + 12}
                      dy={lIdx === 0 ? 0 : '1.35em'}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* MOBILE RESPONSIVE ADAPTIVE VIEW */}
      <div className="block sm:hidden w-full px-2">
        {/* Center Title Card */}
        <div className="text-center py-6 border-b border-neutral-100">
          <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
            Biologics Development &amp; Manufacturing
          </h3>
          <span className="text-sm font-semibold text-[#00a0e9] block mt-1">
            From Gene to Clinic
          </span>
        </div>

        {/* Capabilities List */}
        <div className="grid grid-cols-1 gap-2.5 pt-4">
          {ITEMS.map((item) => (
            <div
              key={`mob-item-${item.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70"
            >
              <div
                style={{ backgroundColor: item.color }}
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
              />
              <span className="text-xs font-semibold text-neutral-800 leading-snug">
                {item.label.replace(/\n/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
