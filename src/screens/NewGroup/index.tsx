import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { createGroup } from "@storage/group/createGroup";

import { Container, Content, Icon } from "./styles";


export function NewGroup() {
  // Hooks
  const navigation = useNavigation();

  // States
  const [group, setGroup] = useState('');

  // Methods
  async function handleNew() {
    try {
      await createGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      console.error('handleNew() error: ', error);
    }
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
