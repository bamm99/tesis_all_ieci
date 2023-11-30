class CursosController < ApplicationController
  def index
    @cursos = Curso.all
    render json: @cursos.map { |curso| { id: curso.id, nombre: curso.nombre } }
  end
    
  private
    
  def curso_params
    params.require(:curso).permit(:nombre, :descripcion, :archivo, :archivo_data)
  end
    
  end