# app/controllers/progreso_cursos_controller.rb
class ProgresoCursosController < ApplicationController
    before_action :set_curso, only: [:actualizar, :obtener]
    before_action :set_usuario, only: [:actualizar, :obtener]
  
    # POST /progreso_cursos/:curso_id/actualizar
    def actualizar
      progreso = @usuario.progreso_cursos.find_or_initialize_by(curso: @curso)
      progreso.update(progreso_params)
  
      if progreso.save
        render json: progreso, status: :ok
      else
        render json: progreso.errors, status: :unprocessable_entity
      end
    end
  
    # GET /progreso_cursos/:curso_id/obtener
    def obtener
      progreso = @usuario.progreso_cursos.find_by(curso: @curso)
      if progreso
        render json: progreso, status: :ok
      else
        render json: { error: 'Progreso no encontrado' }, status: :not_found
      end
    end
  
    private
  
    def set_curso
      @curso = Curso.find(params[:curso_id])
    end
  
    def set_usuario
      @usuario = current_user # Asegúrate de tener un método para obtener el usuario actual
    end
  
    def progreso_params
      params.require(:progreso_curso).permit(:progreso)
    end
  end
  