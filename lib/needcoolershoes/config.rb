def get_revision_hash
  return ENV["NCRS_COMMIT_HASH"] if ENV["NCRS_COMMIT_HASH"]

  revision_hash_file = Rails.application.root.join("tmp/revision_hash.txt")
  return revision_hash_file.read if revision_hash_file.exist?

  begin
   return `git rev-parse --short HEAD`.strip
  rescue
  end

  "undefined"
end

module Needcoolershoes
  module Config
    mattr_accessor :revision, :source, :host

    self.revision = get_revision_hash

    def self.setup
      yield self
    end

    def self.revision_url
      (self.source || "") + "/" + "commit/" + self.revision
    end
  end
end