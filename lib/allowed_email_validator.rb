class AllowedEmailValidator < ActiveModel::EachValidator
  BLOCKLIST_CONTENT = File.readlines("vendor/config/disposable-email-domains/disposable_email_blocklist.conf", chomp: true).to_set.freeze

  def validate_each(record, attribute, value)
    split_email = value.split("@")

    return if split_email.size < 2

    domain = split_email[1].to_s.strip
    domain_parts = domain.split(".")
    
    (0...domain_parts.length - 1).each do |i|
      if BLOCKLIST_CONTENT.include?(domain_parts[i..-1].join("."))
        record.errors.add attribute, (options[:message] || "is not allowed")
        return
      end
    end
    
    if BlockedEmailDomain.with_domain(domain).any?
      record.errors.add attribute, (options[:message] || "is not allowed")
    end
  end
end