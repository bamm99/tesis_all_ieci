module UserHelper
    def user_role(role)
      case role
      when 0 then 'Estudiante'
      when 1 then 'Profesor'
      when 2 then 'Administrador'
      else 'Desconocido'
      end
    end
  
    def user_role_cursos(role_cursos)
      case role_cursos
      when 0 then 'Deshabilitado'
      when 1 then 'Habilitado'
      else 'Desconocido'
      end
    end
  end