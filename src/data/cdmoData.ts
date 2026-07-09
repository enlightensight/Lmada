export interface CDMOPage {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  heading: string;
  description: string;
  badge?: string;
  image?: string;
  stats?: { value: string; label: string; sublabel?: string }[];
  sections: { title: string; text: string; dark?: boolean; image?: string; iconName?: string }[];
  specs?: { label: string; value: string }[];
  faqs?: { question: string; answer: string }[];
}

export const cdmoData: CDMOPage[] = [
  // ==================== OVERVIEW CATEGORY ====================
  {
    slug: 'about',
    category: 'overview',
    title: 'About Lambda CDMO — Biologics Integrated Solutions Provider',
    metaTitle: 'About Lambda CDMO | Integrated Biologics Solutions Provider',
    metaDesc: 'Discover Lambda CDMO, an integrated solutions partner for biologics drug development, GMP manufacturing, and global clinical trials enablement. Based in Tallinn, Estonia with worldwide regulatory support.',
    badge: 'Overview',
    heading: 'Enabling clinical trials with premium biologics execution.',
    description: 'Lambda operates as an integrated solutions provider for biologics drug development, GMP manufacturing, and First-in-Human (FIH) clinical trials globally. Our agile, collaborative approach accelerates programs from pilot scale to commercialization, bridging the gap between discovery and market-ready therapeutics.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '20k', label: 'Sqft GMP Facility', sublabel: 'Built with state-of-the-art sterile manufacturing zones in Tallinn, Estonia.' },
      { value: 'FIH', label: 'Clinical Focus', sublabel: 'Dedicated to First-in-Human trial readiness with rapid IND-enabling pathways.' },
      { value: 'US/EU', label: 'Compliant Standards', sublabel: 'Designed to satisfy FDA, EMA, PMDA, and TGA regulatory guidelines.' },
    ],
    sections: [
      {
        title: 'Our Integrated Offering',
        text: 'In our CDMO offering, cutting-edge technical functions are fully engaged in providing end-to-end support to our customers in bolstering the development pathway for their lead biologics, bio-therapeutics, and biosimilars. We bridge the gap between discovery and GMP supply with seamless transitions across cell line engineering, process development, analytical validation, and clinical manufacturing.',
        dark: false,
      },
      {
        title: 'The Lambda Advantage',
        text: 'Our advantage is built on three pillars: accelerate, simplify, and succeed. These pillars enhance value for our customers and support their development requirements from discovery to IND filings. By combining agile project management with rigorous scientific execution, we reduce timelines without compromising quality or regulatory compliance.',
        dark: true,
      },
      {
        title: 'Global Regulatory Alignment',
        text: 'Lambda maintains comprehensive quality systems aligned with US FDA 21 CFR Part 11, EU EMA GMP guidelines, and ICH Q-series standards. Our documentation packages are inspection-ready, supporting seamless dossier submissions across North America, Europe, and Asia-Pacific markets.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Headquarters', value: 'Tallinn, Estonia' },
      { label: 'Service Coverage', value: 'Global (US, Europe, Asia, Japan)' },
      { label: 'Core Modalities', value: 'mAbs, Bispecifics, ADCs, Recombinant Proteins' },
      { label: 'Facility Size', value: '20,000 sqft cGMP Manufacturing' },
      { label: 'Cleanroom Grades', value: 'Grade A, B, C, and D Zones' },
    ],
    faqs: [
      { question: 'What makes Lambda different from other biologics CDMOs?', answer: 'Lambda combines integrated end-to-end services with an agile, collaborative approach. Unlike traditional CDMOs that operate in silos, our cell line, process, analytical, and manufacturing teams work under one roof, eliminating handoff delays and reducing overall program timelines by 30-40%.' },
      { question: 'Which regulatory markets does Lambda support?', answer: 'We support dossier filings and clinical trial applications across all major regulated markets including the United States (FDA), European Union (EMA), Japan (PMDA), Australia (TGA), and Health Canada. Our quality systems are built to be inspection-ready from day one.' },
      { question: 'What is the typical timeline from DNA to Research Cell Bank?', answer: 'Our streamlined cell line engineering platform typically delivers a Research Cell Bank (RCB) within 16 weeks from DNA sequence receipt. This includes vector design, transfection, clone screening, and stability assessment — significantly faster than the industry average of 24-28 weeks.' },
    ]
  },
  {
    slug: 'leadership',
    category: 'overview',
    title: 'Leadership Team — Lambda Biologics CDMO Experts',
    metaTitle: 'Leadership & Scientific Team | Lambda CDMO',
    metaDesc: 'Meet the executive and scientific leadership team at Lambda CDMO, with decades of global experience in biologics process development, GMP manufacturing, and IND filings across US, EU, and Asia.',
    badge: 'Leadership',
    heading: 'Scientific experts with wide international experience.',
    description: 'The management and scientific team at Lambda CDMO bring decades of combined experience in process and analytical sciences for the development, manufacturing, and technology transfer of biologics. Our leadership has guided programs from early discovery through commercial launch at leading global biopharmaceutical companies.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Expertise in Biotech Operations',
        text: 'Our leadership team is well-versed in flexibility and speed with a focus on product quality, phase-specific development, and proactive, transparent communication. We support tech transfers under tight timelines, having successfully executed over 50 technology transfers from client sites to our GMP facility.',
        dark: false,
      },
      {
        title: 'Scientific Advisory Board',
        text: 'Composed of leading industry scientists and regulatory consultants, our board ensures Lambda stays at the forefront of biological sciences. Members include former FDA reviewers, EMA inspectors, and chief scientific officers from top-20 biopharmaceutical companies.',
        dark: true,
      },
      {
        title: 'Global Regulatory Experience',
        text: 'Our regulatory affairs team has direct experience with over 100 IND filings, BLA submissions, and MAA applications across the US, EU, and Japan. This deep expertise ensures that every program is positioned for regulatory success from the earliest development stages.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Combined Experience', value: '200+ Years in Biotech' },
      { label: 'Publications', value: '500+ Peer-Reviewed Papers' },
      { label: 'IND Filings Supported', value: '100+ Global Submissions' },
      { label: 'Tech Transfers Executed', value: '50+ Successful Programs' },
    ],
    faqs: [
      { question: 'What is the background of Lambda\'s scientific leadership?', answer: 'Our scientific leadership team includes PhD-level experts with an average of 20+ years experience in biologics development. Key members have held senior positions at Genentech, Amgen, Biogen, and leading CDMOs, bringing deep expertise in cell line engineering, process development, and regulatory strategy.' },
      { question: 'How does Lambda ensure knowledge transfer to client teams?', answer: 'We assign dedicated scientific liaisons for each program who participate in regular technical meetings, provide detailed protocols and reports, and offer on-site training at client facilities. Our collaborative approach ensures seamless knowledge continuity.' },
    ]
  },
  {
    slug: 'facility',
    category: 'overview',
    title: 'Biologics GMP Facility & Infrastructure — Lambda CDMO',
    metaTitle: 'GMP Manufacturing Facility & Infrastructure | Lambda CDMO',
    metaDesc: 'Explore Lambda\'s state-of-the-art 20,000 sqft biologics CDMO facility built to support clinical drug substance (DS) and drug product (DP) manufacturing with Grade A-D cleanrooms.',
    badge: 'Facility',
    heading: 'State-of-the-art development & manufacturing facility.',
    description: 'Lambda\'s CDMO facility spans approximately 20,000 square feet with integrated development and manufacturing functions. This enables cGMP manufacturing services that provide our customers the opportunity to manufacture kilogram quantities of biologics drug substance and drug product of the highest quality to support clinical trials.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '20,000', label: 'Square Feet Area', sublabel: 'Integrated facility with grade-classified cleanrooms and dedicated analytical labs.' },
      { value: 'cGMP', label: 'Sterile Operations', sublabel: 'Separated cleanroom zones to prevent cross-contamination and ensure product integrity.' },
      { value: 'Kilogram', label: 'Production Scale', sublabel: 'Equipped to produce clinical batches of drug substance up to 500L bioreactor volume.' },
    ],
    sections: [
      {
        title: 'Advanced Cleanroom Design',
        text: 'The manufacturing facility is well-equipped and qualified with current quality requirements, including appropriate area grades (A through D), controlled movement of personnel and raw materials, and separated sterile operations. HVAC systems maintain continuous pressure differentials and HEPA-filtered air supply.',
        dark: false,
      },
      {
        title: 'Single-Use Bioreactor Systems',
        text: 'Our upstream production utilizes state-of-the-art single-use bioreactor technology ranging from 50L to 500L working volume. This disposable approach eliminates cleaning validation concerns, reduces cross-contamination risks, and enables rapid campaign turnaround between programs.',
        dark: true,
      },
      {
        title: 'Analytical Testing Laboratories',
        text: 'On-site QC laboratories are equipped with HPLC, UPLC, SEC-MALS, CE-SDS, and mass spectrometry platforms for real-time in-process testing and batch release. This proximity between manufacturing and analytics enables rapid decision-making and reduced release timelines.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Cleanroom Classifications', value: 'Grade A, B, C, and D zones' },
      { label: 'Bioreactor Capacities', value: 'Single-use bioreactors 50L to 500L' },
      { label: 'Filling Line', value: 'Automated aseptic vial filling and lyophilization' },
      { label: 'Environmental Monitoring', value: 'Continuous viable and non-viable particle counting' },
      { label: 'Warehouse', value: 'Temperature-controlled raw materials and product storage' },
    ],
    faqs: [
      { question: 'What cleanroom grades does Lambda operate?', answer: 'Our facility includes Grade A (filling isolators and laminar flow hoods), Grade B (background for Grade A operations), Grade C (processing areas for open product handling), and Grade D (support areas and closed system processing). All grades are continuously monitored for particles and microbial contamination.' },
      { question: 'Can Lambda support both drug substance and drug product manufacturing?', answer: 'Yes, our integrated facility supports the complete manufacturing chain from cell culture and purification (drug substance) through formulation, filling, and finishing (drug product). This end-to-end capability eliminates the need for external transfers and reduces overall program risk.' },
      { question: 'What is the maximum batch size Lambda can currently produce?', answer: 'Our current maximum batch size is 500L for drug substance manufacturing, typically yielding 1-3 kilograms of purified protein depending on the expression titer. We are planning expansion to 2000L trains in the next phase of facility development.' },
    ]
  },
  {
    slug: 'integrated',
    category: 'overview',
    title: 'Integrated Development to Manufacturing — Biologics Pathways',
    metaTitle: 'Integrated Development to Manufacturing | Lambda CDMO',
    metaDesc: 'Streamline your biologics pipeline with Lambda\'s integrated services, bridging the gap between cell line engineering and GMP drug product release under one roof.',
    badge: 'Integrated',
    heading: 'Cohesive transitions from cell line to drug product.',
    description: 'Our flexible capacity and equipment trains, combined with our agile, collaborative approach, give us the ability to scale up any biologic product for each unit operation — from pilot batch to clinical quantities — accelerating the time to file and market.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Bridging the Development Gap',
        text: 'Having cell line engineering, upstream/downstream process optimization, and aseptic drug product filling under one roof eliminates handoff delays. This unified structure drastically reduces clinical timelines by 30-40% compared to fragmented multi-site approaches.',
        dark: false,
      },
      {
        title: 'Agile Technology Transfers',
        text: 'Our technical teams collaborate directly from the development phase to the manufacturing floor. This ensures that parameters optimized in pilot runs transfer seamlessly to cGMP runs without unexpected scale-up issues, preserving product quality attributes throughout the scale-up journey.',
        dark: true,
      },
      {
        title: 'Single Point of Accountability',
        text: 'With Lambda as your integrated partner, you have a single point of contact for your entire biologics program. This simplifies communication, reduces administrative overhead, and ensures that scientific decisions made early in development are carried through to GMP execution without compromise.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Integrated Services', value: 'Cell Line through Drug Product' },
      { label: 'Timeline Reduction', value: '30-40% vs Multi-Site Approach' },
      { label: 'Tech Transfer Success Rate', value: '98% First-Run Success' },
      { label: 'Program Management', value: 'Dedicated Single Point of Contact' },
    ],
    faqs: [
      { question: 'What does "integrated" mean at Lambda?', answer: 'Integration means all critical functions — cell line engineering, upstream process development, downstream purification, analytical method development, and GMP manufacturing — operate under one roof with shared teams, systems, and quality oversight. This eliminates the delays and communication gaps typical of fragmented outsourcing models.' },
      { question: 'How does integration reduce program timelines?', answer: 'By co-locating development and manufacturing, we eliminate the months typically spent on formal technology transfers between separate organizations. Our teams can move seamlessly from development runs to GMP campaigns, often compressing overall timelines by 4-6 months.' },
    ]
  },
  {
    slug: 'quality',
    category: 'overview',
    title: 'Quality & Regulatory Compliance Framework — Lambda CDMO',
    metaTitle: 'Quality & Regulatory Compliance Framework | Lambda CDMO',
    metaDesc: 'Learn about Lambda\'s global quality standards. Built with compliance systems for US FDA, EU EMA, and PMDA regulatory filings with 21 CFR Part 11 and GAMP 5 alignment.',
    badge: 'Quality & Regulatory',
    heading: 'Global compliance framework for highly regulated markets.',
    description: 'The cGMP manufacturing facility is built with current global requirements for regulations and compliance in mind. We seamlessly support client requirements for dossier filings in highly regulated markets including the US, EU, Japan, TGA, and Health Canada.',
    image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    sections: [
      {
        title: 'Rigorous Quality Systems',
        text: 'We are building rigorous quality systems for data integrity, data retention, customer transparency, and information security. Our compliance systems ensure clients can count on us for integral, uniform, and continuous delivery of products that meet or exceed regulatory expectations.',
        dark: false,
      },
      {
        title: 'Data Integrity & IP Security',
        text: 'To safeguard client intellectual property, Lambda operates under strict network firewalls, partitioned access controls, and electronic data storage compliance aligned with FDA 21 CFR Part 11 standards. All data is encrypted at rest and in transit, with comprehensive audit trails for every system interaction.',
        dark: true,
      },
      {
        title: 'Regulatory Inspection Readiness',
        text: 'Our quality systems are designed to be inspection-ready from day one. We conduct internal audits quarterly, maintain comprehensive deviation and CAPA tracking, and prepare pre-submission packages that align with FDA, EMA, and PMDA reviewer expectations.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Regulatory Alignment', value: 'FDA, EMA, PMDA, TGA, Health Canada' },
      { label: 'Data Standards', value: '21 CFR Part 11 and GAMP 5 compliance' },
      { label: 'Intellectual Property', value: 'Secure network environments and dedicated project vaults' },
      { label: 'Quality Audits', value: 'Quarterly internal and annual third-party audits' },
      { label: 'CAPA System', value: 'Automated deviation tracking and corrective action' },
    ],
    faqs: [
      { question: 'How does Lambda ensure data integrity?', answer: 'We implement a comprehensive data governance framework aligned with ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate, plus Complete, Consistent, Enduring, and Available). All electronic systems are validated, access-controlled, and equipped with comprehensive audit trails.' },
      { question: 'What regulatory inspections has Lambda undergone?', answer: 'While we are a relatively new facility, our quality systems have been designed by former FDA and EMA inspectors. We have successfully completed pre-approval inspections by European qualified persons and are preparing for our first FDA inspection in the coming year.' },
      { question: 'How is client intellectual property protected?', answer: 'IP protection is embedded in our infrastructure: dedicated network segments per client, encrypted data storage, physical access controls, and strict confidentiality agreements. Our staff undergo regular IP protection training, and we never commingle client data or cell lines.' },
    ]
  },
  {
    slug: 'careers',
    category: 'overview',
    title: 'Careers at Lambda CDMO — Join Our Scientific Team',
    metaTitle: 'Careers | Join Lambda Biologics CDMO Team',
    metaDesc: 'Explore career opportunities in biotechnology, process sciences, quality control, and GMP manufacturing at Lambda\'s state-of-the-art facility in Tallinn, Estonia.',
    badge: 'Careers',
    heading: 'Join a team focused on scientific excellence.',
    description: 'We are always looking for talented scientists, quality assurance professionals, and bioprocess engineers to join our growing team. Work in a state-of-the-art facility and contribute to bringing life-saving therapeutics to clinical trials worldwide.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Why Work at Lambda?',
        text: 'We offer an international work environment, competitive compensation packages, and the opportunity to work with cutting-edge equipment in continuous bioprocessing, advanced bioassays, and characterization technologies. Our flat organizational structure ensures that every team member\'s voice is heard.',
        dark: false,
      },
      {
        title: 'Continuous Professional Growth',
        text: 'With a scientific leadership team well-versed in global operations, Lambda provides structured training programs, supporting our staff in mastering regulatory filings, bioprocess science developments, and advanced analytical techniques. We sponsor conference attendance and professional certifications.',
        dark: true,
      },
      {
        title: 'Open Positions',
        text: 'We regularly recruit for senior scientists in cell line engineering, upstream and downstream process development, analytical method development, quality assurance specialists, and GMP manufacturing operators. All positions offer relocation support for international candidates.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Location', value: 'Tallinn, Estonia' },
      { label: 'Team Size', value: '150+ Scientists and Engineers' },
      { label: 'Nationalities', value: '25+ Countries Represented' },
      { label: 'Benefits', value: 'Competitive Salary, Health Insurance, Stock Options' },
      { label: 'Growth', value: 'Structured Career Ladders' },
    ],
    faqs: [
      { question: 'What types of roles are currently open at Lambda?', answer: 'We are actively recruiting for senior cell line engineers, upstream process development scientists, analytical method development specialists, QC analysts, QA specialists, GMP manufacturing associates, and regulatory affairs managers. Visit our careers portal for current openings.' },
      { question: 'Does Lambda support professional development?', answer: 'Absolutely. We provide comprehensive onboarding, ongoing technical training, conference attendance budgets, and tuition reimbursement for advanced degrees. Many of our senior leaders started in junior roles and grew through our structured development programs.' },
    ]
  },

  // ==================== DEVELOPMENT SERVICES CATEGORY ====================
  {
    slug: 'cell-line',
    category: 'services',
    title: 'Cell Line Development & Engineering Services — Lambda CDMO',
    metaTitle: 'Cell Line Engineering & Development | Lambda CDMO',
    metaDesc: 'High-yield cell line engineering services for monoclonal antibodies (mAbs), bispecifics, and bi-functional scaffolds with CHO-K1 and CHO-S host systems. DNA to RCB in 16 weeks.',
    badge: 'Development Services',
    heading: 'High-productivity cell line engineering.',
    description: 'Lambda provides state-of-the-art cell line engineering services for monoclonal antibodies (mAbs), bispecifics, bi-functionals, and other recombinant protein scaffolds, ensuring stable expression and high expression titers in CHO-based host systems.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '16 wk', label: 'DNA-to-RCB Timeline', sublabel: 'Rapid cell line engineering with high-throughput screening.' },
      { value: '3-8 g/L', label: 'Expression Titers', sublabel: 'High-yield mAb clonal systems in fed-batch CHO lines.' },
      { value: '99.5%', label: 'Genetic Stability', sublabel: 'Confirmed over 60 generations via genomic analysis.' },
    ],
    sections: [
      {
        title: 'Advanced Vector Technology',
        text: 'Utilizing robust expression vectors and high-performance host cells, we generate clonal lines with high genetic stability and scalability. We optimize codon selections to enhance translation speeds and employ GS or DHFR selection systems for stable integration.',
        dark: false,
      },
      {
        title: 'Clone Selection & Screening',
        text: 'Our high-throughput robotic screening platforms evaluate hundreds of clones in parallel, selecting candidates based on yield, growth characteristics, product quality, and stability. We utilize automated cell counting, titer measurement, and charge variant profiling.',
        dark: true,
      },
      {
        title: 'Stability Assessment',
        text: 'Every lead clone undergoes comprehensive stability testing over 60+ generations to confirm genetic and phenotypic consistency. We evaluate expression titer, product quality attributes, and growth parameters at regular intervals to ensure long-term manufacturing suitability.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Host System', value: 'CHO-K1 and CHO-S clonal lineages' },
      { label: 'Expression Titers', value: 'Typically 3 - 8 g/L for mAbs' },
      { label: 'Timeline', value: 'DNA-to-Research Cell Bank in 16 weeks' },
      { label: 'Selection Systems', value: 'GS and DHFR knock-out platforms' },
      { label: 'Screening Capacity', value: '500+ clones evaluated per campaign' },
    ],
    faqs: [
      { question: 'What host cell lines does Lambda use?', answer: 'We primarily use CHO-K1 and CHO-S cell lines, which are the industry standard for therapeutic antibody production. We also have experience with specialized CHO variants for difficult-to-express proteins and can accommodate client-specific host lines if required.' },
      { question: 'How does Lambda achieve such high expression titers?', answer: 'Our high titers result from a combination of optimized expression vectors, carefully selected host cell backgrounds, media optimization, and rigorous clone screening. We typically achieve 3-8 g/L for standard IgG1 antibodies, with some programs reaching 10+ g/L under optimized conditions.' },
      { question: 'What is included in the 16-week DNA-to-RCB timeline?', answer: 'The 16-week timeline includes vector design and construction, transfection, pool recovery, single-cell cloning, initial screening, lead clone selection, stability assessment, and RCB production with full documentation. This is significantly faster than the industry average of 24-28 weeks.' },
    ]
  },
  {
    slug: 'process',
    category: 'services',
    title: 'Upstream & Downstream Process Development — Lambda CDMO',
    metaTitle: 'Upstream & Downstream Process Development | Lambda CDMO',
    metaDesc: 'Scale up your biologics product with Lambda\'s upstream and downstream bioprocess development, continuous manufacturing, and pilot runs from laboratory to cGMP.',
    badge: 'Development Services',
    heading: 'Process scaling from laboratory to cGMP bioreactors.',
    description: 'We develop robust, scalable, and optimized cell culture (upstream) and purification (downstream) processes to ensure high yield, product purity, and consistency during GMP manufacture. Our process development team bridges the gap between research and clinical production.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '50-500L', label: 'Process Scale Range', sublabel: 'From shake flasks to pilot-scale single-use bioreactors.' },
      { value: '95%', label: 'Downstream Recovery', sublabel: 'Typical product recovery across purification steps.' },
      { value: '<3%', label: 'Host Cell Protein', sublabel: 'Residual HCP levels after optimized purification.' },
    ],
    sections: [
      {
        title: 'Upstream Cultivation Optimization',
        text: 'We optimize feed strategies, media formulations, and bioreactor parameters (pH, DO, agitation) in scale-down models to maximize cell density and product yield while maintaining glycosylation patterns and other critical quality attributes.',
        dark: false,
      },
      {
        title: 'Downstream Purification & Intensification',
        text: 'Our purification science is designed to remove host cell proteins, DNA, and viral contaminants. We employ protein A affinity chromatography, ion exchange, hydrophobic interaction, and multimodal chromatography columns with process intensification methods.',
        dark: true,
      },
      {
        title: 'Process Characterization & Robustness',
        text: 'We conduct comprehensive process characterization studies to identify critical process parameters (CPPs) and establish proven acceptable ranges. Design of Experiments (DoE) approaches are used to map parameter interactions and define control strategies.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Upstream Platforms', value: 'Fed-batch and perfusion bioreactors' },
      { label: 'Chromatography', value: 'Protein A, IEX, HIC, MMC columns' },
      { label: 'Viral Clearance', value: 'Low pH inactivation and nanofiltration' },
      { label: 'Process Analytics', value: 'Real-time multi-parameter monitoring' },
      { label: 'Scale-Up Factor', value: 'Up to 100x from development to GMP' },
    ],
    faqs: [
      { question: 'What upstream platforms does Lambda develop?', answer: 'We develop both fed-batch and perfusion-based upstream processes. Fed-batch is our standard approach for most programs, while perfusion is recommended for high-titer programs or when continuous manufacturing is desired. We optimize media, feed strategies, and process parameters for each modality.' },
      { question: 'How does Lambda ensure viral safety in downstream processes?', answer: 'Our downstream platforms include multiple orthogonal viral clearance steps: low pH viral inactivation, detergent treatment, and 20nm nanofiltration. We validate these steps according to ICH Q5A guidelines and provide comprehensive viral clearance study reports for regulatory submissions.' },
    ]
  },
  {
    slug: 'analytical',
    category: 'services',
    title: 'Analytical Development & Method Validation — Lambda CDMO',
    metaTitle: 'Analytical Method Development & Validation | Lambda CDMO',
    metaDesc: 'Biologics analytical development, method validation, and characterization pipelines to support IND filings and quality releases for biosimilars and novel biologics.',
    badge: 'Development Services',
    heading: 'Scientific validation for biosimilars and novel biologics.',
    description: 'We develop and validate state-of-the-art analytical methods to characterize biological products, ensuring structural integrity, activity, and compliance with ICH Q2(R1) guidelines. Our analytical team supports programs from early development through commercial release.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '50+', label: 'Analytical Methods', sublabel: 'Comprehensive assay panels for biologics characterization.' },
      { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'All methods validated to international regulatory guidelines.' },
      { value: '99.8%', label: 'Method Precision', sublabel: 'Typical repeatability and intermediate precision.' },
    ],
    sections: [
      {
        title: 'Comprehensive Panel Setup',
        text: 'From early phase development, we establish assay panels for concentration, purity, charge variants, size variants, glycosylation, and potency. These panels support stability studies, comparability assessments, and technology transfers to QC release testing.',
        dark: false,
      },
      {
        title: 'Analytical Method Validation',
        text: 'All assays are validated for specificity, accuracy, precision, linearity, range, and robustness before being transferred to quality control (QC) for release testing. Validation protocols are designed to satisfy FDA, EMA, and ICH expectations.',
        dark: true,
      },
      {
        title: 'Higher-Order Structure Characterization',
        text: 'We employ advanced techniques including circular dichroism, differential scanning calorimetry, and hydrogen-deuterium exchange mass spectrometry to confirm the secondary, tertiary, and quaternary structure of biologics. These methods are critical for biosimilar comparability.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Chromatography', value: 'UPLC, HPLC, SEC, IEX, HILIC, RP-HPLC' },
      { label: 'Mass Spectrometry', value: 'QTOF LC-MS/MS, MALDI-TOF, CE-MS' },
      { label: 'Electrophoresis', value: 'CE-SDS, icIEF, 2D-PAGE' },
      { label: 'Bioassays', value: 'Cell-based, binding, and ELISA potency' },
      { label: 'Particle Analysis', value: 'Micro-Flow Imaging, Light Obscuration' },
    ],
    faqs: [
      { question: 'What analytical platforms does Lambda use for biologics characterization?', answer: 'We utilize a comprehensive suite of analytical platforms including UPLC/HPLC (concentration, purity, charge variants), SEC-MALS (size/aggregation), CE-SDS (purity/reduced and non-reduced), icIEF (charge heterogeneity), LC-MS/MS (peptide mapping, glycosylation), and cell-based bioassays (potency).' },
      { question: 'How does Lambda support biosimilar analytical comparability?', answer: 'Our biosimilar characterization program includes extensive physicochemical and functional analysis using multiple orthogonal techniques. We perform side-by-side comparability studies with the reference product, evaluating primary structure, higher-order structure, glycosylation, potency, and stability profiles.' },
    ]
  },

  // ==================== MANUFACTURING SERVICES CATEGORY ====================
  {
    slug: 'drug-substance',
    category: 'manufacturing',
    title: 'Drug Substance GMP Manufacturing — Lambda CDMO Biologics',
    metaTitle: 'cGMP Drug Substance (DS) Manufacturing | Lambda CDMO',
    metaDesc: 'Biologics drug substance manufacturing from pilot scale to clinical quantities under strict cGMP guidelines for global regulatory filing. Single-use bioreactor technology.',
    badge: 'Manufacturing Services',
    heading: 'Kilogram-scale GMP drug substance manufacturing.',
    description: 'Lambda provides cGMP manufacturing services for biological drug substances (DS), supporting programs with clinical-grade materials produced in qualified single-use bioreactor lines. Our manufacturing facility is designed for flexibility and rapid campaign turnaround.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '50-500L', label: 'SUB Capacities', sublabel: 'Single-use bioreactor trains in Grade C cleanrooms.' },
      { value: 'Grade C', label: 'Processing Environment', sublabel: 'Controlled cleanroom with continuous monitoring.' },
      { value: '1-3 kg', label: 'Typical Batch Yield', sublabel: 'Purified drug substance per manufacturing campaign.' },
    ],
    sections: [
      {
        title: 'Flexible Cultivation Trains',
        text: 'Our facility utilizes single-use bioreactor systems that offer flexible capacities and rapid turnaround times, minimizing contamination risks and maximizing speed to clinic. We can accommodate multiple programs simultaneously with dedicated equipment per campaign.',
        dark: false,
      },
      {
        title: 'Downstream Processing & Recovery',
        text: 'Purification is performed in cleanroom environments with automated chromatography systems, ensuring reproducible removal of impurities and high product recovery. Our downstream trains include protein A capture, polishing steps, viral filtration, and bulk formulation.',
        dark: true,
      },
      {
        title: 'In-Process Control & Monitoring',
        text: 'Every manufacturing campaign includes comprehensive in-process testing including cell density, viability, titer, purity, and bioburden. Real-time data monitoring allows our manufacturing team to make informed decisions and maintain process control throughout the batch.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Bioreactor Tech', value: 'Single-use bioreactors (SUBs)' },
      { label: 'Scale Range', value: '50L, 200L, and 500L trains' },
      { label: 'Cleanroom Class', value: 'Grade C environment for open processing' },
      { label: 'Purification', value: 'Protein A, IEX, HIC, viral filtration' },
      { label: 'Batch Record', value: 'Electronic batch management system' },
    ],
    faqs: [
      { question: 'What bioreactor sizes does Lambda offer for drug substance manufacturing?', answer: 'We currently operate single-use bioreactor trains at 50L, 200L, and 500L working volumes. This range supports programs from early clinical phases through Phase III. We are planning expansion to 2000L trains to support commercial manufacturing requirements.' },
      { question: 'How does Lambda prevent cross-contamination between programs?', answer: 'We utilize single-use technology throughout our manufacturing process, which eliminates the need for equipment cleaning between campaigns. Each program has dedicated consumables, and our facility design includes segregated processing suites with independent HVAC systems.' },
    ]
  },
  {
    slug: 'drug-product',
    category: 'manufacturing',
    title: 'Drug Product Aseptic Filling & Formulation — Lambda CDMO',
    metaTitle: 'cGMP Drug Product (DP) Filling & Formulation | Lambda CDMO',
    metaDesc: 'Biologics formulation development and aseptic fill/finish services for clinical batches under sterile cleanroom controls. Liquid and lyophilized vial formats.',
    badge: 'Manufacturing Services',
    heading: 'Formulation development and aseptic fill/finish.',
    description: 'We offer formulation development and sterile fill/finish services for biologics drug products (DP) in liquid or lyophilized vials, ensuring safety, stability, and sterility. Our aseptic processing capabilities support clinical trial supply for global studies.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: 'Grade A', label: 'Aseptic Filling', sublabel: 'Sterile filling under barrier isolator containment.' },
      { value: '2-20R', label: 'Vial Formats', sublabel: 'Glass vials with elastomeric stoppers and aluminum seals.' },
      { value: '100%', label: 'Visual Inspection', sublabel: 'Manual and semi-automated inspection for particulates.' },
    ],
    sections: [
      {
        title: 'Formulation Optimization',
        text: 'We optimize formulations to prevent protein aggregation and chemical degradation, evaluating pH, buffers, excipients, and stabilizing agents. Our formulation scientists conduct accelerated and stressed stability studies to identify the most robust presentation for each product.',
        dark: false,
      },
      {
        title: 'Sterile Aseptic Filling Lines',
        text: 'Filling is conducted in automated lines located inside Grade A isolation environments, ensuring particulate control and absolute product sterility. Our filling lines accommodate multiple vial sizes and can process both liquid and lyophilized presentations.',
        dark: true,
      },
      {
        title: 'Lyophilization Services',
        text: 'For products requiring enhanced stability, we offer lyophilization (freeze-drying) services. Our cycle development team optimizes freezing, primary drying, and secondary drying parameters to ensure cake appearance, reconstitution time, and potency retention meet specifications.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Filling Environment', value: 'Grade A isolator in Grade B background' },
      { label: 'Vial Sizes', value: '2R, 6R, 10R, 20R glass vials' },
      { label: 'Fill Volumes', value: '0.5 mL to 10 mL per vial' },
      { label: 'Lyophilizer', value: 'Pilot-scale freeze dryer (100L shelf)' },
      { label: 'Inspection', value: 'Manual and semi-automated visual inspection' },
    ],
    faqs: [
      { question: 'What vial formats does Lambda support?', answer: 'We support standard glass vial formats including 2R, 6R, 10R, and 20R sizes with appropriate elastomeric stoppers and aluminum overseals. We can accommodate both liquid and lyophilized presentations. Custom formats may be available upon request.' },
      { question: 'How does Lambda ensure sterility during filling operations?', answer: 'Our aseptic filling operations are conducted inside Grade A isolators with unidirectional airflow. All personnel use full sterile gowns, and environmental monitoring includes continuous viable and non-viable particle counting, surface monitoring, and settle plate exposure.' },
    ]
  },

  // ==================== CHARACTERIZATION CATEGORY ====================
  {
    slug: 'analytical-testing',
    category: 'characterization',
    title: 'Analytical Testing & Quality Control Releases — Lambda CDMO',
    metaTitle: 'Analytical Testing & Release Services | Lambda CDMO',
    metaDesc: 'Batch release and stability analytical testing for biologics drug substance and drug products according to GMP standards. Comprehensive QC release panels.',
    badge: 'Characterization & Testing',
    heading: 'Rigorous batch release and stability testing.',
    description: 'We perform quality release and stability testing for clinical and commercial batches, utilizing verified protocols to confirm purity, identity, potency, and safety. Our QC laboratories operate under GMP with comprehensive method validation and equipment qualification.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '99.9%', label: 'Analytical Purity', sublabel: 'Resolved using high-resolution chromatography variants.' },
      { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'Methods verified to satisfy international guidelines.' },
      { value: '21 CFR', label: 'Part 11 Compliant', sublabel: 'Secure electronic data records and log tracking.' },
    ],
    sections: [
      {
        title: 'GMP Batch Release Testing',
        text: 'Every batch undergoes rigorous quality testing to verify compliance with release specifications before shipping to clinical trial sites globally. Our release panel includes identity, purity, potency, safety, and stability-indicating assays tailored to each product.',
        dark: false,
      },
      {
        title: 'ICH Stability Programs',
        text: 'We execute stability studies under controlled temperature and humidity conditions to define shelf-life and appropriate storage criteria. Our stability chambers are mapped and monitored continuously, with protocols aligned to ICH Q1A(R2) guidelines.',
        dark: true,
      },
      {
        title: 'Method Transfer & Validation',
        text: 'We specialize in transferring analytical methods from client laboratories or development teams to our GMP QC environment. Each transfer includes method feasibility assessment, precision studies, and analyst qualification to ensure reliable results.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Chromatography Platforms', value: 'UPLC, SEC, IEX, HILIC, RP-HPLC' },
      { label: 'Mass Spectrometry', value: 'QTOF LC-MS/MS Peptide Mapping' },
      { label: 'Quality System Standards', value: 'cGMP, FDA/EMA Inspection Ready' },
      { label: 'Stability Chambers', value: 'ICH Q1A(R2) compliant, mapped and monitored' },
      { label: 'Turnaround Time', value: '5-7 business days for routine release' },
    ],
    faqs: [
      { question: 'What is included in a typical batch release panel?', answer: 'A typical release panel includes appearance, pH, osmolality, protein concentration (UV or A280), purity by SEC-HPLC and CE-SDS, charge variant analysis by icIEF, potency by cell-based bioassay, endotoxin (LAL), sterility, and particulate matter (subvisible and visible).' },
      { question: 'How does Lambda manage stability programs?', answer: 'We design stability protocols according to ICH Q1A(R2) with storage conditions at -80°C, -20°C, 2-8°C, 25°C/60%RH, and 40°C/75%RH. Timepoints are typically 0, 1, 3, 6, 9, 12, 18, 24, and 36 months. All chambers are continuously monitored with alarm systems.' },
    ]
  },
  {
    slug: 'physicochemical',
    category: 'characterization',
    title: 'Physicochemical Characterization & Structural Analysis — Lambda',
    metaTitle: 'Physicochemical Characterization | Lambda CDMO',
    metaDesc: 'In-depth physicochemical characterization and higher-order structural analysis of biologics and biosimilar molecules using SEC-MALS, CE-SDS, and mass spectrometry.',
    badge: 'Characterization & Testing',
    heading: 'Deep structural analysis and characterization.',
    description: 'Lambda provides physicochemical characterization including higher-order structure analysis, molecular weight distribution, and charge isoform profiling. Our orthogonal analytical toolkit supports biosimilar comparability and novel biologics development.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '99.8%', label: 'Sequence Coverage', sublabel: 'Resolved via LC-MS/MS peptide mapping.' },
      { value: '0.1%', label: 'Impurity Detection', sublabel: 'Limit of detection for size and charge variants.' },
      { value: 'ICH Q6B', label: 'Specification Standard', sublabel: 'Biologics test procedure alignment.' },
    ],
    sections: [
      {
        title: 'Primary & Higher-Order Structures',
        text: 'We analyze amino acid sequences, disulfide bonds, and secondary/tertiary structures using mass spectrometry, circular dichroism, and differential scanning calorimetry. These analyses confirm that the molecule folds correctly and maintains its intended structural features.',
        dark: false,
      },
      {
        title: 'Purity & Impurity Profiles',
        text: 'We resolve charge heterogeneity, size variants (aggregates and fragments), and glycan variations using advanced chromatography and electrophoresis. Our impurity profiling identifies process-related and product-related species at trace levels.',
        dark: true,
      },
      {
        title: 'Glycosylation Analysis',
        text: 'Protein glycosylation is critical for biologics activity and half-life. We profile N-linked and O-linked glycans using enzymatic release, fluorescent labeling, and HILIC or RP-LC separation with mass spectrometry detection. Glycan profiles are compared for biosimilar programs.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Peptide Mapping', value: 'Trypsin/Lys-C digestion with LC-MS/MS' },
      { label: 'Disulfide Bond Analysis', value: 'Non-reduced peptide mapping' },
      { label: 'Aggregation Analysis', value: 'SEC-MALS, AUC, DLS' },
      { label: 'Thermal Stability', value: 'DSC, DSF, accelerated stress' },
      { label: 'Glycan Profiling', value: 'HILIC-UPLC with fluorescence detection' },
    ],
    faqs: [
      { question: 'What techniques does Lambda use for higher-order structure analysis?', answer: 'We employ multiple orthogonal techniques including circular dichroism (CD) for secondary structure, differential scanning calorimetry (DSC) for thermal stability, hydrogen-deuterium exchange mass spectrometry (HDX-MS) for solvent accessibility, and Fourier-transform infrared spectroscopy (FTIR) for secondary structure confirmation.' },
      { question: 'How does Lambda analyze protein glycosylation?', answer: 'Our glycosylation analysis workflow includes enzymatic release of N-glycans (PNGase F) and O-glycans, fluorescent labeling (2-AB or procainamide), and separation by HILIC-UPLC with fluorescence and mass spectrometry detection. We quantify major glycan species and report relative percentages.' },
    ]
  },
  {
    slug: 'bioassays',
    category: 'characterization',
    title: 'In Vitro Bioassays & Immunogenicity Testing — Lambda CDMO',
    metaTitle: 'Bioassays & Immunogenicity Testing | Lambda CDMO',
    metaDesc: 'In vitro bioassays and clinical immunogenicity safety testing for novel monoclonal antibodies, peptides, and ADCs. Cell-based potency and ADA assays.',
    badge: 'Characterization & Testing',
    heading: 'In vitro safety and potency validation assays.',
    description: 'We establish in vitro biological assays and immunogenicity testing panels to define potency, mechanism of action, and potential safety risks. Our bioassay team develops and validates cell-based and binding assays for IND-enabling studies and batch release.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '50+', label: 'Cell Lines Available', sublabel: 'Reporter, proliferation, and target-expressing lines.' },
      { value: 'CV <10%', label: 'Assay Precision', sublabel: 'Typical intra-assay and inter-assay variability.' },
      { value: 'ICH S6', label: 'Safety Standard', sublabel: 'Biologics safety assessment alignment.' },
    ],
    sections: [
      {
        title: 'Potency Bioassays',
        text: 'We design cell-based bioassays to determine biological activity, evaluating receptor binding, signal transduction, cell proliferation, or cytotoxicity depending on the mechanism of action. Assays are developed with appropriate controls, reference standards, and statistical acceptance criteria.',
        dark: false,
      },
      {
        title: 'Immunogenicity Safety Assessment',
        text: 'We assess anti-drug antibody (ADA) profiles in human cell models to identify potential immunogenic safety risks for novel biologics. Our immunogenicity risk assessment includes T-cell epitope prediction and in vitro T-cell activation assays.',
        dark: true,
      },
      {
        title: 'Binding Assay Development',
        text: 'We develop and validate SPR (surface plasmon resonance) and ELISA-based binding assays to measure affinity, kinetics, and specificity. These assays support comparability studies, lot release, and characterization of biosimilars and novel biologics.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Assay Platforms', value: 'Cell-based, SPR, ELISA, FACS' },
      { label: 'Cell Lines', value: 'CHO, HEK293, primary human cells' },
      { label: 'Potency Range', value: 'Relative potency 50-150% acceptance' },
      { label: 'ADA Methods', value: 'Screening, confirmatory, titration' },
      { label: 'Effector Function', value: 'ADCC, CDC, ADCP evaluation' },
    ],
    faqs: [
      { question: 'What types of potency assays does Lambda develop?', answer: 'We develop mechanism-of-action reflective potency assays including cell proliferation inhibition, reporter gene activation, target binding inhibition, and cytotoxicity assays. The choice of assay depends on the product\'s intended mechanism and regulatory requirements.' },
      { question: 'How does Lambda assess immunogenicity risk?', answer: 'Our immunogenicity risk assessment includes in silico T-cell epitope prediction using proprietary algorithms, in vitro T-cell proliferation assays with human donor PBMCs, and ADA assay development for clinical monitoring. This multi-tier approach provides comprehensive risk profiling.' },
    ]
  },
  {
    slug: 'microbiological',
    category: 'characterization',
    title: 'Microbiological Assays & Sterility Testing — Lambda CDMO',
    metaTitle: 'Microbiological Testing & Sterility Assays | Lambda CDMO',
    metaDesc: 'Sterility testing, microbial limit tests, and bacterial endotoxin testing (BET) for clinical batch release compliance under GMP standards.',
    badge: 'Characterization & Testing',
    heading: 'Sterility and endotoxin safety validation.',
    description: 'We execute microbiological release tests including sterility, microbial limits, bioburden, and bacterial endotoxins (BET) to verify biological safety. Our microbiology laboratory operates under GMP with validated methods and environmental monitoring.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '<0.25', label: 'EU/mL Endotoxin', sublabel: 'Typical limit for parenteral biologics.' },
      { value: '0 CFU', label: 'Sterility Standard', sublabel: 'No viable microorganisms detected per USP <71>.' },
      { value: 'USP/EP', label: 'Method Alignment', sublabel: 'Pharmacopeial sterility and endotoxin methods.' },
    ],
    sections: [
      {
        title: 'Sterility Test Validation',
        text: 'Using membrane filtration or direct inoculation in cleanroom environments, we ensure absolute freedom from viable microorganisms. Our sterility testing is performed according to USP <71> and EP 2.6.1 with validated bacteriostasis/fungistasis neutralization for each product.',
        dark: false,
      },
      {
        title: 'Endotoxin & Bioburden Control',
        text: 'We perform LAL-based endotoxin assays (kinetic chromogenic and turbidimetric) and bioburden screens to evaluate raw materials, in-process samples, and final drug products. All methods are validated for specificity, sensitivity, and robustness.',
        dark: true,
      },
      {
        title: 'Microbial Identification',
        text: 'When microorganisms are detected during environmental monitoring or testing, we perform rapid identification using MALDI-TOF mass spectrometry. This allows quick root cause analysis and implementation of corrective actions to prevent recurrence.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Sterility Method', value: 'USP <71> membrane filtration' },
      { label: 'Endotoxin Method', value: 'Kinetic LAL (chromogenic/turbidimetric)' },
      { label: 'Bioburden Method', value: 'USP <61> microbial enumeration' },
      { label: 'Identification', value: 'MALDI-TOF mass spectrometry' },
      { label: 'Monitoring', value: 'Continuous viable and non-viable particle counting' },
    ],
    faqs: [
      { question: 'What sterility testing methods does Lambda use?', answer: 'We perform sterility testing according to USP <71> and EP 2.6.1 using membrane filtration for most biologics products. For products with antimicrobial properties, we validate neutralization methods to ensure that any inhibitory activity does not mask microbial contamination.' },
      { question: 'What is the typical endotoxin limit for biologics?', answer: 'For most parenteral biologics, the endotoxin limit is typically <5 EU/kg body weight per hour, which usually translates to <0.25-1.0 EU/mL for the drug product. We establish specific limits for each product based on dose, route of administration, and clinical population.' },
    ]
  },

  // ==================== MODALITIES CATEGORY ====================
  {
    slug: 'mabs',
    category: 'modalities',
    title: 'Monoclonal Antibodies (mAbs) Development & GMP — Lambda CDMO',
    metaTitle: 'Monoclonal Antibodies (mAbs) Development & GMP | Lambda CDMO',
    metaDesc: 'End-to-end development and GMP manufacturing of Monoclonal Antibodies (IgG1, IgG2, IgG4), bi-specifics, and biosimilars. Cell line through drug product.',
    badge: 'Modalities',
    heading: 'Comprehensive solutions for therapeutic antibodies.',
    description: 'Lambda provides end-to-end development, characterization, and GMP clinical manufacturing services for monoclonal antibodies (mAbs) across various subclasses (IgG1, IgG2, IgG4) and related structural formats including Fc-fusion proteins and antibody fragments.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: 'IgG1/2/4', label: 'Isotype Support', sublabel: 'Full subclass coverage with tailored analytics.' },
      { value: '8+ g/L', label: 'Expression Titers', sublabel: 'High-yield platform for standard mAbs.' },
      { value: '95%', label: 'Purity Target', sublabel: 'SEC-HPLC monomer purity post-purification.' },
    ],
    sections: [
      {
        title: 'Tailored Antibody Pipelines',
        text: 'From cell line development to downstream recovery, our platform is optimized for monoclonal antibodies, ensuring high expression yields and consistent quality attributes. We have extensive experience with IgG1, IgG2, and IgG4 subclasses, each requiring specific process optimization.',
        dark: false,
      },
      {
        title: 'Isotype Characterization',
        text: 'Our orthogonal analytical toolkits support the characterization of IgG2 and IgG4 isotypes alongside standard IgG1 structures, tracking glycan variants, charge profiles, and higher-order structures. We understand the unique challenges of each subclass including IgG4 half-molecule exchange.',
        dark: true,
      },
      {
        title: 'Biosimilar Development',
        text: 'We support biosimilar programs with comprehensive analytical comparability packages, including physicochemical, biological, and immunological characterization. Our approach aligns with FDA and EMA biosimilar guidelines, ensuring robust similarity demonstrations.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Supported Isotypes', value: 'IgG1, IgG2, IgG4, Fc-fusions' },
      { label: 'Expression System', value: 'CHO-K1 and CHO-S platforms' },
      { label: 'Typical Titer', value: '3-8 g/L in fed-batch culture' },
      { label: 'Purity', value: '>95% monomer by SEC-HPLC' },
      { label: 'Endotoxin', value: '<0.25 EU/mL' },
    ],
    faqs: [
      { question: 'Which antibody isotypes does Lambda support?', answer: 'We have extensive experience with IgG1, IgG2, and IgG4 subclasses, as well as Fc-fusion proteins, Fab fragments, and scFv formats. Each isotype presents unique process and analytical challenges that our team is equipped to address, particularly IgG4 half-molecule exchange and IgG2 disulfide isoforms.' },
      { question: 'Can Lambda support biosimilar mAb development?', answer: 'Yes, we have a dedicated biosimilar development program that includes comprehensive analytical comparability, process development to match the reference product quality profile, and regulatory strategy support. Our analytical packages include extensive physicochemical and biological characterization.' },
    ]
  },
  {
    slug: 'bispecifics',
    category: 'modalities',
    title: 'Bispecific & Bi-functional Antibodies Development — Lambda CDMO',
    metaTitle: 'Bispecific & Bi-functional Antibodies Development | Lambda CDMO',
    metaDesc: 'Solve expression and assembly challenges for bispecific and bi-functional biotherapeutic molecules with Lambda\'s specialized process sciences.',
    badge: 'Modalities',
    heading: 'Overcoming assembly challenges for bispecifics.',
    description: 'We address purification and correct assembly challenges for bispecific and bi-functional molecules, employing specialized downstream process development techniques to maximize correct pairing and minimize homodimer contaminants.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '>90%', label: 'Correct Assembly', sublabel: 'Typical heterodimer purity after optimization.' },
      { value: '3-5 g/L', label: 'Expression Titers', sublabel: 'Fed-batch titers for bispecific formats.' },
      { value: '5+', label: 'Formats Supported', sublabel: 'KiH, CrossMab, DVD-Ig, and scFv-based.' },
    ],
    sections: [
      {
        title: 'Stable Expression of Complex Formats',
        text: 'We engineer cell lines that optimize the ratio of heavy and light chains, reducing mispaired homodimers and ensuring stable production. Our vector designs include knob-into-hole (KiH) and other chain-pairing technologies that promote correct heterodimer assembly.',
        dark: false,
      },
      {
        title: 'Downstream Separation of Variants',
        text: 'Our chromatographic strategies separate mispaired variants from correctly assembled bispecific molecules, achieving high target purity. We employ hydrophobic interaction, mixed-mode, and custom affinity chromatography tailored to each bispecific format.',
        dark: true,
      },
      {
        title: 'Format-Specific Analytics',
        text: 'Bispecific molecules require specialized analytical methods to confirm correct assembly and identify mispaired species. We develop non-reduced CE-SDS, mass spectrometry, and bioassays that specifically evaluate the presence of homodimers and half-molecules.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Supported Formats', value: 'KiH, CrossMab, DVD-Ig, DART, BiTE' },
      { label: 'Host System', value: 'CHO-K1 with optimized chain ratios' },
      { label: 'Heterodimer Purity', value: '>90% by HIC and CE-SDS' },
      { label: 'Analytics', value: 'Non-reduced CE-SDS, MS, bioassay' },
      { label: 'Potency', value: 'Dual-target binding confirmation' },
    ],
    faqs: [
      { question: 'What bispecific formats does Lambda support?', answer: 'We support a wide range of bispecific formats including knob-into-hole (KiH) IgG, CrossMab, DVD-Ig, DART molecules, BiTEs, and various scFv-based architectures. Our experience covers both symmetric and asymmetric designs with different chain-pairing strategies.' },
      { question: 'How does Lambda achieve high heterodimer purity?', answer: 'We employ a multi-pronged approach: optimized vector designs that promote correct chain pairing (e.g., KiH mutations), cell line screening for balanced chain expression, and downstream purification using hydrophobic interaction chromatography that exploits the differential hydrophobicity of homodimers versus heterodimers.' },
    ]
  },
  {
    slug: 'adcs',
    category: 'modalities',
    title: 'Antibody-Drug Conjugates (ADCs) Characterization — Lambda CDMO',
    metaTitle: 'Antibody-Drug Conjugates (ADCs) Characterization | Lambda CDMO',
    metaDesc: 'Specialized bioassays and analytical testing for antibody-drug conjugates (ADCs) payload distributions, DAR analysis, and stability.',
    badge: 'Modalities',
    heading: 'Characterization of antibody-drug conjugates.',
    description: 'Lambda offers analytical testing and characterization support for Antibody-Drug Conjugates (ADCs), evaluating conjugation ratios, payload distributions, and stability profiles. Our ADC expertise supports both development and GMP release testing.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: 'DAR 2-8', label: 'Drug Loading Range', sublabel: 'Optimized for efficacy and safety balance.' },
      { value: '<2%', label: 'Free Drug Content', sublabel: 'Unconjugated payload after purification.' },
      { value: '99%', label: 'Conjugation Efficiency', sublabel: 'Typical conversion in optimized reactions.' },
    ],
    sections: [
      {
        title: 'Drug-to-Antibody Ratio (DAR)',
        text: 'We determine drug loading profiles and DAR values using hydrophobic interaction chromatography (HIC), reversed-phase HPLC, and mass spectrometry. Understanding the DAR distribution is critical for ADC efficacy, as both under-conjugated and over-conjugated species can impact therapeutic window.',
        dark: false,
      },
      {
        title: 'Conjugate Stability & In Vitro Potency',
        text: 'We perform stability screens to confirm conjugate integrity in circulation, evaluating potency via targeted cytotoxic bioassays. ADCs are particularly susceptible to payload deconjugation and aggregation, which our stability programs are designed to detect.',
        dark: true,
      },
      {
        title: 'Payload & Linker Characterization',
        text: 'Beyond the antibody component, we characterize the payload and linker chemistry including cleavable versus non-cleavable designs, drug release kinetics, and linker stability. These analyses inform formulation development and in vivo performance predictions.',
        dark: false,
      }
    ],
    specs: [
      { label: 'DAR Methods', value: 'HIC, RP-HPLC, LC-MS' },
      { label: 'Payload Types', value: 'MMAE, DM1, PBD, maytansinoids' },
      { label: 'Linker Chemistry', value: 'Cleavable and non-cleavable' },
      { label: 'Potency', value: 'Targeted cytotoxicity assays' },
      { label: 'Stability', value: 'Forced degradation and real-time' },
    ],
    faqs: [
      { question: 'What DAR analysis methods does Lambda use?', answer: 'We employ multiple orthogonal techniques for DAR determination: hydrophobic interaction chromatography (HIC) for DAR distribution profiling, reversed-phase HPLC for reduced chain analysis, and intact mass LC-MS for average DAR calculation. These methods provide complementary information about the conjugation pattern.' },
      { question: 'How does Lambda assess ADC stability?', answer: 'Our ADC stability program evaluates both the antibody and payload components under stressed and real-time conditions. We monitor for payload deconjugation, aggregation, and potency loss using stability-indicating methods. This comprehensive approach ensures that the product maintains its intended quality throughout shelf life.' },
    ]
  },
  {
    slug: 'proteins-peptides',
    category: 'modalities',
    title: 'Recombinant Proteins & Peptides Development — Lambda CDMO',
    metaTitle: 'Recombinant Proteins & Peptides Development | Lambda CDMO',
    metaDesc: 'GMP manufacturing and process development services for recombinant proteins, active peptides, and novel biotherapeutic scaffolds. Custom expression platforms.',
    badge: 'Modalities',
    heading: 'Processing services for proteins & peptides.',
    description: 'We adapt process sciences to develop and manufacture recombinant proteins, active peptides, and biological fusion constructs. Our flexible platform accommodates diverse molecular characteristics including complex disulfide bonding, post-translational modifications, and non-standard amino acids.',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '5-50 kDa', label: 'Molecular Weight Range', sublabel: 'From small peptides to large fusion proteins.' },
      { value: 'E. coli/CHO', label: 'Expression Hosts', sublabel: 'Bacterial and mammalian systems available.' },
      { value: '98%', label: 'Purity Target', sublabel: 'High-purity products for clinical applications.' },
    ],
    sections: [
      {
        title: 'Custom Upstream Expressions',
        text: 'We select expression hosts and develop fermentation profiles tailored to the folding and stability requirements of each specific protein scaffold. For complex proteins requiring glycosylation, we use CHO-based systems. For simpler peptides, E. coli may offer advantages in yield and turnaround time.',
        dark: false,
      },
      {
        title: 'Analytical Profiling of Novel Formats',
        text: 'We establish customized assay panels to evaluate purity, activity, and degradation paths for non-antibody biological templates. Each protein class requires specific analytical strategies that our team develops based on the molecule\'s unique structural and functional characteristics.',
        dark: true,
      },
      {
        title: 'Peptide Synthesis & Modification',
        text: 'For smaller peptides, we offer solid-phase peptide synthesis (SPPS) capabilities with standard and non-standard amino acids. We also support peptide modifications including PEGylation, cyclization, and conjugation to carrier proteins or antibodies.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Expression Systems', value: 'CHO, E. coli, yeast' },
      { label: 'Molecular Weight Range', value: '1 kDa to 200 kDa' },
      { label: 'Peptide Synthesis', value: 'SPPS up to 50 amino acids' },
      { label: 'Modifications', value: 'PEGylation, cyclization, glycosylation' },
      { label: 'Purity', value: '>95% by RP-HPLC' },
    ],
    faqs: [
      { question: 'What expression systems does Lambda use for non-antibody proteins?', answer: 'We utilize CHO cells for complex proteins requiring mammalian post-translational modifications, E. coli for simpler proteins and peptides, and yeast systems for specific applications. The choice depends on the protein\'s complexity, required modifications, and intended therapeutic use.' },
      { question: 'Can Lambda manufacture peptide therapeutics?', answer: 'Yes, we offer both recombinant expression and solid-phase peptide synthesis (SPPS) for peptide therapeutics. Our SPPS capabilities support standard and modified amino acids, cyclization, and PEGylation. We can handle peptides up to approximately 50 amino acids via chemical synthesis.' },
    ]
  },

  // ==================== INSIGHTS CATEGORY ====================
  {
    slug: 'blogs',
    category: 'insights',
    title: 'Scientific Blogs & Technical Articles — Lambda CDMO Insights',
    metaTitle: 'Scientific Blogs & Insights | Lambda CDMO',
    metaDesc: 'Read technical articles, blogs, and bioprocess reviews written by the scientific team at Lambda CDMO covering continuous manufacturing, analytical methods, and regulatory strategy.',
    badge: 'Insights',
    heading: 'Reflections on process sciences and compliance.',
    description: 'Our scientific staff reviews trends in bioprocessing, continuous manufacturing, analytical methods validation, and IND regulatory filings. These articles reflect our hands-on experience and commitment to advancing the field of biologics development.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Trending Bioprocess Scientific Reviews',
        text: 'We publish articles reviewing glycosylation controls, single-use bioreactor validation, chromatography column scaling, and aseptic fill/finish safety. Our content is written by scientists who are actively working on these technologies in our GMP facility.',
        dark: false,
      },
      {
        title: 'Regulatory Strategy Insights',
        text: 'Our regulatory affairs team shares perspectives on FDA guidance documents, EMA scientific advice, and ICH guideline updates. These insights help our clients and the broader biotech community navigate the evolving regulatory landscape for biologics.',
        dark: true,
      },
      {
        title: 'Case Study Highlights',
        text: 'We regularly publish anonymized case studies illustrating successful tech transfers, process optimizations, and regulatory submissions. These real-world examples provide practical guidance for biotech professionals facing similar challenges.',
        dark: false,
      },
      {
        title: 'Emerging Technology Spotlights',
        text: 'From continuous bioprocessing to artificial intelligence in drug discovery, we explore emerging technologies that could transform the biologics industry. Our evaluations are grounded in practical implementation experience rather than theoretical speculation.',
        dark: true,
      }
    ],
    faqs: [
      { question: 'How often does Lambda publish new articles?', answer: 'We publish 2-3 technical articles per month covering bioprocess development, analytical methods, regulatory strategy, and emerging technologies. Our content is written by the scientists and engineers who are actively working on these topics in our facility.' },
      { question: 'Can I subscribe to Lambda\'s blog updates?', answer: 'Yes, you can subscribe to our newsletter through the contact form. Subscribers receive monthly digests of new articles, upcoming webinars, and industry event announcements. We never share your contact information with third parties.' },
    ]
  },
  {
    slug: 'case-studies',
    category: 'insights',
    title: 'Biologics Case Studies & Technical Reports — Lambda CDMO',
    metaTitle: 'Biologics Case Studies & Technical Reports | Lambda CDMO',
    metaDesc: 'Explore case studies outlining successful cell line engineering, technology transfers, and IND filings by Lambda CDMO. Real-world data and results.',
    badge: 'Insights',
    heading: 'Real-world data and tech transfer success.',
    description: 'Read technical reports illustrating expression titer enhancements, purification yield optimization, and global dossier submission timelines. Our case studies demonstrate the tangible outcomes of our integrated approach to biologics development.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Stable Scale-Up Case Reports',
        text: 'Learn how our collaborative team took a complex bispecific construct from pilot scale expression to cGMP drug substance release in under 6 months. The program achieved 4.2 g/L expression titer and >95% heterodimer purity, enabling rapid IND filing.',
        dark: false,
      },
      {
        title: 'Tech Transfer Excellence',
        text: 'A client transferred a challenging ADC program from an academic laboratory to our GMP facility. We successfully scaled the conjugation process 100-fold while maintaining DAR consistency and reducing free drug content from 5% to <1%.',
        dark: true,
      },
      {
        title: 'Regulatory Submission Success',
        text: 'Our regulatory team supported a European biotech through their first FDA IND submission for a novel mAb. The submission was accepted without major deficiencies on the first review cycle, enabling the client to initiate Phase I trials 3 months ahead of schedule.',
        dark: false,
      },
      {
        title: 'Process Optimization Results',
        text: 'Through systematic DoE optimization, we increased a client\'s purification yield from 65% to 89% while simultaneously improving product purity from 92% to 98%. These improvements translated to significant cost savings and faster batch turnaround.',
        dark: true,
      }
    ],
    faqs: [
      { question: 'Are Lambda\'s case studies based on real programs?', answer: 'Yes, all case studies are based on actual client programs. However, we anonymize client identities and specific molecule details to protect intellectual property and confidentiality. The technical data and outcomes presented are authentic and representative of our capabilities.' },
      { question: 'Can I request a specific case study relevant to my program?', answer: 'Absolutely. Contact our business development team with your specific modality and development stage, and we will provide relevant case studies that demonstrate our experience in similar programs. We can also arrange confidential discussions under CDA if needed.' },
    ]
  },
  {
    slug: 'brochures',
    category: 'insights',
    title: 'Download Product Brochures & Service Slates — Lambda CDMO',
    metaTitle: 'Product Brochures & Service Slates | Lambda CDMO',
    metaDesc: 'Download service slates, equipment profiles, and cleanroom capability brochures for Lambda CDMO biologics manufacturing. Technical specifications and capabilities.',
    badge: 'Insights',
    heading: 'Capability summaries and equipment profiles.',
    description: 'Retrieve PDF brochures detailing cell line engineering systems, analytical capabilities, GMP sterile fills, and regulatory support services. Our technical documentation provides comprehensive specifications for evaluating Lambda as your CDMO partner.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Facility Technical Factsheets',
        text: 'Detailed specifications of our 20,000 sqft GMP site, cleanroom grades (A-D), single-use bioreactors, analytical laboratory equipment, and environmental monitoring systems. These factsheets are regularly updated as our capabilities expand.',
        dark: false,
      },
      {
        title: 'Service Capability Overviews',
        text: 'Comprehensive summaries of our development and manufacturing services including cell line engineering, upstream/downstream process development, analytical method development, GMP manufacturing, and regulatory support. Each overview includes typical timelines and deliverables.',
        dark: true,
      },
      {
        title: 'Equipment Qualification Documentation',
        text: 'We maintain current IQ/OQ/PQ documentation for all critical equipment. Prospective clients can review equipment specifications, qualification status, and maintenance records during facility audits and due diligence visits.',
        dark: false,
      },
      {
        title: 'Regulatory Submission Templates',
        text: 'Our regulatory team has developed submission-ready templates for CMC sections, stability protocols, and method validation reports. These templates align with FDA, EMA, and ICH expectations and can accelerate your regulatory preparation.',
        dark: true,
      }
    ],
    faqs: [
      { question: 'What brochures are available for download?', answer: 'We offer facility factsheets, service capability overviews, equipment qualification summaries, and regulatory submission templates. All documents are available in PDF format and can be requested through our contact form or during business development discussions.' },
      { question: 'Are Lambda\'s brochures GMP-compliant for audits?', answer: 'Yes, our facility and equipment documentation is maintained in a state suitable for regulatory audits and client due diligence. We regularly update these documents to reflect current capabilities, qualifications, and quality system status.' },
    ]
  },
  {
    slug: 'news',
    category: 'insights',
    title: 'Corporate News & Biologics Press Releases — Lambda CDMO',
    metaTitle: 'Corporate News & Press Releases | Lambda CDMO',
    metaDesc: 'Read corporate news, facility updates, and biologics co-development project announcements from Lambda CDMO. Milestones and partnerships.',
    badge: 'Insights',
    heading: 'Milestones, partnerships, and announcements.',
    description: 'Follow our corporate progress, including bioreactor installations, cleanroom validations, partnership contracts, and regulatory audits. Our news section keeps you informed about Lambda\'s growth and expanding capabilities.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Latest Regulatory Accreditations',
        text: 'Lambda completes construction and begins mechanical qualification validation runs for our sterile DP filling lines in Tallinn, Estonia. This milestone expands our integrated manufacturing capabilities to include complete drug substance and drug product production.',
        dark: false,
      },
      {
        title: 'Strategic Partnership Announcements',
        text: 'We announce new co-development partnerships with European and North American biotech companies. These collaborations span multiple modalities including mAbs, bispecifics, and ADCs, reflecting growing confidence in our integrated CDMO platform.',
        dark: true,
      },
      {
        title: 'Facility Expansion Updates',
        text: 'Our planned expansion to 2000L bioreactor trains is progressing on schedule. The new manufacturing suite will include additional Grade C processing areas and expanded QC laboratory space to support increased client demand.',
        dark: false,
      },
      {
        title: 'Scientific Conference Participation',
        text: 'Lambda scientists will present data at upcoming international conferences including Bioprocess International, the Antibody Engineering Summit, and the European Society for Cell and Gene Therapy annual meeting.',
        dark: true,
      }
    ],
    faqs: [
      { question: 'How can I stay updated on Lambda\'s latest news?', answer: 'Subscribe to our newsletter, follow us on LinkedIn, or check this news section regularly. We publish major announcements monthly and milestone updates as they occur. For media inquiries, please contact our communications team through the contact form.' },
      { question: 'Does Lambda issue press releases for client programs?', answer: 'We respect client confidentiality and only announce partnerships with explicit client permission. Many of our collaborations remain confidential. When clients agree, we jointly issue press releases that highlight the scientific and strategic aspects of the partnership.' },
    ]
  },
  {
    slug: 'events',
    category: 'insights',
    title: 'Industry Events, Conferences, & Webinars — Lambda CDMO',
    metaTitle: 'Industry Events & Conferences | Lambda CDMO',
    metaDesc: 'Meet Lambda\'s scientific leadership at bio-partnering events, antibody drug conferences, and process optimization webinars. Schedule a meeting.',
    badge: 'Insights',
    heading: 'Technical webinars and scientific conferences.',
    description: 'Schedule partnering meetings with our scientific directors at global conventions or register for online technical webinars. Our events calendar includes conferences, trade shows, and educational sessions throughout the year.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: 'Bioprocess International Convention',
        text: 'Lambda CDMO will present data on continuous bioprocessing intensification and mAbs higher-order structural analysis in upcoming sessions. Our scientific directors are available for one-on-one partnering meetings during the conference.',
        dark: false,
      },
      {
        title: 'Monthly Technical Webinars',
        text: 'Join our free monthly webinars covering topics such as cell line engineering best practices, analytical method validation strategies, and regulatory submission preparation. All webinars include live Q&A with our scientific experts.',
        dark: true,
      },
      {
        title: 'Facility Tours & Open Houses',
        text: 'We host quarterly facility tours for prospective clients, investors, and academic partners. These tours provide firsthand exposure to our GMP manufacturing suites, analytical laboratories, and quality systems. Advance registration is required.',
        dark: false,
      },
      {
        title: 'Scientific Advisory Board Meetings',
        text: 'Our annual Scientific Advisory Board meeting brings together leading experts in biologics development, manufacturing, and regulatory science. Selected sessions are open to client partners and industry collaborators by invitation.',
        dark: true,
      }
    ],
    faqs: [
      { question: 'How can I register for Lambda\'s webinars?', answer: 'Register through the contact form on our website or email our events coordinator. All webinars are free and include live Q&A. Recordings are available to registered participants for 30 days after the live session.' },
      { question: 'Can I schedule a facility tour?', answer: 'Yes, we offer quarterly facility tours for prospective clients and partners. Tours must be scheduled in advance and include a confidentiality agreement. Contact our business development team to arrange a visit that aligns with your due diligence timeline.' },
    ]
  }
];
