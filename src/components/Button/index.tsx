import { TouchableOpacityProps } from 'react-native';

import { Container, Title, ButtonTypeStyleProps } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ title, type = 'PRIMARY', ...rest }: IButtonProps) {
  // Renders
  return (
    <Container
      type={type}
      {...rest}
    >
      <Title>
        {title}
      </Title>
    </Container>
  );
}
