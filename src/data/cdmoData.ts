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
  capabilities?: string[];
  stats?: { value: string; label: string; sublabel?: string }[];
  sections: { title: string; text: string; dark?: boolean; image?: string; iconName?: string; bullets?: string[] }[];
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
    capabilities: [
      'One partner, one roof – from gene to clinic',
      'Scientific expertise spanning complete life cycle of a biologic – from cell line development to manufacturing',
      'Development strategies aligned to the requirements of each clinical phase',
      'GMP manufacturing designed to support global regulatory submissions',
      'Flexible and scalable manufacturing capacity from pilot batches to clinical supply'
    ],
    stats: [
      { value: '20k', label: 'Sqm Facility', sublabel: 'Purpose-built biologics development and manufacturing campus in Ahmedabad, India.' },
      { value: '25+', label: 'Years Legacy', sublabel: 'Built on Lambda Therapeutic Research expertise in clinical research and bioanalytical sciences.' },
      { value: 'Global', label: 'Regulatory Support', sublabel: 'Aligned with US, EU, Japan, and Australia regulatory expectations.' },
    ],
    sections: [
      {
        title: 'Developing Tomorrow\'s Biologics',
        text: 'Located in Ahmedabad, India, Lambda CDMO provides integrated solutions spanning cell line development, process development, analytical characterization, GMP manufacturing, and quality systems that support global clinical development programs.',
        dark: false,
      },
      {
        title: 'Built on 25+ Years Legacy of Excellence',
        text: 'Built on Lambda Therapeutic Research\'s legacy of more than 25 years in clinical research, bioanalytical sciences, and regulatory excellence, Lambda CDMO extends these capabilities into biologics development and manufacturing under a unified quality framework.',
        dark: true,
      },
      {
        title: 'Next-Generation Biologics Navigation',
        text: 'From monoclonal antibodies and bispecifics to ADCs and recombinant proteins, we partner closely with sponsors to navigate next-generation biologics—delivering the integrated development, analytical mastery, and manufacturing scale needed to power successful clinical trials. Whether developing a monoclonal antibody, bispecific antibody, antibody-drug conjugate (ADC), or recombinant protein, our multidisciplinary teams work closely with sponsors to accelerate development, simplify technology transfer, and support successful clinical programs.',
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
      { question: 'What makes Lambda CDMO different from other biologics CDMOs?', answer: 'Lambda CDMO combines integrated end-to-end services under one roof with a unified quality framework backed by Lambda Therapeutic Research\'s 25+ years of clinical and bioanalytical heritage.' },
      { question: 'Which regulatory markets does Lambda CDMO support?', answer: 'We support programs intended for highly regulated markets including the United States (FDA), Europe (EMA), Japan (PMDA), and Australia (TGA).' },
      { question: 'What modalities are supported?', answer: 'We support monoclonal antibodies (mAbs), bispecific antibodies, antibody-drug conjugates (ADCs), and recombinant proteins across all development stages.' },
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
    description: 'Lambda CDMO is led by a multidisciplinary team with extensive international experience in biologics process development, analytical sciences, manufacturing, quality, and technology transfer. Our scientists, engineers, and quality professionals work collaboratively with sponsors throughout the product lifecycle, ensuring scientific excellence, transparent communication, and timely program execution.',
    image: '/images/development.jpg',
    capabilities: [
      'Scientific excellence',
      'Product quality',
      'Flexible collaboration',
      'Transparent project management',
      'Data integrity and IP protection',
      'Continuous improvement'
    ],
    stats: [
      { value: '25+', label: 'Years Experience', sublabel: 'Average leadership experience across global biopharma organizations.' },
      { value: '6', label: 'Core Commitments', sublabel: 'Guiding every sponsor engagement from gene construct to clinical batch.' },
      { value: '100%', label: 'Dedicated Teams', sublabel: 'Dedicated cross-functional scientific leads assigned to each project.' },
    ],
    sections: [
      {
        title: 'Dedicated Client Partnership',
        text: 'Every project is supported by a dedicated team focused on delivering solutions that are scientifically sound, operationally efficient, and aligned with regulatory expectations. The team is focused on client requirements and the criticality of on-time, in-full delivery.',
        image: '/images/teamwork.png',
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
      { question: 'What is the background of Lambda CDMO\'s scientific leadership?', answer: 'Our leadership team includes experienced professionals with extensive international backgrounds in biologics process development, analytical sciences, GMP manufacturing, quality, and technology transfer.' },
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
    description: 'Lambda CDMO operates from a purpose-built biologics development and manufacturing facility in Ahmedabad, India, designed to support the evolving needs of global biopharmaceutical companies. The approximately 20,000 sqm facility integrates development laboratories, analytical laboratories, GMP manufacturing suites, quality control laboratories, and supporting infrastructure within a single campus.',
    image: '/images/development.jpg',
    capabilities: [
      'Ambr 250mL to 50L SUS Upstream Development Bioreactors',
      'Intermediate 2L, 5L, 10L Linear Scale Bioreactor Suites',
      'Fed-batch, Intensified Fed-batch & Perfusion Cell Culture',
      'High-throughput Automated Liquid Handling for Microliter Resin Screening',
      'Column Chromatography (1 mL to 2 L) & PCC Continuous Purification',
      'Non-Protein A Affinity Strategies & Viral Clearance Validation',
      'High Precision Automated Filling & Controlled Nucleation Lyophilizer',
      '2x 200L (400L total) Single-Use GMP Upstream Production Suites',
      'Grade C Downstream Suites with Segregated Pre/Post-Viral Areas',
      'Robotic Isolator Fill-Finish Line (10,000 units/batch in Vials, PFS, Cartridges)',
      'Visual Inspection Suite & Secondary Packaging Operations',
      'QTPP-Anchored Comprehensive Analytical Sciences Workflow'
    ],
    stats: [
      { value: '20k', label: 'Sqm Campus', sublabel: 'Integrated development, manufacturing, and QC laboratories.' },
      { value: '400 L', label: 'Bioreactor Capacity', sublabel: '2x 200L single-use production bioreactors with closed connections.' },
      { value: '10k', label: 'Units / Batch', sublabel: 'Robotic isolator filling capacity for vials, pre-filled syringes & cartridges.' },
    ],
    sections: [
      {
        title: 'Integrated 20,000 sqm Biologics Campus',
        text: 'Designed in accordance with current global GMP expectations, the facility incorporates segregated manufacturing operations, controlled material and personnel flow, and quality systems that support the manufacture of biologics drug substance and drug product for clinical development. As development programs advance, our scalable infrastructure enables a smooth transition from laboratory development through pilot manufacturing and clinical supply.',
        dark: false,
        image: '/images/CDMOblue.png',
      },
      {
        title: 'Upstream Development Capabilities',
        text: 'With bioreactor capabilities spanning Ambr 250mL for fast throughput media/feed screening to 50L SUS bioreactors for pilot scale and consistency batches, and an intermediate suite of 2L, 5L and 10L bioreactors that can be scaled linearly to the clinical GMP bioreactors, our upstream laboratory is state of the art, and is setup to cater to multiple projects executed efficiently to meet sponsor product quality and timeline expectations. We have the technical expertise and equipment to perform fed-batch, intensified fed-batch and complete perfusion-based processes.',
        dark: false,
        image: '/images/equipment1.png',
      },
      {
        title: 'Downstream Process Development',
        text: 'With a range of purification systems that can support column volumes from 1mL to 2 L for pilot scale systems, our lab is set up for both initial process development at smaller scales and confirmation at larger pilot scales (processing of 50L harvest volumes) for technology transfer. We have also developed and validated high throughput liquid handling systems for rapid screening of resin and chromatography conditions at the microliter resin volume ranges enabling highly cost-effective and productivity improvement. Our personnel have deep expertise in developing purification strategies for meeting stringent product quality criteria for both biosimilars as well as novel molecules spanning recombinant proteins, bispecifics, and monoclonal antibodies, including traditional resin-based purification, membrane-based purification, PCC and other continuous chromatography methods, and non-Protein A based affinity strategies.',
        dark: false,
        image: '/images/equipment2.png',
      },
      {
        title: 'Drug Product Formulation & Lyophilization',
        text: 'Our drug product lab is equipped with high precision filling systems, drug product physical characterisation tools and a state-of-the-art lyophilizer with controlled nucleation capabilities. Our team has experience in developing formulations and processes for recombinant proteins, mAbs, and peptide-based modalities in both lyophilized presentations and liquid presentations in vial, PFS and cartridge container closure systems.',
        dark: false,
        image: '/images/equipment3.png',
      },
      {
        title: 'cGMP Manufacturing Suites (DS & DP)',
        text: 'Our facility has state of the art drug substance (DS) and drug product (DP) suites. The 2 upstream suites have 200L bioreactors for a total capability of 400L production capacity, with the ability to perform fed-batch or intensified cell culture operations using single-use systems and closed connections. Downstream processing is performed in Grade C clean room suites, with segregation of post viral filtration suite from the pre-viral operations suite. The drug product filling line is isolator based with robotic operations minimizing operator handling and ensuring a high degree of aseptic compliance, with a nominal ability to process 10,000 units in a batch in vial, PFS or cartridge formats, alongside dedicated visual inspection and secondary packaging suites.',
        dark: false,
        image: '/images/cGMP.png',
      },
      {
        title: 'QTPP-Anchored Analytical Sciences Workflow',
        text: 'We deliver a comprehensive Analytical Sciences workflow that serves as the scientific foundation for your molecule\'s entire lifecycle. By anchoring our analytical strategies in your specific Quality Target Product Profile (QTPP), we ensure data-driven continuity across Cell Line & Upstream Development, Downstream Development, Drug Product Development, and Manufacturing. For biosimilars, our advanced cell line development platforms accelerate high-throughput top clone identification and selection to match the target reference product\'s quality profile while maximizing expression titre. For next-generation modalities like bispecifics and ADCs, our deep capabilities in physicochemical and functional characterization map exact structural attributes, conjugation efficiency, and biological activity, turning complex analytical data into regulatory and clinical certainty.',
        dark: true,
      }
    ],
    specs: [
      { label: 'Location', value: 'Ahmedabad, India' },
      { label: 'Facility Size', value: '20,000 sqm Integrated Campus' },
      { label: 'Upstream Bioreactors', value: 'Ambr 250mL, 2L, 5L, 10L, 50L SUS, 2x 200L (400L total)' },
      { label: 'Downstream Systems', value: '1 mL to 2 L Columns (50L Harvest), PCC Continuous, Viral Filtration' },
      { label: 'Filling Automation', value: 'Robotic Isolator Line (10,000 units/batch: Vials, PFS, Cartridges)' },
      { label: 'Lyophilization', value: 'Controlled Nucleation Cycle Development' },
      { label: 'Cleanroom Grades', value: 'Grade A Isolators, Grade B/C Processing, Grade D Support' },
      { label: 'Regulatory Alignment', value: 'US FDA, EMA, PMDA, TGA cGMP Standards' },
    ],
    faqs: [
      { question: 'Can I schedule a facility tour?', answer: 'Yes, facility tours can be arranged for prospective clients and partners. Tours must be scheduled in advance and include appropriate confidentiality agreements. Contact our business development team to arrange a visit.' },
      { question: 'What cleanroom grades and bioreactor capacities are available?', answer: 'Our facility incorporates 2x 200L (400L total) single-use bioreactor suites, Grade C downstream suites with viral segregation, and Grade A robotic isolator fill-finish capable of 10,000 units per batch.' },
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
    image: '/images/insights/lyophilization_vials.jpg',
    capabilities: [
      'Cell line development',
      'Upstream and downstream process development',
      'Analytical development and characterization',
      'Drug substance manufacturing',
      'Drug product manufacturing',
      'Bioassays and immunogenicity testing',
      'Microbiological testing',
      'Quality control and batch release support'
    ],
    sections: [
      {
        title: 'End-to-End Support Under One Roof',
        text: 'We provide end-to-end support across the biologics development lifecycle, from cell line development through GMP manufacturing and analytical testing, enabling sponsors to collaborate with a single partner throughout their program.',
        image: '/images/insights/hcp_dna_testing.jpg',
        dark: false,
      },
      {
        title: 'Reduced Technology Transfer Risk & Operational Simplicity',
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
      { question: 'How does the integrated model reduce risk?', answer: 'By integrating development, manufacturing, analytical, and quality functions under one quality framework, we maintain process continuity, eliminate multi-vendor friction, and accelerate progression into clinical manufacturing.' },
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
    heading: 'Quality Built into Every Stage.',
    description: 'Quality is embedded throughout every stage of biologics development and manufacturing at Lambda CDMO. From process development and analytical characterization to GMP manufacturing and quality control, our integrated quality management system is designed to ensure product quality, process consistency, data integrity, and regulatory compliance.',
    image: '/images/cdn/pexels-3938022.jpg',
    capabilities: [
      'Integrated Quality Management System',
      'Global Regulatory Alignment (US FDA, EMA, PMDA Japan, TGA Australia)',
      '21 CFR Part 11 Data Integrity & IP Protection',
      'Regulatory Affairs Support (CMC, IND, IMPD, BLA)',
      'Traceability, Change Control & Risk Management',
      'Customer Transparency & Continuous Improvement'
    ],
    stats: [
      { value: 'cGMP', label: 'Aligned Operations', sublabel: 'Quality systems aligned with current global requirements.' },
      { value: 'Global', label: 'Markets', sublabel: 'Designed to support US, EU, Japan, and Australia.' },
      { value: 'CMC', label: 'Regulatory Support', sublabel: 'IND, IMPD, and BLA submission support.' },
    ],
    sections: [
      {
        title: 'Integrated Quality Management System',
        text: 'From process development and analytical characterization to GMP manufacturing and quality control, our integrated quality management system is designed to ensure product quality, process consistency, data integrity, and regulatory compliance. Our development and manufacturing operations are aligned with current global cGMP requirements and are supported by robust quality systems for documentation, traceability, risk management, change control, and continuous improvement.',
        image: '/images/Lab.jpg',
        dark: false,
      },
      {
        title: 'Global Regulatory Alignment',
        text: 'Built with global regulatory expectations in mind, our facility and quality systems are designed to support programs intended for highly regulated markets, including the United States, Europe, Japan, and Australia. We maintain rigorous standards for data integrity, data retention, customer transparency, information security, and intellectual property protection, providing sponsors with confidence throughout the product lifecycle.',
        dark: true,
      },
      {
        title: 'Regulatory Affairs Support & CMC Documentation',
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
    image: '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
    sections: [
      {
        title: 'Advance Your Career',
        text: 'We offer opportunities to contribute across cell line development, process development, analytical characterization, GMP manufacturing, quality, and regulatory functions in a collaborative and scientifically rigorous environment.',
        dark: true,
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
  {
    slug: 'cell-line',
    category: 'services',
    title: 'Cell Line Development — Lambda CDMO',
    metaTitle: 'Cell Line Development (CHO, mAbs, Bispecifics) | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops stable, high-producing mammalian cell lines for monoclonal antibodies, bispecifics, and recombinant biologics.',
    badge: 'Development',
    heading: 'The right clone changes everything downstream. We find it.',
    description: 'A well-engineered cell line forms the foundation of a successful biologics program. Lambda CDMO develops stable, high-producing cell lines designed to deliver consistent product quality, process scalability, and manufacturing performance.',
    image: '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
    capabilities: [
      'Codon optimization and gene synthesis',
      'Expression vector design and construction',
      'Stable cell pool generation',
      'Single-cell cloning and clone screening',
      'High-throughput clone selection',
      'Clone characterization and productivity assessment',
      'Research Cell Bank (RCB) generation',
      'Master Cell Bank (MCB) generation under cGMP',
      'Cell bank characterization and documentation for regulatory submissions'
    ],
    stats: [
      { value: 'mAb', label: 'Modalities', sublabel: 'Monoclonal antibodies, bispecifics, and recombinant biologics.' },
      { value: 'RCB', label: 'Cell Banking', sublabel: 'Research and Master Cell Bank generation under cGMP.' },
      { value: 'High', label: 'Producing', sublabel: 'Stable clones selected for productivity and genetic stability.' },
    ],
    sections: [
      {
        title: 'Mammalian Expression Systems',
        text: 'Our expertise spans gene construct design, stable pool generation, single-cell cloning, clone selection, and cGMP cell bank development using mammalian expression systems. We support the development of monoclonal antibodies (mAbs), bispecific antibodies, and other recombinant biologics.',
        dark: false,
        image: '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
        bullets: [
          'Codon optimization and gene synthesis',
          'Expression vector design and construction',
          'Stable cell pool generation',
          'Single-cell cloning and clone screening',
          'High-throughput clone selection',
          'Clone characterization and productivity assessment',
          'Research Cell Bank (RCB) generation',
          'Master Cell Bank (MCB) generation under cGMP',
          'Cell bank characterization and documentation for regulatory submissions'
        ]
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
    description: 'Our upstream and downstream process development teams work closely with manufacturing, analytical, and quality functions to develop scalable processes that support efficient technology transfer and regulatory compliance. Each process is optimized for robustness, reproducibility, and manufacturability, enabling a smooth transition from laboratory development to GMP manufacturing.',
    image: '/images/development.jpg',
    capabilities: [
      'Media and feed optimization',
      'Shake flask and bioreactor process development',
      'Process characterization using Design of Experiments (DoE)',
      'Cell culture optimization',
      'Process scalability assessment',
      'Continuous process intensification for monoclonal antibodies',
      'Affinity chromatography development',
      'Ion exchange chromatography',
      'Hydrophobic interaction chromatography',
      'Mixed-mode chromatography',
      'Viral clearance strategy development',
      'Ultrafiltration and diafiltration (UF/DF)',
      'Bulk formulation development',
      'Process characterization for technology transfer'
    ],
    sections: [
      {
        title: 'Upstream Process Development',
        text: 'We optimize upstream processes through media and feed strategy development, bioreactor parameter optimization, and process characterization using Design of Experiments (DoE). Key performance attributes such as cell growth, productivity, and product quality are continuously evaluated to establish reliable manufacturing processes.',
        dark: false,
        image: '/images/equipment1.png',
        bullets: [
          'Media and feed optimization',
          'Shake flask and bioreactor process development',
          'Process characterization using DoE',
          'Cell culture optimization',
          'Process scalability assessment',
          'Continuous process intensification for monoclonal antibodies'
        ]
      },
      {
        title: 'Downstream Process Development',
        text: 'Our downstream development strategies are designed to maximize product recovery while maintaining purity, safety, and product quality. Development data packages are generated to support IND and IMPD submissions while facilitating efficient technology transfer to GMP manufacturing.',
        dark: false,
        image: '/images/equipment2.png',
        bullets: [
          'Affinity chromatography development',
          'Ion exchange chromatography',
          'Hydrophobic interaction chromatography',
          'Mixed-mode chromatography',
          'Viral clearance strategy development',
          'Ultrafiltration and diafiltration (UF/DF)',
          'Bulk formulation development',
          'Process characterization for technology transfer'
        ]
      }
    ],
    specs: [
      { label: 'Upstream', value: 'Media, Feed, Bioreactor Optimization' },
      { label: 'DoE', value: 'Process Characterization' },
      { label: 'Downstream', value: 'Chromatography, UF/DF, Formulation' },
      { label: 'Tech Transfer', value: 'Scalable GMP-Ready Packages' },
    ],
    faqs: [
      { question: 'What upstream process development capabilities are offered?', answer: 'We offer media and feed optimization, shake flask and bioreactor development, process characterization using DoE, cell culture optimization, scalability assessment, and continuous process intensification for monoclonal antibodies.' },
      { question: 'What downstream purification methods are supported?', answer: 'We develop affinity chromatography, ion exchange, hydrophobic interaction, mixed-mode chromatography, viral clearance, ultrafiltration/diafiltration (UF/DF), and bulk formulation.' },
      { question: 'How do you support technology transfer to GMP manufacturing?', answer: 'Our comprehensive development packages, defined process parameters, and close cross-functional collaboration ensure seamless technology transfer into clinical and commercial GMP manufacturing suites.' }
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
    image: '/images/analytical_instruments.jpg',
    capabilities: [
      'Method development, qualification, and validation',
      'Identity and purity testing',
      'SEC-HPLC, CEX-HPLC, CE-SDS, and IEF',
      'Cell-based and binding potency assays',
      'Forced degradation and stability-indicating studies',
      'Reference standard qualification',
      'Method transfer to Quality Control laboratories'
    ],
    sections: [
      {
        title: 'Platform Support',
        text: 'Our analytical platforms support the characterization of monoclonal antibodies, bispecific antibodies, antibody-drug conjugates (ADCs), and related biologic modalities in accordance with current ICH guidelines.',
        dark: false,
        image: '/images/analytical_instruments.jpg',
      },
      {
        title: 'Integrated with Process Development',
        text: 'By integrating analytical development with process development from the outset, we reduce development timelines, facilitate technology transfer, and support efficient progression into GMP manufacturing.',
        dark: false,
        image: '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
      },
      {
        title: 'Method Transfer to QC & Release',
        text: 'Qualified and validated methods are transferred seamlessly into QC laboratories to support in-process testing, lot release, and stability programs.',
        dark: false,
        image: '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
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
    heading: 'Clinical-grade drug substance Built on Development Knowledge.',
    description: 'Lambda CDMO provides cGMP drug substance manufacturing services for biologics, supporting clinical development from First-in-Human (FIH) studies through later-phase clinical programs. Our manufacturing teams work closely with development and analytical scientists to ensure a seamless transition from process development to GMP production while maintaining product quality and process consistency.',
    image: '/images/cdn/pexels-3938022.jpg',
    capabilities: [
      'GMP seed train and production bioreactor operations',
      'Mammalian cell culture manufacturing',
      'Upstream and downstream processing',
      'Chromatographic purification and polishing',
      'Ultrafiltration and diafiltration (UF/DF)',
      'In-process quality control and process monitoring',
      'Batch record review and manufacturing documentation',
      'Complete chain of identity and chain of custody management',
      'Clinical supply manufacturing for Phase I to Phase III studies'
    ],
    sections: [
      {
        title: 'Seamless Development to GMP Transfer',
        text: 'Our manufacturing teams work closely with development and analytical scientists to ensure a seamless transition from process development to GMP production while maintaining product quality and process consistency.',
        dark: false,
      },
      {
        title: 'Scalable cGMP Operations & Compliance',
        text: 'Designed for scalability and regulatory compliance, our manufacturing operations support the production of high-quality biologics drug substance with comprehensive quality oversight throughout the manufacturing lifecycle.',
        image: '/images/cdn/pexels-2280571.jpg',
        dark: true,
      },
      {
        title: 'Clinical Supply Enablement',
        text: 'Full cGMP batch documentation, in-process controls, and cold-chain custody management for Phase I to Phase III clinical campaigns.',
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
    image: '/images/insights/robotic_fill_finish.png',
    capabilities: [
      'Formulation development and optimization',
      'Excipient compatibility studies',
      'GMP aseptic fill-finish operations',
      'Liquid and lyophilized dosage forms',
      'Vial filling and primary container systems',
      'Lyophilization cycle development',
      'Visual inspection and product release support',
      'Labelling and secondary packaging',
      'Stability storage and sample management',
      'Quality control documentation and batch release support'
    ],
    sections: [
      {
        title: 'Unified Quality Framework',
        text: 'Working within the same quality framework as drug substance manufacturing enables efficient technology transfer, reduced operational complexity, and reliable clinical supply.',
        image: '/images/sample.webp',
        dark: false,
      },
      {
        title: 'Aseptic Filling & Finished Dosage Forms',
        text: 'We ensure consistent product quality throughout the manufacturing process, from formulation development and lyophilization to automated fill-finish and batch release support.',
        dark: true,
      },
      {
        title: 'Packaging, Stability & Release',
        text: 'Complete secondary packaging, labelling, ICH stability chambers, and certified QA release documentation for clinical distribution.',
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
    capabilities: [
      'Identity testing using peptide mapping, LC-MS, and immunological methods',
      'Purity analysis using SEC-HPLC, CE-SDS, and IEF',
      'Potency testing using cell-based and ligand-binding assays',
      'Protein concentration analysis',
      'Stability testing and stability-indicating methods',
      'Endotoxin testing using LAL methods',
      'Sterility, bioburden, and particulate matter testing',
      'Batch release testing for drug substance and drug product'
    ],
    sections: [
      {
        title: 'Validated Quality System Alignment',
        text: 'All testing is performed within a validated quality system using qualified analytical platforms, ensuring data integrity, traceability, and regulatory compliance.',
        dark: false,
      },
      {
        title: 'End-to-End Analytical Capabilities',
        text: 'From peptide mapping and intact mass spectrometry to cell-based bioassays and compendial microbiology, our testing suites support early development through commercial supply.',
        dark: true,
      },
      {
        title: 'Support for Regulatory Submissions',
        text: 'Testing is designed to generate reliable data and certificates of analysis (CoA) to support global regulatory filings throughout the product lifecycle.',
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
    image: '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
    capabilities: [
      'Primary structure analysis',
      'Intact and peptide mass analysis',
      'Disulfide bond mapping',
      'Glycan profiling',
      'Charge variant analysis',
      'Aggregation and fragmentation analysis',
      'Higher-order structure characterization',
      'Forced degradation and stress stability studies',
      'Biosimilar comparability studies',
      'Product characterization for regulatory submissions'
    ],
    sections: [
      {
        title: 'Detailed Molecular Evaluation',
        text: 'Our analytical platforms support monoclonal antibodies (mAbs), bispecific antibodies, antibody-drug conjugates (ADCs), recombinant proteins, and other complex biologic modalities throughout development and manufacturing.',
        dark: false,
      },
      {
        title: 'Critical Quality Attributes & Comparability',
        text: 'Orthogonal analytical characterization enables detailed evaluation of product identity, structure, purity, heterogeneity, and stability to support comparability assessments.',
        dark: true,
      },
      {
        title: 'Regulatory-Ready Packages',
        text: 'Characterization datasets are generated to ICH Q6B standards, providing complete structural verification for IND, BLA, and biosimilar dossiers.',
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
    title: 'Bioassays & Immunogenicity Testing — Lambda CDMO',
    metaTitle: 'Bioassays & Immunogenicity Testing | Lambda CDMO',
    metaDesc: 'Lambda CDMO develops and performs functional bioassays and immunogenicity testing to support potency, mechanism of action, and regulatory submissions.',
    badge: 'Characterization',
    heading: 'Functional Bioassays That Demonstrate Biological Activity.',
    description: 'Functional bioassays are essential for evaluating biological activity, potency, and mechanism of action throughout biologics development. Lambda CDMO develops and performs bioassays that support product characterization, process development, comparability assessments, batch release, and regulatory submissions.',
    image: '/images/cdn/pexels-4033148.jpg',
    capabilities: [
      'Cell-based potency assays',
      'Reporter gene assays',
      'Binding assays & ligand-receptor binding',
      'ADCC and CDC functional assays',
      'Mechanism-of-action (MOA) assays',
      'Reference standard qualification',
      'Potency assignment studies',
      'Anti-drug antibody (ADA) screening, confirmation & titration',
      'Neutralizing antibody (NAb) assays',
      'In vitro immunogenicity risk assessment',
      'Immunogenicity support for clinical development'
    ],
    sections: [
      {
        title: 'Bioassay Capabilities',
        text: 'Functional bioassays support product characterization, process development, comparability assessments, reference standard qualification, and batch release.',
        dark: false,
        bullets: [
          'Cell-based potency assays',
          'Reporter gene assays',
          'Binding assays',
          'ADCC and CDC functional assays',
          'Mechanism-of-action assays',
          'Reference standard qualification',
          'Potency assignment studies'
        ]
      },
      {
        title: 'Immunogenicity Testing',
        text: 'Our immunogenicity capabilities help sponsors assess potential immune responses during product development and clinical evaluation, including ADA screening/titration, NAb assays, and risk assessments.',
        dark: true,
        bullets: [
          'Anti-drug antibody (ADA) screening',
          'ADA confirmation and titration',
          'Neutralizing antibody (NAb) assays',
          'In vitro immunogenicity risk assessment',
          'Immunogenicity support for clinical development'
        ]
      },
      {
        title: 'Regulatory Guidance Aligned',
        text: 'All assays are developed and performed in accordance with current FDA, EMA, and ICH guidance, supporting regulatory submissions throughout the product lifecycle.',
        dark: false,
        bullets: [
          'FDA, EMA, and ICH regulatory compliance',
          'Phase-appropriate assay validation',
          'Complete data packages for IND & BLA submissions',
          'cGMP documentation and release testing'
        ]
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
    capabilities: [
      'Sterility testing',
      'Bioburden testing',
      'Bacterial endotoxin testing (BET)',
      'Environmental monitoring',
      'Mycoplasma detection',
      'Container closure integrity testing',
      'Microbial limit testing',
      'Water and utility microbiological testing'
    ],
    sections: [
      {
        title: 'Global Pharmacopeial Compliance',
        text: 'Testing is conducted in accordance with USP, EP, and IP standards within an established quality management system.',
        dark: false,
      },
      {
        title: 'Microbiological Safety & Integrity',
        text: 'Our microbiology suites provide full sterility validation, endotoxin quantitation, bioburden profiling, and container closure integrity verification.',
        dark: true,
      },
      {
        title: 'Support for Product Release & Environment',
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
    heading: 'Platform Capabilities for Monoclonal Antibodies (mAbs).',
    description: 'Monoclonal antibodies (mAbs) continue to be one of the most widely developed biologic modalities, driving innovation across oncology, immunology, and other therapeutic areas. Lambda CDMO offers integrated development and manufacturing capabilities for monoclonal antibodies, supporting sponsors from cell line development and process optimization through analytical characterization and GMP manufacturing.',
    image: '/images/Monoclonal_Antibodies.png',
    capabilities: [
      'Cell line development using mammalian expression systems',
      'Upstream and downstream process development',
      'Analytical characterization for IgG1, IgG2, and IgG4 subclasses',
      'Process scale-up and technology transfer',
      'Drug substance and drug product manufacturing',
      'Quality control and analytical testing',
      'Support for clinical development programs',
    ],
    sections: [
      {
        title: 'Innovator and Biosimilar Support',
        text: 'Our platform is designed to support innovator and biosimilar programs across IgG1, IgG2, and IgG4 subclasses.',
        dark: false,
      },
      {
        title: 'Unified Operating Model',
        text: 'By integrating development, manufacturing, analytical sciences, and quality functions within a unified operating model, we help simplify technology transfer and support efficient progression to clinical manufacturing.',
        dark: true,
      },
      {
        title: 'End-to-End mAb Services',
        text: 'Comprehensive capabilities from mammalian cell line development to GMP batch release under a single quality management system.',
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
    image: '/images/Bispecific_Antibodies.png',
    capabilities: [
      'Cell line development for bispecific and bifunctional antibodies',
      'Upstream and downstream process development',
      'Process optimization to reduce homodimer and mispairing impurities',
      'Orthogonal analytical characterization',
      'Forced degradation and stability studies',
      'In vitro bioassays for functional characterization',
      'Drug substance and drug product manufacturing',
    ],
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
        title: 'Bispecific Analytics & Bioassays',
        text: 'In vitro bioassays for functional characterization paired with high-resolution mass spec to ensure correct chain pairing.',
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
    image: '/images/Antibody-Drug_Conjugates.png',
    capabilities: [
      'Monoclonal antibody development for ADC programs',
      'Conjugation process development',
      'Drug-to-antibody ratio (DAR) characterization',
      'Product purity and aggregation analysis',
      'Analytical characterization using orthogonal methods',
      'In vitro bioassays for potency assessment',
      'Drug substance manufacturing for clinical development',
    ],
    sections: [
      {
        title: 'Specialized ADC Development',
        text: 'Our platform is designed to generate comprehensive analytical data that supports product characterization, process development, and clinical manufacturing.',
        dark: false,
      },
      {
        title: 'Conjugation & DAR Control',
        text: 'Capabilities include monoclonal antibody development for ADC programs, conjugation process development, drug-to-antibody ratio (DAR) characterization, and product purity/aggregation analysis.',
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
    image: '/images/Proteins_%26_Peptides.png',
    capabilities: [
      'Recombinant protein expression using CHO, HEK293, and E. coli expression systems',
      'Process development and optimization',
      'Protein purification and refolding',
      'Synthetic peptide manufacturing and purification',
      'Analytical characterization and release testing',
      'In vitro immunogenicity assessment',
      'Drug substance and drug product manufacturing for clinical development',
    ],
    sections: [
      {
        title: 'Diverse Biologic Applications',
        text: 'Capabilities are designed to support recombinant proteins, fusion proteins, enzymes, cytokines, growth factors, and synthetic peptides while maintaining product quality and regulatory compliance throughout development and manufacturing.',
        dark: false,
      },
      {
        title: 'Expression and Purification',
        text: 'Platform capabilities include recombinant protein expression using CHO, HEK293, and E. coli expression systems, process development and optimization, protein purification and refolding, and synthetic peptide manufacturing.',
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
    image: '/images/cdn/unsplash-1456324504439-367cee3b3c32.jpg',
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
    image: '/images/cdn/unsplash-1551288049-bebda4e38f71.jpg',
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
    image: '/images/cdn/pexels-590022.jpg',
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
    image: '/images/cdn/unsplash-1504711434969-e33886168f5c.jpg',
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
    image: '/images/cdn/unsplash-1540575467063-178a50c2df87.jpg',
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
