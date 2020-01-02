import firestore from '@react-native-firebase/firestore';
import * as act from '../actions/action';

export const getOutgoingMonth = email => {
  return dispatch => {
    firestore()
      .collection('outgoings')
      .doc(email)
      .get()
      .then(docSnapShot => {
        const data = docSnapShot.data();
        const tabs = data.months.map(v => {
          const o = v.split('/');
          return {
            id: v.replace('/', ''),
            year: o[0],
            month: o[1],
            title: v,
          };
        });

        dispatch({
          type: act.OutgoingTab,
          outgoing: tabs,
        });
      });
  };
};
