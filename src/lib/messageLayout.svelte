<script lang="ts">
	import RightMessage from '$lib/rightMessage.svelte';
	import LeftMessage from '$lib/leftMessage.svelte';
	import { afterUpdate } from 'svelte';
	import { selectedConfigId } from './store';
	import { configOptions, URISTRING } from '$lib/index';
	import { get } from 'svelte/store';

	interface MessageFeed {
		id: number;
		host: boolean;
		name: string;
		message: string;
	}

  interface DataObject {
    [key: string]: any
  }

	let element: any;
	let textarea: any;
	let blankMessageError = false;
	let messageLoading = false;
	let messageFeed: MessageFeed[] = [];
	let currentMessage = '';
	let idVal = 3;
  

	afterUpdate(() => {
		if (messageFeed) scrollToBottom(element);
	});

	const scrollToBottom = async (node: any) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function sendMessage() {
		if (currentMessage.length > 0) {
			blankMessageError = false;
			idVal += 1;

			let newMessage: MessageFeed;
			newMessage = {
				id: idVal,
				host: false,
				name: 'Me',
				message: currentMessage,
			};

			messageFeed.push(newMessage);
			messageFeed = messageFeed;
			messageLoading = true;

			idVal += 1;
			let loadingMessage: MessageFeed;
			loadingMessage = {
				id: idVal,
				host: true,
				name: 'Host',
				message: '',
			};
			messageFeed.push(loadingMessage);

			sendQuestion(currentMessage);
		} else {
			blankMessageError = true;
		}
    currentMessage = '';
    textarea.style.height = 'auto';
	}

	const sendQuestion = async (message: string) => {
    let selectedConfig = configOptions.find((x) => x.id == get(selectedConfigId))
    
		try {
      idVal += 1;
			let data: DataObject 
      data = {
        // Your api should expect at least two items in the request body
        // The question as the body.query and configuration as body.config_name
				query: message,
				config_name: selectedConfig?.configName
			};
      // The 'ask' endpoint may need to be changed here to hit whatever endpoint you use to send your question to
			const req = await fetch(`http://${URISTRING}/ask`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify(data)
			});
			const res = await req.json();
			

			let newMessage: MessageFeed;
			newMessage = {
				id: idVal,
				host: true,
				name: 'Host',
        // this line will need to be updated with whatever your api response returns the answer as 
        // In this case we expect the following format: { output: <answer> }
				message: res.output
			};

			messageFeed.pop();

			messageFeed.push(newMessage);
			messageFeed = messageFeed;
			
		} catch (error) {
			console.log(error);
      messageFeed[messageFeed.length - 1].message = 'Something went wrong.'
		}
    
    messageLoading = false;
	};

	function fireEvent(e: any) {
		if (!(currentMessage.length < 1) && e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (currentMessage.replace('\n', '').length > 0 && !messageLoading) {
				sendMessage();
			}
		} else {
			return false;
		}
	}

	function onTextareaInput() {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	}

	export function resetMessages() {
		messageFeed = [];
		messageLoading = false;
    blankMessageError = false;
    currentMessage = '';
    idVal = 1;
	}

	$: if (messageFeed && element) {
		scrollToBottom(element);
	}

</script>

<div class="message-container-content">
	<div bind:this={element} class="grid grid-cols-1 gap-2 overflow-y-scroll">
		{#each messageFeed as bubble (bubble.id)}
			{#if !bubble.host}
				<RightMessage messageObj={bubble} />
			{:else}
				<LeftMessage messageObj={bubble} />
			{/if}
		{/each}
	</div>
	<form on:submit|preventDefault={() => sendMessage()}>
		{#if blankMessageError}
			<aside class="alert variant-ghost-error">
				<div class="alert-message">
					<p>Please type a message to continue</p>
				</div>
			</aside>
		{/if}
		<div class="flex gap-2">
			<div class="message-input input-group input-group-divider border-primary-300">
				<textarea
					bind:this={textarea}
					bind:value={currentMessage}
					class="bg-transparent border-0 ring-0"
					name="prompt"
					id="prompt"
					placeholder="Write a message..."
					rows="1"
					on:keydown={fireEvent}
					on:input={onTextareaInput}
				/>
				<button
					disabled={currentMessage.replace('\n', '').length < 1 || messageLoading}
					class="svg-btn variant-filled-primary btn-icon-sm m-3"
					type="submit"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/>
					</svg>
				</button>
			</div>
		</div>
	</form>
</div>


<style>
	textarea {
		padding: 1rem;
		resize: none;
		line-height: 1.5;
		overflow-x: hidden;
		max-height: 120px;
		border: none;
		outline: none;
	}

  textarea:focus {
    outline: none;
    outline-width: 0;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }



	svg {
		min-width: 1.25rem;
		min-height: 1.25rem;
	}
</style>
