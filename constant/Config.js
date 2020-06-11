import * as firebase from 'firebase';

const config = {
    
        apiKey: "AIzaSyDpGmkF8NyQMyqyjnX8r4GzI0c7alLZVSg",
        authDomain: "foresee-8add2.firebaseapp.com",
        databaseURL: "https://foresee-8add2.firebaseio.com",
        projectId: "foresee-8add2",
        storageBucket: "foresee-8add2.appspot.com",
        messagingSenderId: "941818811626",
        appId: "1:941818811626:web:af380da09451de8151b393",
        measurementId: "G-XZV2QXM3KH"
      
}

let apps = firebase.apps
if (!apps.length){
    apps = firebase.initializeApp(config);
}

export const database = apps.database();
export const storage = apps.storage();
export const auth = apps.auth();