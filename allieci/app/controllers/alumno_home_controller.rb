class AlumnoHomeController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_alumno

  def index

  end

  private

  def authorize_alumno
    redirect_to root_path unless current_user.alumno? or current_user.admin?
  end
end
