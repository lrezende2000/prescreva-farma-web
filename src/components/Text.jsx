import styled from "styled-components";
import {
  space,
  layout,
  typography,
  color,
  variant,
  position,
  system,
} from "styled-system";

const Text = styled.p(
  variant({
    variants: {
      large: {
        fontSize: 32,
        fontWeight: 700,
        lineHeight: "38.73px",
      },
      big: {
        fontSize: 24,
        lineHeight: "30px",
      },
      medium: {
        fontSize: 20,
        lineHeight: "24.2px",
      },
      regular: {
        fontSize: 16,
        lineHeight: "19.36px",
      },
      small: {
        fontSize: 14,
        lineHeight: "17.5px",
      },
    },
  }),
  space,
  layout,
  typography,
  color,
  position,
  system({ cursor: true })
);

Text.defaultProps = {
  variant: "regular",
  color: "black",
};

export default Text;
