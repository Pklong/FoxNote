class User < ActiveRecord::Base
  attr_reader :password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, presence: true, format: { with: VALID_EMAIL_REGEX }
  validates :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  # Paperclip
  has_attached_file :image, default_url: "fox_avatar.jpg",
                    styles: { thumb: "100x100#" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token
  has_many :notebooks, foreign_key: "author_id", dependent: :destroy
  has_many :notes, foreign_key: "author_id", dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )

    return user if user

    newUser = User.create!(
      email: auth_hash[:info][:email],
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )

    User.set_up_new_user(newUser)
    newUser

  end

  def self.set_up_new_user(user)
    user.notebooks.create!(title: "Welcome to Foxnote")
    user.notebooks.first.notes.create!(title: "Welcome",
    body: "have fun!",
    body_delta: '{"ops":[{"insert": "have fun!"}]}',
    author_id: user.id)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

end
