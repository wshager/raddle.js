({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function byId(id){
		return (typeof id == "string") ? document.getElementById(id) : id;
	}
	
	function place(node, position, refNode){
		refNode = byId(refNode);
		var parent;
        if (position === "after" || position === "before" || position === "replace") {
            parent = refNode.parentNode;
            if (!parent) {
                throw new ReferenceError('dom.place: Reference node must have a parent to determine placement');
            }
        }
		switch(position){
			case "before":
				parent.insertBefore(node, refNode);
				break;
			case "after":
				if(parent.lastChild === refNode) {
	                parent.appendChild(node);
	            }
	            else {
	                parent.insertBefore(node, refNode.nextSibling);
	            }
				break;
			case "replace":
				parent.replaceChild(node, refNode);
				break;
			case "first":
				refNode.insertBefore(node, refNode.firstChild);
				break;
				// else fallthrough...
			default: // aka: last
				refNode.appendChild(node);
		}
		return node; // DomNode
	};

	function element(/*string*/ tag, /*Object*/ kwArgs){
		var doc = document;
		var element = doc.createElement(tag);
        for (var property in kwArgs) {
        	var value = kwArgs[property];
            if (property === 'attributes') {
                for (var attribute in value) {
                    element.setAttribute(attribute, kwArgs.attributes[attribute]);
                }
            } else if(typeof value == "object" && value.constructor.name.toString() == "Attr"){
            	element.setAttributeNode(value);
            } else {
                element[property] = kwArgs[property];
            }
        }
		return element; // DomNode
	};
	
	// See http://stackoverflow.com/questions/7677930
	// it says createAttribute is deprecated, but could't find elsewhere
	// I'll keep this for compatibility with xquery 
	function attribute(/*string*/ name, /*Object*/ value){
		var doc = document;
		var attr = doc.createAttribute(name);
		attr.value = value;
		return attr; // DomNode
	};


	function empty(/*DOMNode*/ node){
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	};

	function remove(/*DOMNode*/ node){
		if(node && node.parentNode) node.parentNode.removeChild(node);
	};
	
	function setAttr(/*DOMNode*/ node, /*String*/ name, /*String*/ value){
		node.setAttribute(name, value);
		return node; // DomNode
	}
	
	function setAttrs(/*DOMNode*/ node, /*Object*/ map){
		// the object form of setter: the 2nd argument is a dictionary
		for(var x in map){
			setAttr(node, x, map[x]);
		}
		return node; // DomNode
	}
	
	
	exports["element#2"] = create;
	exports["attribute#2"] = attribute;
	exports["place#2"] = place;
	exports["by-id#1"] = byId;
	exports["empty#1"] = empty;
	exports["remove#1"] = remove;
	exports["set-attribute#3"] = setAttr;
	exports["set-attributes#2"] = setAttrs;
	
	
	
	return exports;
	
});
