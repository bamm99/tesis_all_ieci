class AddArchivoDataToCursos < ActiveRecord::Migration[7.1]
  def change
    add_column :cursos, :archivo_data, :text
  end
end
