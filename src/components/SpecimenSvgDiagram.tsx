import React from 'react';
import { SvgDiagramType } from '../data/cnidariaDataset';

interface SpecimenSvgDiagramProps {
  svgType?: SvgDiagramType;
  label?: string;
}

export const SpecimenSvgDiagram: React.FC<SpecimenSvgDiagramProps> = ({ svgType }) => {
  switch (svgType) {
    case 'nanomia':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Esquema morfológico de sifonóforo fisonéctido">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          <ellipse cx="180" cy="34" rx="10" ry="15" fill="#EFF6FF" stroke="#1E40AF" strokeWidth="2.2" />
          <circle cx="180" cy="24" r="3" fill="#1D4ED8" />
          <path d="M180 49 L180 255" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
          {[62, 86, 110].map((y, i) => (
            <g key={i}>
              <path
                d={`M178 ${y} C150 ${y - 8}, 145 ${y + 16}, 178 ${y + 14}`}
                fill="#DBEAFE"
                stroke="#2563EB"
                strokeWidth="2"
              />
              <path
                d={`M182 ${y + 8} C210 ${y}, 215 ${y + 24}, 182 ${y + 22}`}
                fill="#DBEAFE"
                stroke="#2563EB"
                strokeWidth="2"
              />
            </g>
          ))}
          {[155, 195, 232].map((y, i) => (
            <g key={i}>
              <polygon
                points={`180,${y - 6} 214,${y + 2} 198,${y + 14} 180,${y + 6}`}
                fill="#E0F2FE"
                stroke="#0284C7"
                strokeWidth="1.6"
              />
              <path
                d={`M179 ${y} Q156 ${y + 8} 146 ${y + 20} Q162 ${y + 24} 179 ${y + 10}`}
                fill="#BFDBFE"
                stroke="#1D4ED8"
                strokeWidth="1.8"
              />
              <path
                d={`M165 ${y + 14} Q142 ${y + 26} 135 ${y + 42}`}
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
              <circle cx="145" cy={y + 28} r="2.5" fill="#1D4ED8" />
              <circle cx="137" cy={y + 39} r="2.5" fill="#1D4ED8" />
            </g>
          ))}
        </svg>
      );

    case 'pseudodiploria':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Esqueleto meandroide de coral cerebro">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          <circle cx="180" cy="140" r="108" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
          {[
            'M95 105 Q135 80 180 105 T265 105',
            'M85 135 Q130 110 180 135 T275 135',
            'M90 165 Q135 140 180 165 T270 165',
            'M110 195 Q150 175 185 195 T250 195',
            'M125 78 Q180 62 235 80',
          ].map((d, idx) => (
            <g key={idx}>
              <path d={d} fill="none" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
              <path d={d} fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 5" />
            </g>
          ))}
        </svg>
      );

    case 'mussismilia':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Coralitos grandes con septos dentados">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {[
            { cx: 130, cy: 105, r: 44 },
            { cx: 228, cy: 108, r: 42 },
            { cx: 178, cy: 185, r: 46 },
          ].map((c, idx) => (
            <g key={idx}>
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 16;
                const x1 = c.cx + Math.cos(angle) * (c.r - 2);
                const y1 = c.cy + Math.sin(angle) * (c.r - 2);
                const x2 = c.cx + Math.cos(angle) * 12;
                const y2 = c.cy + Math.sin(angle) * 12;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#334155"
                    strokeWidth="2.4"
                    strokeDasharray="4 2"
                  />
                );
              })}
              <circle cx={c.cx} cy={c.cy} r="11" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      );

    case 'favia':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Coral plocoide con coralitos estrellados">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          <circle cx="180" cy="140" r="106" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
          {[
            [135, 90], [180, 82], [225, 92],
            [112, 136], [158, 132], [204, 134], [246, 140],
            [134, 182], [180, 180], [224, 182],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 10;
                return (
                  <line
                    key={i}
                    x1={cx + Math.cos(a) * 17}
                    y1={cy + Math.sin(a) * 17}
                    x2={cx + Math.cos(a) * 5}
                    y2={cy + Math.sin(a) * 5}
                    stroke="#334155"
                    strokeWidth="1.4"
                  />
                );
              })}
              <circle cx={cx} cy={cy} r="4.5" fill="#CBD5E1" />
            </g>
          ))}
        </svg>
      );

    case 'pocillopora':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Coral ramificado con verrugas calcáreas">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          <path
            d="M165 245 L165 170 L115 105 C105 90, 125 72, 140 88 L175 135 L180 78 C180 58, 204 58, 204 78 L200 135 L235 92 C250 75, 268 92, 255 110 L205 172 L205 245 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {[
            [130, 102], [148, 120], [122, 118], [160, 148],
            [188, 78], [194, 98], [184, 115], [196, 134],
            [242, 98], [228, 116], [244, 120], [216, 144],
            [176, 175], [192, 192], [174, 210], [194, 222],
          ].map(([vx, vy], i) => (
            <g key={i}>
              <circle cx={vx} cy={vy} r="6.5" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.6" />
              <circle cx={vx} cy={vy} r="1.5" fill="#334155" />
            </g>
          ))}
        </svg>
      );

    case 'bivalve_venerid':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Valva interna de almeja venérida con seno paleal profundo">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Shell outline */}
          <path
            d="M155 52 C105 60, 68 110, 74 168 C80 218, 142 238, 212 228 C268 220, 294 178, 282 128 C272 86, 205 44, 155 52 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="3"
          />
          {/* Umbo & Cardinal teeth (heterodont hinge) */}
          <circle cx="156" cy="58" r="8" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
          <path d="M145 64 L152 74 M156 64 L158 75 M166 65 L164 76" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Isomyarian adductor scars */}
          <ellipse cx="105" cy="132" rx="16" ry="22" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <ellipse cx="250" cy="136" rx="18" ry="22" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          {/* Pallial line with deep pallial sinus */}
          <path
            d="M106 154 C122 204, 185 212, 238 192 C200 182, 182 162, 236 154"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
        </svg>
      );

    case 'polychaete_errant':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Esquema de poliqueto errante con prostomio, parápodos birramosos y quetas">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Prostomium & eyes & palps */}
          <ellipse cx="180" cy="48" rx="22" ry="16" fill="#DBEAFE" stroke="#1E40AF" strokeWidth="2.2" />
          <ellipse cx="164" cy="36" rx="6" ry="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <ellipse cx="196" cy="36" rx="6" ry="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <circle cx="172" cy="46" r="2.5" fill="#1E293B" />
          <circle cx="188" cy="46" r="2.5" fill="#1E293B" />
          <circle cx="170" cy="54" r="2.5" fill="#1E293B" />
          <circle cx="190" cy="54" r="2.5" fill="#1E293B" />
          {/* Peristomial cirri */}
          <path d="M158 52 Q130 40 120 28 M158 58 Q128 56 116 50" fill="none" stroke="#1E40AF" strokeWidth="2" />
          <path d="M202 52 Q230 40 240 28 M202 58 Q232 56 244 50" fill="none" stroke="#1E40AF" strokeWidth="2" />
          {/* Segmented body with biramous parapodia */}
          {[74, 100, 126, 152, 178, 204, 230].map((y, idx) => (
            <g key={idx}>
              <rect x="152" y={y - 11} width="56" height="22" rx="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              {/* Left & right parapodia + chaetae */}
              <path d={`M152 ${y} L128 ${y - 6} L132 ${y + 6} Z`} fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.6" />
              <path d={`M128 ${y - 6} L112 ${y - 12} M126 ${y} L110 ${y} M130 ${y + 6} L114 ${y + 11}`} stroke="#475569" strokeWidth="1.4" />
              <path d={`M208 ${y} L232 ${y - 6} L228 ${y + 6} Z`} fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.6" />
              <path d={`M232 ${y - 6} L248 ${y - 12} M234 ${y} L250 ${y} M230 ${y + 6} L246 ${y + 11}`} stroke="#475569" strokeWidth="1.4" />
            </g>
          ))}
        </svg>
      );

    case 'decapod_shrimp':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Esquema de langostino Dendrobranchiata con rostro aserrado y tres pares de pereiópodos quelados">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Serrated rostrum */}
          <path d="M115 110 L48 96 L82 115 Z" fill="#DBEAFE" stroke="#1E40AF" strokeWidth="2" />
          <path d="M65 100 L68 93 M78 103 L81 95 M92 106 L95 98 M104 108 L107 100" stroke="#1E40AF" strokeWidth="2" />
          {/* Carapace */}
          <path d="M115 98 C145 92, 178 96, 192 118 L188 152 L115 146 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          {/* stalked eye */}
          <circle cx="104" cy="112" r="5" fill="#1E293B" />
          {/* Pleon (pleura 2 NOT overlapping 1) */}
          {[194, 218, 242, 264, 284].map((x, i) => (
            <path
              key={i}
              d={`M${x} ${105 + i * 5} L${x + 22} ${110 + i * 5} L${x + 18} ${152 + i * 3} L${x - 2} ${148 + i * 3} Z`}
              fill="#EFF6FF"
              stroke="#1E293B"
              strokeWidth="2"
            />
          ))}
          {/* Telson + Uropods */}
          <path d="M304 134 L338 148 L304 162 Z" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
          {/* 3 chelate pereiopods */}
          {[126, 144, 162].map((x, idx) => (
            <g key={idx}>
              <path d={`M${x} 148 L${x - 16} 192 L${x - 24} 206`} fill="none" stroke="#2563EB" strokeWidth="2.4" />
              <circle cx={x - 25} cy="208" r="4" fill="none" stroke="#2563EB" strokeWidth="2" />
            </g>
          ))}
        </svg>
      );

    case 'cladocera_podon':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Cladócero Podon intermedius con gran ojo compuesto, surco cervical y cámara incubadora hemisférica">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Globose brood pouch */}
          <circle cx="205" cy="135" r="68" fill="#EFF6FF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Head separated by deep cervical groove */}
          <circle cx="122" cy="118" r="38" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Huge compound eye */}
          <circle cx="112" cy="114" r="18" fill="#1E293B" />
          <circle cx="107" cy="109" r="5" fill="#FFFFFF" />
          {/* Biramous swimming antenna II */}
          <path d="M135 142 L95 198 M112 175 L82 184 M112 175 L108 210" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Thoracic limbs with setae */}
          {[148, 164, 180, 196].map((x, i) => (
            <path key={i} d={`M${x} 175 L${x - 12} 218`} stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" />
          ))}
        </svg>
      );

    case 'mysidacea':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Misidáceo con marsupio ventral y estatocisto circular en el endopodito del urópodo">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Carapace */}
          <path d="M75 118 C105 98, 165 98, 185 116 L185 152 L75 148 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          {/* Stalked eye */}
          <circle cx="62" cy="124" r="7" fill="#1E293B" />
          {/* Ventral Marsupium (brood pouch) */}
          <ellipse cx="152" cy="158" rx="28" ry="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          {/* Abdomen */}
          <path d="M185 118 L285 124 L285 148 L185 148 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.2" />
          {/* Uropods with circular statocyst in endopod */}
          <ellipse cx="312" cy="126" rx="24" ry="8" fill="#EFF6FF" stroke="#1E40AF" strokeWidth="2" />
          <ellipse cx="310" cy="144" rx="22" ry="8" fill="#EFF6FF" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="298" cy="144" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'chaetognatha_sagitta':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Quetognato Sagitta sp. con dos pares de aletas laterales y ganchos quitinosos">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Anterior Lateral Fins */}
          <path d="M172 95 C142 108, 142 136, 172 148 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <path d="M188 95 C218 108, 218 136, 188 148 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          {/* Posterior Lateral Fins */}
          <path d="M173 162 C138 176, 138 208, 174 222 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <path d="M187 162 C222 176, 222 208, 186 222 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          {/* Caudal Fin */}
          <path d="M175 236 L154 258 L206 258 L185 236 Z" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="2" />
          {/* Torpedo Body (Head, Trunk, Tail with septum) */}
          <ellipse cx="180" cy="36" rx="14" ry="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          {/* Chitinous grasping spines */}
          <path d="M166 32 Q154 24 158 18 M165 37 Q152 30 156 24" fill="none" stroke="#1E293B" strokeWidth="2" />
          <path d="M194 32 Q206 24 202 18 M195 37 Q208 30 204 24" fill="none" stroke="#1E293B" strokeWidth="2" />
          <path d="M172 47 L188 47 L185 238 L175 238 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          {/* Trunk-tail septum */}
          <line x1="173" y1="184" x2="187" y2="184" stroke="#1D4ED8" strokeWidth="2.5" />
        </svg>
      );

    case 'chaetognatha_spadella':
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Quetognato bentónico Spadella sp. con un único par de aletas laterales">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          {/* Single pair of posterior lateral fins */}
          <path d="M168 140 C124 158, 124 206, 170 224 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          <path d="M192 140 C236 158, 236 206, 190 224 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
          {/* Caudal fin with adhesive papillae */}
          <path d="M172 228 L146 256 L214 256 L188 228 Z" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="2.2" />
          {/* Compact muscular body */}
          <ellipse cx="180" cy="48" rx="18" ry="15" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M162 44 Q148 34 154 26 M198 44 Q212 34 206 26" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M166 62 L194 62 L188 228 L172 228 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="168" y1="142" x2="192" y2="142" stroke="#1D4ED8" strokeWidth="2.5" />
        </svg>
      );

    case 'porites':
    default:
      return (
        <svg viewBox="0 0 360 280" className="w-full h-full max-h-[36vh] object-contain" role="img" aria-label="Coral ramificado liso poroso">
          <rect width="360" height="280" fill="#F8FAFC" rx="12" />
          <path
            d="M162 248 L162 168 L118 98 C108 80, 134 65, 146 84 L180 138 L214 84 C226 65, 252 80, 242 98 L198 168 L198 248 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {[
            [130, 90], [138, 102], [146, 114], [156, 126], [165, 138],
            [228, 90], [220, 102], [212, 114], [202, 126], [194, 138],
            [172, 155], [184, 155], [168, 172], [180, 172], [190, 172],
            [170, 190], [182, 190], [174, 208], [186, 208], [178, 226],
          ].map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r="2.2" fill="#475569" />
          ))}
        </svg>
      );
  }
};
