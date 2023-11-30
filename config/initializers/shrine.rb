require "shrine"
require "shrine/storage/file_system"

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # para caché temporal
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"), # para almacenamiento permanente
}

Shrine.plugin :activerecord           # Carga el plugin para integración con ActiveRecord
Shrine.plugin :cached_attachment_data # para retener el archivo cargado en el formulario en caso de error de validación
Shrine.plugin :restore_cached_data    # reextrae los metadatos del archivo cargado en caso de error de validación
