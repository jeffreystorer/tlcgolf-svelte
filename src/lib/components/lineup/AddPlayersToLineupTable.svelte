<script>
  import {idsInLineup, playersInLineup} from '$lib/store';
  import { getPlayersInGroup, updateTeamTables } from '$lib/components/common/utils';
  import { playersNotInLineup } from '$lib/components/lineup/utils';

  const playersInGroup = getPlayersInGroup('createLineupTable');

  const addPlayerCount = playersNotInLineup().length;

  const handleClick = (idToBeAdded) => (event) => {
    const idsAddedToLineupArray = [idToBeAdded];
    const oldIdsInLineup = $idsInLineup;
    const newIdsInLineup = oldIdsInLineup.concat(idsAddedToLineupArray);
    let newPlayersInLineupArray = [];
    newIdsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    sortAlphabetical(newPlayersInLineupArray);
    updateTeamTables();
  };

  function sortAlphabetical(newPlayersInLineupArray) {
    newPlayersInLineupArray.sort((a, b) =>
      a.lastName > b.lastName
        ? 1
        : a.lastName === b.lastName
        ? a.firstName > b.firstName
          ? 1
          : -1
        : -1
    );
    $playersInLineup = newPlayersInLineupArray;
  }

 
</script>

<div>
  <h4>{addPlayerCount} Not In Lineup</h4>
  <ul>
    {#each playersNotInLineup() as player}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li on:click={handleClick(player.id)}>
        {player.playerName}
      </li>
    {/each}
  </ul>
</div>
<style>
  div {
    padding: 0 0.25em;
    width: 50%;

    & > h4 {
      font-size: var(--step-0);
      text-decoration: underline;
    }
    & > ul {
      list-style: none;
    }

    & > ul > li {
      font-size: var(--step-0);
      text-align: center;
    }
  }
</style>
