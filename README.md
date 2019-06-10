# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation


## usersテーブル(devise使用)

|Column|Type|Options|
|------|----|-------|
|user_name|string|default: ""|
|email|string|null: false, default: "", unique: true|
|encrypted_password|string|null: false, default: ""|

|reset_password_token|string|unique: true|
|reset_password_sent_at|datetime|
|remember_created_at|datetime|
|created_at|datetime|
|updated_at|datetime|


### Association
- has_many :members
- has_many :group, through: :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string||null: false, default: ""|
|created_at|datetime|
|updated_at|datetime|


### Association
- has_many :members
- has_many :user, through: :members
- has_many :messages

## membersテーブル (中間テーブル)
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|
|image|string|
|user_id|integer|null: false|
|group_id|integer|null: false|
|created_at|datetime|
|updated_at|datetime|

### Association
- belongs_to :user
- belongs_to :group




* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
