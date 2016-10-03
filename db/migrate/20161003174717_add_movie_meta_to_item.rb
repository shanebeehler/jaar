class AddMovieMetaToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :movie_meta, :string
  end
end
