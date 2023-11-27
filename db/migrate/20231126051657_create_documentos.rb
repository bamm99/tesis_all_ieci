class CreateDocumentos < ActiveRecord::Migration[7.1]
  def change
    create_table :documentos do |t|
      t.references :asignatura, null: false, foreign_key: true
      t.string :nombre
      t.string :directorio

      t.timestamps
    end
  end
end
