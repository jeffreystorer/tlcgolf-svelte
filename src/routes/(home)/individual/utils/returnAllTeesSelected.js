import { get } from 'svelte/store';
import { teesSelected } from '$lib/store';
import { courses, teeValues } from '$lib/components/common/data';

export default function returnAllTeesSelected() {
	let _teesSelected = get(teesSelected);
	let allTees = [];
	courses.forEach(pushTees);

	function pushTees(item) {
		const course = item;
		allTees.push(_teesSelected[course]);
	}
	let allTeesCombined = [];
	allTees.forEach(combine);
	function combine(item) {
		let courseTeeArray = item;
		courseTeeArray.forEach(pushObj);
		function pushObj(item) {
			let teeObj = item;
			allTeesCombined.push(teeObj);
		}
	}

	const allTeesSelected = allTeesCombined.filter(function (obj) {
		const key = obj.value;
		if (!this[key]) {
			this[key] = true;
			return true;
		}
		return null;
	}, Object.create(null));

	const teeArray = teeValues.map((val) => {
		let tee = allTeesSelected.find((obj) => {
			return obj.value === val;
		});
		if (tee) {
			let entry = {
				value: val,
				label: tee.label
			};
			return entry;
		} else {
			return null;
		}
	});
	let filteredTeeArray = teeArray.filter((val) => val !== null);

	return filteredTeeArray;
}
