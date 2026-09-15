export const visitType = (visit: string) => {

    switch (visit) {

        case "first":
            return "初診";
        
        case "followup":
            return "再診";

        default:
            return "-";
    }
};
export const statusType = (status: string) => {

    switch (status) {

        case "arrived":
            return "来院";

        case "cancelled":
            return "キャンセル";

        case "reserved":
            return "予約済み";
        
        case "in_progress":
            return "診察中";

        case "prescribed":
            return "処方";

        case "no_show":
            return "無断キャンセル"
    }
};
