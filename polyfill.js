(function(global){
	var grafar = global.grafar;
	
	
	var isExisty = function(obj) {
		return !_.isUndefined(obj) && !_.isNull(obj);
	};
		
	var parseArray = function(obj) {
		if (_.isString(obj))
			return obj.split(/\s*,\s*/g);
		else if (Array.isArray(obj))
			return obj.filter(_.isString);
		else 
			return [];
	}
	
    var add = function(arr, item) {
        if (arr.indexOf(item) === -1)
			arr.push(item);
        return arr;
    };
    
    var remove = function(arr, item) {
        var index = arr.indexOf(item);
		if (index !== -1)
			arr.splice(index, 1);
        return arr
    };
	
    var arrRepeat = function(source, target) {
    };
    
    var arrStretch = function(source, target) {
    };
    
    var wrapFn = function(fn) {
        var nargfn = nListMap(fn.length);
        var boundfn = function(src, target, len) {
            nargfn(fn, src, target, len);
        };
        return boundfn;
    };
        
    var uniformFn = function(val) {
        return function(src, target, len) {
            for (var i = 0; i < len; i++)
                target[i] = val;
        };
    };
        
    var nListMap = function(nargs) {
        if (!grafar.isExisty(nListMap.memo[nargs])) {
            var application = '';
            for (var i = 0; i < nargs; i++) {
                application += 'src[' + i + '][i]';
                if (i !== nargs - 1)
                    application += ', ';
            }
            nListMap.memo[nargs] = new Function('fn', 'src', 'target', 'len', 
                'for (var i = 0; i < len; i++)\n' + 
                '  target[i] = fn(' + application + ');');            
        }
        return nListMap.memo[nargs];
    };
        
    nListMap.memo = [];
    
    
	grafar.isExisty = isExisty;
	grafar.parseArray = parseArray;
	grafar.add = add;
	grafar.remove = remove;
    grafar.wrapFn = wrapFn;
    grafar.uniformFn = uniformFn;
    //grafar.inlineWrap = inlineWrap;
    grafar.nListMap = nListMap;
}(this));