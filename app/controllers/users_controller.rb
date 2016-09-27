class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]


  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      auto_login(@user)
      @user.generate_general_jar(@user)
      redirect_to :root
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end



end
