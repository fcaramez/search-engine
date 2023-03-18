import axios, { AxiosError } from "axios";

export const fetchHtmlData = (url: string) => {
  const HTMLDATA = axios
    .get(url)
    .then(res => res.data)
    .catch((err: AxiosError) => {
      console.error(`There was an error with ${err.config?.url}.`);
      console.error(err.toJSON());
    });

  return HTMLDATA;
};
