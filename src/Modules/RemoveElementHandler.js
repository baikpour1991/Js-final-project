function RemoveElementHandler(className) {
  const elementToRemove = document.querySelector(className);
  if (elementToRemove) {
    elementToRemove.remove();
  }
}

module.exports = RemoveElementHandler;
