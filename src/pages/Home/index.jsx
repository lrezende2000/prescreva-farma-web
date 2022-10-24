import { menuLinks } from "../../components/Header";
import PageLayout from "../../components/PageLayout";
import Text from "../../components/Text";
import Item from "./components/Item";

import { ItemContainer } from "./styles";

const Home = () => {
  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Geral
      </Text>
      <ItemContainer>
        {menuLinks.map(
          (menuLink) =>
            menuLink.icon && (
              <Item
                key={menuLink.link}
                Icon={menuLink.icon}
                label={menuLink.label}
                link={menuLink.link}
              />
            )
        )}
      </ItemContainer>
    </PageLayout>
  );
};

export default Home;
