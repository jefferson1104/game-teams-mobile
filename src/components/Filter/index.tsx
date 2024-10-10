import { TouchableOpacityProps } from 'react-native';
import { Container, Title, IFilterStyleProps } from "./styles";

interface IFilterProps extends TouchableOpacityProps, IFilterStyleProps {
  title: string;
};

export function Filter({ title, isActive = false, ...rest }: IFilterProps) {
  // Renders
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
};
