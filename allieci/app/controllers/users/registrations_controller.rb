class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    super
  end
  # POST /resource
  def create
    super
  end
  
  def destroy
    super
  end
  
protected
def sign_up(resource_name, resource)
  true
end
def configure_sign_up_params
  devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :last_name, :rut])
end
  def account_update_params
    params.require(resource_name).permit(:name, :last_name, :rut, :email, :password, :password_confirmation, :current_password)
  end

end
