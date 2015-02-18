// TODO:  Consider making a template aware express a part of the handlebars module and moving this (and the helper handling) there.
// Base gradeName for handlebars "helper" modules, which are expected to expose any helpers in their model.helpers array
var fluid = fluid || require('infusion');
var gpii  = fluid.registerNamespace("gpii");
fluid.registerNamespace("gpii.express.helper");

gpii.express.helper.getHelpers = function(that) {
    var functions = {};
    if (that.model.helpers && Object.keys(that.model.helpers).length > 0) {
        Object.keys(that.model.helpers).forEach(function(key){
            var functionName = that.model.helpers[key];
            if (that[functionName]) {
                functions[key] = that[key];
            }
            else {
                console.error("Cannot load helper '" + key + "'  because the associated function '" + functionName + "' doesn't exist.  Check your configuration.");
            }
        });
    }
    return functions;
};

fluid.defaults("gpii.express.helper", {
    gradeNames: ["fluid.eventedComponent", "fluid.modelRelayComponent", "autoInit"],
    config:  "{gpii.express}.config",
    model: {
        helpers: {}
    },
    invokers: {
        "getHelpers": {
            funcName: "gpii.express.helper.getHelpers",
            args:     ["{that}"]
        }
    }
});