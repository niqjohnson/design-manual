'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var componentsDir = path.join( __dirname, '..', '..', '..', 'components' );
var components = [ 'cf-buttons',
  'cf-core',
  'cf-expandables',
  'cf-forms',
  'cf-grid',
  'cf-icons',
  'cf-layout',
  'cf-pagination',
  'cf-tables',
  'cf-typography' ];
var exec = require( 'child-process-promise' ).exec;

function npmUnlink( component ) {
  exec( 'npm unlink ' + component + ' && npm install ' + component,
    function( err, out ) {
      if ( err instanceof Error ) {
        throw err;
      }

      process.stdout.write( out );
    } );
}

for ( var i = 0, l = components.length; i < l; i++ ) {
  npmUnlink( components[i] );
}
