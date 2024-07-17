ActsAsTaggableOn.remove_unused_tags = true
ActsAsTaggableOn.force_lowercase = true
ActsAsTaggableOn.force_parameterize = true

Rails.configuration.after_initialize do
  ActsAsTaggableOn::Tag.include TaggableConfig
end
