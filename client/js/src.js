/*! jschallenge by eireksten */
var challenge=challenge||{};Zepto(function(){"use strict";var a=challenge.problem.create({title:"Addition",description:"Add two numbers",func:"addThem",parameters:["x","y"]}),b=challenge.problemview.create(a),c=$("#challenge");c.append(b.$el)});var runSolution=function(event){"use strict";var solfunc=eval(event.data.solution);try{self.postMessage({output:solfunc()})}finally{self.close()}};self.addEventListener("message",runSolution);var challenge=challenge||{};challenge.problem=function(){"use strict";var a={getSolutionStart:function(){return"function "+this.getFunctionName()+"("+this.getParameterlist().join(", ")+") {"},getSolutionEnd:function(){return"}"},testCount:function(){return this.tests().length},addTest:function(a){this.tests().push(a)},getTest:function(a){return this.tests()[a]},removeTest:function(a){this.tests(_.without(this.tests(),a))}},b=function(b){b=_.assign({title:"Mysterious Problem",description:"No description!",func:"solve",parameters:[]},b);var c=Object.create(a),d=[];return _.assign(c,{getTitle:function(){return b.title},getDescription:function(){return b.description},getFunctionName:function(){return b.func},getParameterlist:function(){return b.parameters.slice(0)},tests:function(a){return a&&(d=a),d}})};return{create:b}}();var challenge=challenge||{};challenge.problemview=function(){"use strict";var a={init:function(a){this.model=a},render:function(){this.$el.empty().html(challenge.templates.problem({title:this.model.getTitle(),description:this.model.getDescription()}))}},b=function(b){var c=Object.create(a);return c.$el=$('<div class="problemview">'),c.el=c.$el.get(0),c.init(b),c.render(),c};return{create:b}}();var challenge=challenge||{};challenge.solutionrunner=function(){"use strict";function a(a){var b=window.URL||window.webkitURL,c=new Blob([a]),d=new Worker(b.createObjectURL(c));return d}var b={getProblem:function(){return this.prob},setSolution:function(a){this.sol=a},createSolutionString:function(a){return a=a||this.sol,"(function ("+this.prob.getParameterlist().join(", ")+") {"+a+"})"},run:function(b){var c=a('self.addEventListener("message",function(event){try{self.postMessage({output:eval(event.data.solution)()});}finally{self.close()}})'),d=setTimeout(function(){c.terminate(c),b("The solution timed out.")},1e3);c.addEventListener("message",this.handleWorkerResult.bind(this,b,d)),c.addEventListener("error",this.handleWorkerError.bind(this,b,d)),c.postMessage({solution:this.createSolutionString()})},handleWorkerResult:function(a,b,c){var d=c.data.output;a(null,d),clearTimeout(b)},handleWorkerError:function(a,b,c){c.preventDefault(),a(c.message),clearTimeout(b)}},c=function(a){var c=Object.create(b);return c.prob=a,c};return{create:c}}();
//# sourceMappingURL=src.map