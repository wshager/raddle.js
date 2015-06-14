/**
 * This module provides RQL parsing. For example:
 * var parsed = require("./parser").parse("b=3&le(c,5)");
 */
({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){

function contains(array, item){
	for(var i = 0, l = array.length; i < l; i++){
		if(array[i] === item){
			return true;
		}
	}
}

var operatorMap = {
	"=": "eq",
	"==": "eq",
	">": "gt",
	">=": "ge",
	"<": "lt",
	"<=": "le",
	"!=": "ne"
};

exports.primaryKeyName = 'id';
exports.lastSeen = ['sort', 'select', 'values', 'limit'];
exports.jsonQueryCompatible = true;
// allow slashes, process later
// TODO convert back to inline for performance
var chars = (/\+\*\$\-:\w%\._\/?#{}/).source;
exports.normalizeRegExp = new RegExp("(\(["+chars+",]+\)|["+chars+"]*|)([<>!]?=(?:[\w]*=)?|>|<)(\(["+chars+",]+\)|["+chars+"]*|)","g");
exports.leftoverRegExp = new RegExp((/(\))|([&\|,])?/).source+"([/"+chars+"/]*)"+(/(\(?)/).source,"g");

function parse(/*String|Object*/query, parameters){
	if (typeof query === "undefined" || query === null)
		query = '';
	var term = new exports.Query();
	var topTerm = term;
	topTerm.cache = {}; // room for lastSeen params
	var topTermName = topTerm.name;
	topTerm.name = '';
	if(typeof query === "object"){
		if(query instanceof exports.Query){
			return query;
		}
		for(var i in query){
			var term = new exports.Query();
			topTerm.args.push(term);
			term.name = "eq";
			term.args = [i, query[i]];
		}
		return topTerm;
	}
	if(query.charAt(0) == "?"){
		throw new URIError("Query must not start with ?");
	}
	query = query.replace(/\s/g,"");
	if(exports.jsonQueryCompatible){
		query = query.replace(/%3C=/g,"=le=").replace(/%3E=/g,"=ge=").replace(/%3C/g,"=lt=").replace(/%3E/g,"=gt=");
	}
	//if(query.indexOf("/") > -1){ // performance guard
		// convert slash delimited text to arrays
		//query = query.replace(/[\+\*\$\-:\w%\._]*\/[\+\*\$\-:\w%\._\/]*/g, function(slashed){
		//	return "(" + slashed.replace(/\//g, ",") + ")";
		//});
	//}
	// convert FIQL to normalized call syntax form
	query = query.replace(exports.normalizeRegExp,
						// <---------       property        -----------><------  operator -----><----------------   value ------------------>
			function(t, property, operator, value){
		if(operator.length < 3){
			if(!operatorMap[operator]){
				throw new URIError("Illegal operator " + operator);
			}
			operator = operatorMap[operator];
		}
		else{
			operator = operator.substring(1, operator.length - 1);
		}
		return operator + '(' + property + "," + value + ")";
	});
	if(query.charAt(0)=="?"){
		query = query.substring(1);
	}
	var leftoverCharacters = query.replace(exports.leftoverRegExp,
							//   <-closedParen->|<-delim-- propertyOrValue -----(> |
		function(t, closedParen, delim, propertyOrValue, openParen){
			if(delim){
				if(delim === "&"){
					setConjunction("and");
				}
				if(delim === "|"){
					setConjunction("or");
				}
			}
			if(openParen){
				var newTerm = new exports.Query();
				newTerm.name = propertyOrValue;
				newTerm.parent = term;
				call(newTerm);
			}
			else if(closedParen){
				var isArray = !term.name;
				term = term.parent;
				if(!term){
					throw new URIError("Closing parenthesis without an opening parenthesis");
				}
				if(isArray){
					term.args.push(term.args.pop().args);
				}
			}
			else if(propertyOrValue || delim === ','){
				//term.args.push(stringToValue(propertyOrValue, parameters));
				term.args.push(propertyOrValue);

				// cache the last seen sort(), select(), values() and limit()
				if (contains(exports.lastSeen, term.name)) {
					topTerm.cache[term.name] = term.args;
				}
				// cache the last seen id equality
				if (term.name === 'eq' && term.args[0] === exports.primaryKeyName) {
					var id = term.args[1];
					if (id && !(id instanceof RegExp)) id = id.toString();
					topTerm.cache[exports.primaryKeyName] = id;
				}
			}
			return "";
		});
	if(term.parent){
		throw new URIError("Opening parenthesis without a closing parenthesis");
	}
	if(leftoverCharacters){
		// any extra characters left over from the replace indicates invalid syntax
		throw new URIError("Illegal character in query string encountered " + leftoverCharacters);
	}

	function call(newTerm){
		term.args.push(newTerm);
		term = newTerm;
		// cache the last seen sort(), select(), values() and limit()
		if (contains(exports.lastSeen, term.name)) {
			topTerm.cache[term.name] = term.args;
		}
	}
	function setConjunction(operator){
		if(!term.name){
			term.name = operator;
		}
		else if(term.name !== operator){
			throw new Error("Can not mix conjunctions within a group, use parenthesis around each set of same conjuctions (& and |)");
		}
	}
	function removeParentProperty(obj) {
		if(obj && obj.args){
			delete obj.parent;
			var args = obj.args;
			for(var i = 0, l = args.length; i < l; i++){
				removeParentProperty(args[i]);
			}
		}
		return obj;
	};
	if(!topTerm.name && topTerm.args.length==1){
		topTerm = topTerm.args[0];
	}
	removeParentProperty(topTerm);
	if (!topTerm.name) {
		topTerm.name = topTermName;
	}
	return topTerm;
};

exports.parse = exports.parseQuery = parse;

/* dumps undesirable exceptions to Query().error */
exports.parseGently = function(){
	var terms;
	try {
		terms = parse.apply(this, arguments);
	} catch(err) {
		terms = new exports.Query();
		terms.error = err.message;
	}
	return terms;
}

function Query(){
	this.name = "";
	this.args = [];
};
// this can get replaced by the chainable query if query.js is loaded
exports.Query = Query;

exports.Query.prototype.toJSON = function(){
	delete this.parent;
	delete this.cache;
	return this;
};
return exports;
});
