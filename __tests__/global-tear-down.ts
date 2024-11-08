import { expect, type FullConfig } from "@playwright/test";
import Axios from "axios";

async function globalTeardown(config: FullConfig) {
  const baseURL = config?.webServer?.url || "http://localhost:3000";

  try {
    const response = await Axios.delete(`${baseURL}/api/event/test-event`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ADMIN_LOGIN || ":")}`,
      },
    });

    expect(response.status).toBe(204);
  } catch (error) {
    console.error("Error deleting event: ", error);
  }
}

export default globalTeardown;
