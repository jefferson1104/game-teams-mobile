import { useState } from 'react';
import { FlatList } from 'react-native';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

export function Players() {
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<string[]>(['Joel', 'Arthur', 'Jefferson']);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Team name"
        subtitle="Add players and separate teams"
      />
      <Form>
        <Input
          placeholder='Player name'
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C']}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => setPlayers(players.filter(player => player !== item))}
          />
        )}
        ListEmptyComponent={
          <ListEmpty
            message='Does not exist players in this team'
          />
        }
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length  === 0 && { flex: 1 }
        ]}
      />
      <Button
        title="Remove Team"
        type="SECONDARY"
      />
    </Container>
  );
}
