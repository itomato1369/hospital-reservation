import { ref, useAttrs } from "vue";
import { validateDoctorSchedule } from "@/services/doctor/useDoctorValidation";
import {
    insertDoctorHoliday,
    selectDoctorHoliday,
    updateDoctorSchedule,
    selectDoctorSchedule,
    selectAssignedPatient,
    selectDoctorScheduleSelf,
} from "./useDoctorApi";

export const doctorHolidayUpdated = ref(false);

export {
    selectDoctorHoliday,
    selectDoctorSchedule,
    selectAssignedPatient,
    selectDoctorScheduleSelf,
    validateDoctorSchedule,

    insertDoctorHoliday,
    updateDoctorSchedule,
};