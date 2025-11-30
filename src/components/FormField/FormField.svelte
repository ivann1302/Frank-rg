<script>
  export let label;
  export let id;
  export let error;
  export let type = 'text';
  export let placeholder = '';
  export let required = false;
  export let value = '';
  export let onInput;
</script>

<div class="form-field">
  <label for={id} class="form-field__label">{label}</label>
  {#if type === 'textarea'}
    <textarea
      {id}
      class="form-field__input form-field__textarea"
      class:form-field__input--error={error}
      {placeholder}
      {required}
      {value}
      on:input={onInput}
    ></textarea>
  {:else}
    <input
      {id}
      {type}
      class="form-field__input"
      class:form-field__input--error={error}
      {placeholder}
      {required}
      {value}
      on:input={onInput}
    />
  {/if}
  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>

<style>
  @import './FormField.scss';
</style>

