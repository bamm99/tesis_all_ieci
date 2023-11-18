class AdminHomeController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin

  def index
    # Acciones específicas para el home de administradores
  end

  private
  def authorize_admin
    redirect_to root_path unless current_user.admin?
  end
end
