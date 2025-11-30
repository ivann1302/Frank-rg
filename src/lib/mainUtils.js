export function formatDate(date) {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return formatter.format(dateObj);
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return '';
  }
}

export function validatePost(title, text) {
  const errors = {};
  const trimmedTitle = (title?.trim() || '');
  const trimmedText = (text?.trim() || '');
  
  if (!trimmedTitle) {
    errors.title = 'Заголовок не может быть пустым';
  } else if (trimmedTitle.length < 3) {
    errors.title = 'Заголовок должен содержать минимум 3 символа';
  } else if (trimmedTitle.length > 20) {
    errors.title = 'Заголовок должен содержать максимум 20 символов';
  }
  
  if (!trimmedText) {
    errors.text = 'Текст поста не может быть пустым';
  } else if (trimmedText.length < 10) {
    errors.text = 'Текст поста должен содержать минимум 10 символов';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
