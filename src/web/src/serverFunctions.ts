const API_BASE_URL = 'http://localhost:8080/';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'An error occurred');
  }
  return response.json();
};

export const getUserDataEntities = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  return handleResponse(response);
};

export const submitNewDataEntity = async (input: string) => {
  const response = await fetch(`${API_BASE_URL}submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: input }),
  });
  return handleResponse(response);
};

export const deleteDataEntity = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}entry/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const resetUserData = async () => {
  const response = await fetch(`${API_BASE_URL}reset`, {
    method: 'POST',
  });
  return handleResponse(response);
};
