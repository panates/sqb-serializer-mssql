/* sqb-serializer-mssql
 ------------------------
 (c) 2017-present Panates
 SQB may be freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/sqb-serializer-mssql/
 */

/* Internal module dependencies. */
const MsSerializer = require('./serializer');

module.exports = {
  createSerializer: function(config) {
    if (config.dialect === 'mssql' || config.dialect === 'azure') {
      return new MsSerializer(config);
    }
  }
};
