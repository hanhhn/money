import * as act from '../actions/action';
import firestore from '@react-native-firebase/firestore';
import {groupBy} from '../cores/helpers/utils.helper.js';

export const getInputOfYear = (email, year) => {
  return dispatch => {
    firestore()
      .collection('incomings')
      .doc(email)
      .collection('items')
      .where('year', '==', year)
      .orderBy('month', 'desc')
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

        result = result.map(value => {
          return {
            ...value,
            from: value.month,
            to: value.month,
          };
        });

        const data = groupBy(result, item => {
          return [item.month];
        });

        dispatch({
          type: act.AddYearInput,
          key: year,
          data: data,
        });
      });
  };
};
