SVÄRTAN
-------


![enter image description here](https://s-media-cache-ak0.pinimg.com/736x/3d/ab/84/3dab840c36ba07ff1a47a37336003def.jpg)

A simple solution to a troubling problem... or something like that.

This is a sample template package to be used by COFFEEREQUEST. Lets take you through some of the things to keep in mind:

 - index.js: Main file to handle runtime functions. While most functions remain untouched (they are just a flat-pack wrapper) the render function must be customized to the project. See example below.

    var nunjucks = require('nunjucks'); // require renderer
    nunjucks.configure([__dirname+'/partials']); // this must be set using __dirname to recognize partials

    var render = function(partial) {
        var context = {
            item: partial.gmResponse.item,
            config: partial.config
        }
        return nunjucks.renderString(partial.template, context); // use appropriate render function and format
    };

 - /src/_templates: This is the location for all templates to be referenced in the sitemap.
 - /src/partials: This can be called anything you want or even be spread over multiple folders (depending on the renderer)
 - /config: Contains YAML files that build the sites. Configs prefixed with `_` are always included and considered global. Site specific configs (containing the sitemap et al) should be named as subdomain.domain.tld i.e. www.trustmargo.com

 Template Structure
 -

 Templates are created as standard html files (assuming nunjucks rendering) and designed to slice up the whole file into sections based on the GM calls needed to render the page. "Sections" are denoted by the following yaml format and should contain all info needed to make the proper GM call...

 Standard section setup

    <<--
    dynamic: true|false // is this section going to be split tested?
    gmRequest:
      type: forge|entity|entitytype // see below for explanations
      blueprint: nameofentitytype // the entity type to be used for this section
      name: someentityname // only needed when calling a specific entity
      source:
        persistsplit: true|false // do we want the split decision to be retained or rerun the forge each time
        anyotherinfoyouwant: stuffandthings // any other info to be forged upon
      tags: // optional
        - an
        - array
        - of
        - tags
      order: // optional... used for entitytyperequests
        field: name|created_on|updated_on // the field to be ordered on
        direction: ASC|DESC // the sort order
    -->

"Raw" section setup... this is for a static section that does not require a GM call

    <<--
    type: raw
    -->>

Notes:
- For the type value here is what each value means
    - forge: This is a decision based entity
    - entity: A specific entity referenced by the nice name
    - entitytype: A collection of entities of a given entitytype filtered by tags
- The following replacement params are available for these configs and can be used anywhere in the yaml
    - <domain> is the current domain.tld i.e. `trustmargo.com`
    - <subdomain> is the current subdomain i.e. `www`
    - <pathEnd> is the last part of the url path i.e. `/solar/articles/derp` would be `derp`
    - <pathStartr> is the root of the current path i.e. `/solar/articles/derp` would be `solar`
    - <query:key> is for accessing query params i.e. `/solar?key=value` would be `value`
    - <config:key> references the config object for a given site... currently 1 level deep
- When calling data in the renderable parts of the template/partials the scope available is broken into 2 sections
    - `item` contains all of the information returned from GM
    - `config` contains all of the info from the merged configs in the template package

# Continuous Integration
Add [ci version] to your commit message to publish package on npm

# Functions and Filters

`pp` - This **filter** pretty prints json blobs to dump out vars in nunjucks. (code and pre tags are hidden by default)

Usage:

    <code><pre>{{ item | pp }}</pre></code>

`b64` - This **filter** converts the passed string to base64

Usage:

    {{ svgData | b64 }}

`arrayContains` - This **function** takes 2 args and will return `true` if the item you send is in the provided array

Usage:

    {% if arrayContains(string, array) %}

Additional filters and functions can be added to `index.js`
