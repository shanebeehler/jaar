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
    @item = Item.new(item_params)
    @item.jar = @jar

    if @item.save
      redirect_to [@jar, @item]
    else
      render new_jar_user_path
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

  def item_params
    params.require(:item).permit(:comment)
  end

end
