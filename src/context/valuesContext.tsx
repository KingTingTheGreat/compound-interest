import { getCookie, updateCookie } from "../lib/cookie";
import { Variables } from "../types";
import { createContext, useContext, useState } from "react";

const getCurrentState = (): Variables | null => {
	try {
		const storedValues = getCookie();
		if (!storedValues) return null;
		return storedValues;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const defaultState: Variables = {
	initial: 100000,
	annual: 3000,
	returnRate: 7,
	years: 30,
};

const ValuesContext = createContext<{
	values: Variables;
	setValues: (newValues: Partial<Variables>) => void;
}>({
	values: defaultState,
	setValues: () => {},
});

export const ValuesContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [values, setValues] = useState<Variables>(getCurrentState() || defaultState);

	const updateValues = (newValues: Partial<Variables>) => {
		const updatedValues = { ...values, ...newValues };
		setValues(updatedValues);
		updateCookie(updatedValues);
	};

	return <ValuesContext.Provider value={{ values, setValues: updateValues }}>{children}</ValuesContext.Provider>;
};

export const useValuesContext = () => {
	const context = useContext(ValuesContext);
	if (!context) {
		throw new Error("useValuesContext must be used within a ValuesContextProvider");
	}
	return context;
};
