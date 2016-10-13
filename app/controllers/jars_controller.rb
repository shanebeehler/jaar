  class JarsController < ApplicationController
  before_action do
    @user = current_user
  end

  def index
    @jars = @user.jars.newest_first
  end

  def show
    @jar = Jar.find(params[:id])

    @media = get_random_item(@jar)


      respond_to do |f|
        f.html { render 'show', :layout => false }
        f.json do
          render json: @media
        end
      end


   end

  def new
    @jar = Jar.new
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
    if request.xhr?
      render 'edit', :layout => false
    end
  end

  def update
    @jar = Jar.find(params[:id])
    @media = get_random_item(@jar)
    if @jar.update(jar_params)
      if request.xhr?
        render 'show', layout: false
      else
        redirect_to jars_path
      end
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
    @jar.share_token = SecureRandom.hex
    if @jar.save
      redirect_to jars_path, notice: "Jar has been closed!"
    else
      render show_jar_path(@jar)
    end
  end

  def sort
    if params[:scope] == 'closed'
      @jars = @user.jars.closed
    elsif params[:scope] == 'recent'
      @jars = @user.jars.newest_first
    end
    render json: @jars
  end

  def view_shared_jar
    @jar = jar.find_by(share_token: params[:token])

  end

  private

  def ensure_user_match
    if @jar.user != @user
      not_found
    end
  end

  def jar_params
    params.require(:jar).permit(:name)
  end

  def get_random_item(jar)
   if jar.items.count == 0
     return 'empty'
   else
     random_item = jar.items.sample
     case random_item.type_id
      when 1
        return [1, random_item.comment, random_item.id]
      when 2
        return [2, random_item.type_data.url, random_item.comment, random_item.id]
      when 3
        return [3, random_item.type_data.url, random_item.comment, random_item.id]
      when 4
        return [4, random_item.comment, random_item.id]
      when 5
        return [5, random_item.comment, random_item.id]
     end
   end
  end

end
