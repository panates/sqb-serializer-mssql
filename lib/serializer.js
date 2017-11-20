/* sqb-serializer-mssql
 ------------------------
 (c) 2017-present Panates
 SQB may be freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/sqb-serializer-mssql/
 */
/**
 * Module variables.
 * @private
 */
const reservedWords = ['comment'];

/**
 * Expose `MsSerializer`.
 */
module.exports = MsSerializer;

/**
 *
 * @constructor
 */
function MsSerializer() {
  this.paramType = 3;
}

const proto = MsSerializer.prototype = {};
proto.constructor = MsSerializer;

proto.isReserved = function(s) {
  return reservedWords.indexOf(String(s).toLowerCase()) >= 0;
};

proto.serializeSelect = function(instance, obj, inf) {
  var out = instance.serializeSelect(obj, inf);
  const limit = instance.query._limit || 0;
  const offset = Math.max((obj._offset || 0), 0);
  if (offset)
    out += '\nOFFSET ' + offset + ' ROWS';
  if (limit)
    out += (!offset ? '\n' : ' ') + 'FETCH NEXT ' + limit + ' ROWS ONLY';
  return out;
};

