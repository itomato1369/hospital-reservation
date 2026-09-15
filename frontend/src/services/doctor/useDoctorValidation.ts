import type { DoctorInfo } from "@/types/doctor";
// ========
// 開始時間・終了時間バリデーション
// ========
export const validateDoctorSchedule = (
    schedule: DoctorInfo[]
): string | null => {
    for (const item of schedule) {
        // 休診の場合はチェックしない
        if (item.is_closed) {
            continue;
        }
        // 開始時間チェック
        if (item.start_time < "09:00") {
            return "開始時間は9:00、以降で設定してください";
        }
        // 終了時間チェック
        if (item.end_time > "18:00") {
            return "終了時間は18:00、以前で設定してください";
        }
        // 開始時間と終了時間
        if (item.start_time >= item.end_time) {
            return "終了時間は開始時間より後に設定してください";
        }
    }
    // 結局 何の戻り値がない
    return null;
};