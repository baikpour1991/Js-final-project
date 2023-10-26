async function AddRemoveFavorite(id, targetPage, section) {
  try {
    const URL = `http://localhost:3000/recipes/${id}`;
    const response = await fetch(URL);
    const targetRecipe = await response.json();

    const updatedRecipe = { ...targetRecipe, isFavorite: !targetRecipe.isFavorite };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(updatedRecipe),
    };

    const putResponse = await fetch(URL, requestOptions);

    if (putResponse.ok) {
      const event = new CustomEvent('databaseUpdated', { detail: { targetPage, id, section } });
      window.dispatchEvent(event);
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = AddRemoveFavorite;
