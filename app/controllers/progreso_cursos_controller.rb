class ProgresoCursosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_curso, only: [:actualizar, :obtener]
  before_action :set_user, only: [:actualizar, :obtener]
  skip_before_action :verify_authenticity_token, only: [:actualizar]


  def actualizar
    progreso = @user.progreso_cursos.find_or_initialize_by(curso: @curso)
    progreso.assign_attributes(progreso_params)
      puts "Parámetros recibidos: #{params.inspect}"

  
      if progreso.save
        render json: progreso, status: :ok
      else
        render json: progreso.errors, status: :unprocessable_entity
      end
    end
  
    # GET /progreso_cursos/:curso_id/obtener

  def obtener
    progreso = @user.progreso_cursos.find_or_initialize_by(curso: @curso)
    if progreso.new_record? || progreso.progreso < 1
      progreso.progreso = 0
      progreso.save
    end
    render json: progreso, status: :ok
  end

  
    private
  
    def set_curso
      @curso = Curso.find(params[:curso_id])
    end
  
    def set_user
      @user = current_user
    end
  
    def progreso_params
      params.require(:progreso_curso).permit(:progreso)
    end
  end
  