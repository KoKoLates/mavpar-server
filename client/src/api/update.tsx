
export const update = async (block: string, host: string, port: string) => {

  const data = {
    mavproxy: block === "A" ? { host, port } : { host: "", port: "" },
    streamer: block === "B" ? { host, port } : { host: "", port: "" }
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("[Error] Network Fetching Issue");
    }

    const results = await response.json();
    console.log(`Success: ${results}`);
    return results;
  } catch (error) {
    console.error(`[Error]: ${error}`);
    throw error;
  }
};
