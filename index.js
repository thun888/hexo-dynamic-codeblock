hexo.extend.tag.register('coding', function (args) {
  var url = args[0];
  var lang = args[1];
  if (hexo.config.dynamic_codeblock) {
    var api = hexo.config.dynamic_codeblock.api;
  } else {
    console.log('[hexo-dynamic-codeblock] error: missing dynamic_codeblock.api');
  }
  var jsurl = api + '?usejson=true&url=' + encodeURIComponent(url);
  if (lang) {
    jsurl += '&lang=' + encodeURIComponent(lang);
  }
  // 生成随机id
  coding_id = 'coding-' + Math.random().toString(36).substr(2, 9);
  
  if (hexo.config.dynamic_codeblock.loading) {
    return `
    <div class="tag-plugin ds-coding" id="${coding_id}"></div>
    <script>
    addEventListener("load",function(){
      console.log('[hexo-dynamic-codeblock]start load：${coding_id}' );
      utils.jq(() => {
        $(function () {
          const el = document.getElementById('${coding_id}');
            utils.request(el, "${jsurl}", function (data) {
              $(el).append(data.result);
              addCopyButtons('${coding_id}');
            });
          });
      });
    });
    </script>
    <link rel="stylesheet" href="${hexo.config.dynamic_codeblock.css}">
        `
  } else {
    return '<script src="' + jsurl + '"></script>';
  }
});