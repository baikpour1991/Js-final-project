async function SendDataToDataBase(type, data) {
  const URL = type === 'ADD' ? 'http://localhost:3000/recipes' : `http://localhost:3000/recipes/${data.id}`;
  const method = type === 'ADD' ? 'POST' : 'PUT';

  try {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const addResponse = await fetch(URL, requestOptions);
    if (!addResponse.ok) {
      throw new Error('Network Connection Problem');
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = SendDataToDataBase;
