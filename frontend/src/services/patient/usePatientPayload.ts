import { familyForm } from "./usePatientForm";
// APIへ送信するデータを作成
export const familyPayload = () => {
    
    return {

        patientId: familyForm.patient_id,

        // 姓 + 名 
        name: `${familyForm.lastName}${familyForm.firstName}`,

        nameKana: `${familyForm.lastNameKana}${familyForm.firstNameKana}`,

        gender: familyForm.gender,

        birthDate: familyForm.birth_date,

        relationship: familyForm.relationship
    };
};