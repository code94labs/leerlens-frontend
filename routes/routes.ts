export enum MenuType {
  LOGOUT = "Logout",
}

export type RoutePath = {
  text: string;
  path?: string;
  type?: MenuType;
  sub?: RoutePath[];
  iconPath?: string;
};

export const pages: RoutePath[] = [
  {
    text: "Learning Scan Report",
    path: "/admin/dashboard",
    iconPath: "/images/admin-icons/reports.png",
  },
  {
    text: "Responses",
    path: "/admin/responses",
    iconPath: "/images/admin-icons/responses.png",
  },
  {
    text: "Question Set",
    iconPath: "/images/admin-icons/questions.png",
    sub: [
      {
        text: "Pre-Intervention",
        path: "/admin/question-set/pre-intervention",
      },
      {
        text: "Post-Intervention",
        path: "/admin/question-set/post-intervention",
      },
      {
        text: "Evaluation",
        path: "/admin/question-set/evaluation",
      },
      {
        text: "NormGroup",
        path: "/admin/question-set/norm-group",
      },
    ],
  },
  {
    text: "Settings",
    path: "/admin/settings",
    iconPath: "/images/admin-icons/settings.png",
  },
];
