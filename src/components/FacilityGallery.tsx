import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const equipment = [
  {
    name: 'ÄKTA Process (Cytiva)',
    image: '/images/Akta%20Process%20(Cytiva).jpeg',
  },
  {
    name: 'Batch Centrifuge',
    image: '/images/Batch_Centrifuge.jpeg',
  },
  {
    name: 'ChromXact Chromatography Column',
    image: '/images/ChromXact_Chromatography_Column.jpeg',
  },
  {
    name: 'Spray Dryer',
    image: '/images/Spray_Dryer.jpeg',
  },
  {
    name: '2×7 Litres Fermenters',
    image: '/images/2X7_Litres_Fermenters.jpeg',
  },
];

/**
 * Expanding equipment gallery — five vertical strips, the hovered
 * strip grows wide. Shown on the facility page below Integrated Campus.
 */
export default function FacilityGallery() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">
              Equipment & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              Inside the Facility
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mt-4">
              Purpose-built process and analytical equipment supporting development through GMP manufacturing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 md:h-[440px]">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="group relative h-72 md:h-full flex-1 md:hover:flex-[2.75] transition-all duration-500 ease-out rounded-[10px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent" />

                {/* Arrow chip */}
                <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-brand-yellow group-hover:text-black group-hover:border-brand-yellow">
                  <ArrowUpRight className="w-4 h-4" />
                </span>

                {/* Label */}
                <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm md:text-base leading-snug drop-shadow-md">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
