<script lang="ts">
	import ConfigSelect from "./configSelect.svelte";
  import { configOptions } from "$lib";
  import { selectedConfigId } from "./store";
  import { get } from "svelte/store";

  let selectedConfig: any;

  selectedConfig = configOptions.find(x => x.id == get(selectedConfigId))

  $: $selectedConfigId, selectedConfig = configOptions.find(x => x.id == get(selectedConfigId))
</script>

<div class="panel">
  <ConfigSelect />
  <div class="info-line">
    <h3 class="text-primary-300">Selected Database</h3>
    <p>{selectedConfig.databaseName}</p>
  </div>
</div>
