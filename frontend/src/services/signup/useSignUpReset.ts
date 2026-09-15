import { form, errors, sameDayForm, errorsSameDay, policyForm } from "./useSignUpForm";
// =======================
// リセット
// =======================
export const reset = () => {
	form.loginId = "";
	form.password = "";
	form.passwordConfirm = "";
	form.lastName = "";
	form.firstName = "";
	form.lastNameKana = "";
	form.firstNameKana = "";
	form.gender = null;
	form.birthDate = null;
	form.phone = "";
	form.email = "";
	form.postalCode = "";
	form.prefecture = "";
	form.city = "";
	form.address = "";
	form.building = "";
	form.insurerNumber = "";
	form.insurerSymbol = "";
	form.insurerNumber2 = "";
	form.insurerBranch = "";
	errors.loginId = "";
	errors.password = "";
	errors.passwordConfirm = "";
	errors.firstName = "";
	errors.lastName = "";
	errors.firstNameKana = "";
	errors.lastNameKana = "";
	errors.gender = "";
	errors.birthDate = "";
	errors.phone = "";
	errors.email = "";
	errors.postalCode = "";
	errors.insurerNumber = "";
	policyForm.policyAgreement = false;
	policyForm.privacyAgreement = false;
};
// =======================
// リセット
// =======================
export const resetSameday = () => {
	sameDayForm.lastName = "";
	sameDayForm.firstName = "";
	sameDayForm.lastNameKana = "";
	sameDayForm.firstNameKana = "";
	sameDayForm.birthDate = "";
	sameDayForm.phone = "";

	errorsSameDay.lastName = "";
	errorsSameDay.firstName = "";
	errorsSameDay.lastNameKana = "";
	errorsSameDay.firstNameKana = "";
	errorsSameDay.birthDate = "";
	errorsSameDay.phone = "";
};