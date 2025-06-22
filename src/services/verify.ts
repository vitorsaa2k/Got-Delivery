import { ApiResponse } from "@/types/global/types";

async function verifyAccountViaLink(token: string) {
	return await fetch(`/api/email/verify/${token}`)
		.then(res => res.json())
		.then(data => data);
}

async function verifyAccountViaCode(code: string) {
	const body = JSON.stringify({ code });
	return await fetch(`/api/email/verify/${code}`, { body, method: "POST" })
		.then(res => res.json())
		.then(data => data);
}
/**
 * Requests the creation of a new verification code
 * @param {string} id - The id of the account which the new code have to be created
 * @param {string} email - The email of the account
 */
async function requestNewVerificationCode(id: string, email: string) {
	const body = JSON.stringify({ id, email });
	return await fetch(`/api/email`, { body, method: "POST" })
		.then(res => res.json())
		.then(data => data);
}

async function checkAccountIsVerified(email: string) {
	return await fetch(`http://localhost:3000/api/email?email=${email}`)
		.then(res => res.json())
		.then((data: ApiResponse) => data);
}
async function makeAccountVerified(email: string) {
	return await fetch(`http://localhost:3000/api/email/verify?email=${email}`)
		.then(res => res.json())
		.then((data: ApiResponse) => data);
}

export {
	verifyAccountViaLink,
	verifyAccountViaCode,
	requestNewVerificationCode,
	checkAccountIsVerified,
	makeAccountVerified,
};
