class Asignatura < ApplicationRecord
  belongs_to :semestre
  has_many :documentos, dependent: :destroy
end
