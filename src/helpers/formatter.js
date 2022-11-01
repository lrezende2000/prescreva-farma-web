import { unmaskNumber } from "./mask";

export const formatBody = (body, rules) => {
  let formattedBody = { ...body };

  if (rules.numberFields) {
    const numberFields = rules.numberFields.reduce((prev, curr) => {
      return { ...prev, [curr]: unmaskNumber(formattedBody[curr]) };
    }, {});

    formattedBody = { ...formattedBody, ...numberFields };
  }

  return formattedBody;
};

export const formatUrlQuery = (baseUrl, query) => {
  let url = baseUrl;

  const values = Object.keys(query).reduce((prev, key) => {
    if (query[key]) {
      return [...prev, [key, query[key]]];
    }

    return prev;
  }, []);

  if (values.length) {
    const queryString = values.map((v) => v.join("=")).join("&");

    url = `${url}?${queryString}`;
  }

  return url;
};
