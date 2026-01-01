const tabs = [
  {
    label: "About",
    href: "/greeting",
    imageHref: "/subpages/about/aboutBG.webp",
    sectionIndex: 0,
    submenu: [
      {
        label: "인사말",
        englishLabel: "GREETING",
        href: "/greeting",
        description: "",
      },
      {
        label: "교회 비전",
        englishLabel: "VISION",
        href: "/vision",
        description: "",
      },
      {
        label: "섬기는 분들",
        englishLabel: "LEADERS",
        href: "/leaders",
        description: "",
      },
      {
        label: "오시는 길",
        englishLabel: "DIRECTIONS",
        href: "/directions",
        description: "",
      },
    ],
  },
  {
    label: "Worship",
    href: "/worship",
    imageHref: "/subpages/worship/worshipBG.webp",
    sectionIndex: 1,
    submenu: [
      {
        label: "예배 안내",
        englishLabel: "Worship Guide",
        href: "/worship",
        description: "",
      },
    ],
  },
  {
    label: "Discipling System",
    href: "/system",
    imageHref: "/subpages/system/systemBG.webp",
    sectionIndex: 2,
    submenu: [
      {
        label: "새가족반",
        englishLabel: "NEW FAMILY",
        href: "/system/new-family",
        description: "",
      },
      {
        label: "기초양육반",
        englishLabel: "BASIC TRAINING",
        href: "/system/basic",
        description: "",
      },
      {
        label: "제자훈련반",
        englishLabel: "DISCIPLE TRAINING",
        href: "/system/disciple",
        description: "",
      },
      {
        label: "전도훈련반",
        englishLabel: "EVANGELISM TRAINING",
        href: "/system/evangelism",
        description: "",
      },
      {
        label: "사역훈련반",
        englishLabel: "MINISTRY TRAINING",
        href: "/system/ministry",
        description: "",
      },
    ],
  },
  {
    label: "Next Generation",
    href: "/generation",
    imageHref: "/subpages/generation/generationBG.webp",
    sectionIndex: 3,
    submenu: [
      {
        label: "다음 세대",
        englishLabel: "NEXT GENERATION",
        href: "/generation",
        description: "",
      },
    ],
  },
  {
    label: "Mission",
    href: "/mission",
    imageHref: "/subpages/mission/missionBG.webp",
    sectionIndex: 4,
    submenu: [
      {
        label: "선교 비전",
        englishLabel: "MISSION",
        href: "/mission",
        description: "제자들교회는 복음전도와 선교를 위해서 존재합니다.",
      },
    ],
  },
  {
    label: "Community",
    href: "/announcements",
    imageHref: "/subpages/community/communityBG.webp",
    sectionIndex: 5,
    submenu: [
      {
        label: "주보",
        englishLabel: "BROCHURES",
        href: "/announcements",
        description: "",
      },
      {
        label: "행사 앨범",
        englishLabel: "EVENT ALBUM",
        href: "/gallery",
        description: "",
      },
    ],
  },
];

export default tabs;

