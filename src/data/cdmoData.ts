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
    metaDesc: 'Discover Lambda CDMO, the biologics CDMO of Lambda Therapeutic Research. Integrated development, analytical characterization, and GMP manufacturing in Ahmedabad, India.',
    badge: 'Overview',
    heading: 'Developing Tomorrow\'s Biologics with Scientific Excellence and Manufacturing Precision.',
    description: 'Lambda CDMO is the biologics Contract Development and Manufacturing Organization (CDMO) of Lambda Therapeutic Research, established to support the development and manufacture of biologics, biosimilars, and other complex biologic modalities.',
    image: '/images/development.jpg',
    stats: [
      { value: '20k', label: 'Sqm Facility', sublabel: 'Purpose-built biologics development and manufacturing campus in Ahmedabad, India.' },
      { value: '25+', label: 'Years Legacy', sublabel: 'Built on Lambda Therapeutic Research expertise in clinical research and bioanalytical sciences.' },
      { value: 'Global', label: 'Regulatory Support', sublabel: 'Aligned with US, EU, Japan, and Australia regulatory expectations.' },
    ],
    sections: [
      {
        title: 'An Integrated Partner',
        text: 'Located in Ahmedabad, India, Lambda CDMO provides integrated solutions spanning cell line development, process development, analytical characterization, GMP manufacturing, and quality systems that support global clinical development programs.',
        dark: false,
      },
      {
        title: 'Built on a Legacy of Excellence',
        text: 'Built on Lambda Therapeutic Research\'s legacy of more than 25 years in clinical research, bioanalytical sciences, and regulatory excellence, Lambda CDMO extends these capabilities into biologics development and manufacturing under a unified quality framework.',
        dark: true,
      },
      {
        title: 'Collaborative Program Execution',
        text: 'Whether developing a monoclonal antibody, bispecific antibody, antibody-drug conjugate (ADC), or recombinant protein, our multidisciplinary teams work closely with sponsors to accelerate development, simplify technology transfer, and support successful clinical programs.',
        dark: false,
      },
      {
        title: 'The Lambda Advantage',
        text: 'Every biologic program presents unique scientific, manufacturing, and regulatory challenges. Our role is to provide integrated expertise across development and manufacturing while maintaining the flexibility needed to support evolving program requirements. Our approach combines scientific knowledge, scalable manufacturing, and quality systems designed to support global regulatory expectations.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Headquarters', value: 'Ahmedabad, India' },
      { label: 'Service Coverage', value: 'Global (US, Europe, Japan, Australia)' },
      { label: 'Core Modalities', value: 'mAbs, Bispecifics, ADCs, Recombinant Proteins' },
      { label: 'Facility Size', value: '20,000 sqm Biologics Campus' },
      { label: 'Cleanroom Grades', value: 'Grade A, B, C, and D Zones' },
    ],
    faqs: [
      { question: 'What makes Lambda CDMO different from other biologics CDMOs?', answer: 'Lambda CDMO combines integrated end-to-end services with a unified quality framework under Lambda Therapeutic Research. Our multidisciplinary teams work together across cell line development, process development, analytical characterization, and GMP manufacturing to reduce handoffs and accelerate program timelines.' },
      { question: 'Which regulatory markets does Lambda CDMO support?', answer: 'We support programs intended for highly regulated markets including the United States, Europe, Japan, and Australia. Our quality systems are designed to satisfy global cGMP expectations and generate reliable data for regulatory submissions.' },
      { question: 'What is the typical timeline from DNA to Research Cell Bank?', answer: 'Our streamlined cell line engineering platform typically delivers a Research Cell Bank (RCB) within approximately 16 weeks from DNA sequence receipt, including vector design, transfection, clone screening, and stability assessment.' },
    ]
  },
  {
    slug: 'leadership',
    category: 'overview',
    title: 'Leadership Team — Lambda Biologics CDMO Experts',
    metaTitle: 'Leadership & Scientific Team | Lambda CDMO',
    metaDesc: 'Meet the multidisciplinary leadership team at Lambda CDMO, with extensive international experience in biologics process development, manufacturing, quality, and technology transfer.',
    badge: 'Leadership',
    heading: 'Experienced Scientists. Collaborative Partners.',
    description: 'Lambda CDMO is led by a multidisciplinary team with extensive international experience in biologics process development, analytical sciences, manufacturing, quality, and technology transfer.',
    image: '/images/development.jpg',
    sections: [
      {
        title: 'A Dedicated Team for Every Program',
        text: 'Our scientists, engineers, and quality professionals work collaboratively with sponsors throughout the product lifecycle, ensuring scientific excellence, transparent communication, and timely program execution.',
        dark: false,
      },
      {
        title: 'Six Core Commitments',
        text: 'Every project is supported by a dedicated team focused on delivering solutions that are scientifically sound, operationally efficient, and aligned with regulatory expectations. Our working model is built around scientific excellence, product quality, flexible collaboration, transparent project management, data integrity and IP protection, and continuous improvement.',
        dark: true,
      },
      {
        title: 'Leadership Profiles Coming Soon',
        text: 'Individual leadership profiles with name, title, photograph, and short biography will be added as they become available. Contact our business development team to schedule a meeting with our scientific leadership.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Leadership Focus', value: 'Scientific & Operational Excellence' },
      { label: 'Working Model', value: 'Dedicated Client Teams' },
      { label: 'Core Values', value: '6 Commitments to Program Success' },
      { label: 'Collaboration', value: 'Transparent Project Management' },
    ],
    faqs: [
      { question: 'What is the background of Lambda CDMO\'s scientific leadership?', answer: 'Our leadership team includes experienced professionals with international backgrounds in biologics process development, analytical sciences, GMP manufacturing, quality, and technology transfer.' },
      { question: 'How does Lambda CDMO ensure knowledge transfer to client teams?', answer: 'We assign dedicated scientific liaisons for each program who participate in regular technical meetings, provide detailed protocols and reports, and support seamless knowledge continuity.' },
    ]
  },
  {
    slug: 'facility',
    category: 'overview',
    title: 'Facility & Infrastructure — Lambda CDMO Ahmedabad',
    metaTitle: 'Facility & Infrastructure | Lambda CDMO',
    metaDesc: 'Tour Lambda CDMO\'s 20,000 sqm purpose-built biologics development and manufacturing facility in Ahmedabad, India, designed for GMP manufacturing and global regulatory compliance.',
    badge: 'Facility',
    heading: 'Purpose-Built for Biologics Development and GMP Manufacturing.',
    description: 'Lambda CDMO operates from a purpose-built biologics development and manufacturing facility in Ahmedabad, India, designed to support the evolving needs of global biopharmaceutical companies.',
    image: '/images/development.jpg',
    stats: [
      { value: '20k', label: 'Sqm Campus', sublabel: 'Integrated development, manufacturing, and QC laboratories.' },
      { value: 'GMP', label: 'Manufacturing Suites', sublabel: 'Designed for clinical supply production.' },
      { value: 'Global', label: 'GMP Alignment', sublabel: 'Designed to support major regulated markets.' },
    ],
    sections: [
      {
        title: 'Integrated Campus',
        text: 'The approximately 20,000 sqm facility integrates development laboratories, analytical laboratories, GMP manufacturing suites, quality control laboratories, and supporting infrastructure within a single campus.',
        dark: false,
      },
      {
        title: 'Designed for Global GMP',
        text: 'Designed in accordance with current global GMP expectations, the facility incorporates segregated manufacturing operations, controlled material and personnel flow, and quality systems that support the manufacture of biologics drug substance and drug product for clinical development.',
        dark: true,
      },
      {
        title: 'Scalable Infrastructure',
        text: 'As development programs advance, our scalable infrastructure enables a smooth transition from laboratory development through pilot manufacturing and clinical supply.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Location', value: 'Ahmedabad, India' },
      { label: 'Facility Size', value: '20,000 sqm' },
      { label: 'Laboratories', value: 'Development, Analytical, QC' },
      { label: 'Manufacturing', value: 'GMP Drug Substance & Drug Product Suites' },
      { label: 'Bioreactor Capacity', value: '50–500 L Single-Use (SUB) Trains' },
      { label: 'Environmental Classification', value: 'Grade A/B Critical Zones, Grade C/D Support Zones' },
      { label: 'Aseptic Filling', value: 'Grade A Barrier Isolator Containment' },
      { label: 'Design', value: 'Global cGMP Aligned' },
    ],
    faqs: [
      { question: 'Can I schedule a facility tour?', answer: 'Yes, facility tours can be arranged for prospective clients and partners. Tours must be scheduled in advance and include appropriate confidentiality agreements. Contact our business development team to arrange a visit.' },
      { question: 'What cleanroom grades are available?', answer: 'Our facility incorporates segregated manufacturing operations with controlled material and personnel flow, designed to support GMP manufacturing of biologics drug substance and drug product.' },
    ]
  },
  {
    slug: 'integrated',
    category: 'overview',
    title: 'Integrated Development — Lambda CDMO',
    metaTitle: 'Integrated Development to Manufacturing | Lambda CDMO',
    metaDesc: 'Learn how Lambda CDMO integrates cell line development, process development, analytical characterization, and GMP manufacturing under one quality framework.',
    badge: 'Overview',
    heading: 'One Partner Across the Development Journey.',
    description: 'Successful biologics development requires seamless coordination across development, manufacturing, analytical sciences, and quality functions. At Lambda CDMO, these capabilities are integrated within a single operating model, reducing technology transfer risks, maintaining process continuity, and accelerating progression from development to clinical manufacturing.',
    image: '/images/development.jpg',
    sections: [
      {
        title: 'End-to-End Support',
        text: 'We provide end-to-end support across the biologics development lifecycle, from cell line development through GMP manufacturing and analytical testing, enabling sponsors to work with a single partner throughout their program.',
        dark: false,
      },
      {
        title: 'Integrated Services',
        text: 'Our integrated services include cell line development, upstream and downstream process development, analytical development and characterization, drug substance manufacturing, drug product manufacturing, bioassays and immunogenicity testing, microbiological testing, and quality control and batch release support.',
        dark: true,
      },
      {
        title: 'Reduced Risk, Faster Progress',
        text: 'By bringing scientific, analytical, manufacturing, and quality expertise together under one quality framework, we help sponsors simplify development, reduce operational complexity, and minimize risks associated with technology transfer. This integrated approach enables efficient progression from early development to clinical supply while maintaining product quality and regulatory readiness.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Model', value: 'Single Operating Model' },
      { label: 'Coverage', value: 'Cell Line to Clinical Supply' },
      { label: 'Quality', value: 'Unified Quality Framework' },
      { label: 'Benefit', value: 'Reduced Technology Transfer Risk' },
    ],
    faqs: [
      { question: 'How does the integrated model reduce risk?', answer: 'By integrating development, manufacturing, analytical, and quality functions under one quality framework, we maintain process continuity, reduce handoff risks, and accelerate progression from development to clinical manufacturing.' },
      { question: 'Can Lambda CDMO support a program from cell line through GMP?', answer: 'Yes. We provide end-to-end support across the biologics development lifecycle, enabling sponsors to work with a single partner throughout their program.' },
    ]
  },
  {
    slug: 'quality',
    category: 'overview',
    title: 'Quality & Regulatory Framework — Lambda CDMO',
    metaTitle: 'Quality & Regulatory Framework | Lambda CDMO',
    metaDesc: 'Explore Lambda CDMO\'s integrated quality management system, cGMP-aligned operations, and regulatory support for IND, IMPD, and BLA submissions.',
    badge: 'Quality',
    heading: 'Quality Built Into Every Stage.',
    description: 'Quality is embedded throughout every stage of biologics development and manufacturing at Lambda CDMO. Our integrated quality management system is designed to ensure product quality, process consistency, data integrity, and regulatory compliance.',
    image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
    stats: [
      { value: 'cGMP', label: 'Aligned Operations', sublabel: 'Quality systems aligned with current global requirements.' },
      { value: 'Global', label: 'Markets', sublabel: 'Designed to support US, EU, Japan, and Australia.' },
      { value: 'CMC', label: 'Regulatory Support', sublabel: 'IND, IMPD, and BLA submission support.' },
    ],
    sections: [
      {
        title: 'Integrated Quality Management System',
        text: 'Our integrated quality management system is designed to ensure product quality, process consistency, data integrity, and regulatory compliance. Our development and manufacturing operations are aligned with current global cGMP requirements and are supported by robust quality systems for documentation, traceability, risk management, change control, and continuous improvement. This integrated approach helps sponsors generate reliable development and manufacturing data to support regulatory submissions in major global markets.',
        dark: false,
      },
      {
        title: 'Global Regulatory Alignment',
        text: 'Built with global regulatory expectations in mind, our facility and quality systems are designed to support programs intended for highly regulated markets, including the United States, Europe, Japan, and Australia. We maintain rigorous standards for data integrity, data retention, customer transparency, information security, and intellectual property protection, providing sponsors with confidence throughout the product lifecycle.',
        dark: true,
      },
      {
        title: 'Regulatory Affairs Support',
        text: 'Our Regulatory Affairs team works closely with development, manufacturing, analytical, and quality functions to support Chemistry, Manufacturing, and Controls (CMC) documentation throughout the product lifecycle. We provide regulatory support for IND, IMPD, and Biologics License Application (BLA) submissions, lifecycle variations, and scientific interactions with global health authorities, helping sponsors navigate regulatory requirements with confidence.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Standard', value: 'Current Global cGMP' },
      { label: 'Markets', value: 'US, EU, Japan, Australia' },
      { label: 'CMC Support', value: 'IND, IMPD, BLA' },
      { label: 'Data Integrity', value: '21 CFR Part 11 Aligned' },
    ],
    faqs: [
      { question: 'Which regulatory standards does Lambda CDMO follow?', answer: 'Our development and manufacturing operations are aligned with current global cGMP requirements and are supported by robust quality systems for documentation, traceability, risk management, change control, and continuous improvement.' },
      { question: 'Does Lambda CDMO support CMC documentation?', answer: 'Yes. Our Regulatory Affairs team supports Chemistry, Manufacturing, and Controls (CMC) documentation for IND, IMPD, and BLA submissions, lifecycle variations, and scientific interactions with health authorities.' },
    ]
  },
  {
    slug: 'careers',
    category: 'overview',
    title: 'Careers — Lambda CDMO',
    metaTitle: 'Careers | Lambda CDMO',
    metaDesc: 'Join Lambda CDMO and shape the future of biologics through science, innovation, and collaboration. Explore open roles in biologics development and manufacturing.',
    badge: 'Careers',
    heading: 'Shape the Future of Biologics.',
    description: 'Join a team committed to advancing biologics through science, innovation, and collaboration. At Lambda CDMO, you will work alongside experienced scientists and industry experts on programs that support next-generation biologics for global markets.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Work with Experienced Scientists',
        text: 'At Lambda CDMO, you will work alongside experienced scientists and industry experts on programs that support the development of next-generation biologics for global markets.',
        dark: false,
      },
      {
        title: 'Advance Your Career',
        text: 'We offer opportunities to contribute across cell line development, process development, analytical characterization, GMP manufacturing, quality, and regulatory functions in a collaborative and scientifically rigorous environment.',
        dark: true,
      },
      {
        title: 'Explore Open Roles',
        text: 'This section links to the Lambda career portal. Visit the portal to view current openings and submit your application.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Culture', value: 'Science, Innovation, Collaboration' },
      { label: 'Location', value: 'Ahmedabad, India' },
      { label: 'Fields', value: 'R&D, Manufacturing, QC, QA, Regulatory' },
    ],
    faqs: [
      { question: 'How can I apply for a role at Lambda CDMO?', answer: 'Visit the Lambda career portal to view current openings and submit your application. You may also contact our HR team through the contact form for general inquiries.' },
      { question: 'What types of roles are available?', answer: 'We offer roles across cell line development, process development, analytical characterization, GMP manufacturing, quality control, quality assurance, and regulatory affairs.' },
    ]
  },

  // ==================== DEVELOPMENT SERVICES ====================
  {
    slug: 'cell-line',
    category: 'services',
    title: 'Cell Line Development — Lambda CDMO',
    metaTitle: 'Cell Line Development | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops stable, high-producing mammalian cell lines for monoclonal antibodies, bispecifics, and recombinant biologics.',
    badge: 'Development',
    heading: 'The right clone changes everything downstream. We find it.',
    description: 'A well-engineered cell line forms the foundation of a successful biologics program. Lambda CDMO develops stable, high-producing cell lines designed to deliver consistent product quality, process scalability, and manufacturing performance.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: 'mAb', label: 'Modalities', sublabel: 'Monoclonal antibodies, bispecifics, and recombinant biologics.' },
      { value: 'RCB', label: 'Cell Banking', sublabel: 'Research and Master Cell Bank generation under cGMP.' },
      { value: 'High', label: 'Producing', sublabel: 'Stable clones selected for productivity and genetic stability.' },
    ],
    sections: [
      {
        title: 'Mammalian Expression Systems',
        text: 'We support the development of monoclonal antibodies (mAbs), bispecific antibodies, and other recombinant biologics using mammalian expression systems.',
        dark: false,
      },
      {
        title: 'Gene Construct to Clone Selection',
        text: 'Our expertise spans codon optimization and gene synthesis, expression vector design and construction, stable cell pool generation, single-cell cloning and clone screening, high-throughput clone selection, and clone characterization and productivity assessment.',
        dark: true,
      },
      {
        title: 'cGMP Cell Banking',
        text: 'We generate Research Cell Banks (RCB) and Master Cell Banks (MCB) under cGMP, with cell bank characterization and documentation to support regulatory submissions.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Expression Systems', value: 'Mammalian (CHO)' },
      { label: 'Services', value: 'RCB, MCB, Characterization' },
      { label: 'Screening', value: 'High-throughput Clone Selection' },
      { label: 'Applications', value: 'mAbs, Bispecifics, Recombinant Proteins' },
    ],
    faqs: [
      { question: 'What cell lines does Lambda CDMO develop?', answer: 'We develop stable, high-producing mammalian cell lines for monoclonal antibodies, bispecific antibodies, and other recombinant biologics.' },
      { question: 'What types of cell banks are generated?', answer: 'We generate Research Cell Banks (RCB) and Master Cell Banks (MCB) under cGMP with characterization and documentation for regulatory submissions.' },
    ]
  },
  {
    slug: 'process',
    category: 'services',
    title: 'Process Development — Lambda CDMO',
    metaTitle: 'Upstream & Downstream Process Development | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops scalable, robust upstream and downstream processes for biologics, supporting efficient technology transfer and GMP manufacturing.',
    badge: 'Development',
    heading: 'Robust Processes Designed for Scale-Up and Technology Transfer.',
    description: 'Our upstream and downstream process development teams work closely with manufacturing, analytical, and quality functions to develop scalable processes that support efficient technology transfer and regulatory compliance.',
    image: '/images/development.jpg',
    sections: [
      {
        title: 'Upstream Process Development',
        text: 'We optimize upstream processes through media and feed strategy development, bioreactor parameter optimization, and process characterization using Design of Experiments (DoE). Key performance attributes such as cell growth, productivity, and product quality are continuously evaluated.',
        dark: false,
      },
      {
        title: 'Downstream Process Development',
        text: 'Our downstream development strategies are designed to maximize product recovery while maintaining purity, safety, and product quality. Capabilities include affinity chromatography, ion exchange chromatography, hydrophobic interaction chromatography, mixed-mode chromatography, viral clearance strategy development, ultrafiltration and diafiltration (UF/DF), and bulk formulation development.',
        dark: true,
      },
      {
        title: 'Regulatory-Ready Data Packages',
        text: 'Development data packages are generated to support IND and IMPD submissions while facilitating efficient technology transfer to GMP manufacturing.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Upstream', value: 'Media, Feed, Bioreactor Optimization' },
      { label: 'DoE', value: 'Process Characterization' },
      { label: 'Downstream', value: 'Chromatography, UF/DF, Formulation' },
      { label: 'Viral Clearance', value: 'Strategy Development' },
    ],
    faqs: [
      { question: 'What upstream capabilities does Lambda CDMO offer?', answer: 'We optimize upstream processes through media and feed strategy development, bioreactor parameter optimization, and process characterization using Design of Experiments (DoE).' },
      { question: 'How are downstream processes optimized?', answer: 'We develop affinity, ion exchange, hydrophobic interaction, and mixed-mode chromatography steps, plus viral clearance strategies and UF/DF for formulation.' },
    ]
  },
  {
    slug: 'analytical',
    category: 'services',
    title: 'Analytical Development — Lambda CDMO',
    metaTitle: 'Analytical Development | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops, qualifies, and validates analytical methods for biologics identity, purity, potency, and stability in accordance with ICH guidelines.',
    badge: 'Development',
    heading: 'Analytical Methods Designed to Support Development and Regulatory Success.',
    description: 'Analytical development plays a critical role throughout biologics development by ensuring product identity, purity, potency, and stability. Lambda CDMO develops, qualifies, and validates analytical methods that support process development, comparability studies, GMP manufacturing, and regulatory submissions.',
    image: '/images/default_scientist.jpg',
    sections: [
      {
        title: 'Platform Support',
        text: 'Our analytical platforms support the characterization of monoclonal antibodies, bispecific antibodies, antibody-drug conjugates (ADCs), and related biologic modalities in accordance with current ICH guidelines.',
        dark: false,
      },
      {
        title: 'Comprehensive Method Capabilities',
        text: 'Capabilities include method development, qualification, and validation; identity and purity testing; SEC-HPLC, CEX-HPLC, CE-SDS, and IEF; cell-based and binding potency assays; forced degradation and stability-indicating studies; reference standard qualification; and method transfer to Quality Control laboratories.',
        dark: true,
      },
      {
        title: 'Integrated with Process Development',
        text: 'By integrating analytical development with process development from the outset, we reduce development timelines, facilitate technology transfer, and support efficient progression into GMP manufacturing.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Techniques', value: 'SEC-HPLC, CEX-HPLC, CE-SDS, IEF' },
      { label: 'Potency', value: 'Cell-based & Binding Assays' },
      { label: 'Stability', value: 'Forced Degradation Studies' },
      { label: 'Transfer', value: 'QC Method Transfer' },
    ],
    faqs: [
      { question: 'What analytical techniques does Lambda CDMO use?', answer: 'We use SEC-HPLC, CEX-HPLC, CE-SDS, IEF, and other orthogonal methods to support identity, purity, and potency characterization.' },
      { question: 'Are methods validated to regulatory guidelines?', answer: 'Yes. Methods are developed, qualified, and validated in accordance with current ICH guidelines to support regulatory submissions.' },
    ]
  },
  // ==================== MANUFACTURING SERVICES ====================
  {
    slug: 'drug-substance',
    category: 'manufacturing',
    title: 'Drug Substance Manufacturing — Lambda CDMO',
    metaTitle: 'cGMP Drug Substance Manufacturing | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides cGMP drug substance manufacturing for biologics, supporting clinical development from First-in-Human through later-phase programs.',
    badge: 'Manufacturing',
    heading: 'Clinical-grade drug substance built on development knowledge.',
    description: 'Lambda CDMO provides cGMP drug substance manufacturing services for biologics, supporting clinical development from First-in-Human (FIH) studies through later-phase clinical programs. Our manufacturing teams work closely with development and analytical scientists to ensure a seamless transition from process development to GMP production while maintaining product quality and process consistency.',
    image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
    sections: [
      {
        title: 'Seamless Development to GMP Transfer',
        text: 'Our manufacturing teams work closely with development and analytical scientists to ensure a seamless transition from process development to GMP production while maintaining product quality and process consistency.',
        dark: false,
      },
      {
        title: 'Scalable cGMP Operations',
        text: 'Designed for scalability and regulatory compliance, our manufacturing operations support the production of high-quality biologics drug substance with comprehensive quality oversight throughout the manufacturing lifecycle.',
        dark: true,
      },
      {
        title: 'Drug Substance Capabilities',
        text: 'Capabilities include GMP seed train and production bioreactor operations, mammalian cell culture manufacturing, upstream and downstream processing, chromatographic purification and polishing, ultrafiltration and diafiltration (UF/DF), in-process quality control and process monitoring, batch record review and manufacturing documentation, complete chain of identity and chain of custody management, and clinical supply manufacturing for Phase I to Phase III studies.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Manufacturing', value: 'Mammalian Cell Culture' },
      { label: 'Bioreactor Capacity', value: '50–500 L Single-Use (SUB) Trains' },
      { label: 'Single-Use Systems', value: 'Disposable Flow Paths & Mixing Systems' },
      { label: 'Environmental Classification', value: 'Grade A/B Critical Zones, Grade C/D Support Zones' },
      { label: 'Purification', value: 'Chromatography, UF/DF' },
      { label: 'Manufacturing Scales', value: 'Pilot Batches to Clinical Supply' },
      { label: 'Phases', value: 'Phase I to Phase III' },
    ],
    faqs: [
      { question: 'What drug substance manufacturing phases does Lambda CDMO support?', answer: 'We support clinical development from First-in-Human studies through later-phase clinical programs, including Phase I to Phase III clinical supply.' },
      { question: 'What quality oversight is provided?', answer: 'Our manufacturing operations include comprehensive quality oversight, in-process quality control, batch record review, and complete chain of identity and custody management.' },
    ]
  },
  {
    slug: 'drug-product',
    category: 'manufacturing',
    title: 'Drug Product Manufacturing — Lambda CDMO',
    metaTitle: 'Drug Product Manufacturing & Aseptic Fill-Finish | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides integrated drug product manufacturing including formulation, aseptic fill-finish, packaging, and quality control for clinical supply.',
    badge: 'Manufacturing',
    heading: 'Reliable Drug Product Manufacturing for Clinical Supply.',
    description: 'Lambda CDMO provides integrated drug product manufacturing services designed to support the transition from bulk drug substance to finished clinical products. Our capabilities include formulation development, aseptic fill-finish, packaging, and quality control, ensuring consistent product quality throughout the manufacturing process.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Integrated Drug Product Capabilities',
        text: 'Our capabilities include formulation development and optimization, excipient compatibility studies, GMP aseptic fill-finish operations, liquid and lyophilized dosage forms, vial filling and primary container systems, lyophilization cycle development, visual inspection and product release support, labelling and secondary packaging, stability storage and sample management, and quality control documentation and batch release support.',
        dark: false,
      },
      {
        title: 'Unified Quality Framework',
        text: 'Working within the same quality framework as drug substance manufacturing enables efficient technology transfer, reduced operational complexity, and reliable clinical supply.',
        dark: true,
      },
      {
        title: 'Consistent Product Quality',
        text: 'We ensure consistent product quality throughout the manufacturing process, from formulation development through batch release support.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Dosage Forms', value: 'Liquid & Lyophilized' },
      { label: 'Filling', value: 'Aseptic Vial Fill-Finish' },
      { label: 'Packaging', value: 'Labelling & Secondary Packaging' },
      { label: 'Support', value: 'Batch Release & Stability' },
    ],
    faqs: [
      { question: 'What drug product forms does Lambda CDMO manufacture?', answer: 'We support liquid and lyophilized dosage forms, aseptic vial filling, primary container systems, and secondary packaging for clinical supply.' },
      { question: 'Does Lambda CDMO provide formulation development?', answer: 'Yes. We provide formulation development and optimization, excipient compatibility studies, and lyophilization cycle development.' },
    ]
  },

  // ==================== ANALYTICAL CHARACTERIZATION ====================
  {
    slug: 'analytical-testing',
    category: 'characterization',
    title: 'Analytical Testing — Lambda CDMO',
    metaTitle: 'Analytical Testing & QC Release | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides comprehensive analytical testing for biologics drug substance and drug product, supporting batch release, stability, and regulatory submissions.',
    badge: 'Characterization',
    heading: 'Reliable Analytical Testing for Product Quality and Regulatory Compliance.',
    description: 'Lambda CDMO provides comprehensive analytical testing services for biologics drug substance and drug product, supporting process development, in-process monitoring, batch release, stability studies, and regulatory submissions.',
    image: '/images/default_scientist.jpg',
    sections: [
      {
        title: 'Quality System Alignment',
        text: 'All testing is performed within a validated quality system using qualified analytical platforms, ensuring data integrity, traceability, and regulatory compliance.',
        dark: false,
      },
      {
        title: 'Comprehensive Testing Capabilities',
        text: 'Capabilities include identity testing using peptide mapping, LC-MS, and immunological methods; purity analysis using SEC-HPLC, CE-SDS, and IEF; potency testing using cell-based and ligand-binding assays; protein concentration analysis; stability testing and stability-indicating methods; endotoxin testing using LAL methods; sterility, bioburden, and particulate matter testing; and batch release testing for drug substance and drug product.',
        dark: true,
      },
      {
        title: 'Support for Regulatory Submissions',
        text: 'Testing is designed to generate reliable data to support regulatory submissions throughout the product lifecycle.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Identity', value: 'Peptide Mapping, LC-MS' },
      { label: 'Purity', value: 'SEC-HPLC, CE-SDS, IEF' },
      { label: 'Potency', value: 'Cell-based & Ligand-binding' },
      { label: 'Microbiology', value: 'Endotoxin, Sterility, Bioburden' },
    ],
    faqs: [
      { question: 'What types of analytical testing does Lambda CDMO perform?', answer: 'We perform identity, purity, potency, protein concentration, stability, endotoxin, sterility, bioburden, and particulate matter testing for drug substance and drug product.' },
      { question: 'Is testing performed under a validated quality system?', answer: 'Yes. All testing is performed within a validated quality system using qualified analytical platforms to ensure data integrity and regulatory compliance.' },
    ]
  },
  {
    slug: 'physicochemical',
    category: 'characterization',
    title: 'Physicochemical Characterization — Lambda CDMO',
    metaTitle: 'Physicochemical Characterization | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides orthogonal physicochemical characterization of biologics to support product identity, structure, purity, and regulatory submissions.',
    badge: 'Characterization',
    heading: 'Comprehensive Molecular Characterization for Biologics.',
    description: 'Comprehensive molecular characterization is essential for understanding critical quality attributes, establishing product comparability, and supporting regulatory submissions. Lambda CDMO provides orthogonal analytical characterization for biologics, enabling detailed evaluation of product identity, structure, purity, heterogeneity, and stability.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Detailed Molecular Evaluation',
        text: 'Our analytical platforms support monoclonal antibodies, bispecific antibodies, antibody-drug conjugates (ADCs), recombinant proteins, and other complex biologic modalities throughout development and manufacturing.',
        dark: false,
      },
      {
        title: 'Orthogonal Characterization Capabilities',
        text: 'Capabilities include primary structure analysis, intact and peptide mass analysis, disulfide bond mapping, glycan profiling, charge variant analysis, aggregation and fragmentation analysis, higher-order structure characterization, forced degradation and stress stability studies, biosimilar comparability studies, and product characterization for regulatory submissions.',
        dark: true,
      },
      {
        title: 'Critical Quality Attributes',
        text: 'We enable detailed evaluation of product identity, structure, purity, heterogeneity, and stability to support regulatory and comparability assessments.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Mass Analysis', value: 'Intact & Peptide Mass' },
      { label: 'Structure', value: 'Disulfide Mapping, Glycan Profiling' },
      { label: 'Variants', value: 'Charge, Aggregation, Fragmentation' },
      { label: 'Comparability', value: 'Biosimilar & Stress Studies' },
    ],
    faqs: [
      { question: 'What physicochemical characterization is available?', answer: 'We offer primary structure analysis, mass analysis, disulfide bond mapping, glycan profiling, charge variant analysis, aggregation/fragmentation analysis, and higher-order structure characterization.' },
      { question: 'Does Lambda CDMO support biosimilar comparability?', answer: 'Yes. We conduct biosimilar comparability studies and product characterization to support regulatory submissions.' },
    ]
  },
  {
    slug: 'bioassays',
    category: 'characterization',
    title: 'Bioassays & Immunogenicity — Lambda CDMO',
    metaTitle: 'Bioassays & Immunogenicity Testing | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops and performs functional bioassays and immunogenicity testing to support potency, mechanism of action, and regulatory submissions.',
    badge: 'Characterization',
    heading: 'Functional Bioassays That Demonstrate Biological Activity.',
    description: 'Functional bioassays are essential for evaluating biological activity, potency, and mechanism of action throughout biologics development. Lambda CDMO develops and performs bioassays that support product characterization, process development, comparability assessments, batch release, and regulatory submissions.',
    image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800',
    sections: [
      {
        title: 'Bioassay Capabilities',
        text: 'Capabilities include cell-based potency assays, reporter gene assays, binding assays, ADCC and CDC functional assays, mechanism-of-action assays, reference standard qualification, and potency assignment studies.',
        dark: false,
      },
      {
        title: 'Immunogenicity Testing',
        text: 'Our immunogenicity capabilities help sponsors assess potential immune responses during product development and clinical evaluation. Capabilities include anti-drug antibody (ADA) screening, ADA confirmation and titration, neutralizing antibody (NAb) assays, in vitro immunogenicity risk assessment, and immunogenicity support for clinical development.',
        dark: true,
      },
      {
        title: 'Regulatory Guidance Aligned',
        text: 'All assays are developed and performed in accordance with current FDA, EMA, and ICH guidance, supporting regulatory submissions throughout the product lifecycle.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Potency', value: 'Cell-based & Reporter Gene' },
      { label: 'Binding', value: 'Binding & MOA Assays' },
      { label: 'Immunogenicity', value: 'ADA & NAb Assays' },
      { label: 'Guidance', value: 'FDA, EMA, ICH' },
    ],
    faqs: [
      { question: 'What bioassays does Lambda CDMO develop?', answer: 'We develop cell-based potency assays, reporter gene assays, binding assays, ADCC/CDC functional assays, and mechanism-of-action assays.' },
      { question: 'What immunogenicity testing is available?', answer: 'We offer anti-drug antibody (ADA) screening and confirmation, neutralizing antibody (NAb) assays, and in vitro immunogenicity risk assessment.' },
    ]
  },
  {
    slug: 'microbiological',
    category: 'characterization',
    title: 'Microbiological Testing — Lambda CDMO',
    metaTitle: 'Microbiological Testing | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides microbiological testing services to support biologics manufacturing, environmental monitoring, and product release under USP, EP, and IP standards.',
    badge: 'Characterization',
    heading: 'Microbiological Quality Control for Safe and Reliable Biologics.',
    description: 'Lambda CDMO provides microbiological testing services to support biologics manufacturing, environmental monitoring, and product release. Our microbiology laboratory performs compendial and validated assays to ensure microbiological quality and compliance with global pharmacopeial requirements.',
    image: '/images/default_scientist.jpg',
    sections: [
      {
        title: 'Global Pharmacopeial Compliance',
        text: 'Testing is conducted in accordance with USP, EP, and IP standards within an established quality management system.',
        dark: false,
      },
      {
        title: 'Comprehensive Microbiology Capabilities',
        text: 'Capabilities include sterility testing, bioburden testing, bacterial endotoxin testing (BET), environmental monitoring, mycoplasma detection, container closure integrity testing, microbial limit testing, and water and utility microbiological testing.',
        dark: true,
      },
      {
        title: 'Support for Product Release',
        text: 'Microbiological testing supports product release, manufacturing environmental monitoring, and compliance with global regulatory requirements.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Standards', value: 'USP, EP, IP' },
      { label: 'Testing', value: 'Sterility, Bioburden, BET' },
      { label: 'Monitoring', value: 'Environmental & Mycoplasma' },
      { label: 'Integrity', value: 'Container Closure Testing' },
    ],
    faqs: [
      { question: 'Which microbiological tests does Lambda CDMO perform?', answer: 'We perform sterility, bioburden, bacterial endotoxin, environmental monitoring, mycoplasma detection, container closure integrity, and microbial limit testing.' },
      { question: 'What standards are followed?', answer: 'Testing is conducted in accordance with USP, EP, and IP standards within an established quality management system.' },
    ]
  },
  // ==================== MODALITIES ====================
  {
    slug: 'mabs',
    category: 'modalities',
    title: 'Monoclonal Antibodies — Lambda CDMO',
    metaTitle: 'Monoclonal Antibody Development & Manufacturing | Lambda CDMO',
    metaDesc: 'Lambda CDMO offers integrated monoclonal antibody development and manufacturing capabilities for IgG1, IgG2, and IgG4 subclasses.',
    badge: 'Modalities',
    heading: 'Platform Capabilities for Monoclonal Antibodies.',
    description: 'Monoclonal antibodies (mAbs) continue to be one of the most widely developed biologic modalities, driving innovation across oncology, immunology, and other therapeutic areas. Lambda CDMO offers integrated development and manufacturing capabilities for monoclonal antibodies, supporting sponsors from cell line development and process optimization through analytical characterization and GMP manufacturing.',
    image: '/images/modality_mabs.png',
    sections: [
      {
        title: 'Innovator and Biosimilar Support',
        text: 'Our platform is designed to support innovator and biosimilar programs across IgG1, IgG2, and IgG4 subclasses.',
        dark: false,
      },
      {
        title: 'Integrated Platform Capabilities',
        text: 'By integrating development, manufacturing, analytical sciences, and quality functions within a unified operating model, we help simplify technology transfer and support efficient progression to clinical manufacturing.',
        dark: true,
      },
      {
        title: 'End-to-End mAb Services',
        text: 'Platform capabilities include cell line development using mammalian expression systems, upstream and downstream process development, analytical characterization for IgG1, IgG2, and IgG4 subclasses, process scale-up and technology transfer, drug substance and drug product manufacturing, quality control and analytical testing, and support for clinical development programs.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Subclasses', value: 'IgG1, IgG2, IgG4' },
      { label: 'Expression', value: 'Mammalian Systems' },
      { label: 'Manufacturing', value: 'Drug Substance & Product' },
      { label: 'Support', value: 'Clinical Development Programs' },
    ],
    faqs: [
      { question: 'Which mAb subclasses does Lambda CDMO support?', answer: 'We support innovator and biosimilar programs across IgG1, IgG2, and IgG4 subclasses.' },
      { question: 'What is included in the mAb platform?', answer: 'The platform includes cell line development, upstream and downstream process development, analytical characterization, scale-up, technology transfer, GMP manufacturing, and QC testing.' },
    ]
  },
  {
    slug: 'bispecifics',
    category: 'modalities',
    title: 'Bispecific Antibodies — Lambda CDMO',
    metaTitle: 'Bispecific Antibody Development & Manufacturing | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides integrated development and manufacturing capabilities for bispecific and bifunctional antibodies.',
    badge: 'Modalities',
    heading: 'Addressing the Complexity of Bispecific Antibodies.',
    description: 'Bispecific antibodies present unique development and manufacturing challenges due to their structural complexity, product heterogeneity, and analytical requirements. Lambda CDMO offers integrated development and manufacturing capabilities designed to address these challenges through coordinated process development, analytical characterization, and manufacturing under a unified quality framework.',
    image: '/images/modality_bispecifics.png',
    sections: [
      {
        title: 'Coordinated Development',
        text: 'Our approach combines cell line development, process optimization, analytical characterization, and quality control to support the development of bispecific and bifunctional antibodies for clinical programs.',
        dark: false,
      },
      {
        title: 'Managing Product Heterogeneity',
        text: 'We focus on process optimization to reduce homodimer and mispairing impurities, supported by orthogonal analytical characterization and forced degradation and stability studies.',
        dark: true,
      },
      {
        title: 'Bispecific Platform Capabilities',
        text: 'Capabilities include cell line development for bispecific and bifunctional antibodies, upstream and downstream process development, in vitro bioassays for functional characterization, and drug substance and drug product manufacturing.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Focus', value: 'Bispecific & Bifunctional Antibodies' },
      { label: 'Challenge', value: 'Homodimer & Mispairing Control' },
      { label: 'Analytics', value: 'Orthogonal Characterization' },
      { label: 'Manufacturing', value: 'Drug Substance & Product' },
    ],
    faqs: [
      { question: 'What makes bispecifics challenging to manufacture?', answer: 'Bispecific antibodies present unique challenges due to structural complexity, product heterogeneity, and the need to control homodimer and mispairing impurities.' },
      { question: 'How does Lambda CDMO address these challenges?', answer: 'We use coordinated process development, analytical characterization, and quality control to reduce impurities and support the development of bispecific and bifunctional antibodies.' },
    ]
  },
  {
    slug: 'adcs',
    category: 'modalities',
    title: 'Antibody-Drug Conjugates — Lambda CDMO',
    metaTitle: 'ADC Development & Manufacturing | Lambda CDMO',
    metaDesc: 'Lambda CDMO offers integrated ADC development capabilities including antibody production, conjugation process development, DAR characterization, and GMP manufacturing.',
    badge: 'Modalities',
    heading: 'Integrated Capabilities for Antibody-Drug Conjugates.',
    description: 'Antibody-drug conjugates (ADCs) combine monoclonal antibodies with highly potent payloads, requiring specialized development, analytical characterization, and manufacturing strategies. Lambda CDMO offers integrated capabilities to support ADC development through antibody production, conjugation process development, analytical characterization, and GMP manufacturing.',
    image: '/images/modality_adcs.png',
    sections: [
      {
        title: 'Specialized ADC Development',
        text: 'Our platform is designed to generate comprehensive analytical data that supports product characterization, process development, and clinical manufacturing.',
        dark: false,
      },
      {
        title: 'Conjugation and Characterization',
        text: 'Capabilities include monoclonal antibody development for ADC programs, conjugation process development, drug-to-antibody ratio (DAR) characterization, product purity and aggregation analysis, and analytical characterization using orthogonal methods.',
        dark: true,
      },
      {
        title: 'Potency and GMP Support',
        text: 'We develop in vitro bioassays for potency assessment and provide drug substance manufacturing for clinical development.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Antibody', value: 'mAb Development for ADCs' },
      { label: 'Conjugation', value: 'Process Development' },
      { label: 'Characterization', value: 'DAR, Purity, Aggregation' },
      { label: 'Manufacturing', value: 'GMP Drug Substance' },
    ],
    faqs: [
      { question: 'What ADC capabilities does Lambda CDMO offer?', answer: 'We offer monoclonal antibody development, conjugation process development, DAR characterization, purity and aggregation analysis, potency assays, and GMP drug substance manufacturing.' },
      { question: 'What analytical methods are used for ADCs?', answer: 'We use orthogonal analytical characterization methods including DAR analysis, purity assessment, aggregation analysis, and in vitro bioassays for potency.' },
    ]
  },
  {
    slug: 'proteins-peptides',
    category: 'modalities',
    title: 'Proteins & Peptides — Lambda CDMO',
    metaTitle: 'Protein & Peptide Development & Manufacturing | Lambda CDMO',
    metaDesc: 'Lambda CDMO provides development and manufacturing capabilities for recombinant proteins, fusion proteins, enzymes, cytokines, growth factors, and synthetic peptides.',
    badge: 'Modalities',
    heading: 'Development and Manufacturing for Proteins and Peptides.',
    description: 'Lambda CDMO offers development and manufacturing capabilities for recombinant proteins and therapeutic peptides across a range of biologic applications. Our integrated platform combines process development, analytical characterization, quality control, and manufacturing to support the development of protein- and peptide-based therapeutics.',
    image: '/images/modality_proteins.png',
    sections: [
      {
        title: 'Diverse Biologic Applications',
        text: 'Capabilities are designed to support recombinant proteins, fusion proteins, enzymes, cytokines, growth factors, and synthetic peptides while maintaining product quality and regulatory compliance throughout development and manufacturing.',
        dark: false,
      },
      {
        title: 'Expression and Purification',
        text: 'Platform capabilities include recombinant protein expression using CHO, HEK293, and E. coli expression systems, process development and optimization, protein purification and refolding, and synthetic peptide manufacturing and purification.',
        dark: true,
      },
      {
        title: 'Characterization and Release',
        text: 'We provide analytical characterization and release testing, in vitro immunogenicity assessment, and drug substance and drug product manufacturing for clinical development.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Expression', value: 'CHO, HEK293, E. coli' },
      { label: 'Products', value: 'Proteins, Fusions, Enzymes, Peptides' },
      { label: 'Purification', value: 'Protein Refolding & Peptide Purification' },
      { label: 'Manufacturing', value: 'DS & DP for Clinical Development' },
    ],
    faqs: [
      { question: 'What expression systems are used for proteins and peptides?', answer: 'We use CHO, HEK293, and E. coli expression systems for recombinant proteins and synthetic peptide manufacturing.' },
      { question: 'What types of proteins and peptides are supported?', answer: 'We support recombinant proteins, fusion proteins, enzymes, cytokines, growth factors, and synthetic peptides.' },
    ]
  },

  // ==================== INSIGHTS ====================
  {
    slug: 'blogs',
    category: 'insights',
    title: 'Blogs & Articles — Lambda CDMO Insights',
    metaTitle: 'Blogs & Articles | Lambda CDMO Insights',
    metaDesc: 'Read the latest perspectives from Lambda CDMO scientists on biologics development, manufacturing, analytical characterization, and regulatory strategy.',
    badge: 'Insights',
    heading: 'Blogs & Articles.',
    description: 'Explore the latest perspectives from our scientists on biologics development, manufacturing, and regulatory topics.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Scientific Perspectives',
        text: 'Our blog features articles from Lambda CDMO scientists covering process development, analytical characterization, GMP manufacturing, and regulatory strategy.',
        dark: false,
      },
      {
        title: 'Industry Trends',
        text: 'Stay informed on emerging trends in biologics, including next-generation modalities, continuous manufacturing, biosimilars, and global regulatory developments.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Topics', value: 'Biologics, Manufacturing, Analytics' },
      { label: 'Authors', value: 'Lambda CDMO Scientists' },
      { label: 'Updates', value: 'Regular Perspectives' },
    ],
  },
  {
    slug: 'case-studies',
    category: 'insights',
    title: 'Case Studies — Lambda CDMO',
    metaTitle: 'Case Studies | Lambda CDMO',
    metaDesc: 'Explore Lambda CDMO case studies on biologics development, technology transfer, and GMP manufacturing programs.',
    badge: 'Insights',
    heading: 'Case Studies.',
    description: 'Learn how Lambda CDMO has supported biologics development programs from cell line engineering through clinical manufacturing.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Program Success Stories',
        text: 'Our case studies highlight how we have partnered with sponsors to accelerate biologics development, simplify technology transfer, and deliver high-quality clinical supply.',
        dark: false,
      },
      {
        title: 'Technical Achievements',
        text: 'Each case study outlines the scientific and operational approaches used to address complex development and manufacturing challenges.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Focus', value: 'Development & Manufacturing Programs' },
      { label: 'Outcomes', value: 'Technology Transfer & Clinical Supply' },
      { label: 'Industries', value: 'Biotech & Biopharma' },
    ],
  },
  {
    slug: 'brochures',
    category: 'insights',
    title: 'Brochures — Lambda CDMO',
    metaTitle: 'Brochures & Resources | Lambda CDMO',
    metaDesc: 'Download Lambda CDMO brochures and resources on biologics development, manufacturing, and analytical characterization services.',
    badge: 'Insights',
    heading: 'Brochures & Resources.',
    description: 'Download detailed brochures and resources about Lambda CDMO\'s integrated biologics development and manufacturing services.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    sections: [
      {
        title: 'Service Overviews',
        text: 'Our brochures provide comprehensive overviews of our development, manufacturing, and analytical capabilities.',
        dark: false,
      },
      {
        title: 'Technical Whitepapers',
        text: 'Access whitepapers and technical documents that detail our approach to biologics development and quality systems.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Formats', value: 'PDF Brochures, Whitepapers' },
      { label: 'Topics', value: 'Services, Capabilities, Quality' },
      { label: 'Access', value: 'Downloadable' },
    ],
  },
  {
    slug: 'news',
    category: 'insights',
    title: 'News & Press — Lambda CDMO',
    metaTitle: 'News & Press | Lambda CDMO',
    metaDesc: 'Read the latest news and press releases from Lambda CDMO, including company announcements, partnerships, and industry updates.',
    badge: 'Insights',
    heading: 'News & Press.',
    description: 'Stay updated with the latest news, announcements, and press releases from Lambda CDMO.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Company Announcements',
        text: 'Read official announcements about Lambda CDMO capabilities, facility developments, and strategic partnerships.',
        dark: false,
      },
      {
        title: 'Media Coverage',
        text: 'Explore media coverage and press releases highlighting Lambda CDMO\'s role in biologics development and manufacturing.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Content', value: 'Announcements, Press Releases' },
      { label: 'Topics', value: 'Company News, Industry Updates' },
      { label: 'Contact', value: 'Media Inquiries' },
    ],
  },
  {
    slug: 'events',
    category: 'insights',
    title: 'Events & Webinars — Lambda CDMO',
    metaTitle: 'Events & Webinars | Lambda CDMO',
    metaDesc: 'Find upcoming Lambda CDMO events, scientific conferences, and technical webinars on biologics development and manufacturing.',
    badge: 'Insights',
    heading: 'Events & Webinars.',
    description: 'Meet Lambda CDMO at scientific conferences and register for technical webinars covering biologics development, manufacturing, and regulatory topics.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    sections: [
      {
        title: 'Scientific Conferences',
        text: 'Meet our scientific leadership at global biologics and bioprocessing conferences, partnering events, and industry forums.',
        dark: false,
      },
      {
        title: 'Technical Webinars',
        text: 'Register for our technical webinars covering cell line engineering, process development, analytical characterization, and regulatory strategy.',
        dark: true,
      },
      {
        title: 'Facility Events',
        text: 'Schedule facility tours and open-house events to see our biologics development and manufacturing capabilities firsthand.',
        dark: false,
      }
    ],
    specs: [
      { label: 'Formats', value: 'Conferences, Webinars, Tours' },
      { label: 'Topics', value: 'Development, Manufacturing, Regulatory' },
      { label: 'Registration', value: 'Contact Business Development' },
    ],
  },
];
