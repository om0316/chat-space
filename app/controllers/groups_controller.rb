class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  before_action :ser_user, only: [:new, :create]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end
  
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    #カレントユーザをチャットメンバー項目の一番前に持ってくる
    @users = @group.users.where.not(id: current_user.id).map{ |user| user }
    @users.unshift(current_user)
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
  
  def ser_user
    #カレントユーザ表示される用
    @users = []
    @users << current_user
  end  

end
