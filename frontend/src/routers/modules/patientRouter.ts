export const patientRoutes = [
  {
    path: "/patient",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "情報",
        component: () => import("@/views/pages/patient/MyInfo.vue"),
      },
      {
        path: "info",
        name: "情報更新",
        component: () => import("@/views/pages/patient/EditInfo.vue"),
      },
      {
        path: "doctor",
        name: "担当医",
        component: () => import("@/views/pages/patient/DoctorProfile.vue"),
      },
      {
        path: "doctors/:doctorId",
        name: "担当医スケジュール",
        component: () => import("@/views/pages/patient/DoctorSchedule.vue"),
      },
      {
        path: "reservation",
        name: "予約選択",
        component: () => import("@/views/pages/patient/Reservation.vue"),
      },
      {
        path: "reservation/register",
        name: "予約",
        component: () => import("@/views/pages/patient/ReservationRegister.vue"),
      },
      {
        path: "reservation/cancel",
        name: "予約キャンセル",
        component: () => import("@/views/pages/patient/ReservationCancel.vue"),
      },
      {
        path: "wait",
        name: "待ち時間",
        component: () => import("@/views/pages/patient/WaitTime.vue"),
      },
      {
        path: "history",
        name: "来院履歴",
        component: () => import("@/views/pages/patient/History.vue"),
      },
      {
        path: "family",
        name: "家族",
        component: () => import("@/views/pages/patient/FamilyInfo.vue"),
      },
      {
        path: "family/register",
        name: "家族登録",
        component: () => import("@/components/patient/FamilyCard.vue"),
      },
      {
        path: "family/info",
        name: "家族情報",
        component: () => import("@/components/patient/FamilyInfoCard.vue"),
      },
    ],
  },
];
