import { writable } from "svelte/store";

// The id value here should match whatever id value you have in the config options that you would like the dropdown to default to
export const selectedConfigId = writable<number>(1);