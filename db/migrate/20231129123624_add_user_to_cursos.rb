class AddUserToCursos < ActiveRecord::Migration[7.1]
  def change
    add_reference :cursos, :user, null: false, foreign_key: true
  end
end
