class AddArchivoNombreToCursos < ActiveRecord::Migration[7.1]
  def change
    add_column :cursos, :archivo_nombre, :string
  end
end
