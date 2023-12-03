class CursosController < ApplicationController
  def index
    @cursos = Curso.all
    render json: @cursos.map { |curso| { 
      id: curso.id, 
      nombre: curso.nombre,
      url: "/uploads/store/#{curso.archivo_nombre}"} }
  end

  def show
    curso = Curso.find(params[:id])
    archivo_data = JSON.parse(curso.archivo_data)

    render json: {
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      url_archivo: url_for(archivo_data["id"]) # Utilizar 'url_for' para generar la URL del archivo
    }
  end
    
  private
    
  def curso_params
    params.require(:curso).permit(:nombre, :descripcion, :archivo_data, :archivo_nombre)
  end
    
  end