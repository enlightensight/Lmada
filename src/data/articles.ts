export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string; // Used for filtering (Web design, Product design, UI Design)
  readingTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  content: string; // Markdown body content
}

export const articles: Article[] = [
  {
    slug: 'crafting-exceptional-user-experiences',
    title: 'Crafting Exceptional User Experiences',
    subtitle: 'In the ever-changing landscape of digital design, UX design stands as a pillar of creating experiences that resonate.',
    category: 'Web design',
    readingTime: '8 min read',
    date: 'November 15, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
    content: `
In the ever-changing landscape of digital design, user experience (UX) design stands as a pillar of creating experiences that resonate. A well-designed user experience bridges the gap between technology and human interaction, making digital interfaces feel natural, fluid, and intuitive.

### The Foundation of Modern UX
To create design that works, one must first align on goals. It starts with user research and strategic analysis. Who is the target user? What are their pain points? By building user personas and journey maps, we establish a core strategy before pushing pixels.

> "Good design starts with clear thinking. We must understand the problem before we search for its solution."

### Structuring Content and Navigation
A website or app is only as strong as its information architecture. When layouts are clear, users can navigate effortlessly.
*   **Keep it simple:** Avoid cluttered layouts. Give elements breathing room.
*   **Prioritize hierarchy:** Use visual weight, sizing, and contrast to guide the user's eye.
*   **Feedback states:** Active button styles, loaders, and success screens reassure users that their actions are registered.

By combining these principles, we elevate simple digital interactions into polished, memorable experiences.
    `,
  },
  {
    slug: 'ui-design-elevating-experiences',
    title: 'UI Design: Elevating Experiences',
    subtitle: 'Exploring the intersection of visual precision, interactive micro-animations, and digital systems.',
    category: 'UI Design',
    readingTime: '6 min read',
    date: 'October 24, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80',
    content: `
User Interface (UI) design is the craft of creating the visual wrapper of an application. From color palettes to typography choices, UI determines how a brand feels on screen.

### The Role of Design Tokens
Consistency is the most vital asset of a digital product. By building design tokens for layout variables, spacing scale, colors, and shadows, we make sure that the product looks identical on every viewport.

#### Key Principles:
1.  **Readability:** Never compromise text contrast for styling.
2.  **Affordance:** Buttons should look like they can be clicked; inputs should invite typing.
3.  **Animation:** Use micro-interactions to delight, not distract. Keep durations short (around 200ms–300ms) and motion elegant.
    `,
  },
  {
    slug: 'the-ux-revolution-shaping-digital-experiences',
    title: 'The UX Revolution: Shaping Digital Experiences',
    subtitle: 'How modern user-centric thinking has changed the way digital products are planned and executed.',
    category: 'Product design',
    readingTime: '5 min read',
    date: 'October 10, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=1200&q=80',
    content: `
The digital space has shifted. We no longer just build functional software; we create experiences. This revolution places the human user at the center of all technical architectures.
    `,
  },
  {
    slug: 'mastering-ui-design-trends-a-deep-dive',
    title: 'Mastering UI Design Trends: A Deep Dive',
    subtitle: 'An analytical review of glassmorphic styles, editorial serif headers, and custom micro-interactions.',
    category: 'UI Design',
    readingTime: '10 min read',
    date: 'September 28, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932ded7?auto=format&fit=crop&w=1200&q=80',
    content: `
Trends come and go, but the core fundamentals of clean hierarchy and accessibility remain. In this article, we dive into how you can combine modern styling like glassmorphic blurs with timeless typographic layout styles.
    `,
  },
  {
    slug: 'the-power-of-responsive-web-design',
    title: 'The Power of Responsive Web Design',
    subtitle: 'Ensuring your editorial visual brand is communicated clearly on screens of all dimensions.',
    category: 'Web design',
    readingTime: '7 min read',
    date: 'September 12, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    content: `
A premium layout shouldn't break when resized. Responsive design is about flexible grids, liquid components, and layout-respectful breakpoints.
    `,
  },
  {
    slug: 'mastering-the-craft-of-user-experience-design',
    title: 'Mastering the Craft of User Experience Design',
    subtitle: 'Deep research methods, data audits, and feedback tracking loops to polish the digital lifecycle.',
    category: 'Product design',
    readingTime: '9 min read',
    date: 'August 30, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    content: `
To master UX design, you must understand both design psychology and frontend performance. Let's analyze how to optimize layouts for user attention.
    `,
  },
  {
    slug: 'revolutionizing-ux-design',
    title: 'Revolutionizing UX Design',
    subtitle: 'How AI integrations and real-time design editors are speeding up project delivery times.',
    category: 'Product design',
    readingTime: '6 min read',
    date: 'August 18, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    content: `
Modern design platforms like Framer allow teams to prototype and publish instantly, bridging the gap between layouts and deployment.
    `,
  },
  {
    slug: '10-web-design-trends-to-watch-in-2023',
    title: '10 Web Design Trends to Watch in 2023',
    subtitle: 'Reviewing typography shifts, dark mode gradients, and scroll-bound animations.',
    category: 'Web design',
    readingTime: '12 min read',
    date: 'July 05, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    content: `
Stay ahead of the curve. Here are the top 10 visual trends shaping modern editorial web design this year.
    `,
  },
  {
    slug: 'the-art-of-responsive-web-design',
    title: 'The Art of Responsive Web Design',
    subtitle: 'Focusing on fluid layouts, media controls, and tactile touch interactions.',
    category: 'Web design',
    readingTime: '8 min read',
    date: 'June 20, 2023',
    author: {
      name: 'Sevora Vale',
      avatar: 'https://framerusercontent.com/images/cgXwgj75ijDSBCwJjLkPHR8f8.png',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: `
Crafting digital interfaces that dynamically fit standard displays, from wide desktop panels to compact handheld screens.
    `,
  },
];
