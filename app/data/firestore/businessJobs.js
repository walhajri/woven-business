import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

let db = firestore();
async function getPositions() {
  var finalList = [];
  await db
    .collection('positions').where("businessID", "==", auth().currentUser.uid)
    .get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        let data = doc.data();
        finalList.push(data);
    });
    });
  return finalList;
}
export default getPositions;
