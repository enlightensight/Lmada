export interface EquipmentItem {
  src: string;
  title: string;
  subtitle: string;
  tag?: string;
}

export const CELL_DEV_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/celldev/AMBR15.png',
    title: 'Ambr® 15 Automated Microbioreactor',
    subtitle: 'High-throughput micro-scale cell culture screening with automated sampling and feedback control.',
    tag: 'Cell Line Screening',
  },
  {
    src: '/images/celldev/Biosafety_Cabinet.png',
    title: 'Class II Type A2 Biosafety Cabinet',
    subtitle: 'Certified sterile environment for cell line transfection, single-cell cloning, and aseptic manipulation.',
    tag: 'Aseptic Processing',
  },
  {
    src: '/images/celldev/CLD_Lab.png',
    title: 'Cell Line Development Suite',
    subtitle: 'Integrated laboratory with high-throughput clone screening, automated liquid handling, and cell banking.',
    tag: 'Facility Suite',
  },
];

export const UPSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/upstream/AMBR250.png',
    title: 'Ambr® 250 High-Throughput Bioreactor',
    subtitle: 'Automated 24-way parallel mini-bioreactor system for DoE process optimization and scale-down modeling.',
    tag: 'Process Optimization',
  },
  {
    src: '/images/upstream/Bioreactor_control.png',
    title: 'Automated Bioreactor Control & Skid System',
    subtitle: 'Precision process automation for pH, dissolved oxygen, gas mixing, nutrient feed, and temperature loops.',
    tag: 'Process Control',
  },
  {
    src: '/images/upstream/Biosaftey_cabinet.png',
    title: 'Upstream Biosafety Cabinet Suite',
    subtitle: 'Dedicated Grade B/C containment for sterile inoculum prep, vial thawing, and seed train expansion.',
    tag: 'Inoculum Prep',
  },
  {
    src: '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
    title: 'CO2 Shaker Incubator',
    subtitle: 'High-capacity orbital shaking incubator with precise humidity and CO2 regulation for suspension cultures.',
    tag: 'Suspension Culture',
  },
  {
    src: '/images/upstream/Cedex_automated_cell_counter.png',
    title: 'Cedex Automated Cell Counter & Analyzer',
    subtitle: 'High-resolution trypan blue image analysis for viable cell density, viability percentage, and aggregation index.',
    tag: 'Cell Analytics',
  },
];

export const UPSTREAM_GMP_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/upstream_GMP/GMP Production bioreactor.png',
    title: 'GMP Production Bioreactor (200 L)',
    subtitle: 'Single-use production bioreactor train for clinical and commercial-ready biologic drug substance manufacturing.',
    tag: '200L SUB',
  },
  {
    src: '/images/upstream_GMP/GMP Seed bioreactor.png',
    title: 'GMP Seed Bioreactor (50 L)',
    subtitle: 'Intermediate scale-up bioreactor with automated feed and perfusion integration.',
    tag: '50L Seed Train',
  },
  {
    src: '/images/upstream_GMP/GMP Wave Bioreactor.png',
    title: 'GMP Wave Bioreactor System',
    subtitle: 'Low-shear rocking motion cultivation system for gentle seed train amplification and cell expansion.',
    tag: 'Seed Expansion',
  },
  {
    src: '/images/upstream_GMP/GMP Automated Bioanalyzer.png',
    title: 'GMP Automated Bioanalyzer',
    subtitle: 'Rapid multi-parameter metabolite testing (glucose, lactate, glutamine, electrolytes) for in-process monitoring.',
    tag: 'In-Process Testing',
  },
  {
    src: '/images/upstream_GMP/GMP Automated cell counter.png',
    title: 'GMP Automated Cell Counter',
    subtitle: 'Validated 21 CFR Part 11 compliant automated cell count and viability assessment in cleanroom environments.',
    tag: 'Cleanroom QC',
  },
  {
    src: '/images/upstream_GMP/GMP CO2 shaker incubator.png',
    title: 'GMP Cleanroom CO2 Shaker Incubator',
    subtitle: 'Grade C cleanroom incubator train supporting initial vial thaw and shake flask seed progression.',
    tag: 'Vial Thaw',
  },
  {
    src: '/images/upstream_GMP/GMP Cell bank storage system.png',
    title: 'GMP Cryogenic Cell Bank Storage',
    subtitle: 'Monitored vapor-phase liquid nitrogen storage for Master (MCB) and Working (WCB) cell banks.',
    tag: 'Cryo Banking',
  },
  {
    src: '/images/upstream_GMP/GMP Depth filter holder.png',
    title: 'GMP Depth Filtration Harvest Skid',
    subtitle: 'Single-use multi-stage depth filter system for high-efficiency primary clarification of biologic harvests.',
    tag: 'Harvest Clarification',
  },
  {
    src: '/images/upstream_GMP/GMP Inverted Microscope.png',
    title: 'GMP Inverted Phase Contrast Microscope',
    subtitle: 'High-optical-resolution morphological evaluation and sterility check during seed train cultivation.',
    tag: 'Morphology QC',
  },
  {
    src: '/images/upstream_GMP/GMP Overhead stirrer.png',
    title: 'GMP Overhead Stirrer & Media Prep Tank',
    subtitle: 'Homogeneous sterile media and buffer preparation with continuous impeller speed control.',
    tag: 'Media Compounding',
  },
  {
    src: '/images/upstream_GMP/GMP Quattroflow pump.png',
    title: 'GMP Quattroflow Diaphragm Pump',
    subtitle: 'Four-piston low-shear diaphragm pump ensuring zero product degradation during delicate biologic fluid transfer.',
    tag: 'Fluid Transfer',
  },
  {
    src: '/images/upstream_GMP/50 L Single use mixer (SUM)(DSP25-0106).png',
    title: '50 L Single-Use Mixer (SUM)',
    subtitle: 'Closed single-use mixing system for sterile media hydration, buffer compounding, and harvest conditioning.',
    tag: 'Single-Use Mixer',
  },
  {
    src: '/images/upstream_GMP/300X300 Axichrom column(DSP25-0222).png',
    title: '300x300 AxiChrom Chromatography Column',
    subtitle: 'Automated hydraulic axial compression column for reproducible, scalable GMP purification cycles.',
    tag: 'Axial Compression',
  },
  {
    src: '/images/upstream_GMP/AKTA Pilot Chromatography system(DSP25-0116).png',
    title: 'ÄKTA Pilot Chromatography Skid',
    subtitle: 'Sanitary bioprocess chromatography system supporting pre-clinical and Phase I/II clinical batch purification.',
    tag: 'GMP Skid',
  },
  {
    src: '/images/upstream_GMP/Automated TFF system with SUM(DSP25-0117).png',
    title: 'Automated TFF System with SUM',
    subtitle: 'Automated ultrafiltration and diafiltration system paired with single-use mixers for final drug substance concentration.',
    tag: 'UF/DF System',
  },
  {
    src: '/images/upstream_GMP/Axichrom column controller(DSP25-0230).png',
    title: 'AxiChrom Column Intelligent Controller',
    subtitle: 'Automated bed height calculation, bed pressure sensing, and verified packing efficiency diagnostics.',
    tag: 'Column Control',
  },
  {
    src: '/images/upstream_GMP/Chromatography Skid, Co-prime (DSP25-0118).png',
    title: 'Chromatography Skid (Co-Prime)',
    subtitle: 'Advanced multi-buffer inline dilution and multi-gradient chromatography skid with automated valve switching.',
    tag: 'Chromatography',
  },
  {
    src: '/images/upstream_GMP/HiScale Column.png',
    title: 'HiScale High-Resolution Column',
    subtitle: 'Biocompatible pressure-rated glass column for pilot-scale affinity, IEX, and HIC purification polishing.',
    tag: 'Column Hardware',
  },
  {
    src: '/images/upstream_GMP/549A7821.png',
    title: 'cGMP Upstream Cleanroom Suite',
    subtitle: 'Grade C classified upstream production suite featuring closed single-use processing line architecture.',
    tag: 'Cleanroom Suite',
  },
];

export const DOWNSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/down stream/AKTA Pilot.png',
    title: 'ÄKTA Pilot System',
    subtitle: 'Pilot-scale purification system bridging laboratory benchtop development and full cGMP commercial processing.',
    tag: 'Pilot Purification',
  },
  {
    src: '/images/down stream/AKTA Pure 150_Akta Avant.png',
    title: 'ÄKTA Pure 150 & ÄKTA Avant Systems',
    subtitle: 'High-speed automated chromatography for resin screening, DoE method development, and impurity clearance.',
    tag: 'Method Development',
  },
  {
    src: '/images/down stream/Tecan Freedom EVO.png',
    title: 'Tecan Freedom EVO Liquid Handler',
    subtitle: 'Robotic high-throughput liquid handling workstation for 96-well microscale chromatography resin plate screening.',
    tag: 'High-Throughput DSP',
  },
  {
    src: '/images/down stream/TFF System.png',
    title: 'Tangential Flow Filtration (TFF) System',
    subtitle: 'Precision lab and pilot-scale cassette ultrafiltration & diafiltration for product concentration and buffer exchange.',
    tag: 'UF/DF Skid',
  },
  {
    src: '/images/down stream/Column Storage Rack.png',
    title: 'Sanitized Column Storage & Handling Rack',
    subtitle: 'Dedicated cleanroom storage rack maintaining sanitized, pressure-tested chromatography columns ready for operation.',
    tag: 'Column Management',
  },
];

export const DRUG_PRODUCT_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/Drugproductdev/FDL Lab.png',
    title: 'Formulation & Drug Product (FDL) Laboratory',
    subtitle: 'State-of-the-art facility for formulation screening, excipient compatibility, and container closure integrity studies.',
    tag: 'Formulation Lab',
  },
  {
    src: '/images/Drugproductdev/Lyophilizer in FDL Lab.png',
    title: 'Development Lyophilizer (Freeze Dryer)',
    subtitle: 'Precision freeze-dryer equipped with 0.5 m² shelf area, Pirani gauge vacuum sensors, and controlled nucleation.',
    tag: 'Lyophilization',
  },
  {
    src: '/images/Drugproductdev/Cooling Chamber in FDL Lab.png',
    title: 'Precision Temperature & Cooling Chamber',
    subtitle: 'ICH Q1A stability chambers for real-time, accelerated, and freeze-thaw thermal stability evaluations.',
    tag: 'Stability Chamber',
  },
  {
    src: '/images/Drugproductdev/Density Analyzer & Viscometer in FDL Lab.jpg',
    title: 'Density Analyzer & Micro-Viscometer',
    subtitle: 'Sub-microliter rheological profiling for high-concentration monoclonal antibody formulations and syringeability.',
    tag: 'Viscosity & Rheology',
  },
];

export const ANALYTICAL_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/Analytical/Orbitrap.png',
    title: 'Thermo Scientific™ Orbitrap™ Mass Spectrometer',
    subtitle: 'Ultra-high resolution mass spectrometry for intact mass analysis, subunit profiling, and disulfide bond mapping.',
    tag: 'High-Res MS',
  },
  {
    src: '/images/Analytical/Q ToF.png',
    title: 'Q-TOF High-Resolution LC-MS/MS System',
    subtitle: 'Comprehensive peptide mapping, PTM site localization, sequence confirmation, and glycan identification.',
    tag: 'Peptide Mapping',
  },
  {
    src: '/images/Analytical/Biacore 8K+.png',
    title: 'Biacore™ 8K+ Surface Plasmon Resonance (SPR)',
    subtitle: 'High-throughput 8-needle parallel SPR for kinetic binding constants (Ka, Kd, KD), epitope binning, and Fc receptor affinity.',
    tag: 'SPR Kinetics',
  },
  {
    src: '/images/Analytical/Octet.png',
    title: 'Octet® Bio-Layer Interferometry (BLI)',
    subtitle: 'Label-free fluidic-free molecular interaction analysis for titer quantification and high-throughput binding screening.',
    tag: 'BLI Assay',
  },
  {
    src: '/images/Analytical/BIOPHASE.png',
    title: 'BioPhase 8800 Multi-Capillary Electrophoresis',
    subtitle: '8-capillary parallel CE-SDS and CIEF for high-throughput purity, size heterogeneity, and charge variant determination.',
    tag: 'Multi-Capillary CE',
  },
  {
    src: '/images/Analytical/Maurice.png',
    title: 'Maurice™ cIEF & CE-SDS System',
    subtitle: 'Automated capillary isoelectric focusing and CE-SDS delivering rapid charge heterogeneity profiling in under 10 minutes.',
    tag: 'cIEF & CE-SDS',
  },
  {
    src: '/images/Analytical/UPLC- Thermo.png',
    title: 'Thermo Scientific™ Vanquish™ Horizon UPLC',
    subtitle: 'Biocompatible binary and quaternary UPLC for high-resolution peptide mapping, glycan profiling, and intact mass coupling.',
    tag: 'UPLC Platform',
  },
  {
    src: '/images/Analytical/UPLC.png',
    title: 'Waters ACQUITY™ Arc / UPLC System',
    subtitle: 'Validated SEC-HPLC, IEX-HPLC, and reversed-phase methods for aggregation, purity, and batch release testing.',
    tag: 'Validated SEC/IEX',
  },
  {
    src: '/images/Analytical/Circular Dichroism.png',
    title: 'Circular Dichroism (CD) Spectrometer',
    subtitle: 'Far-UV and Near-UV CD spectroscopy for secondary (alpha-helix, beta-sheet) and tertiary higher order structure (HOS).',
    tag: 'HOS Spectroscopy',
  },
  {
    src: '/images/Analytical/FT-IR.png',
    title: 'FTIR Spectrometer with ATR Module',
    subtitle: 'Fourier Transform Infrared spectroscopy evaluating secondary structure conformational stability and protein folding.',
    tag: 'FTIR Structural',
  },
  {
    src: '/images/Analytical/nanoDSF.png',
    title: 'Prometheus nanoDSF Thermal Stability Analyzer',
    subtitle: 'High-precision intrinsic fluorescence measurement for thermal melting point (Tm), onset (Tonset), and aggregation (Tagg).',
    tag: 'nanoDSF Stability',
  },
  {
    src: '/images/Analytical/SoloVPE.png',
    title: 'SoloVPE Variable Pathlength Spectroscopy',
    subtitle: 'Rapid, direct protein concentration measurement without sample dilution via Slope Spectroscopy (Beer-Lambert law).',
    tag: 'SoloVPE',
  },
  {
    src: '/images/Analytical/Flow Cytometer.png',
    title: 'High-Performance Multi-Laser Flow Cytometer',
    subtitle: 'Multiparametric cell-based fluorescence analysis for target engagement, cellular binding, and ADCC/CDC bioassays.',
    tag: 'Flow Cytometry',
  },
  {
    src: '/images/Analytical/Multimode reader.png',
    title: 'Multimode Microplate Reader',
    subtitle: 'Fluorescence resonance energy transfer (FRET), luminescence, and absorbance for functional cell-based potency assays.',
    tag: 'Bioassay Reader',
  },
  {
    src: '/images/Analytical/Cell Celector.png',
    title: 'CellCelector Automated Single-Cell Picker',
    subtitle: 'Automated microscopic image-based selection and transfer of high-producing single clones with image audit trail.',
    tag: 'Clone Selection',
  },
  {
    src: '/images/Analytical/Liquid Handling System.png',
    title: 'Automated Robotic Liquid Handling System',
    subtitle: 'Precision multi-channel pipetting for high-throughput sample prep, ELISA assays, and automated serial dilutions.',
    tag: 'Robotic Liquid Handler',
  },
  {
    src: '/images/Analytical/AMBR15.png',
    title: 'Ambr® 15 Micro-Culture System',
    subtitle: 'Automated microbioreactor system supporting clone ranking, media evaluation, and analytical process sampling.',
    tag: 'Analytical Sampling',
  },
];

export function getSectionEquipment(sectionTitle: string): EquipmentItem[] | null {
  const lower = sectionTitle.toLowerCase();
  if (lower.includes('cell line') || lower.includes('cld')) {
    return CELL_DEV_EQUIPMENT;
  }
  if (lower.includes('upstream cgmp') || lower.includes('cgmp manufacturing') || lower.includes('upstream production')) {
    return UPSTREAM_GMP_EQUIPMENT;
  }
  if (lower.includes('upstream process') || lower.includes('upstream')) {
    return UPSTREAM_EQUIPMENT;
  }
  if (lower.includes('downstream') || lower.includes('dsp') || lower.includes('purification')) {
    return DOWNSTREAM_EQUIPMENT;
  }
  if (lower.includes('drug product') || lower.includes('formulation') || lower.includes('lyophilization')) {
    return DRUG_PRODUCT_EQUIPMENT;
  }
  if (lower.includes('analytical') || lower.includes('characterization')) {
    return ANALYTICAL_EQUIPMENT;
  }
  return null;
}
