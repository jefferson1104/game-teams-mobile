import { useNavigation } from '@react-navigation/native';

import logoImg from '@assets/logo.png';

import { Container, Logo, BackButton, BackIcon } from "./styles";

interface IHeaderProps {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: IHeaderProps) {
  // Hooks
  const navigation = useNavigation();

  // Methods
  function handleGoHome() {
    navigation.navigate('groups');
  };

  // Renders
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
