<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import typewriter from '$lib';
	import TypingTest from './typingTest.svelte';

	export let messageObj: any;

</script>

<button />
<div
	class="message-item justify-start items-end border-l-2 border-transparent"
>
	<div class="flex w-10 h-10 place-content-end">
		<Avatar initials="A" background="bg-primary-100" rounded="rounded-full" width="w-16" />
	</div>
	<div class="card message-card p-4 bg-transparent rounded-bl-none space-y-2">
		{#if messageObj.message === ''}
			<div>
				<TypingTest />
			</div>
		{:else}
			<div in:typewriter={{ speed: 10 }} class="whitespace-pre-line">
				<p class="break-words">{messageObj.message}</p>
			</div>
		{/if}
	</div>
</div>


