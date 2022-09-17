import * as Config from "../../Config/index";
const axios = require("axios").default;
const APIConfig = Config.APIConfig;
const UpcomingConfig = Config.upcoming;

export async function fetchUpcoming({ language, page, region }) {
  const baseURL = `${APIConfig.apiUrl}${UpcomingConfig.API}`;
  const params = {
    api_key: APIConfig.apiKey,
    language,
    page,
    region,
  };
  try {
    const response = await axios
      .get(baseURL, { params })
      .catch((err) => console.error(err));
    return response;
  } catch (err) {
    console.error(err);
  }
}
