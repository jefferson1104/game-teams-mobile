import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from "./styles";

interface IHighlightProps extends TouchableOpacityProps {
  title: string;
};

export function GroupCard({ title, ...rest }: IHighlightProps) {
  // Renders
  return (
    <Container {...rest} >
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
