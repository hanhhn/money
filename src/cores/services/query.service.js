import firestore from '@react-native-firebase/firestore';

export const addOutgoingItem = async request => {
  const collection = firestore()
    .collection('outgoings')
    .doc(request.email)
    .collection(request.year)
    .doc(request.month)
    .collection('items');

  const isExists = await collection
    .where('from', '==', request.from)
    .where('to', '==', request.to)
    .get();

  if (!isExists.empty) {
    collection
      .doc()
      .set({from: request.from, to: request.to})
      .then(() => {});
  } else {
    const item = await collection
      .where('from', '==', request.from)
      .where('to', '==', request.to)
      .get();

    item.forEach(documentSnap => {
      documentSnap.ref
        .collection('items')
        .doc()
        .set({
          note: request.note,
          category: request.category,
          amount: request.amount,
        });
    });
  }
};

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
