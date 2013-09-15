define(['handlebars'], function(Handlebars){
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<!DOCTYPE html>\n<!--[if lt IE 7]>  <html lang=\"en-us\" class=\"ie ie6 lte9 lte8 lte7\"> <![endif]-->\n<!--[if IE 7]>     <html lang=\"en-us\" class=\"ie ie7 lte9 lte8 lte7\"> <![endif]-->\n<!--[if IE 8]>     <html lang=\"en-us\" class=\"ie ie8 lte9 lte8\"> <![endif]-->\n<!--[if IE 9]>     <html lang=\"en-us\" class=\"ie ie9 lte9\"> <![endif]-->\n<!--[if gt IE 9]   <html lang=\"en-us\"> <![endif]-->\n<!--[if !IE]><!-->\n<html lang=\"en-us\">\n<!--<![endif]-->\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"robots\" content=\"noindex\" />\n    <title>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t']),stack1 ? stack1.call(depth0, "Airfair", options) : helperMissing.call(depth0, "t", "Airfair", options)))
    + "</title>\n    <link rel=\"stylesheet\" href=\"/css/main.css\" media=\"screen\" />\n    <link rel=\"shortcut icon\" href=\"/favicon.ico\" />\n  </head>\n  <body>\n    <div id=\"App\">\n      ";
  if (stack2 = helpers.__body) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.__body; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <script data-main=\"/js/main.js\"></script>\n\n  </body>\n</html>\n";
  return buffer;
  })
Handlebars.registerPartial('layout', template)
return template
});
