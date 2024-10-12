import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  // Hooks
  const navigation = useNavigation();

  // States
  const [group, setGroup] = useState('');

  // Methods
  function handleNew() {
    navigation.navigate('players', { group });
  };

  // Renders
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="New Team"
          subtitle="Create a new team to add your colleagues."
        />

        <Input
          placeholder="Team name"
          onChangeText={setGroup}
        />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
