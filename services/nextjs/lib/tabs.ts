import tabs from "@/const/tabs";

// 타입 정의
export interface TabInfo {
  title: string;
  subtitle: string;
  subtitleEnglish: string;
  image: string;
  index: number;
  description: string;
  tab: typeof tabs[number];
  submenu: typeof tabs[number]["submenu"][number];
}

export const getTabInfo = (pathname: string): TabInfo | null => {
  // 먼저 정확히 일치하는 경로를 찾습니다
  for (const [index, tab] of tabs.entries()) {
    for (const item of tab.submenu) {
      if (item.href === pathname) {
        return {
          title: tab.label,
          subtitle: item.label,
          subtitleEnglish: item.englishLabel,
          image: tab.imageHref,
          index,
          description: item.description,
          tab,
          submenu: item,
        };
      }
    }
  }

  // 정확히 일치하는 경로가 없으면, pathname이 시작하는 경로를 찾습니다
  // (예: /announcements/create는 /announcements와 매칭)
  for (const [index, tab] of tabs.entries()) {
    for (const item of tab.submenu) {
      if (pathname.startsWith(item.href + '/')) {
        return {
          title: tab.label,
          subtitle: item.label,
          subtitleEnglish: item.englishLabel,
          image: tab.imageHref,
          index,
          description: item.description,
          tab,
          submenu: item,
        };
      }
    }
  }

  return null;
};

export const getNavbarTabs = () => {
  return tabs.map((tab) => ({
    label: tab.label,
    // 항상 첫 번째 submenu 항목으로 이동 (루트 페이지가 없으므로)
    href: tab.submenu[0]?.href || "#",
  }));
};