export async function getCurrencies() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
