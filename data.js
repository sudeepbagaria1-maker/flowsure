// Sample lead data for Flowsure CRM
// This file contains 15 sample leads with various properties to demonstrate the CRM functionality

const sampleLeads = [
  {
    id: 1,
    company: "TechGadgets Inc.",
    contactPerson: "Alex Johnson",
    status: "New",
    source: "Website",
    department: "Technology",
    createdAt: "2025-09-10",
    nextContactDate: "2023-10-25",
    history: [],
    documents: []
  },
  {
    id: 2,
    company: "Bella's Bakery",
    contactPerson: "Isabella Rodriguez",
    status: "Contacted",
    source: "Facebook",
    department: "Retail",
    createdAt: "2025-09-08",
    nextContactDate: "2025-09-20",
    history: [
      {
        id: 1,
        date: "2025-09-12",
        type: "Call",
        notes: "Initial contact made. Interested in CRM for managing customer orders.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 3,
    company: "Global Logistics LLC",
    contactPerson: "Michael Chen",
    status: "Qualified",
    source: "Referral",
    department: "Services",
    createdAt: "2025-09-01",
    nextContactDate: "2025-09-19",
    history: [
      {
        id: 1,
        date: "2025-09-05",
        type: "Email",
        notes: "Sent initial proposal for fleet management solution.",
        userId: "user002"
      },
      {
        id: 2,
        date: "2025-09-10",
        type: "Meeting",
        notes: "Met with procurement team. They need tracking for 15 delivery vehicles.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 4,
    company: "Precision Manufacturing Co.",
    contactPerson: "Robert Williams",
    status: "Won",
    source: "Cold Call",
    department: "Manufacturing",
    createdAt: "2025-08-20",
    nextContactDate: null,
    history: [
      {
        id: 1,
        date: "2025-08-22",
        type: "Call",
        notes: "Discussed inventory tracking needs for production line.",
        userId: "user003"
      },
      {
        id: 2,
        date: "2025-08-25",
        type: "Meeting",
        notes: "Presented solution for production workflow tracking.",
        userId: "user001"
      },
      {
        id: 3,
        date: "2025-08-30",
        type: "Contract Signed",
        notes: "3-year contract signed for 50 user licenses.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 5,
    company: "Urban Cafe",
    contactPerson: "Emma Thompson",
    status: "Delivered",
    source: "Google",
    department: "Retail",
    createdAt: "2025-08-15",
    nextContactDate: "2025-10-01",
    history: [
      {
        id: 1,
        date: "2025-08-18",
        type: "Email",
        notes: "Inquiry about customer loyalty program integration.",
        userId: "user002"
      },
      {
        id: 2,
        date: "2025-08-22",
        type: "Meeting",
        notes: "Demonstrated POS integration capabilities.",
        userId: "user001"
      },
      {
        id: 3,
        date: "2025-08-28",
        type: "Implementation",
        notes: "System deployed to 3 locations.",
        userId: "tech001"
      },
      {
        id: 4,
        date: "2025-09-05",
        type: "Follow-up",
        notes: "All locations successfully using the system.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 6,
    company: "CloudSecure Solutions",
    contactPerson: "David Park",
    status: "Closed",
    source: "Referral",
    department: "Technology",
    createdAt: "2025-07-20",
    nextContactDate: null,
    history: [
      {
        id: 1,
        date: "2025-07-22",
        type: "Call",
        notes: "Interested in customer onboarding automation.",
        userId: "user003"
      },
      {
        id: 2,
        date: "2025-07-28",
        type: "Meeting",
        notes: "Requirements gathering session completed.",
        userId: "user001"
      },
      {
        id: 3,
        date: "2025-08-05",
        type: "Proposal Rejected",
        notes: "Decided to build in-house solution due to budget constraints.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 7,
    company: "StyleHub Fashion",
    contactPerson: "Sophia Martinez",
    status: "New",
    source: "Website",
    department: "Retail",
    createdAt: "2025-09-15",
    nextContactDate: "2023-10-25",
    history: [],
    documents: []
  },
  {
    id: 8,
    company: "HomeCare Services",
    contactPerson: "James Wilson",
    status: "Contacted",
    source: "Google",
    department: "Services",
    createdAt: "2025-09-12",
    nextContactDate: "2025-09-22",
    history: [
      {
        id: 1,
        date: "2025-09-14",
        type: "Email",
        notes: "Requested information about field service management.",
        userId: "user002"
      }
    ],
    documents: []
  },
  {
    id: 9,
    company: "AutoTech Repairs",
    contactPerson: "Thomas Anderson",
    status: "Qualified",
    source: "Facebook",
    department: "Services",
    createdAt: "2025-09-05",
    nextContactDate: "2025-09-18",
    history: [
      {
        id: 1,
        date: "2025-09-07",
        type: "Call",
        notes: "Interested in appointment scheduling and customer notifications.",
        userId: "user003"
      },
      {
        id: 2,
        date: "2025-09-10",
        type: "Meeting",
        notes: "Demonstrated mobile app capabilities for technicians.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 10,
    company: "Innovate Labs",
    contactPerson: "Olivia Kim",
    status: "New",
    source: "Cold Call",
    department: "Technology",
    createdAt: "2025-09-16",
    nextContactDate: "2023-10-25",
    history: [],
    documents: []
  },
  {
    id: 11,
    company: "Craft Brewers Co.",
    contactPerson: "William Davis",
    status: "Contacted",
    source: "Referral",
    department: "Manufacturing",
    createdAt: "2025-09-09",
    nextContactDate: "2025-09-23",
    history: [
      {
        id: 1,
        date: "2025-09-11",
        type: "Meeting",
        notes: "Exploring inventory management for brewing ingredients.",
        userId: "user001"
      }
    ],
    documents: []
  },
  {
    id: 12,
    company: "Prime Properties",
    contactPerson: "Ava Garcia",
    status: "Qualified",
    source: "Website",
    department: "Services",
    createdAt: "2025-09-02",
    nextContactDate: "2025-09-20",
    history: [
      {
        id: 1,
        date: "2025-09-04",
        type: "Email",
        notes: "Requested demo for property management workflows.",
        userId: "user002"
      },
      {
        id: 2,
        date: "2025-09-08",
        type: "Call",
        notes: "Discussed multi-location property tracking needs.",
        userId: "user003"
      }
    ],
    documents: []
  },
  {
    id: 13,
    company: "QuickFix Plumbing",
    contactPerson: "Benjamin Lee",
    status: "New",
    source: "Google",
    department: "Services",
    createdAt: "2025-09-17",
    nextContactDate: "2023-10-25",
    history: [],
    documents: []
  },
  {
    id: 14,
    company: "EduTech Learning",
    contactPerson: "Mia Clark",
    status: "Contacted",
    source: "Website",
    department: "Technology",
    createdAt: "2025-09-11",
    nextContactDate: "2025-09-21",
    history: [
      {
        id: 1,
        date: "2025-09-13",
        type: "Call",
        notes: "Interested in student management and communication tools.",
        userId: "user003"
      }
    ],
    documents: []
  },
  {
    id: 15,
    company: "Fresh Organics",
    contactPerson: "Ethan Moore",
    status: "New",
    source: "Facebook",
    department: "Retail",
    createdAt: "2025-09-14",
    nextContactDate: "2023-10-25",
    history: [],
    documents: []
  }
];

// Export the sample leads data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sampleLeads;
} else {
  window.sampleLeads = sampleLeads;
}