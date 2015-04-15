(function(global) {
	var grafar = global.grafar;
	var isExisty = grafar.isExisty;
    var add = grafar.add;
    var remove = grafar.remove;
	
	
	function GraphData() {
		this.adjacencyList = {};
	}
	
	GraphData.prototype.addEdge = function(from, to) {
		this.addNode(from);
		this.addNode(to);
		add(this.adjacencyList[from], to);
		return this;
	};
	
	GraphData.prototype.removeEdge = function(from, to) {
		remove(this.adjacencyList[from], to);
		return this;
	};
	
	GraphData.prototype.addNode = function(name) {
		if (!this.adjacencyList[name]) {
			this.adjacencyList[name] = [];
		}
		return this;
	};
	
	GraphData.prototype.removeNode = function(name) {
		if (this.adjacencyList[name]) {
			this.adjacencyList[name] = null;
			for (var from in this.adjacencyList)
				if (this.adjacencyList[from])
					this.removeEdge(from, name);
		}
		return this;
	};
	
    
    function GraphMixin() {
        this.parents = [];
        this.children = [];
    };
        
	
	grafar.GraphData = GraphData;
}(this));