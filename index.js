// Set paths here
const PARTIAL_PATH = `${__dirname}/src/partials`;
const TEMPLATE_PATH = `${__dirname}/src/templates`;

var paths = {
    templates: TEMPLATE_PATH,
    config: `${__dirname}/config`
};
// Standard deps
var packer = require('@lnmx/flat-pack');
    getManifest = packer.manifestGetter(paths),
    getStatus = packer.statusGetter(paths),
    getHeaders = packer.headersGetter(paths);


var manifest = exports.manifest = function(req) {
    return getManifest(req);
};

var headers = exports.headers = function(req) {
    return getHeaders(req);
};

exports.getStatus = function(req) {
    return getStatus(req);
}
/* EDIT HERE */

// Site specific deps for rendering
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer()
});


var env = nunjucks.configure([PARTIAL_PATH]);
markdown.register(env, marked);
nunjucks.precompile(PARTIAL_PATH, {env: env});

// Filters
env.addFilter("pp", function(val) {
    return JSON.stringify(val, null, 4);
}, false);

env.addFilter("b64", function(val) {
    return new Buffer(val).toString('base64');
}, false);

env.addGlobal('arrayContains', function(item, array) {
    return item !== undefined && array.indexOf(item.toString()) > -1;
});

env.addGlobal('shuffle', function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

});



var render = exports.render = function(partial) {
    if (partial.catch404 && partial.gmResponse.result !== 200) {
        if (partial.catch404 === "body") {
            return env.renderString('{%include "_404.html"%}', {});
        } else {
            return env.renderString(partial.template, {item: { metaTitle: "Page Not Found" }, config: partial.config});
        }
    } else {
        var context = {
            context: {},
            config: partial.config
        }

        if (partial.hasOwnProperty('gmResponse')) {
            context.item = partial.gmResponse.item;
        }
        return env.renderString(partial.template, context);
    }

};
