class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  def not_authenticated
    redirect_to pages_landing_path
  end
end
