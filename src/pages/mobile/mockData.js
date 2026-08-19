// Mock / local data used purely to drive the Mobile HR UI.
// Swap these for real API calls (see src/api/endpoints.js) once backend
// endpoints for the mobile HR flows are ready — the components are written
// against these same shapes so wiring real data in later is a drop-in.

export const currentUser = {
  name: "Ahmed Youssef",
  role: "Senior Sales",
  branch: "Cairo HQ",
  avatar: "https://i.pravatar.cc/150?img=12",
  unreadNotifications: 4,
};

export const todayShift = {
  status: "not_started", // not_started | working | on_break | done
  elapsedSeconds: 0,
  shiftTargetHours: 8,
  checkIn: null,
  checkOut: null,
};

export const requestCatalog = {
  Attendance: [
    { key: "excuse", label: "Excuse", icon: "clock" },
    { key: "mission", label: "Mission", icon: "briefcase" },
    { key: "wfh", label: "Work From Home", icon: "home" },
    { key: "unpaid_excuse", label: "Unpaid Excuse", icon: "clock-x" },
  ],
  Financial: [
    { key: "overtime", label: "Overtime", icon: "coins" },
    { key: "loan", label: "Loan", icon: "banknote" },
    { key: "advance", label: "Advanced Payment", icon: "wallet" },
  ],
  Vacation: [
    { key: "normal", label: "Normal", icon: "sun" },
    { key: "sick", label: "Sick", icon: "cross" },
    { key: "unpaid", label: "Unpaid", icon: "calendar-x" },
    { key: "urgent", label: "Urgent", icon: "alert" },
  ],
};

export const myRequests = [
  { id: 1, type: "Normal Vacation", category: "Vacation", status: "Pending", from: "2026-08-20", to: "2026-08-22", days: 3, reason: "Family trip", createdAt: "2026-08-10" },
  { id: 2, type: "Excuse", category: "Attendance", status: "Approved", from: "2026-08-12", to: "2026-08-12", days: 0.5, reason: "Doctor appointment", createdAt: "2026-08-09" },
  { id: 3, type: "Overtime", category: "Financial", status: "Declined", from: "2026-08-05", to: "2026-08-05", days: 0, reason: "Month-end closing", createdAt: "2026-08-04" },
  { id: 4, type: "Work From Home", category: "Attendance", status: "Approved", from: "2026-08-02", to: "2026-08-02", days: 1, reason: "Internet installation", createdAt: "2026-08-01" },
  { id: 5, type: "Sick Vacation", category: "Vacation", status: "Canceled", from: "2026-07-28", to: "2026-07-29", days: 2, reason: "Flu", createdAt: "2026-07-27" },
];

export const managerRequests = [
  { id: 101, employee: "Mona Khaled", avatar: "https://i.pravatar.cc/150?img=32", type: "Normal Vacation", tag: "Vacation", reason: "Annual trip to Sharm", submittedAt: "2h ago", status: "Pending" },
  { id: 102, employee: "Karim Adel", avatar: "https://i.pravatar.cc/150?img=15", type: "Overtime", tag: "Financial", reason: "Client delivery on Thursday", submittedAt: "5h ago", status: "Pending" },
  { id: 103, employee: "Sara Ibrahim", avatar: "https://i.pravatar.cc/150?img=45", type: "Excuse", tag: "Attendance", reason: "School meeting", submittedAt: "1d ago", status: "Pending" },
  { id: 104, employee: "Youssef Adly", avatar: "https://i.pravatar.cc/150?img=8", type: "Loan", tag: "Financial", reason: "Medical expenses", submittedAt: "2d ago", status: "Approved" },
];

export const weeklyAttendance = [
  { day: "Sat", hours: 8.2 },
  { day: "Sun", hours: 7.9 },
  { day: "Mon", hours: 8.5 },
  { day: "Tue", hours: 8.0 },
  { day: "Wed", hours: 6.4 },
  { day: "Thu", hours: 0 },
  { day: "Fri", hours: 0 },
];

export const office = {
  name: "Cairo HQ",
  lat: 30.0444,
  lng: 31.2357,
  radiusM: 50,
};

export const allowedNetworks = [
  { id: 1, ssid: "HR-Office-5G", mac: "3C:5A:B4:11:22:33", active: true },
  { id: 2, ssid: "HR-Office-Guest", mac: "3C:5A:B4:11:22:34", active: true },
  { id: 3, ssid: "HR-Backup-LAN", mac: "3C:5A:B4:11:22:99", active: false },
];

export const salary = {
  month: "August",
  bankName: "CIB - Commercial International Bank",
  accountNumber: "**** **** **** 4821",
  currentSalary: 18000,
  netSalary: 15420,
  disbursementMethod: "Money Transfer",
  earnings: [
    { label: "Basic Salary", amount: 15000 },
    { label: "Housing Allowance", amount: 2000 },
    { label: "Transportation", amount: 1000 },
  ],
  deductions: [
    { label: "Social Insurance", amount: 950 },
    { label: "Income Tax", amount: 1200 },
    { label: "Late Penalty", amount: 130 },
  ],
  adjustments: [
    { label: "Overtime Bonus", amount: 700 },
  ],
};

export const orgChart = {
  name: "Hassan Fathy",
  role: "Admin",
  branch: "Cairo HQ",
  avatar: "https://i.pravatar.cc/150?img=60",
  directReports: 3,
  children: [
    {
      name: "Laila Nour", role: "HR Manager", branch: "Cairo HQ",
      avatar: "https://i.pravatar.cc/150?img=47", directReports: 2,
      children: [
        { name: "Omar Said", role: "HR", branch: "Cairo HQ", avatar: "https://i.pravatar.cc/150?img=22", directReports: 0, children: [] },
        { name: "Nadia Fahmy", role: "HR", branch: "Alex Branch", avatar: "https://i.pravatar.cc/150?img=25", directReports: 0, children: [] },
      ],
    },
    {
      name: "Tarek Mostafa", role: "Sales Manager", branch: "Cairo HQ",
      avatar: "https://i.pravatar.cc/150?img=51", directReports: 2,
      children: [
        { name: "Ahmed Youssef", role: "Senior Sales", branch: "Cairo HQ", avatar: "https://i.pravatar.cc/150?img=12", directReports: 0, children: [] },
        { name: "Mona Khaled", role: "Business Partner", branch: "Cairo HQ", avatar: "https://i.pravatar.cc/150?img=32", directReports: 0, children: [] },
      ],
    },
  ],
};

export const dailyReport = [
  { id: 1, name: "Mona Khaled", role: "Business Partner", avatar: "https://i.pravatar.cc/150?img=32", checkIn: "08:58", checkOut: "17:05", progress: 100 },
  { id: 2, name: "Karim Adel", role: "Senior Sales", avatar: "https://i.pravatar.cc/150?img=15", checkIn: "09:12", checkOut: "—", progress: 62 },
  { id: 3, name: "Sara Ibrahim", role: "Business Partner", avatar: "https://i.pravatar.cc/150?img=45", checkIn: "08:45", checkOut: "16:50", progress: 100 },
  { id: 4, name: "Youssef Adly", role: "Senior Sales", avatar: "https://i.pravatar.cc/150?img=8", checkIn: "—", checkOut: "—", progress: 0 },
];

export const announcements = [
  { id: 1, title: "Eid Al-Fitr Holiday", body: "The office will be closed from Aug 20 to Aug 22 for the public holiday.", scope: "Company", sentAt: "2026-08-10", notificationsSent: 128 },
  { id: 2, title: "New Payroll Cycle", body: "Payroll disbursement date has moved to the 27th of each month.", scope: "Department", sentAt: "2026-08-08", notificationsSent: 34 },
  { id: 3, title: "Cairo Office Maintenance", body: "Elevator maintenance scheduled this weekend, please use the stairs.", scope: "Location", sentAt: "2026-08-05", notificationsSent: 61 },
];

export const vacationBalances = {
  normal: { used: 6, total: 21 },
  unpaid: { used: 2, total: 30 },
  urgent: { used: 1, total: 6 },
  permissionHours: { used: 4.5, total: 12 },
};

export const holidays = [
  { id: 1, name: "Eid Al-Fitr", date: "2026-08-20", status: "Pending" },
  { id: 2, name: "October War Anniversary", date: "2026-10-06", status: "Pending" },
  { id: 3, name: "Coptic Christmas", date: "2026-01-07", status: "Passed" },
];
