import { Container, Subtitle, Title } from "./styles";

interface IHighlightProps {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: IHighlightProps) {
  // Renders
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}
