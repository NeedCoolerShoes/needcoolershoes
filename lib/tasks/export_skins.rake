require 'fileutils'

namespace :export_skins do
  task :month, [:date] => :environment do |_task, args|
    date = args.date ? Date.parse(args.date) : Date.today
    month_start = date.at_beginning_of_month
    month_end = date.at_end_of_month
    export_in_range(month_start, month_end)
  end

  def export_in_range(date_start, date_end)
    skins = Skin.is_public.where(created_at: date_start..(date_end + 1.day)).order(created_at: :asc)
    return false unless skins.any?
    zip = Skin.export_to_zip(skins)
    FileUtils.cp(zip.path, "mncs_archive_#{date_start.strftime("%Y%m%d")}_#{date_end.strftime("%Y%m%d")}.zip")
  end
end
