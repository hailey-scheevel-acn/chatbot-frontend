<script lang='ts'>
  import { Avatar } from '@skeletonlabs/skeleton';

  export let messageObj: any;

</script>
  
<div class="message-item justify-end items-end border-l-2 border-transparent">
  <div class="card message-card p-4 variant-soft rounded-br-none space-y-2">
    <div class="whitespace-pre-line">
      <p class="break-words">{messageObj.message}</p> 
    </div>
  </div>
  <div class="flex w-10 h-10 place-content-end">
    <Avatar initials="me" background="bg-primary-300" rounded="rounded-full" width="w-16" />
  </div>
</div>

