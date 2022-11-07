import moment from "moment";
import { unmaskNumber } from "./mask";

export const formatBody = (body, rules = {}) => {
  let formattedBody = { ...body };

  if (rules.numberFields) {
    const numberFields = rules.numberFields.reduce((prev, curr) => {
      return { ...prev, [curr]: unmaskNumber(formattedBody[curr]) };
    }, {});

    formattedBody = { ...formattedBody, ...numberFields };
  }

  Object.keys(formattedBody).forEach((key) => {
    if (typeof formattedBody[key] === "string") {
      formattedBody[key] = formattedBody[key].trim();
    }
  });

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

export const formatAppointmentTime = (start, end) => {
  const day = moment(start).format("DD/MM/YYYY HH:mm");

  return `${day} - ${moment(end).format("HH:mm")}`;
};
