<script>
  import PostMeta from '../PostMeta/PostMeta.svelte';

  export let post;
</script>

<article class="post-card">
  <h2 class="post-card__title">{post.title}</h2>
  
  <PostMeta createdAt={post.createdAt} updatedAt={post.updatedAt} />
</article>

<style>
  @import './PostCard.scss';
</style>

