class AddAssociatedUserToModlog < ActiveRecord::Migration[8.0]
  def change
    add_reference :modlogs, :associated_user, foreign_key: {to_table: :users}

    reversible do |dir|
      dir.up do
        Modlog.find_each do |modlog|
          next unless modlog.target.present?
          next unless modlog.target.has_attribute?(:user_id)
          puts modlog.target

          modlog.update_column(:associated_user_id, modlog.target.user_id)
        end
      end
    end
  end
end
