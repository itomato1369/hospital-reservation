<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, computed, onMounted, watch } from "vue";
import { selectClinicHoliday, selectIsDoctorHoliday } from "@/services/reservation/useReservationApi";
import { selectDoctorSchedule, doctorHolidayUpdated } from "@/services/doctor/useDoctor";
import type { ClinicHoliday, CalendarDay, DoctorHoliday } from "@/types/reservation";
import type { DoctorInfo } from "@/types/doctor";

const modelValue = defineModel<string>({default: ""});
// ReservationCard.vueからdoctorIdを受け取るため
const props = defineProps<{
    doctorId: number | null;
}>();

// 日付選択を通知するためのemit
const emit = defineEmits<{
        (e: "select", dateStr: string): void;
}>();
    
// 現在表示しているカレンダーの年と月（デフォルトは今月）
const currentDate = ref(new Date());
const holidays = ref<ClinicHoliday[]>([]);
const doctorHolidays = ref<DoctorHoliday[]>([]);
const doctorSchedule = ref<DoctorInfo[]>([]);

// 現在の年と月
const year = computed(() => currentDate.value.getFullYear());
const month = computed(() => currentDate.value.getMonth()); // 0〜11

// 月の表示名（日本語）
const monthTitle = computed(() => {
    return `${year.value}年 ${month.value + 1}月`;
});

// 前月・次月への移動
const prevMonth = () => {
    currentDate.value = new Date(year.value, month.value - 1, 1);
};

const nextMonth = () => {
    currentDate.value = new Date(year.value, month.value + 1, 1);
};

// カレンダーに表示する日付の配列を計算
const calendarDays = computed(() => {
    const firstDayIndex = new Date(year.value, month.value, 1).getDay(); // 月初めの曜日 (0:日曜〜6:土曜)
    const lastDay = new Date(year.value, month.value + 1, 0).getDate(); // 月の最終日

    const days = [];
    const todayStr = new Date().toISOString().split("T")[0]!;

    // 前月分の空白セル
    for (let i = 0; i < firstDayIndex; i++) {
        days.push({ day: null, dateStr: "", isDisabled: true, isToday: false, isSelected: false });
    }

    // 当月分の日付セル
    for (let d = 1; d <= lastDay; d++) {
        const dateObj = new Date(year.value, month.value, d);
        const yyyy = year.value;
        const mm = String(month.value + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        // 過去日判定
        const isPast = dateStr < todayStr;
        // 日曜日判定 (0)
        const isSunday = dateObj.getDay() === 0;
        // 休診日判定
        const normalizeHolidayDate = (holidayDate: string) => {
            const normalized = new Date(holidayDate);
            return isNaN(normalized.getTime())
                ? holidayDate.slice(0, 10)
                : normalized.toISOString().slice(0, 10);
        };

        const isHoliday = holidays.value.some(
            h => normalizeHolidayDate(h.holiday_date) === dateStr
        );
        //　医師の休診日
        const isDoctorHoliday = doctorHolidays.value.some(
            h => normalizeHolidayDate(h.holiday_date) === dateStr
        );

        const weekdaySchedule = doctorSchedule.value.find(
            (item) => item.day_of_week === dateObj.getDay()
        );
        const isDoctorClosedBySchedule = !weekdaySchedule || weekdaySchedule.is_closed;

        const isDisabled = isPast || isSunday || isHoliday || isDoctorHoliday || isDoctorClosedBySchedule;
        const isToday = dateStr === todayStr;
        const isSelected = modelValue.value === dateStr;

        days.push({
            day: d,
            dateStr,
            isDisabled,
            isToday,
            isSelected
        });
    }

    return days;
});

// 日付をクリックした時の処理
const selectDate = (dayObj: CalendarDay) => {

    if (dayObj.isDisabled || !dayObj.dateStr) {
        return;
    }
   //console.log("dayObj.dateStr =", dayObj.dateStr);

    modelValue.value = dayObj.dateStr;

    //console.log("modelValue =", modelValue.value);

    emit("select", dayObj.dateStr);
};
// 医師の休診日データを取得
const handleDoctorHolidays = async () => {
    if (!props.doctorId) {
        doctorHolidays.value = [];
        doctorSchedule.value = [];
        return;
    }

    try {
        const result = await selectIsDoctorHoliday(props.doctorId);
        doctorHolidays.value = Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("医師の休診日データ取得エラー:", error);
        doctorHolidays.value = [];
    }
};

const handleDoctorSchedule = async () => {
    if (!props.doctorId) {
        doctorSchedule.value = [];
        return;
    }

    try {
        const schedule = await selectDoctorSchedule(props.doctorId);
        doctorSchedule.value = Array.isArray(schedule) ? schedule : [];
    } catch (error) {
        console.error("医師スケジュール取得エラー:", error);
        doctorSchedule.value = [];
    }
};
// 医師IDや表示月が変更されたら自動で再取得
watch(
    () => [props.doctorId, year.value, month.value, doctorHolidayUpdated.value],
    async ([newDoctorId]) => {
        if (newDoctorId) {
            await Promise.all([
                handleDoctorHolidays(),
                handleDoctorSchedule(),
            ]);
        } else {
            doctorHolidays.value = [];
            doctorSchedule.value = [];
        }
    },
    { immediate: true }
);

onMounted(async () => {
    holidays.value = await selectClinicHoliday() ?? [];

   // console.log("clinic holidays", holidays.value);
});
</script>

<template>
    <div class="custom-calendar">
        <!-- ヘッダー（月切り替え） -->
        <div class="calendar-header">
            <button type="button" class="nav-btn" @click="prevMonth">&lt;</button>
            <span class="month-title">{{ monthTitle }}</span>
            <button type="button" class="nav-btn" @click="nextMonth">&gt;</button>
        </div>

        <!-- 曜日ヘッダー -->
        <div class="weekdays">
            <span class="weekday sun">日</span>
            <span class="weekday">月</span>
            <span class="weekday">火</span>
            <span class="weekday">水</span>
            <span class="weekday">木</span>
            <span class="weekday">金</span>
            <span class="weekday sat">土</span>
        </div>

        <!-- 日付グリッド -->
        <div class="days-grid">
            <div v-for="(item, index) in calendarDays"
                 :key="index"
                 class="day-cell"
                 :class="{
                     'disabled': item.isDisabled,
                     'today': item.isToday,
                     'selected': item.isSelected,
                     'empty': !item.day
                 }"
                 @click="selectDate(item)">
                <span v-if="item.day">{{ item.day }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/styles/patient/calendar.css";
</style>