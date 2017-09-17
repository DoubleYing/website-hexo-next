/* global hexo */
// Usage: {% examplequote %} Something {% endexamplequote %}
// Alias: {% eq %} Something {% endeq %}

function exampleQuote (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<div class="quote-example">' +   
            withoutpstring +
          '</div>';
}

hexo.extend.tag.register('examplequote', exampleQuote, {ends: true});
hexo.extend.tag.register('eq', exampleQuote, {ends: true});
