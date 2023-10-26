async function RemoveDataFromDatabase(id, targetPage) {
  try {
    const URL = `http://localhost:3000/recipes/${id}`;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const deleteResponse = await fetch(URL, requestOptions);

    if (deleteResponse.ok) {
      const event = new CustomEvent('databaseUpdated', { detail: { targetPage, id } });
      window.dispatchEvent(event);
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = RemoveDataFromDatabase;
