import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";

export function Groups() {
  // Renders
  return (
    <Container>
      <Header />
      <Highlight
        title="Teams"
        subtitle="Play with your team"
      />
      <GroupCard
        title="Team 1"
        onPress={() => console.log('TESTE 23')}
      />
    </Container>
  );
};
