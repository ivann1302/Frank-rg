<script>
  import { createPost, updatePost } from '../../lib/storageUtils.js';
  import { validatePost } from '../../lib/mainUtils.js';
  import Button from '../Button/Button.svelte';
  import FormField from '../FormField/FormField.svelte';

  export let post = null;
  export let onSave;
  export let onCancel;

  let title = '';
  let text = '';
  let errors = {};

  $: formTitle = post ? 'Редактировать пост' : 'Создать пост';
  
  $: {
    if (post) {
      title = post.title || '';
      text = post.text || '';
    } else {
      title = '';
      text = '';
    }
    errors = {};
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const validation = validatePost(title, text);
    
    if (!validation.isValid) {
      errors = validation.errors;
      return;
    }

    errors = {};

    try {
      if (post) {
        updatePost(post.id, title, text);
      } else {
        createPost(title, text);
      }
      
      onSave();
    } catch (error) {
      console.error('Ошибка при сохранении поста:', error);
      errors.general = 'Не удалось сохранить пост. Попробуйте еще раз.';
    }
  }

  function clearError(field) {
    if (errors[field]) {
      errors = { ...errors };
      delete errors[field];
    }
  }

  function handleInput(field, event) {
    if (field === 'title') title = event.target.value;
    if (field === 'text') text = event.target.value;
    clearError(field);
  }
</script>

<div class="post-form">
  <h1 class="post-form__title">{formTitle}</h1>

  <form on:submit|preventDefault={handleSubmit} class="post-form__form">
    {#if errors.general}
      <div class="post-form__error post-form__error--general">
        {errors.general}
      </div>
    {/if}

    <FormField
      label="Заголовок"
      id="title"
      type="text"
      error={errors.title}
      placeholder="Введите заголовок поста"
      required={true}
      value={title}
      onInput={(e) => handleInput('title', e)}
    />

    <FormField
      label="Текст поста"
      id="text"
      type="textarea"
      error={errors.text}
      placeholder="Введите текст поста"
      required={true}
      value={text}
      onInput={(e) => handleInput('text', e)}
    />

    <div class="post-form__actions">
      <Button
        variant="danger"
        className="post-form__button"
        onClick={onCancel}
      >
        Отмена
      </Button>
      <Button
        variant="secondary"
        type="submit"
        className="post-form__button"
      >
        Сохранить
      </Button>
    </div>
  </form>
</div>

<style>
  @import './PostForm.scss';
</style>

