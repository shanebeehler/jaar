class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  def not_authenticated
    redirect_to login_path, alert: 'Please Log In first'
  end
end
