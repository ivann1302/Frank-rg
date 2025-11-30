<script>
  export let variant = 'primary';
  export let type = 'button';
  export let onClick = null;
  export let className = '';
  export let disabled = false;

  $: buttonClass = `btn-${variant} ${className}`.trim();
</script>

<button
  class={buttonClass}
  type={type}
  disabled={disabled}
  on:click={onClick}
>
  <slot />
</button>

<style>
  @import './Button.scss';
</style>

