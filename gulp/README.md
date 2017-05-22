# Svartan Gulpfile

## Available Tasks

`gulp` -- **use this task**
  - Used for local development
  - Starts `serve` and `scss` tasks

`serve`
  - Starts a server via BrowserSync to serve css/styles.css
  - LiveReload stream connects with javascript snippet included at the bottom of `partials/footerIncludes.html`

`sass`
  - Watch for changes within scss directory
  - Sourcemap functionality
  - Compiles to `src/css/` folder
  - Includes CustomPlumber error notification (via Growl) and will not shitout the task if an error is detected.

## Notes
  - As always remember to `npm install`
  - Gulp command can be run in any folder
