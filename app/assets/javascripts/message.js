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
})