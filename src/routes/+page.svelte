<script lang="ts">
	import InfoPanel from '$lib/infoPanel.svelte';
	import MessageLayout from '$lib/messageLayout.svelte';

	import { AppBar, AppShell, Drawer, getDrawerStore, type DrawerSettings, Toast } from '@skeletonlabs/skeleton';
  
	const drawerSettings: DrawerSettings = {
	  id: 'sidebar',
	  bgDrawer: 'bg-surface-600 text-white',
	  bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	  width: 'w-[280px] md:w-[480px]',
	  padding: 'p-4',
	  rounded: 'rounded-xl',
	}
	const drawerStore = getDrawerStore();
  
  
	function drawerOpen(): void {
	  drawerStore.open(drawerSettings);
	}
  </script>


  <Drawer class="drawer overflow-y-hidden">
	  <InfoPanel />
  </Drawer>
  
  <Toast />
  
  <AppShell slotSidebarLeft="bg-surface-600 w-0 lg:w-1/3 overflow-y-hidden">
	<svelte:fragment slot="header">
	  <AppBar class="lg:hidden">
		<div class="flex items-center">
		  <button class="btn btn-sm mr-4" on:click={drawerOpen}>
			<span>
			  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			  </svg>          
			</span>
		  </button>
      <!-- You can update the title here, this is only visible when the screen is a < small resolution -->
		  <strong class="text-xl uppercase">Query Finder</strong>
		</div>
	  </AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
	  <InfoPanel />
	</svelte:fragment>
	<div class="message-container">
	  <MessageLayout />
	</div>
  </AppShell>
  
  
