import { derived, writable } from 'svelte/store';
import { returnDisplayNumber } from '$lib/components/common/utils';
import { getPlayersNotInTeeTime } from '$lib/components/lineup/utils';

export const dataMode = writable('ghin');
export const screenshotUrl = writable('');
export const pcSetting = writable({});
export const refClipboard = writable(null);
export const refCollage = writable(null);
export const refLineup = writable(null);
export const styleDims = writable([]);
export const pdfDim = writable({});
export const snapshots = writable([]);
export const course = writable('');
export const group = writable('');
export const teesSelected = writable([]);
export const teesSelectedSaturday = writable({});
export const defaultTeesSelected = writable({});
export const captains = writable({});
export const bets = writable([]);
export const hasSchedule = writable('');
export const schedules = writable('');
export const foundGolfer = writable({});
export const wednesdaySchedules = writable([]);
export const groups = writable('');
export const allPlayersInTable = writable([]);
export const roster = writable([]);
export const courseData = writable('');
export const sortOrder = writable('alphabetical');
export const lineupTitle = writable('New Lineup');
export const showLocalNumbers = writable(false);
export const showTeamHcp = writable(false);
export const showAddTeamMember = writable({
	team0: false,
	team1: false,
	team2: false,
	team3: false,
	team4: false,
	team5: false,
	team6: false,
	team7: false,
	team8: false,
	team9: false
});
export const showFirstName = writable(false);
export const showIndividualHandicaps = writable(true);
export const showAddDeletePlayers = writable(false);
export const showAddDeletePlayersButton = writable(true);
export const showAddPlayers = writable(false);
export const showDeletePlayers = writable(false);
export const showChangeTees = writable(false);
export const showDownloadPDF = writable(false);
export const showDownloadPDFButton = writable(true);
export const teeAssignments = writable([1]);
export const linkTime = writable('Set Link Time Above');
export const teeTimeCount = writable('');
export const teamTables = writable({
	teeAssignments: [1],
	team0: [],
	team1: [],
	team2: [],
	team3: [],
	team4: [],
	team5: [],
	team6: [],
	team7: [],
	team8: [],
	team9: []
});
export const playingDate = writable('Date');
export const textareaValue = writable('');
export const progs069 = writable('');
export const progAdj = writable('');
export const teeChoiceChangedId = writable(0);
export const overrideCHChoiceChangedId = writable(0);
export const currentLineupIndex = writable(-1);
export const currentLineup = writable(null);
export const currentLineupKey = writable('');
export const missingPlayerMessage = writable('');
export const jpgImage = writable(null);
export const dimensionIndex = writable(0);
export const captainGHINNumber = writable('');
export const realGHINNumber = writable('');
export const deleteAll = writable(true);
export const nextLineupIndex = writable('');
export const playersInLineup = writable([]);
export const idsInLineup = derived(playersInLineup, ($playersInLineup) => {
	if ($playersInLineup[0]) {
		return $playersInLineup.map((player) => player.id.toString());
	} else {
		return [];
	}
});
export const playersNotInTeeTime = derived([playersInLineup, teamTables], ($items) => {
	return getPlayersNotInTeeTime($items[0], $items[1]);
});
export const okToSave = derived(
	[playingDate, teeTimeCount, linkTime, playersInLineup, teamTables],
	($items) => {
		let ok = false;
		if (
			$items[0] !== 'Date' &&
			$items[1] > 0 &&
			$items[2] !== 'Set Link Time Above' &&
			$items[3].length > 0 &&
			$items[4].team0.length > 0
		) {
			ok = true;
		}
		return ok;
	}
);
export const okToAddPlayers = derived(
	[playingDate, teeTimeCount, linkTime, playersInLineup, teamTables],
	($items) => {
		let ok = false;
		if ($items[0] !== 'Date' && $items[1] > 0 && $items[2] !== 'Link Time') {
			ok = true;
		}
		return ok;
	}
);
export const displayNumber = derived([course, group, groups], ($items) => {
	return returnDisplayNumber($items[0], $items[1], $items[2]);
});
