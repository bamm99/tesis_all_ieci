class CreateAsignaturas < ActiveRecord::Migration[7.1]
  def change
    create_table :asignaturas do |t|
      t.references :semestre, null: false, foreign_key: true
      t.string :nombre
      t.string :directorio

      t.timestamps
    end
  end
end
