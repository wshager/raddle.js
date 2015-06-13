({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	
	function byId(id){
		return (typeof id == "string") ? document.byId(node) : id;
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

	function create(/*DOMNode*/ tag, /*Object*/ kwArgs){
		var doc = document;
		var element = doc.createElement(tag);
		if(attrs){
            for (var property in kwArgs) {
                if (property === 'attributes') {
                    for (var attribute in kwArgs.attributes) {
                        element.setAttribute(attribute, kwArgs.attributes[attribute]);
                    }
                } else {
                    element[property] = kwArgs[property];
                }
            }
		}
		return element; // DomNode
	};

	exports.empty = function empty(/*DOMNode*/ node){
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	};

	exports.destroy = function destroy(/*DOMNode*/ node){
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
	
	exports["set-attribute#2"] = setAttr;
	exports["set-attributes#1"] = setAttrs;
	exports["by-id#1"] = byId;
	exports["empty#0"] = empty;
	exports["destroy#0"] = destroy;
	exports["place#2"] = place;
	exports["create#1"] = create;
	
	return exports;
	
});
