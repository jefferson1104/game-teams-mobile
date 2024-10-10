import logoImg from '@assets/logo.png';

import { Container, Logo, BackButton, BackIcon } from "./styles";

interface IHeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: IHeaderProps) {
  // Renders
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
