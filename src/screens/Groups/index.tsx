import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";

export function Groups() {
  // States
  const [groups, setGroups] = useState<string[]>(['Galera do CS2', 'Warzone Team']);

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
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => {}}
          />
        )}
      />
    </Container>
  );
};
