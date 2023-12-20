<script lang="ts">
  let message = "";
  let typingAnimation: any = null;

  function startTypingAnimation() {
    typingAnimation = setInterval(() => {
      message = message.endsWith("...") ? "" : message + ".";
    }, 500);
  }

  startTypingAnimation()

</script>  

<span class="typing-animation">{message}</span>

<style>
  .typing-animation {
    display: inline-block;
    font-size: 1rem;
    font-weight: bold;
    animation: 1s step-end infinite;
  }
  </style>