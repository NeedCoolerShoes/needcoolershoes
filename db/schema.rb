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

ActiveRecord::Schema[7.1].define(version: 2024_12_02_081928) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "url"
    t.integer "karma"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "banners", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "description"
    t.string "data"
    t.integer "favourites_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "style", default: 0, null: false
    t.boolean "hidden", default: false
    t.index ["user_id"], name: "index_banners_on_user_id"
  end

  create_table "favourites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "target_id", null: false
    t.integer "karma", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "target_type", null: false
    t.index ["target_id"], name: "index_favourites_on_target_id"
    t.index ["target_type"], name: "index_favourites_on_target_type"
    t.index ["user_id"], name: "index_favourites_on_user_id"
  end

  create_table "modlogs", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "target_type", null: false
    t.bigint "target_id", null: false
    t.jsonb "changelog"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["target_type", "target_id"], name: "index_modlogs_on_target"
    t.index ["user_id"], name: "index_modlogs_on_user_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable"
  end

  create_table "site_messages", force: :cascade do |t|
    t.string "message", null: false
    t.datetime "active_at", precision: nil, null: false
    t.datetime "expires_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "bumped_at"
  end

  create_table "skin_attributions", force: :cascade do |t|
    t.bigint "skin_id", null: false
    t.bigint "attributed_skin_id"
    t.string "url"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attributed_skin_id"], name: "index_skin_attributions_on_attributed_skin_id"
    t.index ["skin_id"], name: "index_skin_attributions_on_skin_id"
  end

  create_table "skin_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "translation_key", default: "", null: false
  end

  create_table "skin_jam_winners", force: :cascade do |t|
    t.bigint "skin_jam_id", null: false
    t.bigint "skin_id", null: false
    t.integer "place", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skin_id"], name: "index_skin_jam_winners_on_skin_id"
    t.index ["skin_jam_id"], name: "index_skin_jam_winners_on_skin_jam_id"
  end

  create_table "skin_jams", force: :cascade do |t|
    t.string "tag", null: false
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_at", default: "1970-01-01 00:00:00"
    t.datetime "end_at", default: "1970-01-01 00:00:00", null: false
    t.integer "lenient_seconds", default: 60, null: false
    t.string "theme", default: "", null: false
    t.index ["tag"], name: "index_skin_jams_on_tag", unique: true
  end

  create_table "skin_parts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "translation_key", default: "", null: false
  end

  create_table "skins", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.text "data", null: false
    t.integer "visibility", null: false
    t.boolean "terms_and_conditions"
    t.bigint "user_id", null: false
    t.bigint "skin_category_id"
    t.bigint "skin_part_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "model"
    t.integer "download_count"
    t.integer "favourites_count", default: 0, null: false
    t.integer "license"
    t.boolean "hidden", default: false
    t.string "jam_tags", default: [], null: false, array: true
    t.index ["skin_category_id"], name: "index_skins_on_skin_category_id"
    t.index ["skin_part_id"], name: "index_skins_on_skin_part_id"
    t.index ["user_id"], name: "index_skins_on_user_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "tag_id"
    t.string "taggable_type"
    t.bigint "taggable_id"
    t.string "tagger_type"
    t.bigint "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at", precision: nil
    t.string "tenant", limit: 128
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "taggings_taggable_context_idx"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
    t.index ["tagger_type", "tagger_id"], name: "index_taggings_on_tagger_type_and_tagger_id"
    t.index ["tenant"], name: "index_taggings_on_tenant"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "user_badges", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "badge_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["badge_id"], name: "index_user_badges_on_badge_id"
    t.index ["user_id"], name: "index_user_badges_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "name", default: "", null: false
    t.string "display_name", default: ""
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "featured_skin_id"
    t.string "biography"
    t.string "otp_secret"
    t.integer "consumed_timestep"
    t.boolean "otp_required_for_login"
    t.text "otp_backup_codes", array: true
    t.integer "role"
    t.string "attribution_message"
    t.boolean "watermark_disabled"
    t.bigint "featured_badge_id"
    t.datetime "ban_ends_at"
    t.string "ban_message"
    t.integer "pixels", default: 0, null: false
    t.datetime "pixels_cached_at", default: "1970-01-01 00:00:00", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["featured_badge_id"], name: "index_users_on_featured_badge_id"
    t.index ["featured_skin_id"], name: "index_users_on_featured_skin_id"
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "banners", "users"
  add_foreign_key "favourites", "users"
  add_foreign_key "modlogs", "users"
  add_foreign_key "skin_attributions", "skins"
  add_foreign_key "skin_attributions", "skins", column: "attributed_skin_id"
  add_foreign_key "skin_jam_winners", "skin_jams"
  add_foreign_key "skin_jam_winners", "skins"
  add_foreign_key "skins", "skin_categories"
  add_foreign_key "skins", "skin_parts"
  add_foreign_key "skins", "users"
  add_foreign_key "taggings", "tags"
  add_foreign_key "user_badges", "badges"
  add_foreign_key "user_badges", "users"
  add_foreign_key "users", "badges", column: "featured_badge_id"
  add_foreign_key "users", "skins", column: "featured_skin_id"
end
