Create a pixel-close Next.js replica of this Framer portfolio website.
Important:
Do not make a generic portfolio template. Recreate the exact visual language: light background, editorial serif headings, refined black/gray UI, large whitespace, soft rounded cards, monochrome portrait imagery, dark glass cards, pill badges, subtle borders, and smooth Framer-like reveal animations.
Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Local data files for projects and articles
- Responsive design for desktop, tablet, and phone
Fonts:
Use:
- Lora for large editorial headings
- Instrument Sans or Inter for body, UI, buttons, nav, labels, and cards
Global visual style:
- Background: near-white / very light gray
- Text: near-black
- Muted text: medium gray
- Cards: white / very light gray with subtle border
- Dark feature cards: near-black gradient with soft internal abstract glow
- Buttons: black/dark gradient with shadow
- Secondary buttons: light surface with border
- Radius:
  - Large hero/card containers: 24px–32px
  - Project images: 12px–16px
  - Buttons: 8px–12px
  - Badges: full pill
- Borders: 1px solid very light gray
- Shadows: soft, low opacity, mostly under buttons and dark feature cards
- Layout: centered max-width around 1152px–1200px
- Section spacing: very generous; desktop sections often separated by 120px–180px vertical whitespace
Animation system:
Use Framer Motion for all animation.
Global section reveal:
Every major section header and major content block should animate on scroll:
initial: { opacity: 0, y: 64 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, amount: 0.3 }
transition: { duration: 0.4, ease: [0.44, 0, 0.56, 1] }
Hero animation:
- Hero header/text appears on mount.
- Main hero content fades in from y 64 with delay around 0.4s.
- CTA buttons/actions fade in with delay around 0.6s.
- Logo cloud fades in with delay around 0.3s.
- Floating dark contact card fades in after image/content.
- Keep motion elegant, not bouncy.
Process/steps animation:
For process/approach vertical steps:
initial: { opacity: 0, y: 192 }
whileInView: { opacity: 1, y: 0 }
transition: spring-like, stiffness: 400, damping: 30
About page image animation:
- Hero text fades from y 64.
- Signature fades in with delay.
- Portrait/side image fades from y 64.
- Metric cards stagger upward with y offsets.
- Add subtle parallax to one hero/visual image using scroll progress.
Cards hover:
- Project cards: image scales slightly on hover, arrow becomes more visible.
- Article cards: image scales slightly and title color remains dark.
- Dark cards: background glow subtly shifts or opacity changes.
- Buttons: dark gradient brightens slightly and shadow strengthens.
- Accordion items: plus rotates into minus when open.
Tabs:
- Project and article tabs switch instantly or near-instantly.
- Active tab is a black rounded pill with white text and shadow.
- Inactive tabs are simple text buttons.
Mobile menu:
- Fixed top navigation.
- Desktop shows brand, links, and actions.
- Tablet/phone uses menu button.
- Menu opens with spring animation.
- Closed: opacity 0, y -16, pointer-events none.
- Open: opacity 1, y 0, pointer-events auto.
- Links stagger slightly.
Reduced motion:
Respect prefers-reduced-motion by disabling parallax, large y movement, and stagger.
Pages to build:
1. Home `/`
2. About `/about`
3. Projects `/projects`
4. Articles `/article`
5. Article detail `/article/[slug]`
6. Contact `/contact`
7. Not found `/404` or `not-found.tsx`
Shared components:
- Navigation
- MobileMenu
- Footer
- Button
- Badge
- SectionHeader
- Reveal
- ProjectCard
- ArticleCard
- StatCard
- FeatureCard
- PricingCard
- TestimonialCard
- AccordionItem
- Tabs
- ServicesTabs
- ContactInfoCard
- FormButton
HOME PAGE `/`
1. Hero section
Visual layout:
- Large rounded light-gray hero panel at top.
- Left side: editorial heading and text.
- Right side: large black-and-white male portrait.
- Portrait is clipped inside the rounded hero panel.
- Floating dark translucent contact card overlays bottom-right of portrait.
- Stats row under CTA on left.
- Logo cloud below hero panel.
Hero copy:
Heading:
“Design Better”
second line muted:
“Faster Smarter”
Body:
“I design refined brands, websites, and interfaces for ambitious founders and creative teams.”
Buttons:
- Primary: “View projects”
- Secondary: “Get in touch”
Stats:
- “23+” / “Projects completed”
- “6yr” / “Experience”
- “31+” / “Happy clients”
Floating card:
- Small label: “Select project”
- Title: “Available for projects”
- Text: “Share a few details, and I’ll get back with a clear direction.”
- Small arrow button on the right
Hero image:
Use:
https://framerusercontent.com/images/3Wbfg1JRGAb4TRMMz69WlQMTe8.png
Logo cloud:
Horizontal scrolling or static row.
Visible logos/text:
Codify, Flowboard, Agentify, TodoFusion, Identify, Nexus AI, Landify.
Use Logos-style simple black icons or text approximations.
2. Benefits section
Centered badge: “Benefits”
Heading:
“Discover why we stand out”
Description:
“Designing clean, responsive websites that communicate clearly, guide visitors smoothly, and support meaningful business goals.”
Layout:
- 3 equal cards in a row on desktop.
- Each card has large visual mockup/image area at top and text at bottom.
- White cards with thin border and radius.
- First card: tool/sidebar UI visual.
- Second card: chart/analytics visual.
- Third card: agency/social proof visual.
Cards:
1. “Clear design systems”
“Elevate your B2B brand with specialized design expertise, enhancing industry presence.”
2. “Websites built to perform”
“Dominate search results with our precision-tailored sites designed for top rankings and visibility.”
3. “Framer-ready execution”
“Expand and flourish with Framer's innovation and design expertise, propelling your success.”
Images:
https://framerusercontent.com/images/fNNlYXrAGPgp4qHPRedQjrKpo9c.svg
https://framerusercontent.com/images/WpPH5o5mJSJkqfaHofbVcED1fiE.png
3. Projects section
Centered badge: “Selected work”
Heading:
“Projects with clarity”
Description:
“A curated collection of brand, web, and product design work created for modern teams.”
Layout:
- 2-column project grid on desktop.
- Large thumbnail cards.
- No card border around whole item; image has rounded corners.
- Project title below image, left aligned.
- Tiny arrow icon on right.
Show 6 projects:
- Brandora
- Nivora
- Codify
- Neutra
- Snapkit
- Todofusion
Use real project thumbnails from project data or recreate with placeholders if unavailable.
4. Why choose me section
Layout:
- Top: left heading, right paragraph.
- Below: asymmetrical bento grid.
- White cards plus one dark black card.
- Lots of whitespace.
Badge:
“Why choose me”
Heading:
“Design built around
lasting clarity”
Paragraph:
“I bring strategy, visual direction, and refined execution together to create meaningful digital experiences with lasting impact.”
Cards:
- small avatar row + “Label”
- “Clear design direction shaped around every project goal.”
- “0% Client satisfaction”
- “0+ Projects completed”
- green dot “Available for projects”
- Dark card:
“I help founders, creators, and teams turn ideas into refined digital experiences that feel memorable and easy to navigate.”
“4.9” with stars
“Trusted by clients worldwide”
5. Services section
Centered badge: “Services”
Heading:
“Creative services for digital brands”
Description:
“Focused design and development support to help brands build clearer identities, better websites, and refined product experiences.”
Layout:
- Two-column.
- Left: vertical services list.
- Active service card has white card shadow.
- Right: large light 3D/mockup image card.
Services:
- Development
“Building responsive, polished websites with clean structure, smooth interactions, and launch-ready execution.”
- Brand Guidelines
“Creating clear visual systems that keep your brand consistent across every touchpoint.”
- Product design
“Designing intuitive interfaces and user flows that make digital products feel simple and refined.”
6. Process section
Layout:
- Left column heading.
- Right column vertical timeline list with icons and divider line.
Badge:
“Process”
Heading:
“How the process flows
with clarity”
Description:
“A clear and collaborative workflow that moves each project from first idea to polished final result.”
Steps:
- Discovery
“We start by understanding your goals, audience, brand needs, and the direction your project should take.”
- Strategy
“I define the structure, message, and creative approach before moving into the visual design stage.”
- Direction
“A clear visual direction is shaped through mood, layout ideas, typography, and overall design language.”
- Design
“The main layouts, brand elements, and digital experiences are crafted with careful attention to detail.”
- Development
“Designs are turned into responsive, polished pages with smooth interactions and clean structure.”
- Delivery
“Final assets, pages, and guidelines are prepared clearly so everything is ready to launch.”
7. Features section
Centered badge: “Expertise”
Heading:
“Design support with clear direction”
Description:
“A focused mix of strategy, design, and execution to help ideas become clear, refined, and ready to launch with confidence.”
Layout:
- Bento grid with 7 cards.
- Mostly white cards.
- One large dark card on upper-right labeled “Speed.”
Cards:
- Affordability
- Consistency
- Scalability
- Speed
- Flexibility
- Diversity
- Support
- Convenience
Dark card:
Title: “Speed”
Text:
“Get quicker turnarounds on design projects without sacrificing quality at a way better price on your wallet.”
8. Testimonials
Badge:
“Testimonials”
Heading:
“What clients say”
Right paragraph:
“Thoughtful feedback from founders and teams who trusted the process, direction, and final result.”
Layout:
- Three-column testimonial bento.
- Left large dark testimonial card with glow.
- Middle stacked white card and trusted strip.
- Right card with dark CTA button on top.
Use visible names:
- Ethan Brooks / Founder
- Maya Chen / Designer
- Liam Carter / Director
9. Pricing
Centered badge:
“Pricing”
Heading:
“Simple packages, clear outcomes”
Description:
“Focused packages for design, Framer, and launch.”
Layout:
- Two centered pricing cards.
- Left white card.
- Right dark premium card.
Left:
“Framer”
“A focused Framer build for brands that need a clean, responsive, and launch-ready website.”
“$1,000 USD”
Button: “Start a project”
Features:
Framer website development, Responsive page setup, CMS structure setup, Basic interactions, Launch support
Right:
“Premium”
“A complete design package for brands that need strategy, identity, and a refined website.”
“$2,400 USD”
Button: “Book this package”
Features:
Full website design, Brand identity direction, Visual system guidelines, Responsive page layouts, Final asset handoff
10. FAQs
Centered heading:
“Explore our FAQs”
Description:
“Answers to questions about process, pricing, timelines, and project details”
Accordion questions:
- How do I submit designs requests?
- How does onboarding work?
- How fast will I receive my designs?
- Do you work at our company?
- Why not hire full-time?
- Can I order a one-time long service?
- What tools do you use?
- What is your refund policy?
ABOUT PAGE `/about`
Visual style:
Very airy editorial layout with large serif headings and big photography.
1. Hero
Two-column:
- Left text
- Right large portrait image
- Bottom row: 3 metric cards
Badge:
“About me”
Heading:
“Good design starts
with clear thinking.”
Description:
“I’m an independent digital designer creating refined identities, websites, and product experiences shaped by strategy, clarity, and thoughtful execution.”
Signature image/handwritten mark under text.
Right image:
Large rounded rectangle portrait.
Metric cards:
1. “8+” / “Years of experience”
“Working with brands and teams around the world since 2016.”
2. “24+” / “Happy clients”
“Trusted by startups, agencies, and established brands.”
3. “Available” / “For new project”
“Currently available for branding, web, and digital projects.”
Images:
https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png
https://framerusercontent.com/images/xr7AByWMQArTJoUQ72juGc1wbI.jpg
https://framerusercontent.com/images/tM9dFJoYpuPFsgm0rEyiucfcUWc.png
2. My approach
Two-column:
- Left text + vertical timeline
- Right large warm desk/wireframe photo
Badge:
“My approach”
Heading:
“Design is more
than how it looks”
Description:
“A clear and collaborative workflow that moves each project from first idea to polished final result.”
Timeline:
- Strategy first
“Understanding the goal, audience, and message before designing.”
- Clear direction
“Building a focused visual language with purpose and consistency.”
- Refined execution
“Polishing every detail until the final result feels complete.”
Image:
https://framerusercontent.com/images/UzJzJqXzd7hGr0L8GmNzJ0s41wM.png
3. Principles
Centered:
Badge:
“Principles”
Heading:
“The values behind my work”
Description:
“A few simple principles guide every project, from early direction to final execution.”
Four cards:
1. “01” “Clarity first”
“I believe strong design should make ideas easier to understand, not harder to explain.”
2. Dark card “02” “Purposeful details”
“Every layout, interaction, and visual choice should support the message behind the work.”
3. “03” “Simple systems”
“I create design structures that stay useful, flexible, and consistent as brands grow.”
4. “04” “Thoughtful execution”
“The final result should feel polished, intentional, and ready to be used with confidence.”
4. Tools
Two-column / asymmetric:
Left:
Badge “Tools”
Heading:
“The tools behind
the work”
Description:
“The tools I use to shape ideas, design systems, build websites, and prepare polished final work.”
Left list:
- Design — Figma, Illustrator, Photoshop
- Build — Framer, Webflow
- Motion — After Effects
Right:
Floating tilted tool cards:
- Framer
“Building fast, responsive websites with fluid interactions.”
- Figma
“Design, prototype & create systems.”
- illustrator
“Create vector graphics & assets.”
- Photoshop
“Edit images & craft polished visuals.”
- Webflow
“Build responsive sites with visual control.”
5. My story
Two-column:
- Left image of desk / Framer screen with dark overlay card
- Right text story
Overlay card:
“Since”
“2016”
“Design & digital experiences”
Badge:
“My story”
Heading:
“From curiosity to
refined craft”
Paragraphs:
“My work started with a simple interest in how visuals shape the way people feel, understand, and remember ideas.”
“Over time, that interest grew into a focused practice across brand identity, web design, product interfaces, and Framer development.”
“Today, I work with founders, teams, and creative businesses to build digital experiences that feel clear, refined, and ready to grow.”
Signature:
“Sevora Vale”
“Founder & Designer”
Images:
https://framerusercontent.com/images/hiVKDTvJcZfQcvsdGemPrqIROGc.png
https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png
6. CTA
Large rounded light-gray section split into two columns:
Left:
Badge/button-like label: “Start a project”
Heading:
“Let’s create something
thoughtful together”
Text:
“Have a brand, website, or product idea in mind? Share a few details and let’s shape the next step.”
Buttons:
- Get in touch
- View projects
Bottom tags:
Branding · Web design · Framer
Right:
Large dark card with glow:
“Availlable for new projects”
“Currently booking for may - June 2026”
Contact rows:
Email: hello@sevora.com
Location: Tallinn, Estonia / Remote
Responsive time: Within 24 hours
PROJECTS PAGE `/projects`
Top layout:
- Huge left-aligned editorial heading.
- Large whitespace top and right.
- Badge: “Projects”
Heading:
“Selected work with
clear direction”
Description:
“A focused collection of brand, web, and product design projects shaped through strategy, clarity, and refined execution.”
Tabs:
- All projects
- AI
- Business
- One page
- Online course
- Portfolio
Active tab:
black pill with white text and shadow.
Inactive tabs:
plain text.
Grid:
- 2 columns desktop.
- Large project thumbnails.
- Title below.
- Arrow icon on right.
- Phone: one column.
ARTICLE LIST `/article`
Top layout:
- Large left-aligned editorial heading.
- Badge: “Journal”
Heading:
“Thoughts on design,
process, and clarity”
Description:
“A collection of ideas, notes, and practical reflections on design systems, websites, creative direction, and digital craft.”
Tabs:
- All article
- Web design
- Product design
- UI Design
Grid:
- 3 columns desktop.
- Article image on top with rounded corners.
- Meta row under image:
category · reading time
- Title below.
- Load More button centered after grid.
Visible article titles:
- Crafting Exceptional User Experiences
- UI Design: Elevating Experiences
- The UX Revolution: Shaping Digital Experiences
- Mastering UI Design Trends: A Deep Dive
- The Power of Responsive Web Design
- Mastering the Craft of User Experience Design
- Revolutionizing UX Design
- 10 Web Design Trends to Watch in 2023
- The Art of Responsive Web Design
ARTICLE DETAIL `/article/[slug]`
Layout:
- Centered article header with large serif title.
- Top button/pill: “All Article” with left arrow.
- Title:
“Crafting Exceptional
User Experiences”
- Subtitle:
“In the ever-changing landscape of digital design, UX design stands as a pillar of creating experiences that resonate.”
- Meta row:
avatar, Sevora Vale, Category, 8 min read, November 15, 2023
- Large rounded hero image centered.
- Article content max width around 700px, left aligned.
- Paragraphs with comfortable line height.
- Related articles section with centered heading and 3 cards.
CONTACT PAGE `/contact`
Top:
Badge:
“Contact”
Heading:
“Let's talk about your
next project”
Description:
“Have a brand, website or product idea in mind? Share a few details and I’ll get back to you soon.”
Layout:
- Two columns.
- Left: large form card.
- Right: dark contact information card with abstract glow.
Form:
White card, rounded corners, subtle border.
Fields:
- Name placeholder Jane Smith
- Email placeholder jane@framer.com
- Project type select placeholder Select...
- Badget range select placeholder Select...
- Message textarea placeholder Tell me about your project...
Submit button:
“Send message”
Full width, black gradient, shadow.
Right dark card:
Title:
“Availlable for selected projects”
Text:
“Currently booking for may - June 2026”
Rows:
- Email: hello@sevora.com
- Location: Tallinn, Estonia / Remote
- Responsive time: Within 24 hours
Dark card background:
Use abstract soft glow / noise / gradient. If no shader, use radial gradients and blur.
404 PAGE
Centered near top:
Badge:
“404 error”
Heading:
“Page not found”
Description:
“We're sorry, but the page you're looking for could not be found. It may have been moved, deleted, or never existed in the first place.”
Button:
“Back to Home”
Dark gradient button with small icon.
Final polish:
- The site should feel like a premium Framer template converted to Next.js.
- Keep the exact airy spacing and editorial hierarchy.
- Avoid dark full-page background; the screenshots show a light site with selective dark cards.
- Use Lora-like large headings with strong contrast and tight line height.
- Body text should be clean sans-serif.
- Ensure all pages are responsive and visually close to the provided Framer screenshots.
