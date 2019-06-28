class MessagesController < ApplicationController

  before_action :set_group
  before_action :move_to_index
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      #flash.now[:alert] = 'メッセージを入力してください。'
      #render :index
      respond_to do |format|
        format.html {render :index, flash.now[:alert] = 'メッセージを入力してください。'}
        format.json
      end
    end
  end

  def move_to_index
    redirect_to new_user_session_path unless user_signed_in?
  end
  
  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
