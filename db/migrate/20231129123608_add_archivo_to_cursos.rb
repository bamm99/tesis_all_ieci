class AddArchivoToCursos < ActiveRecord::Migration[7.1]
  def change
    add_column :cursos, :archivo, :string
  end
end
