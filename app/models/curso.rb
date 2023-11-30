class Curso < ApplicationRecord
    include CursoUploader::Attachment(:archivo)  # Shrine attachment
    
    belongs_to :user
    
    validates :nombre, presence: true
    validates :descripcion, presence: true
    # No necesitas validar :archivo aquí si ya lo estás haciendo en el cargador
  end
  