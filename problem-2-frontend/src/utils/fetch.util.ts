export async function fetchData<T>(
  url: string,
  method?: "GET" | "POST" | "PATCH" | "DELETE",
  dataBody?: unknown
): Promise<T> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await (method !== "GET"
      ? fetch(url, { method, body: JSON.stringify(dataBody) })
      : fetch(url));

    if (!response.ok) {
      throw new Error(`Something went wrong}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function wait(data: unknown, delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}
