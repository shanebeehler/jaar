class AddColorToJars < ActiveRecord::Migration[5.0]
  def change
    add_column :jars, :color, :string
  end
end
