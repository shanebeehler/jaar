class JarsController < ApplicationController
  before_action do
    @user = current_user
  end

  def index
    @jars = @user.jars
  end

  def show
    @jar = Jar.find(params[:id])
    ensure_user_match

    respond_to do |f|
      f.html
      f.json do
        media_url = @jar.items.map do |item|
          item.type_data.url
        end
        render json: [@jar, @jar.items]
      end
    end
  end

  def new
    @jar = Jar.new

    if request.xhr?
      render :layout => false
    end
  end

  def create
    @jar = Jar.new(jar_params)
    @jar.user_id = @user.id

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

  def close_jar
    @jar = Jar.find(params[:id])
    @jar.closed = true
    if @jar.save
      redirect_to jars_path, notice: "Jar has been closed!"
    else
      render show_jar_path(@jar)
    end
  end

  private

  def ensure_user_match
    if @jar.user != @user
      not_found
    end
  end

  # def get_random_item(jar)
  #   if jar.items.count == 0
  #     return false
  #   else
  #     random_item = jar.items.sample
  #     case random_item.type_id
  #     when 1
  #       random_item.comment
  #     when 2
  #       random_item.type_data.url
  #     end
  #   end
  # end

  def jar_params
    params.require(:jar).permit(:name)
  end

end
