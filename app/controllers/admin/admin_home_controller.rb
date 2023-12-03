module Admin
  class AdminHomeController < ApplicationController
    include UserHelper
    before_action :authenticate_user!
    before_action :authorize_admin

    def index
      @asignaturas_por_semestre = Asignatura.all.group_by(&:semestre)
    end

    def usuarios
      @users = User.all
      render partial: 'shared/user_list', locals: { users: @users }, layout: false
    end

    def cursos
      @curso = Curso.new # Aquí agregamos la instancia de Curso para el formulario
      nombres_de_archivos = Dir.glob("storage/Cursos/*").map { |f| File.basename(f) }
      @cursos = nombres_de_archivos.map { |nombre| OpenStruct.new(nombre: nombre) }
      render partial: 'shared/cursos_list', locals: { cursos: @cursos }
    end

    def create_curso

        @curso = Curso.new(curso_params)
        @curso.user_id = current_user.id
        @curso.archivo_nombre = @curso.archivo.original_filename

        if @curso.save
          # Lógica para guardar el archivo del curso
          redirect_to admin_root_path, notice: 'Curso creado con éxito'
        else
          puts @curso.errors.full_messages
          redirect_to admin_root_path, alert: 'Error al crear el curso'
        end
    end
    private
    
    def curso_params
      params.require(:curso).permit(:nombre, :descripcion, :archivo)
    end

    def authorize_admin
      redirect_to root_path unless current_user.admin?
    end
  end
end