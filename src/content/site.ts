// Page copy. CONTENT.md holds the same text; change both together.

export const CONTACT = {
  email: 'jimsonyangbusiness@gmail.com',
  phoneDisplay: '269-883-0074',
  phoneHref: 'tel:+12698830074',
  site: 'corrinotech.com',
  personalSite: 'https://www.jimsonyang.com',
  personalSiteLabel: 'jimsonyang.com',
} as const

export type Service = { title: string; body: string }
export type Step = { title: string; body: string }
export type BackgroundItem = { name: string; body: string }

export const INTRO = {
  company: 'Corrino Tech',
  headline: 'Apps for local businesses',
  role: 'Corrino Tech · Jimson Yang and Divit Endal',
  lead: "We build mobile and web apps for local businesses, published under your business's own name. Jimson has spent years on the sales and engineering side of startups, and Divit runs Endal Technologies, an applied AI consultancy. We start with the features that bring your customers back.",
  location: 'Based in San Francisco.',
}

// Placeholder heading over the wall-of-apps video; final wording to come from Jimson.
export const WALL = {
  heading: 'We build apps',
}

export const SERVICES: Service[] = [
  {
    title: 'Your own branded app',
    body: 'An iPhone, Android or web app with your name and logo on it. Phone apps go out under your own App Store and Google Play accounts, and web apps run on your own domain. We handle the store submissions and reviews.',
  },
  {
    title: 'Ordering, rewards and booking',
    body: 'Customers browse your menu or services, order ahead or book a time, and earn rewards for coming back. We design it around how your customers already buy from you.',
  },
  {
    title: 'Connected to the systems you use',
    body: 'The app syncs with the point-of-sale, inventory or booking software you already pay for, so your staff keep one system and your menu stays current on every screen.',
  },
  {
    title: 'Notifications and upkeep',
    body: 'Send offers on slow days and reminders when a customer is due back. We keep your apps updated for new phone and browser releases and for app store policy changes.',
  },
]

export const REGULATED_NOTE =
  "We also build for regulated industries, where Apple and Google add their own rules on top of the state's. A cannabis dispensary app, for example, has to verify age, show the license number and follow state rules on payments and promotions. We build that in from the start."

export type WorkItem = {
  title: string
  meta: string
  body: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  href?: string
}

export const WORK: WorkItem[] = [
  {
    title: 'Snag',
    meta: 'Marketplace · Live',
    body: "Shoppers name their price for a pair of running shoes, and every store on Snag with their size can accept or pass. Brands set a minimum advertised price, but a store can still make a private deal, so the shopper often pays less than the store's own site charges. The store gets a buyer who already knows their size.",
    image: '/images/work/snag.webp',
    imageAlt: 'Snag home page offering a Pegasus 41 for $96 instead of $109.95',
    imageWidth: 1600,
    imageHeight: 822,
    href: 'https://snaganything.com',
  },
  {
    title: 'Nexus',
    meta: "AI education · Divit Endal at Endal Technologies, with UNC's Shuford Entrepreneurship Program",
    body: 'College athletes with name, image and likeness (NIL) deals get paid like small businesses but get generic financial advice. Nexus builds each athlete a course around their own deals, and its AI tutor answers questions by citing the lesson it used. Tax figures come from calculators instead of the model, and anything that reads like personal financial advice goes to an educator.',
    image: '/images/work/nexus.webp',
    imageAlt: 'Nexus dashboard with progress, daily goals and a market overview',
    imageWidth: 1187,
    imageHeight: 668,
  },
  {
    title: 'Aventos Analytics',
    meta: 'Brand visibility in AI answers · Live',
    body: "When people ask ChatGPT or Google's AI about a product, the answer shapes what they buy. Aventos Analytics turns a brand's Google Ads keywords into hundreds of prompts, runs them across AI models and records every mention, claim and source. Brands see their share of voice against competitors and which sources drive it.",
    image: '/images/work/aventos-analytics.webp',
    imageAlt: 'Aventos Analytics share of voice dashboard with a visibility chart over time',
    imageWidth: 1600,
    imageHeight: 754,
  },
]

export const STEPS: Step[] = [
  {
    title: 'A short call',
    body: "Twenty minutes on how customers find you, buy from you and come back. If an app won't help, we'll tell you.",
  },
  {
    title: 'A demo on your phone',
    body: "We come back with a working app under your name, on your phone, so you're judging something real.",
  },
  {
    title: 'A paid pilot',
    body: 'Four to six weeks live with your customers at a reduced price, with one agreed number to move, such as repeat orders, measured against where you started.',
  },
  {
    title: 'Ongoing support',
    body: 'A flat monthly fee covers hosting, app updates and changes as your business or the rules change.',
  },
]

export const BACKGROUND_INTRO =
  'Jimson is a forward deployed engineer at TrustPixel. Before TrustPixel, Jimson spent several years in startups working on sales, go-to-market and engineering (self-taught on the engineering side) and did due diligence at two venture funds.'

export const BACKGROUND: BackgroundItem[] = [
  {
    name: 'Aventos, co-founder',
    body: "An AI anime studio that turned popular Korean stories into anime. Jimson landed a publisher deal for a series with 98.5M views in Korea and a distribution deal with BlueBox.tv, and turned the studio's internal tools into a platform that made its first $10K.",
  },
  {
    name: 'Project GEO, founder',
    body: 'A tracker for how brands show up when people ask ChatGPT or Claude for recommendations. Jimson built the full stack and took it from zero to its first B2B sales.',
  },
  {
    name: 'Pink Inference, co-founder',
    body: 'A deep tech startup where Jimson worked on the business side. It raised a $100K pre-seed round from the 1517 Fund.',
  },
  {
    name: 'Venture due diligence',
    body: 'Reports for CitySide Ventures across healthcare, SaaS and deep tech, and healthcare diligence at Arboretum Ventures, a medtech fund with over $1B under management.',
  },
  {
    name: 'University of Michigan, Ross School of Business',
    body: 'BBA, 3.89 GPA, magna cum laude.',
  },
]

export const ABOUT_LEAD = 'Corrino Tech is Jimson Yang and Divit Endal.'

export type TeamMember = { name: string; title: string; body: string }

export const TEAM: TeamMember[] = [
  {
    name: 'Jimson Yang',
    title: 'Founder',
    body: 'Jimson builds the apps and works with clients from the first call to launch, and also works as a forward deployed engineer at TrustPixel.',
  },
  {
    name: 'Divit Endal',
    title: 'Owner',
    body: 'Divit runs Endal Technologies, an applied AI consultancy in San Francisco. Endal takes a client workflow to a working prototype in about five days and to production in about five weeks, and hands over a system the client owns. It is a registered partner in the Claude Partner Network.',
  },
]

// Divit's consulting work at Endal Technologies, rewritten from endaltechnologies.com.
export const ENDAL_WORK: BackgroundItem[] = [
  {
    name: 'Nexus, with UNC Shuford',
    body: "An AI tutor for college athletes with NIL deals, built with UNC's Shuford Entrepreneurship Program. Each athlete gets a course built around their own deals.",
  },
  {
    name: 'Desktop agent for Tableau',
    body: "Tableau's desktop app has no good way to automate it, so analysts built dashboards by hand. Endal shipped an agent to a paying analytics customer that builds them and checks every step against the screen and Windows events.",
  },
  {
    name: 'Blueprint compliance',
    body: 'For a product company in architecture and engineering, a pipeline that turns blueprints and electrical drawings into structured data, then has AI agents check them against building codes and contract specs. Reviewers accept or correct each finding.',
  },
  {
    name: 'Neuroscience lab tools',
    body: 'A command-line tool and desktop app that read recordings from Intan and Open Ephys hardware, so labs without programmers can run the same analysis every time.',
  },
]

export const CONTACT_HEADING = 'Want to see your business as an app? We can bring a demo to you.'
