import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../helpers/utils.helper.js';

export const addOutgoingItem = async request => {
  const fullMonth = request.year + request.month.toString().padStart(2, 0);
  firestore()
    .collection('outgoings')
    .doc(request.email)
    .collection(fullMonth)
    .doc()
    .set({
      year: request.year,
      month: request.month,
      from: request.from,
      to: request.to,
      note: request.note,
      category: request.category,
      amount: request.amount,
    });

  const emailRef = firestore()
    .collection('outgoings')
    .doc(request.email);

  emailRef.get().then(docSnapShot => {
    let data = docSnapShot.data();
    if (data.months && data.months.length > 0) {
      const f = request.year + '/' + request.month;
      if (!data.months.includes(f)) {
        data.months.push(f);
        emailRef.update(data);
      }
    } else {
      data = {
        months: [request.year + '/' + request.month],
      };
      emailRef.add(data);
    }
  });
};

export const queryOutgoingItems = async (email, year, month) => {
  const fullMonth = year + month.toString().padStart(2, 0);
  const querySnapShot = await firestore()
    .collection('outgoings')
    .doc(email)
    .collection(fullMonth)
    .orderBy('from', 'asc')
    .get();

  let result = [];
  querySnapShot.forEach(docSnapshot => {
    result.push({
      ref: docSnapshot.ref.path,
      ...docSnapshot.data(),
    });
  });

  return groupBy(result, item => {
    return [item.from, item.to];
  });
};
