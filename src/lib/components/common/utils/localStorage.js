import { browser } from '$app/environment';

export const get = (item) => {
	if (!browser) return;
	try {
		const storedItem = localStorage.getItem(item);
		if (storedItem === null) {
			return undefined;
		}
		return JSON.parse(storedItem);
	} catch (err) {
		return undefined;
	}
};
export const lget = (item) => {
	if (!browser) return;
	try {
		const storedItem = localStorage.getItem(item);
		if (storedItem === null) {
			return undefined;
		}
		return JSON.parse(storedItem);
	} catch (err) {
		return undefined;
	}
};

export const set = (item, value) => {
	if (!browser) return;
	try {
		const valueToBeStored = JSON.stringify(value);
		localStorage.setItem(item, valueToBeStored);
	} catch (err) {
		console.log(' error: ' + err + ' storing item: ' + item);
	}
};

export const remove = (item) => {
	if (!browser) return;
	try {
		localStorage.removeItem(item);
	} catch (err) {
		console.log(' error: ' + err + ' removing item: ' + item);
	}
};

export const clear = () => {
	if (!browser) return;
	localStorage.clear();
};
