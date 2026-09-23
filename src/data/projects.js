// Data proyek untuk section Projects dan halaman detail.
//
// projects[] { id, slug, title, year, category, type, scope[], stack[], thumbnail,
//              summary, problem, role, solution, result, demoUrl?, repoUrl?, images[] }

export const projects = [
  {
    id: 'proj-1',
    slug: 'hasil-bumi',
    title: 'Hasil Bumi',
    year: 2026,
    category: 'Web App',
    type: 'Team project',
    scope: ['Frontend', 'Backend', 'Project Manager'],
    stack: ['React', 'Vite', 'Tailwind CSS'],
    thumbnail: '/images/projects/hasil-bumi',
    summary:
      'A small storefront that helps local farmers sell produce directly to nearby buyers.',
    problem:
      'Small farms rely on middlemen and lose most of the margin, with no simple way to list what is in season.',
    role: 'Team Project: as Frontend',
    solution:
      'A lightweight catalogue with seasonal badges and one-tap WhatsApp checkout, designed to work well on cheap phones.',
    result:
      'Tested with 3 farms; a listing that used to take a phone call now takes under a minute to publish.',
    demoUrl: 'https://hasilbumi-d749e.web.app/',
    repoUrl: 'https://github.com/yumina3/hasil_bumi',
    images: ['/images/projects/hasil-bumi'],
  },
  {
    id: 'proj-2',
    slug: 'diacare-spk',
    title: 'Diacare',
    year: 2026,
    category: 'Decision Support System',
    type: 'Team project',
    scope: ['Frontend', 'AHP-TOPSIS logic', 'Data processing'],
    stack: ['React', 'JavaScript', 'AHP', 'TOPSIS'],
    thumbnail: '/images/projects/DiacareSPK',
    summary:
      'A web-based decision support system that classifies diabetes severity using AHP and TOPSIS.',
    problem:
      'Diabetes risk assessment is often subjective and hard to compare between patients, so triage decisions are slow and inconsistent.',
    role:
      'I worked as a developer in a team project, implementing the AHP weighting and TOPSIS ranking logic and building the interface that shows each classification.',
    solution:
      'We combined AHP to weight the clinical criteria and TOPSIS to rank each patient against the ideal solution, then presented the result as an easy-to-read severity level.',
    result:
      'The system turns multiple clinical indicators into a single severity ranking, giving a faster and more consistent first-pass classification for follow-up.',
    demoUrl: 'https://diabetesrisk-19146.web.app/',
    repoUrl: 'https://github.com/yumina3/SPK-AHP-TOPSIS-DIABETES.git',
    images: ['/images/projects/DiacareSPK'],
  },
  {
    id: 'proj-3',
    slug: 'e-wallet-clustering',
    title: 'E-Wallet Clustering',
    year: 2026,
    category: 'Data Analysis',
    type: 'Data project',
    scope: ['EDA', 'Clustering', 'Web app'],
    stack: ['Python', 'Streamlit', 'Pandas', 'Scikit-learn'],
    thumbnail: '/images/projects/ewallet',
    summary:
      'A clustering analysis tool that segments e-wallet users based on seven behavioural indicators.',
    problem:
      'Treating every e-wallet user the same makes retention and promotion campaigns generic, so they underperform on the segments that matter most.',
    role:
      'I built the analysis and shipped it as an interactive Streamlit app, covering cleaning, feature selection, and cluster profiling.',
    solution:
      'I clustered users across seven indicators capturing usage, recency, and value, then described each cluster in plain language so the result can be acted on directly.',
    result:
      'The app produces clear user segments that a product or marketing team can target, instead of one campaign for everyone.',
    demoUrl: 'https://yumina3-e-wallet-clustering-app-g43jlj.streamlit.app/',
    repoUrl: 'https://github.com/yumina3/e-wallet-clustering.git',
    images: ['/images/projects/ewallet'],
  },
  {
    id: 'proj-4',
    slug: 'mie-ongklok',
    title: 'Mie Ongklok',
    year: 2026,
    category: 'E-Business',
    type: 'Business project',
    scope: ['Frontend', 'Content', 'Branding'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    thumbnail: '/images/projects/MieOngklok',
    summary:
      'A landing page that brings an instant Mie Ongklok product online with clear, digital-first information.',
    problem:
      'The product only lived as a local, word-of-mouth item with no single place online where customers could learn about it.',
    role: 'I designed and built the landing page end to end, from layout to content.',
    solution:
      'I created a simple, mobile-friendly page that presents the product story, key information, and how to reach or order it.',
    result:
      'The product now has a direct online presence that can be shared from a single link, ready to support wider digital promotion.',
    demoUrl: 'https://yumina3.github.io/Ebusiness-mie-ongklok-/',
    repoUrl: 'https://github.com/yumina3/Ebusiness-mie-ongklok-.git',
    images: ['/images/projects/MieOngklok'],
  },
  {
    id: 'proj-5',
    slug: 'wongja',
    title: 'Wongja',
    year: 2026,
    category: 'UI/UX Design',
    type: 'Design project',
    scope: ['User research', 'Wireframing', 'UI design', 'Prototyping'],
    stack: ['Figma'],
    thumbnail: '/images/projects/UIUX Wongja',
    summary:
      'A job-search app for students looking for part-time work and fresh graduates looking for full-time roles.',
    problem:
      'Students and fresh graduates often struggle to find work that matches their availability and experience level, because most job platforms are built for experienced professionals.',
    role:
      'I worked as the UI/UX designer, handling the user flow, wireframes, interface design, and the interactive prototype.',
    solution:
      'I designed a simple flow that separates part-time openings for students from full-time openings for fresh graduates, so each user sees roles that fit their situation.',
    result:
      'A clickable prototype that walks through the whole journey, ready to be tested with real students and graduates.',
    demoUrl:
      'https://www.figma.com/proto/ji5ScIip1m983wxXJ1pX48/WongjaNes?node-id=97-1703&p=f&t=cNOu8zwZXP0Q6SSI-1&scaling=scale-down&content-scaling=fixed&page-id=3%3A1723',
    images: ['/images/projects/UIUX Wongja'],
  },
]
