const getPastTimestamp = (minutesAgo) => {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
};

export const seedReports = [
  // Gate C - 9 reports (Red - High)
  {
    id: "rep-1",
    zone: "gate-c",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(3),
    language: "en",
    status: "pending"
  },
  {
    id: "rep-2",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(5),
    language: "es",
    status: "pending"
  },
  {
    id: "rep-3",
    zone: "gate-c",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(7),
    language: "ar",
    status: "pending"
  },
  {
    id: "rep-4",
    zone: "gate-c",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(10),
    language: "hi",
    status: "resolved"
  },
  {
    id: "rep-5",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(12),
    language: "cg",
    status: "pending"
  },
  {
    id: "rep-6",
    zone: "gate-c",
    type: "Lost Person",
    timestamp: getPastTimestamp(15),
    language: "en",
    status: "pending"
  },
  {
    id: "rep-7",
    zone: "gate-c",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(18),
    language: "es",
    status: "pending"
  },
  {
    id: "rep-8",
    zone: "gate-c",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(22),
    language: "hi",
    status: "pending"
  },
  {
    id: "rep-9",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(25),
    language: "ar",
    status: "resolved"
  },

  // Gate A - 5 reports (Yellow - Medium)
  {
    id: "rep-10",
    zone: "gate-a",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(4),
    language: "en",
    status: "pending"
  },
  {
    id: "rep-11",
    zone: "gate-a",
    type: "Water Station",
    timestamp: getPastTimestamp(9),
    language: "hi",
    status: "pending"
  },
  {
    id: "rep-12",
    zone: "gate-a",
    type: "Full Bin",
    timestamp: getPastTimestamp(14),
    language: "cg",
    status: "resolved"
  },
  {
    id: "rep-13",
    zone: "gate-a",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(20),
    language: "es",
    status: "pending"
  },
  {
    id: "rep-14",
    zone: "gate-a",
    type: "Security Queue",
    timestamp: getPastTimestamp(27),
    language: "en",
    status: "pending"
  },

  // Gate B - 2 reports (Green - Low)
  {
    id: "rep-15",
    zone: "gate-b",
    type: "Food Line",
    timestamp: getPastTimestamp(6),
    language: "en",
    status: "pending"
  },
  {
    id: "rep-16",
    zone: "gate-b",
    type: "Full Bin",
    timestamp: getPastTimestamp(16),
    language: "ar",
    status: "resolved"
  },

  // Gate D - 1 report (Green - Low)
  {
    id: "rep-17",
    zone: "gate-d",
    type: "Water Station",
    timestamp: getPastTimestamp(11),
    language: "hi",
    status: "pending"
  },

  // Food Court - 2 reports (Green - Low)
  {
    id: "rep-18",
    zone: "food-court",
    type: "Food Line",
    timestamp: getPastTimestamp(8),
    language: "es",
    status: "pending"
  },
  {
    id: "rep-19",
    zone: "food-court",
    type: "Full Bin",
    timestamp: getPastTimestamp(24),
    language: "en",
    status: "pending"
  },

  // Parking - 1 report (Green - Low)
  {
    id: "rep-20",
    zone: "parking",
    type: "Shuttle Delay",
    timestamp: getPastTimestamp(13),
    language: "cg",
    status: "pending"
  }
];

export default seedReports;
