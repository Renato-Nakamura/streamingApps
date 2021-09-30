// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA6hdCbYl06yhaoBYoro4ov607UeY2Q_gI',
    authDomain: 'streamingapp-b3b02.firebaseapp.com',
    projectId: 'streamingapp-b3b02',
    storageBucket: 'streamingapp-b3b02.appspot.com',
    messagingSenderId: '350467947975',
    appId: '1:350467947975:web:265f064dc88d61f4ad6de2',
    measurementId: 'G-82JV6Z435H',
  },
  user: {
    id: '',
    name: '',
    email: '',
    photo: '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
