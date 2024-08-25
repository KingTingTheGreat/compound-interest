import Cookies from "js-cookie";
import { Variables } from "../types";

const COOKIE_NAME = "compound-interest-calculator";

export const updateCookie = (newValues: Partial<Variables>) => {
	const cookie = Cookies.get(COOKIE_NAME);
	const stringifiedData = JSON.stringify(newValues);

	if (!cookie) {
		Cookies.set(COOKIE_NAME, stringifiedData);
		return;
	}

	const parsedData = JSON.parse(cookie) as Variables;
	const updatedData = { ...parsedData, ...newValues };
	Cookies.set(COOKIE_NAME, JSON.stringify(updatedData));
};

export const getCookie = (): Variables | null => {
	const cookie = Cookies.get(COOKIE_NAME);

	if (!cookie) return null;

	return JSON.parse(cookie) as Variables;
};
