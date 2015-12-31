Mailer.config({
  from: 'Cardinal Rides <noreply@cardinalrides.com>',     // Default 'From:' address. Required.
  replyTo: 'Cardinal Rides <noreply@cardinalrides.com>',  // Defaults to `from`.
  routePrefix: 'emails',              // Route prefix.
  baseUrl: process.env.ROOT_URL,      // The base domain to build absolute link URLs from in the emails.
  testEmail: 'ksinghal@stanford.edu',                    // Default address to send test emails to.
  logger: console,                 // Injected logger (see further below)
  silent: true,                      // If set to `true`, any `Logger.info` calls won't be shown in the console to reduce clutter.
  addRoutes: false, // ##deploy Add routes for previewing and sending emails. Defaults to `true` in development.
  language: 'html' ,                   // The template language to use. Defaults to 'html', but can be anything Meteor SSR supports (like Jade, for instance).
  plainText: true,                     // Send plain text version of HTML email as well.
  plainTextOpts: {ignoreImage:true}                   // Options for `html-to-text` module. See all here: https://www.npmjs.com/package/html-to-text
});

Meteor.startup(function() {

  Mailer.init({
    templates: Templates,     // Global Templates namespace, see lib/templates.js.
  //  helpers: TemplateHelpers, // Global template helper namespace.
    layout: {
      name: 'emailLayout',
      path: 'email-layout.html'   // Relative to 'private' dir.
    }
  });

});
