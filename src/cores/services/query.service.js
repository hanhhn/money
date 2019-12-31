import firestore from '@react-native-firebase/firestore';

export const addOutgoingItem = async request => {
  const query = firestore()
    .collection('outgoings')
    .where('email', '==', request.email)
    .where('year', '==', request.year)
    .where('month', '==', request.month)
    .where('from', '==', request.from)
    .where('to', '==', request.to)
    .limit(1);

  const querySnapShot = await query.get();

  if (!querySnapShot.empty) {
    querySnapShot.docs[0].ref
      .collection('items')
      .doc()
      .set({
        note: request.note,
        category: request.category,
        amount: request.amount,
      });
  } else {
    firestore()
      .collection('outgoings')
      .doc()
      .set({
        email: request.email,
        year: request.year,
        month: request.month,
        from: request.from,
        to: request.to,
      })
      .then(async () => {
        query.get().then(snapShot => {
          snapShot.docs[0].ref
            .collection('items')
            .doc()
            .set({
              note: request.note,
              category: request.category,
              amount: request.amount,
            });
        });
      });
  }
};

export const queryOutgoingItems = async (email, year, month) => {
  const query = await firestore()
    .collection('outgoings')
    .where('email', '==', email)
    .where('year', '==', year)
    .where('month', '==', month)
    .orderBy('from', 'asc')
    .limit(31)
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

export const getFullMonth = async email => {
  const querySnapShot = await firestore()
    .collection('outgoings')
    .where('email', '==', email)
    .orderBy('year', 'desc')
    .orderBy('month', 'desc')
    .get();

  const result = [];
  querySnapShot.forEach(docSnapshot => {
    const data = docSnapshot.data();
    result.push(data.year + '/' + data.month);
  });

  const accumulator = [];
  result.forEach(value => {
    if (!accumulator.includes(value)) {
      accumulator.push(value);
    }
  });
  return accumulator;
};
