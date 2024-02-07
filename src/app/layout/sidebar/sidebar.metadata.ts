// Sidebar route metadata
export interface RouteInfo {
  path: string | null | undefined;
  title: string | null | undefined;
  moduleName: string | null | undefined;
  iconType: string | null | undefined;
  level_menu: any
  icon: string | null | undefined;
  class: string | null | undefined;
  groupTitle: boolean | null | undefined;
  badge: string | null | undefined;
  badgeClass: string | null | undefined;
  role: string[];
  submenu: RouteInfo[];
}
