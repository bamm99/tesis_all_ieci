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
      @curso = Curso.new
      @cursos = Curso.all
      render partial: 'shared/cursos_list', locals: { cursos: @cursos }
    end

    def eliminar_curso
      Curso.where(id: params[:selected_cursos]).each do |curso|
        archivo_path = Rails.root.join('storage', 'Cursos', curso.archivo_nombre)
        File.delete(archivo_path) if File.exist?(archivo_path)
        curso.destroy
      end

      @cursos = Curso.all
      render partial: 'shared/cursos_list', locals: { cursos: @cursos }, notice: 'Cursos eliminados con éxito'
    end

    def create_curso
      @curso = Curso.new(curso_params)
      @curso.user_id = current_user.id
      @curso.archivo_nombre = @curso.archivo.original_filename if @curso.archivo.present?

      if @curso.save
        # Lógica para guardar el archivo del curso
        @cursos = Curso.all
        render partial: 'shared/cursos_list', locals: { cursos: @cursos }, notice: 'Curso creado con éxito'
      else
        puts @curso.errors.full_messages
        @cursos = Curso.all
        render partial: 'shared/cursos_list', locals: { cursos: @cursos }, alert: 'Error al crear el curso'
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