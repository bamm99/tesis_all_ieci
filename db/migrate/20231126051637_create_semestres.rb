class CreateSemestres < ActiveRecord::Migration[7.1]
  def change
    create_table :semestres do |t|
      t.integer :numero

      t.timestamps
    end
  end
end
