class PagesController < ApplicationController
  skip_before_action :require_login
  def landing
    if logged_in?
      redirect_to jars_path
    end
  end
end
