for (const form of document.querySelectorAll('form[data-book]')) {
  fetch(form.action + '&availability=1')
    .then(response => {
      if (response.status === 204) {
        form.hidden = false;
      }
    })
    .catch(() => {});
}
