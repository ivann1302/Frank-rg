<script>
  import Button from '../Button/Button.svelte';
  
  export let open = false;
  export let message = 'Вы уверены?';
  export let onConfirm;
  export let onCancel;
</script>

{#if open}
  <div 
    class="confirm-dialog__overlay" 
    role="dialog"
    aria-modal="true"
    aria-labelledby="confirm-dialog-message"
    tabindex="-1"
    on:click={onCancel}
    on:keydown={(e) => e.key === 'Escape' && onCancel()}
  >
    <div 
      class="confirm-dialog" 
      role="document"
    >
      <p id="confirm-dialog-message" class="confirm-dialog__message">{message}</p>
      <div class="confirm-dialog__actions">
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
        <Button variant="danger" onClick={onConfirm}>Подтвердить</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  @import './ConfirmDialog.scss';
</style>

