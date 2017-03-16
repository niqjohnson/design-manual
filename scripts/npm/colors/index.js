'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var parseCSV = require( 'csv' ).parse;
var transformCSV = require( 'csv' ).transform;
var root = path.join( __dirname, '..', '..', '..' );
var templateSource = path.join( root, 'scripts', 'npm', 'colors', 'template.txt' );
var colorsSource = path.join( root, '_data', 'cfpb-brand-colors.csv' );
var colorsLess = path.join( root, '_data', 'colors.less' );
var family;
var block;

var transformer = transformCSV( function( record, callback ) {
    setTimeout( function() {
      if ( record[0] === 'family' ) {
        return;
      }

      if ( family !== record[0] ) {
        family = record[0];
        block = '\n\n// ' + family[0].toUpperCase() + family.substring(1) + ' family\n\n';
      } else {
        block = '';
      }

      callback( null, block + '@' + record[1] + ': ' + record[3] + ';\n' );
    }, 500 );
  }, { parallel: 100 } );

fs.createReadStream( colorsSource )
  .pipe( parseCSV() )
  .pipe( transformer )
  .pipe( fs.createWriteStream( colorsLess ) );
