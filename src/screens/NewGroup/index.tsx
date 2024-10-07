import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
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

        <Input />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
