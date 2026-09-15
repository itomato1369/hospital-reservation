import { computed } from "vue";
// =======================
// 和暦を自動計算
// =======================
// =======================
// 和暦変換
// =======================
export const formatWarekiDate = (
    date?: string | Date | null
): string => {

    if (!date) {
        return "-";
    }

    const targetDate = new Date(date);

    return new Intl.DateTimeFormat(
        "ja-JP-u-ca-japanese",
        {
            era: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(targetDate);
};
// =======================
// 西暦
// =======================
export const formatJapaneseDate = (
  date?: string | Date | null 
) => {
  if (!date) {
    return "-";
  }
  const targetDate = new Date(date);

  return new Intl.DateTimeFormat(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  ).format(targetDate);
};

// =======================
// inputタグをクリックしてもカレンダーを表示
// =======================
export const showCalendar = (event: MouseEvent) => {
  const input = event.target as HTMLInputElement;
  
  if ("showPicker" in input) {
    input.showPicker();
  }
};
// =======================
// 今日より先は選択できないように
// =======================
export const maxDate = computed(() => {
  // 今日の日付を選択
  return new Date().toISOString().split("T")[0];
});
