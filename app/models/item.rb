class Item < ApplicationRecord
  belongs_to :jar
  belongs_to :type
  has_attached_file :type_data
  validates_attachment_content_type :type_data, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  has_attached_file :type_data, :styles => {
    :mp4 => {
      :format => 'mp4',
      :geometry => "1200x675#",
      :convert_options => {
        :input => {},
        :output => {
          :vcodec => 'libx264',
          :movflags => '+faststart',
          :strict => :experimental }
      }
    }
  }

        validates_attachment_content_type :type_data, :content_type => ["video/mp4", "video/quicktime", "video/x-flv", "video/x-msvideo", "video/x-ms-wmv", "video/webm"]
end
