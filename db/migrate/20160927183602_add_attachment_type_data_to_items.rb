class AddAttachmentTypeDataToItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :type_data
    end
  end

  def self.down
    remove_attachment :items, :type_data
  end
end
