import firebase from 'firebase';
import { app } from '../public/js/ClassSearch.d';

// @Todo add settings to config file
firebase.initializeApp({
  apiKey: app.settings.firebase.apiKey,
  authDomain: app.settings.firebase.authDomain,
  databaseURL: app.settings.firebase.databaseURL,
  projectId: app.settings.firebase.projectId,
  storageBucket: app.settings.firebase.storageBucket,
  messagingSenderId: app.settings.firebase.messagingSenderId,
  appId: app.settings.firebase.appId,
  measurementId: app.settings.firebase.measurementId 
});

const db = firebase.firestore();
export async function getClassesFromDataStore(term: string): Promise<any> {
  const classes: any[] = [];
  const termsRef = db.collection(term);
  const snapshot = await termsRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    classes.push(doc.data())
  });
  return classes;
}

export function addClassesToDataStore(term: string, classes: any[]): void {
  classes.forEach((_class: any) => {
    db.collection(term).doc(`${_class.class_NBR.toString()}-${_class.crse_ID}`).set(_class)
      .then((_docRef) => {
        console.log(`Document ${_class.class_NBR.toString()}: ${_class.subject}-${_class.catalog_NBR} written successfully`);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
}