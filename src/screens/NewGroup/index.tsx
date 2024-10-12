import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { createGroup } from "@storage/group/createGroup";

import { AppError } from "@utils/AppError";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  // Hooks
  const navigation = useNavigation();

  // States
  const [group, setGroup] = useState('');

  // Methods
  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Group', 'Group name is required');
      }

      await createGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Group', error.message);
      } else {
        Alert.alert('New Group', 'An error occurred while creating the group');
        console.error('handleNew() error: ', error);
      }
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
          onChangeText={(text: string) => setGroup(text.trim())}
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
