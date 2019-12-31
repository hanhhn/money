import firestore from '@react-native-firebase/firestore';
import * as act from '../actions/action';

export const getOutgoingMonth = email => {
  return dispatch => {
    firestore()
      .collection('outgoings')
      .where('email', '==', email)
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .get()
      .then(querySnapShot => {
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

        dispatch({
          type: act.OutgoingTab,
          outgoing: accumulator,
        });
      });
  };
};

export const getIncomingMonth = email => {
  return dispatch => {
    firestore()
      .collection('incomings')
      .where('email', '==', email)
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .get()
      .then(querySnapShot => {
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

        dispatch({
          type: act.IncomingTab,
          outgoing: accumulator,
        });
      });
  };
};
