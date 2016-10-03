class ItemsController < ApplicationController
  before_action do
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
  end

  def create

    if params[:item][:type_id] == '0'
      flash[:notice] = "Please select the type of item you'd like to add"
      redirect_to new_jar_item_path and return
    end

    @item = Item.new(item_params)
    @item.jar = @jar

    if @item.save
      # redirect_to [@jar, @item]
      redirect_to jar_path(@jar)
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

    redirect_to jar_items_path
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
    end
  end

end
