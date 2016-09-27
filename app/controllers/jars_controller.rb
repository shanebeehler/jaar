class JarsController < ApplicationController

  def index
    @jars = Jars.all
  end

  def show
    @jar = Jar.find(params[:id])
    ensure_user_match
  end

  def new
    @jar = Jar.new
  end

  def create
    @jar = Jar.new(jar_params)

    if @jar.save
      redirect_to jars_path
    else
      render new_jar_path
    end
  end

  def edit
    @jar = Jar.find(params[:id])
  end

  def update
    @jar = Jar.find(params[:id])

    if @jar.update(jar_params)
      redirect_to jars_path
    else
      render edit_jar_path
    end
  end

  def destroy
    @jar = Jar.find(params[:id])
    @jar.destroy
    redirect_to jars_path
  end

  private

  def ensure_user_match
  if @jar.user != @user
    not_found
  end

  def jar_params
    params.require(:jar).permit(:name)
  end

end
