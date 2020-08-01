import * as firebase from "firebase";
import { firebaseWebSerivceKey } from "../../secrets";

export const config = firebaseWebSerivceKey;

let apps = firebase.apps;
if (!apps.length) {
  apps = firebase.initializeApp(config);
}

export const database = apps.database();
export const storage = apps.storage();
export const auth = apps.auth();
export const SECRET_KEY = "ce8c91487114e8d8aed668e21110bea8";
