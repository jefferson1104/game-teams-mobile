import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { getAllGroups } from './getAllGroups';

export async function removeGroupByName(group: string) {
  try {
    const storageGroups = await getAllGroups();

    const groups = storageGroups.filter((item) => item !== group);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
  } catch (error) {
    throw error;
  }
};
