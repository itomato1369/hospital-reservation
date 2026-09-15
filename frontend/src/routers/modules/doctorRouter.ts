export const doctorRoutes = [
  {
    path: "/doctor",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "スケジュール",
        component: () => import("@/views/pages/doctor/ScheduleInfo.vue"),
      },
      {
        path: "holiday",
        name: "休診日選択",
        component: () => import("@/views/pages/doctor/Holiday.vue"),
      },
      {
        path: "holiday/register",
        name: "休診日",
        component: () => import("@/views/pages/doctor/HolidayRegister.vue"),
      },
      {
        path: "holiday/info",
        name: "休診日確認",
        component: () => import("@/views/pages/doctor/HolidayInfo.vue"),
      },
      {
        path: "incharge",
        name: "担当患者",
        component: () => import("@/views/pages/doctor/CarteInfo.vue"),
      },
    ],
  },
];
