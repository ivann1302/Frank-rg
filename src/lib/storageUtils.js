import { STORAGE_KEY } from './constants.js';

function getNextId(posts) {
  return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
}

function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Ошибка при сохранении в local storage:', error);
    throw new Error('Не удалось сохранить данные');
  }
}

export function getAllPosts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    const posts = JSON.parse(data);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error('Ошибка при чтении постов из local storage:', error);
    return [];
  }
}

export function createPost(title, text) {
  const posts = getAllPosts();
  const now = new Date().toISOString();
  
  const newPost = {
    id: getNextId(posts),
    title: title.trim(),
    text: text.trim(),
    createdAt: now,
    updatedAt: now
  };
  
  posts.push(newPost);
  savePosts(posts);
  return newPost;
}

export function updatePost(id, title, text) {
  const posts = getAllPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    console.error(`Пост с ID ${id} не найден`);
    return null;
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    title: title.trim(),
    text: text.trim(),
    updatedAt: new Date().toISOString()
  };
  
  savePosts(posts);
  return posts[postIndex];
}

export function deletePost(id) {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return false;
  }
  
  savePosts(filteredPosts);
  return true;
}
