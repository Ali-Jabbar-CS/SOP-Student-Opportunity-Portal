export const OPPS = [
  { id: 1, title: "Software Engineering Intern", org: "NASA Jet Propulsion Lab", type: "internship", match: 98, tags: ["CS/Engineering", "Paid", "Summer 2025"], deadline: "Apr 15", urgent: true, logo: "#2563EB", initials: "JPL", location: "Pasadena, CA", stipend: "$7,500/mo", visaStatus: "ok", visaLabel: "F-1 / OPT OK" },
  { id: 2, title: "STEM Diversity Fellowship", org: "National Science Foundation", type: "grant", match: 95, tags: ["All STEM", "$15,000", "Research"], deadline: "Apr 30", urgent: false, logo: "#0D9488", initials: "NSF", location: "Remote", stipend: "$15,000", visaStatus: "ok", visaLabel: "International OK" },
  { id: 3, title: "Data Science Co-op", org: "Spotify", type: "internship", match: 91, tags: ["CS/Data", "Paid", "Fall 2025"], deadline: "May 10", urgent: false, logo: "#16A34A", initials: "SP", location: "New York, NY", stipend: "$8,200/mo", visaStatus: "maybe", visaLabel: "CPT Required" },
  { id: 4, title: "Hispanic STEM Scholarship", org: "SHPE Foundation", type: "scholarship", match: 97, tags: ["Hispanic/Latinx", "$5,000", "Renewable"], deadline: "Apr 20", urgent: true, logo: "#EA580C", initials: "SH", location: "National", stipend: "$5,000", visaStatus: "ok", visaLabel: "All Students OK" },
  { id: 5, title: "Environmental Research Volunteer", org: "Sierra Club", type: "volunteering", match: 82, tags: ["Environmental", "Volunteer", "Weekend"], deadline: "May 1", urgent: false, logo: "#65A30D", initials: "SC", location: "San Diego, CA", stipend: "Volunteer", visaStatus: "ok", visaLabel: "No Restrictions" },
  { id: 6, title: "UX/Product Design Intern", org: "Adobe", type: "internship", match: 88, tags: ["Design/CS", "Paid", "Summer 2025"], deadline: "May 5", urgent: false, logo: "#DC2626", initials: "AD", location: "San Jose, CA", stipend: "$6,800/mo", visaStatus: "ok", visaLabel: "Visa Sponsored" },
  { id: 7, title: "AAUW Tech Trek Grant", org: "AAUW", type: "grant", match: 93, tags: ["Women in STEM", "$10,000", "Graduate"], deadline: "Apr 25", urgent: true, logo: "#7C3AED", initials: "AW", location: "National", stipend: "$10,000", visaStatus: "ok", visaLabel: "International OK" },
  { id: 8, title: "Classified Research Intern", org: "Defense Contractor LLC", type: "internship", match: 55, tags: ["Engineering", "Summer"], deadline: "May 20", urgent: false, logo: "#6B7280", initials: "DC", location: "Arlington, VA", stipend: "$6,000/mo", visaStatus: "warn", visaLabel: "US Citizens Only" },
];

export const RECRUITERS = [
  { id: 1, name: "Google", sub: "Technology • Mountain View, CA", logo: "#2563EB", initials: "G", openings: 142, hires: 89, connected: false, badges: ["Visa Sponsor", "OPT Friendly", "STEM OPT"] },
  { id: 2, name: "Microsoft", sub: "Technology • Redmond, WA", logo: "#0D9488", initials: "MS", openings: 98, hires: 64, connected: false, badges: ["Visa Sponsor", "H-1B Lottery", "Diverse Hiring"] },
  { id: 3, name: "Lockheed Martin", sub: "Aerospace/Defense • Bethesda, MD", logo: "#1D4ED8", initials: "LM", openings: 55, hires: 41, connected: true, badges: ["US Citizens Only", "Clearance Req'd"] },
  { id: 4, name: "Salesforce", sub: "Cloud/CRM • San Francisco, CA", logo: "#0284C7", initials: "SF", openings: 76, hires: 53, connected: false, badges: ["Visa Sponsor", "OPT Friendly", "Remote OK"] },
  { id: 5, name: "NVIDIA", sub: "Semiconductors • Santa Clara, CA", logo: "#16A34A", initials: "NV", openings: 63, hires: 48, connected: false, badges: ["Visa Sponsor", "STEM Focus", "Top Payer"] },
  { id: 6, name: "SpaceX", sub: "Aerospace • Hawthorne, CA", logo: "#374151", initials: "SX", openings: 31, hires: 22, connected: false, badges: ["US Citizens Only", "Engineering Focus"] },
];

export const KANBAN_DATA = {
  interested: [
    { id: "k1", title: "Software Engineering Intern", org: "NASA JPL", logo: "#2563EB", initials: "JPL", tags: ["CS", "Summer"], deadline: "Apr 15", daysLeft: 18, urgent: true, progress: 20 },
    { id: "k2", title: "STEM Diversity Fellowship", org: "NSF", logo: "#0D9488", initials: "NSF", tags: ["Grant", "Research"], deadline: "Apr 30", daysLeft: 33, urgent: false, progress: 10 },
  ],
  applying: [
    { id: "k3", title: "Hispanic STEM Scholarship", org: "SHPE", logo: "#EA580C", initials: "SH", tags: ["Scholarship"], deadline: "Apr 20", daysLeft: 23, urgent: true, progress: 65 },
    { id: "k4", title: "Data Science Co-op", org: "Spotify", logo: "#16A34A", initials: "SP", tags: ["Co-op", "Fall"], deadline: "May 10", daysLeft: 43, urgent: false, progress: 40 },
  ],
  submitted: [
    { id: "k5", title: "AAUW Tech Trek Grant", org: "AAUW", logo: "#7C3AED", initials: "AW", tags: ["Grant", "Women"], deadline: "Submitted", daysLeft: null, urgent: false, progress: 100 },
  ],
  results: [
    { id: "k6", title: "UX Design Intern", org: "Figma", logo: "#EA580C", initials: "FG", tags: ["Design"], deadline: "Interview Apr 12", daysLeft: 15, urgent: true, progress: 100, status: "interview" },
  ],
};

export const ORGS = [
  { name: "NASA", type: "Space Agency", logo: "#1D4ED8", initials: "NA" },
  { name: "NSF", type: "Gov. Research", logo: "#0D9488", initials: "NSF" },
  { name: "SHPE", type: "STEM Non-profit", logo: "#EA580C", initials: "SH" },
  { name: "Society of Women Engineers", type: "STEM Non-profit", logo: "#7C3AED", initials: "SWE" },
  { name: "HACU", type: "University Alliance", logo: "#16A34A", initials: "HC" },
  { name: "UNCF", type: "Scholarship Fund", logo: "#D97706", initials: "UN" },
  { name: "Google", type: "Tech Company", logo: "#2563EB", initials: "G" },
  { name: "Handshake", type: "Job Platform", logo: "#0284C7", initials: "HS" },
];