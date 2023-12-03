class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :cursos
  has_many :progreso_cursos
  
  def alumno?
    role == 0
  end

  def profesor?
    role == 1
  end

  def admin?
    role == 2
  end
  
end