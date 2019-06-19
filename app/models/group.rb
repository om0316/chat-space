class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.text?
        last_message.text
      else
        last_message.text "画像が投稿されています"
      end    
    else
      "まだメッセージはありません"
    end
  end
end
