import useAuthStore from "@/stores/useAuthStore";

const BetterFetch = async (
  url: string,
  method: string,
  body: BodyInit | undefined
) => {
  try {
    const { jwt } = useAuthStore.getState();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (jwt && !headers.Authorization) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    const response = await fetch(url, {
      method: method,
      headers,
      body: body,
    });

    const data = await response.json();

    if (data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("Better fetch error: ", error);
    return null;
  }
};

export default BetterFetch;
