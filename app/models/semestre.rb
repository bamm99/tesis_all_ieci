class Semestre < ApplicationRecord
    class Semestre < ApplicationRecord
        has_many :asignaturas, dependent: :destroy
      end
end
