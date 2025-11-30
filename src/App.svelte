<script>
  import PostList from './components/PostList/PostList.svelte';
  import PostForm from './components/PostForm/PostForm.svelte';
  import PostView from './components/PostView/PostView.svelte';
  import { deletePost } from './lib/storageUtils.js';

  let currentView = 'list';
  let selectedPost = null;
  let listKey = 0;

  function navigate(view, post = null) {
    currentView = view;
    selectedPost = post;
    if (view === 'list') listKey++;
  }

  function handleSave() {
    navigate('list');
  }

  function handleCancel() {
    navigate('list');
  }

  function handleDelete() {
    if (selectedPost) {
      try {
        deletePost(selectedPost.id);
        navigate('list');
      } catch (error) {
        console.error('Ошибка при удалении поста:', error);
        alert('Не удалось удалить пост. Попробуйте еще раз.');
      }
    }
  }
</script>

<div class="app-container">
  {#if currentView === 'list'}
    {#key listKey}
      <PostList on:create={() => navigate('create')} on:view={(e) => navigate('view', e.detail)} />
    {/key}
  {:else if currentView === 'create'}
    <PostForm onSave={handleSave} onCancel={handleCancel} />
  {:else if currentView === 'edit'}
    {#key selectedPost?.id || 'edit'}
      <PostForm post={selectedPost} onSave={handleSave} onCancel={handleCancel} />
    {/key}
  {:else if currentView === 'view'}
    <PostView post={selectedPost} onBack={() => navigate('list')} onEdit={(post) => navigate('edit', post)} onDelete={handleDelete} />
  {/if}
</div>
