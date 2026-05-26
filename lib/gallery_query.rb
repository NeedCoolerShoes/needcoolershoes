require "parslet"

class GalleryQuery
  class QueryParser < Parslet::Parser
    rule(:space) { match('[ ]').repeat(1) }
    rule(:spaces?) { space.maybe }

    rule(:word) { match("[^ ]").repeat(1) }
    rule(:name) { match("[a-z0-9_-]").repeat(1) }

    rule(:escaped) { str("\\").ignore >> word }
    rule(:tag) { str('+').ignore >> name}
    rule(:user) { str('@').ignore >> word }
    rule(:param) { name.as(:key) >> str(":") >> word.as(:value) }

    rule(:element) { escaped.as(:word) | tag.as(:tag) | user.as(:user) | param.as(:param) | word.as(:word) }
    rule(:query) { (spaces? >> element >> spaces?).repeat(1) }

    root(:query)
  end

  def initialize(query)
    @tags = []
    @search = []
    @user = nil
    @params = {}

    result = QueryParser.new.parse(query)

    result.to_a.each do |entry|
      key = entry.keys.first
      value = entry.values.first
      value_s = value.to_s

      case key
      when :tag then @tags << value_s
      when :user then @user = value_s
      when :param then @params[value[:key].to_sym] = value[:value].to_s
      else @search << value_s
      end
    end
  end

  def tags
    @tags
  end

  def search
    @search.join(" ")
  end

  def user
    @user
  end

  def params
    @params
  end

  def to_h
    query = {}

    if params.any?
      query = query.merge(params)
    end

    query[:user] = user if user.present?
    query[:tag] = tags.join(",") if tags.any?
    query[:search] = search if search.present?

    query
  end

  def to_url
    "?" + URI.encode_www_form(to_h)
  end
end