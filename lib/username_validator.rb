class UsernameValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if UsernameRecord.with_name(value).banned.any?
      record.errors.add attribute, (options[:message] || "is not allowed")
    end

    if record.name_changed? && record.name_change_in_cooldown?
      record.errors.add attribute, (options[:message] || "is on cooldown and cannot be changed")
    end
  end
end