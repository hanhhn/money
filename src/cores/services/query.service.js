import firestore from '@react-native-firebase/firestore';
import {initializeFirebase} from './firebase.service';

// export const query = async () => {
//   const querySnapshot = await firestore()
//     .collection('incomings')
//     .doc('hngochanh@outlook.com')
//     .collection('2020')
//     .doc('1')
//     .collection('items')
//     .get();
//   querySnapshot.forEach(snapshot => {
//     console.log(snapshot.data());
//     snapshot.ref
//       .collection('items')
//       .get()
//       .then(subQuery => {
//         subQuery.forEach(subSnapshot => {
//           console.log(subSnapshot.data());
//         });
//       });
//   });
//   const documentSnapshot = await firestore()
//     .collection('incomings')
//     .doc('hngochanh@outlook.com')
//     .collection('2020')
//     .doc('1')
//     .collection('items')
//     .add({
//       time: {
//         from: 2,
//         to: 5,
//       },
//       catogory: 'food',
//       note: 'Ăn sáng',
//       amount: '15000',
//     });
//   Create a reference to the doc.
//   const docRef = firestore()
//     .collection('incomings')
//     .doc('hngochanh@outlook.com');
//   firestore()
//     .runTransaction(async transaction => {
//       const snapshot = await transaction.get(docRef);
//       const data = snapshot.data();
//       return transaction.set(docRef, {
//         ...data,
//         age: 30, // new field
//       });
//     })
//     .then(function() {
//       console.log('Transaction successfully committed!');
//     })
//     .catch(function(error) {
//       console.log('Transaction failed: ', error);
//     });
// };

export const queryOutgoingItems = async (email, year, month) => {
  const query = await firestore()
    .collection('outgoings')
    .doc(email)
    .collection(year)
    .doc(month)
    .collection('items')
    .get();

  let result = [];
  await Promise.all(
    query.docs.map(async docSnapshot => {
      const obj = {
        ref: docSnapshot.ref.path,
        ...docSnapshot.data(),
        items: [],
      };

      const subQuery = await docSnapshot.ref.collection('items').get();
      subQuery.forEach(subDocSnapshot => {
        obj.items.push({
          ref: subDocSnapshot.ref.path,
          ...subDocSnapshot.data(),
        });
      });

      result.push(obj);
    }),
  );
  return result;
};

export const queryIncomingItems = (email, year, month) => {
  const collection = firestore()
    .collection('incomings')
    .doc(email)
    .collection(year)
    .doc(month)
    .collection('items')
    .get();

  return collection.then(query => {
    let result = [];
    query.forEach(async docSnapshot => {
      const obj = {
        ...docSnapshot.data(),
        items: [],
      };

      const subQuery = await docSnapshot.ref.collection('items').get();
      subQuery.forEach(subDocSnapshot => {
        obj.items.push(subDocSnapshot.data());
      });

      result.push(obj);
    });
    return result;
  });
};
