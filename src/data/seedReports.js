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
    status: "pending",
    severity: "high",
    staffAction: "Deploy crowd control barriers and open overflow turnstiles."
  },
  {
    id: "rep-2",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(5),
    language: "es",
    status: "pending",
    severity: "high",
    staffAction: "Open additional scanning lanes and redirect fans to Gate D."
  },
  {
    id: "rep-3",
    zone: "gate-c",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(7),
    language: "ar",
    status: "pending",
    severity: "medium",
    staffAction: "Clear obstruction on Sector 3 access ramp."
  },
  {
    id: "rep-4",
    zone: "gate-c",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(10),
    language: "hi",
    status: "resolved",
    severity: "high",
    staffAction: "Reroute incoming buses to drop off at North Gate."
  },
  {
    id: "rep-5",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(12),
    language: "cg",
    status: "pending",
    severity: "high",
    staffAction: "Deploy tactical staff to assist with screening bottleneck."
  },
  {
    id: "rep-6",
    zone: "gate-c",
    type: "Lost Person",
    timestamp: getPastTimestamp(15),
    language: "en",
    status: "pending",
    severity: "medium",
    staffAction: "Broadcasting description to zone supervisors."
  },
  {
    id: "rep-7",
    zone: "gate-c",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(18),
    language: "es",
    status: "pending",
    severity: "medium",
    staffAction: "Verify wheelchair lift operation near row 24."
  },
  {
    id: "rep-8",
    zone: "gate-c",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(22),
    language: "hi",
    status: "pending",
    severity: "high",
    staffAction: "Announce gate changes via PA system."
  },
  {
    id: "rep-9",
    zone: "gate-c",
    type: "Security Queue",
    timestamp: getPastTimestamp(25),
    language: "ar",
    status: "resolved",
    severity: "high",
    staffAction: "Resolved. Security staff shift change completed."
  },

  // Gate A - 5 reports (Yellow - Medium)
  {
    id: "rep-10",
    zone: "gate-a",
    type: "Crowded Gate",
    timestamp: getPastTimestamp(4),
    language: "en",
    status: "pending",
    severity: "medium",
    staffAction: "Monitor queue length and adjust ticketing scanners."
  },
  {
    id: "rep-11",
    zone: "gate-a",
    type: "Water Station",
    timestamp: getPastTimestamp(9),
    language: "hi",
    status: "pending",
    severity: "low",
    staffAction: "Dispatch refill technician to check pressure valves."
  },
  {
    id: "rep-12",
    zone: "gate-a",
    type: "Full Bin",
    timestamp: getPastTimestamp(14),
    language: "cg",
    status: "resolved",
    severity: "low",
    staffAction: "Resolved. Environmental team emptied bins."
  },
  {
    id: "rep-13",
    zone: "gate-a",
    type: "Blocked Ramp",
    timestamp: getPastTimestamp(20),
    language: "es",
    status: "pending",
    severity: "medium",
    staffAction: "Remove stray equipment blocking upper ramp pathway."
  },
  {
    id: "rep-14",
    zone: "gate-a",
    type: "Security Queue",
    timestamp: getPastTimestamp(27),
    language: "en",
    status: "pending",
    severity: "medium",
    staffAction: "Verify scanner sync and deploy line marshals."
  },

  // Gate B - 2 reports (Green - Low)
  {
    id: "rep-15",
    zone: "gate-b",
    type: "Food Line",
    timestamp: getPastTimestamp(6),
    language: "en",
    status: "pending",
    severity: "low",
    staffAction: "Suggest alternative outlets via digital signs."
  },
  {
    id: "rep-16",
    zone: "gate-b",
    type: "Full Bin",
    timestamp: getPastTimestamp(16),
    language: "ar",
    status: "resolved",
    severity: "low",
    staffAction: "Resolved. Sanitation sweep completed."
  },

  // Gate D - 1 report (Green - Low)
  {
    id: "rep-17",
    zone: "gate-d",
    type: "Water Station",
    timestamp: getPastTimestamp(11),
    language: "hi",
    status: "pending",
    severity: "low",
    staffAction: "Verify water dispenser power is on."
  },

  // Food Court - 2 reports (Green - Low)
  {
    id: "rep-18",
    zone: "food-court",
    type: "Food Line",
    timestamp: getPastTimestamp(8),
    language: "es",
    status: "pending",
    severity: "low",
    staffAction: "Open register 4 to reduce waiting times."
  },
  {
    id: "rep-19",
    zone: "food-court",
    type: "Full Bin",
    timestamp: getPastTimestamp(24),
    language: "en",
    status: "pending",
    severity: "low",
    staffAction: "Empty recycling bins behind concession stand B."
  },

  // Parking - 1 report (Green - Low)
  {
    id: "rep-20",
    zone: "parking",
    type: "Shuttle Delay",
    timestamp: getPastTimestamp(13),
    language: "cg",
    status: "pending",
    severity: "medium",
    staffAction: "Request backup shuttle for Lot F."
  }
];

export default seedReports;
