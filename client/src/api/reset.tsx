import { Settings } from './config'

export interface Default {
  mavproxy: Settings,
  streamer: Settings
}

export async function fetch_default(): Promise<Default | null> {
  try {
    const response = await fetch("http://127.0.0.1:8080/default");
    if (!response.ok) {
      throw new Error(`[Error] Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const settings: Default = {
      mavproxy: data["mavproxy"], streamer: data["streamer"]
    };
    return settings;

  } catch (error) {
    console.error(`[Error] Fetching Configuration: ${error}`);
    return null;
  }
}
