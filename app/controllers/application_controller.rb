class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    if resource.admin?
      rails_admin_path # or the path to your admin panel
    else
      root_path # or wherever non-admin users should be redirected
    end
  end
end
