const tabs = [
  {
    label: "About",
    href: "/greeting",
    imageHref: "/image.webp",
    sectionIndex: 0,
    submenu: [
      {
        label: "인사말",
        englishLabel: "GREETING",
        href: "/greeting",
        description: "담임목사님의 인사말을 전합니다.",
      },
      {
        label: "교회 비전",
        englishLabel: "VISION",
        href: "/vision",
        description: "제자들교회의 비전과 사명을 소개합니다.",
      },
      {
        label: "섬기는 분들",
        englishLabel: "LEADERS",
        href: "/leaders",
        description: "교회를 섬기는 분들을 소개합니다.",
      },
      {
        label: "오시는 길",
        englishLabel: "DIRECTIONS",
        href: "/directions",
        description: "교회 위치와 찾아오시는 길을 안내합니다.",
      },
    ],
  },
  {
    label: "Worship",
    href: "/sunday",
    imageHref: "/image.webp",
    sectionIndex: 1,
    submenu: [
      {
        label: "예배 안내",
        englishLabel: "Worship Guide",
        href: "/worship",
        description: "주일 예배 안내 및 시간표를 확인하세요.",
      },
    ],
  },
  {
    label: "Discipling System",
    href: "/system",
    imageHref: "/image.webp",
    sectionIndex: 2,
    submenu: [
      {
        label: "제자화 시스템",
        englishLabel: "DISCIPLESHIP SYSTEM",
        href: "/system",
        description: "새가족부터 사역자까지 단계별 성장 과정입니다.",
      },
    ],
  },
  {
    label: "Next Generation",
    href: "/kindergarten",
    imageHref: "/image.webp",
    sectionIndex: 3,
    submenu: [
      {
        label: "유치부",
        englishLabel: "KINDERGARTEN",
        href: "/kindergarten",
        description: "유치부 예배와 활동을 소개합니다.",
      },
      {
        label: "유초등부",
        englishLabel: "ELEMENTARY",
        href: "/elementary",
        description: "유초등부 예배와 활동을 소개합니다.",
      },
      {
        label: "중고등부",
        englishLabel: "MIDDLE & HIGH SCHOOL",
        href: "/middle-high",
        description: "중고등부 예배와 활동을 소개합니다.",
      },
      {
        label: "청년부",
        englishLabel: "YOUNG ADULTS",
        href: "/young-adults",
        description: "청년부 예배와 활동을 소개합니다.",
      },
    ],
  },
  {
    label: "Mission",
    href: "/mission",
    imageHref: "/image.webp",
    sectionIndex: 4,
    submenu: [
      {
        label: "선교 비전",
        englishLabel: "MISSION",
        href: "/mission",
        description: "제자들교회의 선교 비전과 활동을 소개합니다.",
      },
    ],
  },
  {
    label: "Community",
    href: "/announcements",
    imageHref: "/image.webp",
    sectionIndex: 5,
    submenu: [
      {
        label: "공지사항",
        englishLabel: "ANNOUNCEMENTS",
        href: "/announcements",
        description: "교회의 최신 소식과 공지사항을 확인하세요.",
      },
      {
        label: "갤러리",
        englishLabel: "GALLERY",
        href: "/gallery",
        description: "교회 활동 사진을 확인하세요.",
      },
    ],
  },
];

export default tabs;

