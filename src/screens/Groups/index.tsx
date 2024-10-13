import { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { getAllGroups } from "@storage/group/getAllGroups";

import { Container } from "./styles";

export function Groups() {
  // Hooks
  const navigation = useNavigation();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  // Methods
  function handleNewGroup() {
    navigation.navigate('new');
  };

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.error('fetchGroups() error: ', error);
      Alert.alert('Groups', 'An error occurred while loading the groups');
    } finally {
      setIsLoading(false);
    }
  };

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty
              message="How about registering the first team?"
            />
          }
        />
      )}

      <Button
        title="Create Team"
        onPress={handleNewGroup}
      />
    </Container>
  );
};
