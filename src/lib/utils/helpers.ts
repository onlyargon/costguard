export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export const makeItValue = (str: string) => {
	return str.toLowerCase().trim().split(' ').join('_');
};
