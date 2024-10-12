import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { getAllGroups } from "@storage/group/getAllGroups";

import { Container } from "./styles";

export function Groups() {
  // Hooks
  const navigation = useNavigation();

  // States
  const [groups, setGroups] = useState<string[]>([]);

  // Methods
  function handleNewGroup() {
    navigation.navigate('new');
  };

  async function fetchGroups() {
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.error('fetchGroups() error: ', error);
    }
  };

  // LifeCycle
  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  // Renders
  return (
    <Container>
      <Header />

      <Highlight
        title="Teams"
        subtitle="Play with your team"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty
            message="How about registering the first team?"
          />
        }
      />

      <Button
        title="Create Team"
        onPress={handleNewGroup}
      />
    </Container>
  );
};
