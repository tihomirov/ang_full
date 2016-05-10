/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import users from './api/users';
import companies from './api/companies';

export default function(app) {

  // Insert routes below
  // All undefined asset or api routes should return a 404


  app.use('/api/users', users);
  app.use('/api/companies', companies);

  // All other routes should redirect to the index.html
  //app.route('/*')
  //  .get((req, res) => {
  //    console.log(req.url)
  //    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  //  });

  app.route('/*')
   .get(errors[404]);

}
