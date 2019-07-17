$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    
    var img = message.image.url == null ? "" : `<img class="lower-message__image" src=${message.image.url} ></img>`
    
    var html = `<ul class="message-list" data-id= "${message.id}">
                     <li class="message-list__name">
                        ${message.user_name}
                     </li>
                     <li class="message-list__date">
                        ${message.date}
                     </li>
                     <li class="message-list__text">
                        ${message.text}   
                     </li>
                       ${img}
                  </ul>`
    return html;
  }

  $("#new_message").on("submit",function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){

      if (Object.keys(data).length != 0){
        var html = buildHTML(data);
        $(".Content__mainmessage").append(html);
        $(".Content__mainmessage").animate({scrollTop: $(".Content__mainmessage")[0].scrollHeight}, "fasts");
      }else
      {
        alert("メッセージを入力してください。");
      }

      $("#new_message")[0].reset();
      $(".message-create__btn__send").prop("disabled", false);
    })
    .fail(function(){
      alert("error");
    })
  })

  var reloadMessages = function() {

    //グループに入ったときのみ、自動更新する。
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $(".message-list:last").data("id") || 0;

      $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: "api/messages",
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: "get",
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
      .done(function(messages) {
        
        var insertHTML = '';
        //他の追加で追加された分だけ追加
        $.each(messages,function(index,val){
          insertHTML = buildHTML(val); 
          $('.Content__mainmessage').append(insertHTML);//メッセージを追加
        });

        $(".Content__mainmessage").animate({scrollTop: $(".Content__mainmessage")[0].scrollHeight}, "fasts");
      })
      .fail(function() {
        alert("error");
      });
    }
  };
  
  setInterval(reloadMessages, 5000);
  // 5秒すぎると処理
})