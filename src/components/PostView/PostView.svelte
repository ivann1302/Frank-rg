<script>
  import Button from '../Button/Button.svelte';
  import PostMeta from '../PostMeta/PostMeta.svelte';
  import ConfirmDialog from '../ConfirmDialog/ConfirmDialog.svelte';

  export let post;
  export let onBack;
  export let onEdit;
  export let onDelete;

  let showConfirmDialog = false;

  function handleDelete() {
    showConfirmDialog = true;
  }

  function handleConfirm() {
    showConfirmDialog = false;
    onDelete();
  }
</script>

<div class="post-view">
  <div class="post-view__header">
    <Button
      variant="primary"
      className="post-view__button"
      onClick={onBack}
    >
      Назад
    </Button>
  </div>

  <article class="post-view__content">
    <h1 class="post-view__title">{post.title}</h1>

    <PostMeta createdAt={post.createdAt} updatedAt={post.updatedAt} isView={true} />

    <div class="post-view__text">
      {post.text}
    </div>
  </article>

  <div class="post-view__actions">
    <div class="post-view__actions-group">
      <Button
        variant="danger"
        className="post-view__button"
        onClick={handleDelete}
      >
        Удалить
      </Button>
      <Button
        variant="secondary"
        className="post-view__button"
        onClick={() => onEdit(post)}
      >
        Редактировать
      </Button>
    </div>
  </div>
</div>

<ConfirmDialog
  open={showConfirmDialog}
  message="Вы уверены, что хотите удалить этот пост?"
  onConfirm={handleConfirm}
  onCancel={() => showConfirmDialog = false}
/>

<style>
  @import './PostView.scss';
</style>

