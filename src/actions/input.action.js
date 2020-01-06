import * as act from '../actions/action';
import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../cores/helpers/utils.helper.js';

export const getInputOfYear = (email, year) => {
  return dispatch => {
    firestore()
      .collection('incomings')
      .where('email', '==', email)
      .where('year', '==', year)
      .orderBy('month', 'desc')
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
            month: data.month,
            from: data.month,
            to: data.month,
            category: data.category,
            note: data.note,
            amount: data.amount,
          });
        });

        const data = groupBy(result, item => {
          return [item.month];
        });

        dispatch({
          type: act.AddYearInput,
          key: year,
          data: data,
          amount: amount,
        });
      });
  };
};
