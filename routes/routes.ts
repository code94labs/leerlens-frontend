export enum MenuType {
  LOGOUT = "Logout",
}

export type RoutePath = {
  text: string;
  path: string;
  type?: MenuType;
  sub?: RoutePath[];
  iconPath?: string;
};

export const pages: RoutePath[] = [
  {
    text: "Learning Scan Report",
    path: "/admin/dashboard",
    iconPath: "/images/admin-icons/reports.png",
    sub: [
      {
        text: "NormGroup",
        path: "/admin/dashboard/norm-group",
      },
      {
        text: "Evaluation",
        path: "/admin/dashboard/evaluation",
      },
      {
        text: "Samengevat",
        path: "/admin/dashboard/samengevat",
      },
      {
        text: "EML",
        path: "/admin/dashboard/eml",
      },
    ],
  },
  {
    text: "Responses",
    path: "/admin/responses",
    iconPath: "/images/admin-icons/responses.png",
  },
  {
    text: "Question Set",
    path: "/admin/question-set",
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

export const breadcrumbMap: { [key: string]: string } = {
  "/dashboard": "Learning Scan Report",
  "/admin/responses": "Responses",
  "/admin/question-set/pre-intervention": "Pre-Intervention",
  "/admin/question-set/post-intervention": "Post-Intervention",
  "/admin/question-set/evaluation": "Evaluation",
  "/admin/question-set/norm-group": "NormGroup",
  "/admin/settings": "Settings",
};
