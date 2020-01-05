import * as act from '../actions/action';
import {getSumMonthOutput} from '../actions/header.action';
import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../cores/helpers/utils.helper.js';

export const getOutputOfMonth = (email, year, month) => {
  return dispatch => {
    firestore()
      .collection('outgoings')
      .doc(email)
      .collection('items')
      .where('year', '==', year)
      .where('month', '==', month)
      .orderBy('from', 'desc')
      .orderBy('to', 'asc')
      .orderBy('createdDate', 'asc')
      .get()
      .then(querySnapShot => {
        let result = [];
        querySnapShot.forEach(docSnapshot => {
          result.push({
            ref: docSnapshot.ref.path,
            ...docSnapshot.data(),
          });
        });

        const data = groupBy(result, item => {
          return [item.from, item.to];
        });

        // update header
        dispatch(getSumMonthOutput(data));

        dispatch({
          type: act.AddMonthOutput,
          key: year + month.toString().padStart(2, 0),
          data: data,
        });
      });
  };
};
