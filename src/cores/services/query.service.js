import firestore from '@react-native-firebase/firestore';
import {initializeFirebase} from './firebase.service';

export const query = async () => {
  const documentSnapshot = await firestore()
    .collection('incoming')
    .doc('hngochanh@outlook.com')
    .get();

  console.log(documentSnapshot.data());
};
