<script>
  import { refCollage } from '$lib/store';
  import { screenshotUrl, dimensionIndex, showDownloadPDF, pdfDim, styleDims} from '$lib/store';
  import { dimensionArray } from '$lib/components/export/optionitems';
  import { DownloadPDFButton } from '$lib/components/export/buttons';
  import { LineupImage, Collage } from '$lib/components/export/images';
  let pcSetting = {
      rows: 0, 
      columns: 0,
      factor: 0,
      width: 0,
      height: 0,
  };

  function handleChange(event){
    event.preventDefault();
    $dimensionIndex = event.target.value;
    
  let index = $dimensionIndex;
  if (index === 0) index = index + 1;
  
  //PDF Creation

  const rowCount = dimensionArray[index][0];
  const colCount = dimensionArray[index][1];
 
  const img = new Image();
  img.src = $screenshotUrl;
  let factor = 2.0;

  let pcWidth = img.width * colCount * factor;
  let pcHeight = img.height * factor;
  let pcDim = {
    width: pcWidth,
    height: pcHeight * rowCount,
  };
  let pcStyleWidth = pcDim.width + 'px';
  let pcStyleHeight = pcDim.height + 'px';

  $pdfDim = pcDim;

  $styleDims =  [pcStyleWidth, pcStyleHeight];
  pcSetting = {
      rows: rowCount, 
      columns: colCount,
      factor: factor,
      width: img.width,
      height: img.height,
    }
  };
  
</script>

{#if $showDownloadPDF}
    <div class='titled_outer'>
      <h2>Download PDF</h2>
      <div class='select-dropdown-container'>
        <label>
          Select PDF Format
          <select            
            on:change={handleChange}>
            {#each dimensionArray as dimension, index}
              <option value={index}>
                {dimension[0] + ' X ' + dimension[1]}
              </option>
            {/each}
          </select>
        </label>
      </div>
      <br />
      {#if $dimensionIndex > 0}
        {#key $dimensionIndex}
          <div id='pdfbuttons'>
            <DownloadPDFButton type={'portrait'} element={$refCollage} dimensionIndex = {$dimensionIndex}/>
            <DownloadPDFButton type={'landscape'} element={$refCollage} dimensionIndex = {$dimensionIndex}/>
          </div>
        {/key}
      {/if}
    </div>
{/if}

<section>
  <LineupImage />
  {#key $dimensionIndex}
    <Collage {pcSetting} />
  {/key}
</section>


<style>
  div:first-of-type {
	margin: 1em auto;
	padding: 0 0.5em;
	width: fit-content;
}
  section {
    top: 0;
    left: -1000%;
    position: fixed;
  }  

#pdfbuttons {
	display: flex;
	flex-direction: row;
	gap: 0.5em;
	justify-content: space-around;
	margin: 0 auto 0.5em auto;
	width: fit-content;
}
</style>
    