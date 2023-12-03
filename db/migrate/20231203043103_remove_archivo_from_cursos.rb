class RemoveArchivoFromCursos < ActiveRecord::Migration[7.1]
  def change
    remove_column :cursos, :archivo
  end
end
