window.addEventListener('beforeunload', async (event) => {
  event.preventDefault();
  return '';
});
