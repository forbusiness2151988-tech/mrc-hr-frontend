// Minimal inline SVG icon set so the mobile HR module has zero new
// dependencies. `name` maps to a small curated set used across the screens.
const paths = {
  bell: "M12 2a6 6 0 0 0-6 6v3.09c0 .5-.2.98-.55 1.33L4 14v1h16v-1l-1.45-1.58a1.9 1.9 0 0 1-.55-1.33V8a6 6 0 0 0-6-6ZM9.5 18a2.5 2.5 0 0 0 5 0h-5Z",
  fingerprint: "M12 3a9 9 0 0 0-9 9c0 2 .3 3.5.8 4.7M12 3a9 9 0 0 1 9 9c0 1.2-.1 2.3-.35 3.3M12 6a6 6 0 0 0-6 6c0 2.2.4 3.7.9 4.8M12 6a6 6 0 0 1 6 6c0 1-.05 1.9-.2 2.7M12 9a3 3 0 0 0-3 3c0 3 .8 5.4 1.8 7M12 9a3 3 0 0 1 3 3c0 1.7-.2 3-.6 4.2M12 12v3",
  home: "M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2",
  "clock-x": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-3-13 6 6m0-6-6 6",
  request: "M8 4h8a2 2 0 0 1 2 2v14l-4-2-4 2-4-2V6a2 2 0 0 1 2-2Z",
  more: "M4 12h.01M12 12h.01M20 12h.01",
  briefcase: "M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  coins: "M8 10a5 3 0 1 0 10 0 5 3 0 1 0-10 0Zm0 0v5a5 3 0 0 0 10 0v-5M6 13a5 3 0 0 0 5 3M6 13v3a5 3 0 0 0 5 3",
  banknote: "M2 7h20v10H2V7Zm10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 10v0M19 14v0",
  wallet: "M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm14 6h.01",
  sun: "M12 5V3m0 18v-2M5 12H3m18 0h-2M6.3 6.3 4.9 4.9m14.2 1.4-1.4-1.4M6.3 17.7l-1.4 1.4m14.2-1.4 1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  cross: "M12 3v8m0 0v10m0-10h8m-8 0H4",
  "calendar-x": "M4 5h16v16H4V5Zm0 5h16M9 3v4M15 3v4m-6.5 8 3-3m0 3-3-3",
  alert: "M12 3 2 20h20L12 3Zm0 6v5m0 3h.01",
  chevronRight: "m9 18 6-6-6-6",
  chevronLeft: "m15 18-6-6 6-6",
  chevronDown: "m6 9 6 6 6-6",
  close: "M18 6 6 18M6 6l12 12",
  check: "m5 13 4 4L19 7",
  filter: "M4 5h16M7 12h10M11 19h2",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  pin: "M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  wifi: "M2 8.5a16 16 0 0 1 20 0M5.5 12a11 11 0 0 1 13 0M9 15.5a6 6 0 0 1 6 0M12 19v.01",
  building: "M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M14 21h6v-8a1 1 0 0 0-1-1h-5M8 7h.01M8 11h.01M8 15h.01M14 7h.01M14 11h.01",
  megaphone: "M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1Zm14.5-2a5 5 0 0 1 0 8",
  gift: "M20 12v9H4v-9M2 7h20v5H2V7Zm10 14V7M12 7C10 3 6 3 6 5.5S9 7 12 7Zm0 0c2-4 6-4 6-1.5S15 7 12 7Z",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M11 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm7 18v-2a4 4 0 0 0-3-3.87M15.5 3.13A4 4 0 0 1 15.5 11",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  policy: "M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9 0v5h5M8 13h8M8 17h5",
  calendar: "M4 5h16v16H4V5Zm0 5h16M8 3v4M16 3v4",
  inbox: "M4 4h16l-1 9H5L4 4Zm0 9v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M9 13a3 3 0 0 0 6 0",
};

export default function Icon({ name, size = 20, className = "", strokeWidth = 1.8 }) {
  const d = paths[name] || paths.request;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
