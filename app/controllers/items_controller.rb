class ItemsController < ApplicationController
  before_action except: :render_form do
    @jar = Jar.find(params[:jar_id])
  end

  def index
    @items = @jar.items
  end

  def show
    @item = Item.find(params[:id])
    ensure_jar_match
  end

  def new
    @item = Item.new
    if request.xhr?
      render 'new', :layout => false
    end
  end

  def create

    if params[:item][:type_id] == '0'
      flash[:notice] = "Please select the type of item you'd like to add"
      redirect_to new_jar_item_path and return
    end

    @item = Item.new(item_params)
    @item.jar = @jar

    if @item.save
      respond_to do |f|
        f.json { render json: @item }
        f.html { redirect_to jar_path(@jar) }
      end

    else
      render :new
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update
    @item = Item.find(params[:id])

    if @item.update(item_params)
      redirect_to [@jar, @item]
    else
      render edit_jar_item_path
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    redirect_to root_path
  end

  def render_form
    form_id = params['value']
    case form_id
    when "1"
      render partial: 'text_mem',  jar: Jar.find(params['jar'])
    when "2"
      render '_image_mem', :jar => params['jar']
    when "3"
      render '_video_mem', jar: params['jar']
    when "4"
      render '_youtube_mem', jar: params['jar']
    when "5"
      render '_spotify_mem', jar: params['jar']
    end
  end

  private

  def ensure_jar_match
    if @item.jar != @jar
      not_found
    end
  end

  def item_params
    case params[:item][:type_id]
    when "1" #If user selects 'text'
      params.require(:item).permit(:type_id, :comment)
    when "2" #If user selects 'image'
      params.require(:item).permit(:type_id, :type_data, :comment)
    when "3" #If user selects 'video'
      params.require(:item).permit(:type_id, :type_data, :comment)
    when "4"
      params.require(:item).permit(:type_id, :comment)
    when "5"
      params.require(:item).permit(:type_id, :comment)
    end


  end

end
