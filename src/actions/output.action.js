import * as act from '../actions/action';
import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../cores/helpers/utils.helper.js';

export const getOutputOfMonth = (email, year, month) => {
  return dispatch => {
    firestore()
      .collection('outgoings')
      .where('email', '==', email)
      .where('year', '==', year)
      .where('month', '==', month)
      .orderBy('from', 'desc')
      .orderBy('to', 'desc')
      .orderBy('createdDate', 'asc')
      .get()
      .then(querySnapShot => {
        let result = [];
        let amount = 0;

        querySnapShot.forEach(docSnapshot => {
          const data = docSnapshot.data();
          amount += data.amount;

          result.push({
            ref: docSnapshot.ref.path,
            from: data.from,
            to: data.to,
            category: data.category,
            note: data.note,
            amount: data.amount,
          });
        });

        const data = groupBy(result, item => {
          return [item.from, item.to];
        });

        dispatch({
          type: act.AddMonthOutput,
          key: year + month.toString().padStart(2, 0),
          data: data,
          amount: amount,
        });
      });
  };
};
