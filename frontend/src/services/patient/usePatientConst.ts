export const relationship = [
    { label: "子", value: "child" },
    { label: "父", value: "father" },
    { label: "母", value: "mother" },
    { label: "孫", value: "grandchild" },
    { label: "兄弟姉妹", value: "sibling" },
    { label: "配偶者", value: "spouse" }
];
export const findGender = (gender: string) => {
    switch (gender) {
        case "male":
            return "男性";

        case "female":
            return "女性";

        case "other":
            return "その他";

        default:
            return "";
    }
};
export const findRelationship = (relationship: string) => {
    switch (relationship) {
        case "child":
            return "子";

        case "father":
            return "父";

        case "mother":
            return "母";

        case "other":
            return "その他";
        
        case "sibling":
            return "兄弟姉妹";

        case "spouse":
            return "配偶者";
        
        case "grandchild":
            return "孫";
        
        default:
            return "";
    }
};