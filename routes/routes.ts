export enum MenuType {
  LOGOUT = "Logout",
}

export type RoutePath = {
  text: string;
  path: string;
  type?: MenuType;
};

export const pages: RoutePath[] = [
  { text: "Homepage", path: "/" },
  { text: "Admin Login", path: "/admin/login" },
];

export const externalItems: RoutePath[] = [
  { text: "Settings", path: "/admin/settings" },
  { text: "Log Out", path: "/admin", type: MenuType.LOGOUT },
];
