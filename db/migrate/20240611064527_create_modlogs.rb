class CreateModlogs < ActiveRecord::Migration[7.0]
  def change
    create_table :modlogs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :target, null: false, polymorphic: true
      t.jsonb :changelog
      t.string :reason

      t.timestamps
    end
  end
end
