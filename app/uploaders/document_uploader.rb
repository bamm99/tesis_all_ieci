require 'shrine'

class DocumentUploader < Shrine
    # Si necesitas validar el tipo o tamaño del archivo
    plugin :validation_helpers
    plugin :determine_mime_type

    Attacher.validate do
        unless [1, 2].include?(context[:user_role]) # Solo permite subir archivos a los profesores y administradores    
            errors << "no tienes permiso para subir archivos"
        end
        validate_max_size 5*1024*1024, message: 'es demasiado grande (máximo 5 MB)' # Limita el tamaño del archivo a 5 MB
        validate_mime_type_inclusion [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'application/json'], 
            message: 'no es un tipo de archivo permitido' # Permite solo ciertos tipos de archivo, message: 'no es un tipo de archivo permitido' # Tipos de archivo permitidos
    end

        def generate_location(io, record: nil, name: nil, **)
            if record.is_a?(Documento) && record.asignatura
                # Construye la ruta basada en la asignatura
                "Asignaturas/#{record.asignatura.nombre}/#{super}"
            elsif record.is_a?(Documento) && record.curso
                # Construye la ruta basada en el curso
                "Cursos/#{record.curso.nombre}/#{super}"
            else
            super # Ruta por defecto
            end
        end

end