# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_11_29_192813) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "asignaturas", force: :cascade do |t|
    t.bigint "semestre_id", null: false
    t.string "nombre"
    t.string "directorio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["semestre_id"], name: "index_asignaturas_on_semestre_id"
  end

  create_table "cursos", force: :cascade do |t|
    t.string "nombre"
    t.text "descripcion"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "archivo"
    t.bigint "user_id", null: false
    t.text "archivo_data"
    t.index ["user_id"], name: "index_cursos_on_user_id"
  end

  create_table "documentos", force: :cascade do |t|
    t.bigint "asignatura_id", null: false
    t.string "nombre"
    t.string "directorio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asignatura_id"], name: "index_documentos_on_asignatura_id"
  end

  create_table "prof_asigns", force: :cascade do |t|
    t.bigint "asignatura_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asignatura_id"], name: "index_prof_asigns_on_asignatura_id"
    t.index ["user_id"], name: "index_prof_asigns_on_user_id"
  end

  create_table "semestres", force: :cascade do |t|
    t.integer "numero"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "rut"
    t.string "name"
    t.string "last_name"
    t.integer "role", default: 0
    t.integer "role_cursos", default: 0
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["rut"], name: "index_users_on_rut", unique: true
  end

  add_foreign_key "asignaturas", "semestres"
  add_foreign_key "cursos", "users"
  add_foreign_key "documentos", "asignaturas"
  add_foreign_key "prof_asigns", "asignaturas"
  add_foreign_key "prof_asigns", "users"
end
