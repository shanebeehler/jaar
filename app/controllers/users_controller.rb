class UsersController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]


  def new
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
      if @user.update_attributes(user_edit_params)
        redirect_to root_path
      else
        render :edit
      end
  end

  def create
    @user = User.create(user_params)
    if @user.save
      auto_login(@user)
      @user.generate_general_jar(@user)
      redirect_to :root
    else
      flash.now[:alert] = 'Signup Failed'
      render 'pages/landing.html.erb'

    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
  end

  def user_edit_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end


end
