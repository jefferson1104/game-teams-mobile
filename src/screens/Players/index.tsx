import { useCallback, useState, useRef } from 'react';
import { Alert, FlatList, TextInput, Keyboard } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';

import { addPlayerByGroup } from '@storage/players/addPlayerByGroup';
import { removePlayerByGroup } from '@storage/players/removePlayerByGroup';
import { getPlayersByGroupAndTeam } from '@storage/players/getPlayersByGroupAndTeam';
import { removeGroupByName } from '@storage/group/removeGroupByName';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';

import { AppError } from '@utils/AppError';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';



interface RouteParams {
  group: string;
};

export function Players() {
  // Hooks
  const route = useRoute();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  // States
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  // Constants
  const { group } = route.params as RouteParams;

  // Methods
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New Player', 'Please, inform a player name.');
    };

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      inputRef.current?.blur();
      Keyboard.dismiss();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player', error.message);
      } else {
        Alert.alert('New Player', 'An error occurred while adding the player');
        console.error('handleAddPlayer() error: ', error);
      }
    }
  };

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remove Player', error.message);
      } else {
        Alert.alert('Remove Player', 'An error occurred while removing the player');
        console.error('handleRemovePlayer() error: ', error);
      }
    }
  };

  async function handleRemoveGroup() {
    Alert.alert('Remove Team', 'Are you sure you want to remove this group?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: async () => removeGroup()
      }
    ]);
  };

  async function removeGroup() {
    try {
      await removeGroupByName(group);
      navigation.navigate('groups');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remove Group', error.message);
      } else {
        Alert.alert('Remove Group', 'An error occurred while removing the group');
        console.error('removeGroup() error: ', error);
      }
    }
  };

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);

      setPlayers(playersByTeam);

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Players', error.message);
      } else {
        Alert.alert('Players', 'An error occurred while fetching the players');
        console.error('fetchPlayersByTeam() error: ', error);
      }
    }
  };

  // LifeCycles
  useFocusEffect(useCallback(() => {
    fetchPlayersByTeam();
  }, [team]));

  // Renders
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add players and separate teams"
      />
      <Form>
        <Input
          inputRef={inputRef}
          placeholder='Player name'
          autoCorrect={false}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
          onChangeText={(text) => setNewPlayerName(text.trim())}
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
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
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
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
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
