<script>
  import { formatDate } from '../../lib/mainUtils.js';
  
  export let createdAt;
  export let updatedAt;
  export let isView = false;
  
  $: isEdited = createdAt !== updatedAt;
</script>

<div class="post-meta" class:post-meta--view={isView}>
  <span class="post-meta__date">
    Создан: {formatDate(createdAt)}
  </span>
  {#if isEdited}
    <span class="post-meta__date post-meta__date--edited">
      Изменен: {formatDate(updatedAt)}
    </span>
  {/if}
</div>

<style>
  @import './PostMeta.scss';
</style>

