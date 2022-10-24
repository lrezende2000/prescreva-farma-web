import { unmaskNumber } from "./mask";

export const formartBody = (body, rules) => {
  let formattedBody = { ...body };

  if (rules.numberFields) {
    const numberFields = rules.numberFields.reduce((prev, curr) => {
      return { ...prev, [curr]: unmaskNumber(formattedBody[curr]) };
    }, {});

    formattedBody = { ...formattedBody, ...numberFields };
  }

  return formattedBody;
};
