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
    archivo_path = Rails.root.join('public', 'uploads', 'store', curso.archivo_nombre)
  
    if File.exist?(archivo_path)
      contenido_curso = JSON.parse(File.read(archivo_path))
      render json: {
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        lecciones: contenido_curso["lecciones"]
      }
    else
      render json: { error: 'Archivo del curso no encontrado' }, status: :not_found
    end
  end
  
  def listar
    @cursos = Curso.all
    render partial: 'shared/cursos_list', locals: { cursos: @cursos }
  end
  
  private
    
  def curso_params
    params.require(:curso).permit(:nombre, :descripcion, :archivo_data, :archivo_nombre)
  end
    
  end