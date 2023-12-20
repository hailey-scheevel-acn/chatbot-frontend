<script lang="ts">
  import { selectedConfigId } from "./store";
  import { configOptions } from "$lib";
</script>

<div>
  <label class="label info-line">
    <h3 class="text-primary-300">Select Configuration</h3>
    <select bind:value={$selectedConfigId} class="select shadow-md variant-glass-primary">
      {#each configOptions as config (config.id)}
        <option value={config.id} class="text-primary-700">{config.displayName}</option>
      {/each}
    </select>
  </label>
</div>

<style>
  select:hover {
    cursor: pointer;
  }
</style>
