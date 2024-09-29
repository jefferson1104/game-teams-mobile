import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

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
    </Container>
  );
};
