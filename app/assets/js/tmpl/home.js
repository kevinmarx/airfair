define(['handlebars'], function(Handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<article id=\"home\" class=\"row\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "Hello World.", options) : helperMissing.call(depth0, "t", "Hello World.", options)))
    + "</article>\n";
  return buffer;
  })
Handlebars.registerPartial('home', template)
return template
});
