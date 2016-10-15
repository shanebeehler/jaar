class AddShareTokenToJars < ActiveRecord::Migration[5.0]
  def change
    add_column :jars, :share_token, :string, :default => nil
  end
end
