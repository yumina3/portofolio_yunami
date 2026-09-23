// Skema: PRD.md bagian 7
// experiences[] { id, role, organization, startDate, endDate|null, description[], techStack[] }
// Urut dari terbaru.

export const experiences = [
  {
    id: 'exp-1',
    role: 'E-Government Intern',
    organization: 'Dinkominfo Kab.Pekalongan',
    startDate: 'Jul - August 2026',
    endDate: null,
    description: [
      'Frontend Redesign: Rebuilding the website’s UI/UX interface to make it more responsive and lightweight using React, TypeScript, and Tailwind CSS with the Vite build tool',
      'CMS management to streamline the publication process for news, announcements, and public educational articles in a structured manner',
    ],
    techStack: ['React', 'Tailwind CSS', 'Typescript', 'Javascript'],
  },
  {
    id: 'exp-2',
    role: 'Data Analyst (Project-based)',
    organization: 'MySkill.id x Lion Parcel',
    startDate: 'Feb 2026',
    endDate: null,
    description: [
      'Analyzed a retail store dataset using Python and Pandas in Google Colab to evaluate sales performance.',
      'Identified top-selling and loss-making products, analyzing 1,871 unprofitable transactions.',
      'Calculated overall net profitability ($286,397.02) to provide actionable insights for the sales team.',
    ],
    techStack: ['Python', 'Pandas', 'Google Colab'],
  },
]
