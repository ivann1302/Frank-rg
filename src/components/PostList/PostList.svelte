<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { getAllPosts } from '../../lib/storageUtils.js';
  import PostCard from '../PostCard/PostCard.svelte';
  import Button from '../Button/Button.svelte';

  const dispatch = createEventDispatcher();

  let posts = [];

  function loadPosts() {
    const allPosts = getAllPosts();
    posts = allPosts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  function handlePostClick(post) {
    dispatch('view', post);
  }

  function handlePostKeydown(event, post) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePostClick(post);
    }
  }

  function handleCreateClick() {
    dispatch('create');
  }

  onMount(() => {
    loadPosts();
  });
</script>

<div class="post-list">
  <header class="post-list__header">
    <h1 class="post-list__title">Мои посты</h1>
    <Button
      variant="primary"
      className="post-list__create-btn"
      onClick={handleCreateClick}
    >
      Создать пост
    </Button>
  </header>

  {#if posts.length === 0}
    <div class="post-list__empty">
      <p class="post-list__empty-hint">Список постов пуст</p>
    </div>
  {:else}
    <div class="post-list__grid">
      {#each posts as post (post.id)}
        <div
          role="button"
          tabindex="0"
          on:click={() => handlePostClick(post)}
          on:keydown={(e) => handlePostKeydown(e, post)}
        >
          <PostCard {post} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  @import './PostList.scss';
</style>

