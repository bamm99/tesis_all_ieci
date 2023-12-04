class ProgresoCurso < ApplicationRecord
  belongs_to :user
  belongs_to :curso
  validates :progreso, numericality: { greater_than_or_equal_to: 0 }

end
