import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {

  // Renders
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="New Team"
          subtitle="Create a new team to add your colleagues."
        />
        <Button title="Create" />
      </Content>
    </Container>
  );
}
