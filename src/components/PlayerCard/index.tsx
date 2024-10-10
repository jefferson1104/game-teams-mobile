
import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Name, Icon } from "./styles";

interface IPlayerCardProps {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove }: IPlayerCardProps) {
  // Renders
  return (
    <Container>
      <Icon name="person" />
      <Name>
        {name}
      </Name>

      <ButtonIcon
        icon="close"
        type="SECONDARY"
        onPress={onRemove}
      />
    </Container>
  );
}
