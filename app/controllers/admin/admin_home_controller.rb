module Admin
class AdminHomeController < ApplicationController
  include UsersHelper
    before_action :authenticate_user!
    before_action :authorize_admin

  def index
    # Acciones específicas para el home de administradores
  end

  def usuarios
    @users = User.all
    render partial: 'shared/user_list', locals: { users: @users }, layout: false
  end


  private
  def authorize_admin
    redirect_to root_path unless current_user.admin?
  end
end
end