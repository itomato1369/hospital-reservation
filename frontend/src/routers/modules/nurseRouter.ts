export const nurseRoutes = [
  {
    path: "/nurse",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "当日予約選択",
        component: () => import("@/views/pages/nurse/SameDayReservation.vue"),
      },
      {
        path: "new",
        name: "新規の患者",
        component: () => import("@/components/nurse/NewPatientCard.vue"),
      },
      {
        path: "search",
        name: "既存の患者",
        component: () => import("@/components/nurse/SearchPatient.vue"),
      },
      {
        path: "reservation/register",
        name: "当日予約",
        component: () => import("@/components/patient/ReservationCard.vue"),
      },
      {
        path: "visit",
        name: "来院",
        component: () => import("@/views/pages/nurse/Vist.vue"),
      },
      {
        path: "wait",
        name: "待ち時間を入力",
        component: () => import("@/views/pages/nurse/WaitTime.vue"),
      },
      {
        path: "history",
        name: "病院履歴",
        component: () => import("@/views/pages/nurse/History.vue"),
      },
    ],
  },
];
