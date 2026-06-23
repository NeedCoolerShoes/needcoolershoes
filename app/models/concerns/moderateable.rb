module Moderateable
  extend ActiveSupport::Concern

  def next(query_scope = nil)
    query_scope ||= self.class.all
    query_scope.where(id: (self.id + 1)..).order(id: :asc).first
  end

  def previous(query_scope = nil)
    query_scope ||= self.class.all
    query_scope.where(id: ..(self.id - 1)).order(id: :desc).first
  end
end