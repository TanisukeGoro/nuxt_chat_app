import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyC4m3Fr9YY-2Aq1iYfn6aZRZbbGN4BYP74',
        authDomain: 'fir-hackathon-7dae3.firebaseapp.com',
        databaseURL: 'https://fir-hackathon-7dae3.firebaseio.com',
        projectId: 'fir-hackathon-7dae3',
        storageBucket: 'fir-hackathon-7dae3.appspot.com',
        messagingSenderId: '817532288951',
        appId: '1:817532288951:web:b4ed2814c54e0d3373f232'
    })
}

export default firebase
