# Set the revision hash

revision_hash_file = Rails.application.root.join("tmp/revision_hash.txt")

if !ENV["NCRS_COMMIT_HASH"].present?
  if revision_hash_file.exist?
    ENV["NCRS_COMMIT_HASH"] = revision_hash_file.read
  else
    begin
      ENV["NCRS_COMMIT_HASH"] ||= `git rev-parse --short HEAD`.strip
    rescue
      ENV["NCRS_COMMIT_HASH"] = "undefined"
    end
  end
end