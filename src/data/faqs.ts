export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do we initiate a technology transfer with Lambda CDMO?',
    answer: 'Technology transfer begins with a thorough documentation review under NDA. Our process development and quality teams collaborate to map your cell line details, purification protocols, and analytical requirements into our equipment scale parameters.'
  },
  {
    id: 2,
    question: 'What bioreactor scales and options do you offer for drug substance manufacturing?',
    answer: 'We utilize single-use bioreactor (SUB) systems configured for scale-down pilot batches starting at 10L/50L up to clinical GMP runs of 200L and 500L. Our modular cleanroom layout allows rapid adaptation of processing volumes.'
  },
  {
    id: 3,
    question: 'How does Lambda ensure intellectual property (IP) protection?',
    answer: 'IP security is one of our core operational pillars. We isolate data within dedicated project repositories with strict network firewalls. Personnel access controls, role-based database authentications, and electronic logs ensure complete safety for your proprietary scaffolds.'
  },
  {
    id: 4,
    question: 'What is your compliance timeline for regulatory audits?',
    answer: 'Our state-of-the-art facility in Tallinn, Estonia, operates under active cGMP standards. We maintain a constant state of inspection readiness for FDA, EMA, PMDA, and TGA audit teams. Complete run reports and validation dossiers are delivered promptly to support regulatory filings.'
  },
  {
    id: 5,
    question: 'Can you handle complex bio-therapeutics like bispecifics or ADCs?',
    answer: 'Yes. Our scientific team has international experience engineering cell lines and designing custom downstream separation matrices to resolve expression and correct folding challenges for bispecific antibodies and related modalities.'
  },
  {
    id: 6,
    question: 'Do you offer drug product fill/finish and formulation services?',
    answer: 'We provide formulation development to prevent protein degradation, alongside sterile aseptic filling in Grade A environments for liquid or lyophilized clinical drug products in vials.'
  },
  {
    id: 7,
    question: 'What microbiological assays do you perform in-house?',
    answer: 'Our QC team executes full microbiological release testing in-house, including membrane-filtration sterility checks, microbial limits (bioburden testing), and LAL-based bacterial endotoxins testing (BET).'
  },
  {
    id: 8,
    question: 'What is your typical lead time to initiate a clinical batch run?',
    answer: 'Lead times depend on the complexity of your technology transfer and analytical method setup. Generally, we can schedule pilot development runs within 6 to 8 weeks, with GMP clinical drug substance runs following within 12 to 14 weeks.'
  }
];
