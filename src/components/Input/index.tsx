import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: InputProps) {
  // Hooks
  const { COLORS } = useTheme();

  // Renders
  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}
