/* global hexo */
// Usage: {% inlinetagblue %} Something {% endinlinetagblue %}
// Alias: {% itb %} Something {% enditb %}

function inlineTagBlue (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-blue">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagblue', inlineTagBlue, {ends: true});
hexo.extend.tag.register('itb', inlineTagBlue, {ends: true});

/* global hexo */
// Usage: {% inlinetagyellow %} Something {% endinlinetagyellow %}
// Alias: {% ity %} Something {% endity %}

function inlineTagYellow (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-yellow">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagyellow', inlineTagYellow, {ends: true});
hexo.extend.tag.register('ity', inlineTagYellow, {ends: true});

/* global hexo */
// Usage: {% inlinetagred %} Something {% endinlinetagred %}
// Alias: {% itr %} Something {% enditr %}

function inlineTagRed (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-red">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagred', inlineTagRed, {ends: true});
hexo.extend.tag.register('itr', inlineTagRed, {ends: true});


/* global hexo */
// Usage: {% inlinetagpurple %} Something {% endinlinetagpurple %}
// Alias: {% itp %} Something {% enditp %}

function inlineTagPurple (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-purple">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagpurple', inlineTagPurple, {ends: true});
hexo.extend.tag.register('itp', inlineTagPurple, {ends: true});


/* global hexo */
// Usage: {% inlinetagorange %} Something {% endinlinetagorange %}
// Alias: {% ito %} Something {% endito %}

function inlineTagOrange (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-orange">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetagorange', inlineTagOrange, {ends: true});
hexo.extend.tag.register('ito', inlineTagOrange, {ends: true});

/* global hexo */
// Usage: {% inlinetaggreen %} Something {% endinlinetaggreen %}
// Alias: {% itg %} Something {% enditr %}

function inlineTagGreen (args, content) {
  var withpstring = hexo.render.renderSync({text: content, engine: 'markdown'});
  var withoutpstring = withpstring.slice(3, -5);
  return '<span id="inline-green">' +  
            withoutpstring +
          '</span>';
}

hexo.extend.tag.register('inlinetaggreen', inlineTagGreen, {ends: true});
hexo.extend.tag.register('itg', inlineTagGreen, {ends: true});
