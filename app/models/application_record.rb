class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  # before_action :authenticate_user!
  # before_action :check_admin, only: [:admin_dashboard]
  #
  # def check_admin
  #   redirect_to root_path, alert: "Not authorized" unless current_user.admin?
  # end
end
