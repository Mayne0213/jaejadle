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

  // pathname이 tab.href와 정확히 일치하는 경우 (예: /system)
  for (const [index, tab] of tabs.entries()) {
    if (tab.href === pathname && tab.submenu.length > 0) {
      // tab.href와 일치하는 경우, 한글 라벨 사용
      const firstItem = tab.submenu[0];
      // Discipling System의 경우 "제자화 시스템" 사용
      const subtitle = tab.label === "Discipling System" ? "제자화 시스템" : tab.label;
      const subtitleEnglish = tab.label === "Discipling System" ? "DISCIPLESHIP SYSTEM" : tab.label.toUpperCase();
      return {
        title: tab.label,
        subtitle,
        subtitleEnglish,
        image: tab.imageHref,
        index,
        description: firstItem.description,
        tab,
        submenu: firstItem,
      };
    }
  }

  // pathname이 tab.href로 시작하는 경우 (예: /system/new-family는 /system과 매칭)
  for (const [index, tab] of tabs.entries()) {
    if (pathname.startsWith(tab.href + '/') && tab.submenu.length > 0) {
      // pathname과 일치하는 submenu 항목 찾기
      for (const item of tab.submenu) {
        if (pathname.startsWith(item.href + '/') || pathname === item.href) {
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
      // 일치하는 submenu가 없으면 첫 번째 항목 사용
      const firstItem = tab.submenu[0];
      return {
        title: tab.label,
        subtitle: firstItem.label,
        subtitleEnglish: firstItem.englishLabel,
        image: tab.imageHref,
        index,
        description: firstItem.description,
        tab,
        submenu: firstItem,
      };
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