class CreateProfAsigns < ActiveRecord::Migration[7.1]
  def change
    create_table :prof_asigns do |t|
      t.references :asignatura, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
