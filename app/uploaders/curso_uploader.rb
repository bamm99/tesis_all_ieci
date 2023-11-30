# app/uploaders/curso_uploader.rb
require 'shrine'
class CursoUploader < Shrine
  # Plugins y configuraciones aquí

  # Por ejemplo, si quieres validar el tamaño y tipo de archivo:
  plugin :validation_helpers
  plugin :determine_mime_type

  Attacher.validate do
    validate_size 0..(5*1024*1024) # Limite de tamaño, por ejemplo, 5 MB
    validate_extension_inclusion %w[json],  
    message: 'no es un tipo de archivo permitido' # Permite solo ciertos tipos de archivo, message: 'no es un tipo de archivo permitido' # Tipos de archivo permitidos

    # Lista los tipos MIME que deseas permitir
  end

  # Puedes agregar más configuraciones o plugins según tus necesidades
end