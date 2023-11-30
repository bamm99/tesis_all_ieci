class CursosController < ApplicationController
    def create
        if current_user.role_cursos == 1
          @curso = Curso.new(curso_params)
          @curso.user = current_user    
          if @curso.save
            # Lógica después de guardar exitosamente
            redirect_to root_path, notice: 'Curso creado con éxito'
          else
            # Manejar errores de validación
            render :new, alert: 'Error al crear el curso'
          end
        else
          redirect_to root_path, alert: 'No tienes permiso para crear cursos'
        end
      end
    
      private
    
      def curso_params
        params.require(:curso).permit(:nombre, :descripcion, :archivo)
      end
    
  end