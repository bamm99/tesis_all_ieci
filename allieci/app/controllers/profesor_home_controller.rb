class ProfesorHomeController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_profesor

    def index
        # Acciones específicas para el home de profesores
    end

    private
    def authorize_profesor
        redirect_to root_path unless current_user.profesor? or current_user.admin?
    end
end
