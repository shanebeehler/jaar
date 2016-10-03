class Item < ApplicationRecord
  belongs_to :jar
   belongs_to :type
   has_attached_file :type_data, :styles => {
       :medium => { :geometry => "640x480", :format => 'mp4' },
       :thumb => { :geometry => "100x100#", :format => 'jpg', :time => 10 }
     }, :processors => [:transcoder]

     validates_attachment_content_type :type_data, :content_type => ["video/mp4", "video/quicktime", "video/x-flv", "video/x-msvideo", "video/x-ms-wmv", "video/webm", "image/jpg", "image/jpeg", "image/png", "image/gif"]
end
