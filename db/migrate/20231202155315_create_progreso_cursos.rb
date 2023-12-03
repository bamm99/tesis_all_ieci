class CreateProgresoCursos < ActiveRecord::Migration[7.1]
  def change
    create_table :progreso_cursos do |t|
      t.integer :progreso
      t.references :user, null: false, foreign_key: true
      t.references :curso, null: false, foreign_key: true

      t.timestamps
    end
  end
end
