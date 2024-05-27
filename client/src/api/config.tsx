import React from "react";

export interface Settings {
  host: string;
  port: string;
}

export async function fetch_config(block: string): Promise<Settings | null> {
  try {
    const response = await fetch("http://127.0.0.1:8080/config");
    if (!response.ok) {
      throw new Error(`[Error] Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const settings = block === "A" ? data["mavproxy"] : data["streamer"];

    return settings;
  
  } catch (error) {
    console.error(`[Error] Fetching Configuration: ${error}`);
    return null;
  }
}
